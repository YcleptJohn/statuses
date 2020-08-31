const aws = module.exports = {}
const moment = require('moment-timezone/builds/moment-timezone-with-data-10-year-range')
const config = require('../../../config').aws
const ddParser = require('../lib/downDetectorParser.js')
const shared = require('./shared.js')
const { parse } = require('node-html-parser')

aws._uiMeta = shared.uiMeta

aws._isOngoing = (incident) => {
  const looksResolved = incident.summary.trim().startsWith('[RESOLVED]')
  const isRelevant = moment.utc().subtract(4, 'days').isBefore(moment.unix(incident.date))
  return isRelevant && !looksResolved
}

aws._isRecent = (incident) => moment.utc().subtract(2, 'days').isBefore(moment.unix(incident.date))

aws._splitIncidents = (incidents) => {
  let ongoing = []
  let recent = []
  if (incidents.archive) {
    recent = incidents.archive.filter(aws._isRecent)
  }
  if (incidents.current) {
    // Since AWS 'current' includes resolved incidents, manually move those that seem resolved
    incidents.current.forEach(incident => {
      if (!aws._isOngoing(incident)) recent.push(incident)
      else ongoing.push(incident)
    })
  }
  return [ongoing, recent]
}

aws._extractUpdates = (description) => {
  const dom = parse(description)
  const times = dom.childNodes.map(x => x.firstChild.text.trim())
  const messages = dom.childNodes.map((x, i) => x.text.replace(times[i], '').trim())
  return new Array(messages.length).fill(null).map((x, i) => ({ time: times[i], text: messages[i] }))
}

aws._transformIncident = (incident) => {
  if (!incident) return null
  return {
    startTime: moment.unix(incident.date).toISOString(),
    creationTime: null,
    resolutionTime: null,
    service: {
      key: incident.service,
      name: incident.service_name
    },
    affectedRegions: config.knownRegions.filter(region => incident.service.includes(region)),
    shortSummary: incident.summary,
    updates: aws._extractUpdates(incident.description),
    directUri: null
  }
}

aws.v1 = (raw, ddData) => {
  const [ongoing, recent] = aws._splitIncidents(raw)

  return {
    uiMeta: aws._uiMeta(config),
    ongoingIncidents: ongoing && ongoing.map(aws._transformIncident) || null,
    recentIncidents: recent && recent.map(aws._transformIncident) || null,
    downDetectorData: ddParser.jsonOverview(ddData)
  }
}