const azure = module.exports = {}
const moment = require('moment-timezone/builds/moment-timezone-with-data-10-year-range')
const config = require('../../../config').azure
const ddParser = require('../lib/downDetectorParser.js')
const shared = require('./shared.js')
const { parse } = require('node-html-parser')

azure._uiMeta = shared.uiMeta

azure._isResolved = (incident) => incident.contentSnippet.toLowerCase().includes('final update')

azure._isOngoing = (incident) => {
  const isRelevant = moment.utc().subtract(4, 'days').isBefore(moment(incident.isoDate))
  return isRelevant && !azure._isResolved(incident)
}

azure._isRecent = (incident) => moment.utc().subtract(2, 'days').isBefore(moment(incident.isoDate)) && azure._isResolved(incident)

azure._splitIncidents = (incidents) => shared._splitIncidents(
  incidents,
  azure._isOngoing,
  azure._isRecent,
  (a, b) => new Date(b.isoDate) - new Date(a.isoDate)
)

azure._extractUpdates = (incident) => {
  const dom = parse(incident['content:encoded'])
  const updates = []
  let tempParagraphs = []

  dom.childNodes.forEach((node, index) => {
    if (node.tagName === 'hr') {
      updates.push(tempParagraphs)
      tempParagraphs = []
      return
    }
    if (node.tagName) tempParagraphs.push(node)

    // If this is the last iteration, save everything we have as we're not going to
    // encounter a 'hr' tag to collect the buffer like usual iterations
    if (index === dom.childNodes.length-1) updates.push(tempParagraphs)
  })
  const objectUpdates = updates.map(update => {
    const header = (update.shift()).rawText
    const time = header.split(',')[1].trim()
    const text = update.map(u => u.rawText).join('\n')
    return { time: moment.utc(time, 'M/D/YYYY h:mm:ss A').toISOString(), text }
  })
  return objectUpdates
}

azure._transformIncident = (incident) => {
  if (!incident) return null
  return {
    startTime: null,
    creationTime: incident.isoDate,
    resolutionTime: null,
    service: { // Service information available on event _guid urls so maybe HTML scrape-able in future
      key: null,
      name: null
    },
    affectedRegions: [],
    shortSummary: incident.title,
    updates: azure._extractUpdates(incident),
    directUri: incident.guid
  }
}

azure.v1 = (raw, ddData) => {
  const [ongoing, recent] = azure._splitIncidents(raw)

  return {
    uiMeta: azure._uiMeta(config),
    ongoingIncidents: ongoing && ongoing.map(azure._transformIncident) || null,
    recentIncidents: recent && recent.map(azure._transformIncident) || null,
    downDetectorData: ddParser.jsonOverview(ddData)
  }
}