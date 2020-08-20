const gcloud = module.exports = {}
const moment = require('moment')
const config = require('../../../config').gcloud
const ddParser = require('../../lib/downDetectorParser.js')

gcloud._uiMeta = (affectedRegions) => {
  const relevantKeys = [
    'providerKey',
    'providerName',
    'providerLogo',
    'labels',
    'statusPageUrl',
    'historicalStatusPageUrl'
  ]
  return {
    ...Object.fromEntries(Object.entries(config).filter(c => relevantKeys.includes(c[0]))),
    affectedRegions: affectedRegions || []
  }
}

gcloud._isOngoing = (incident) => incident.begin && !incident.end || [null, undefined, '', 'TBC', 'TBA'].includes(incident.end)
gcloud._isRecent = (incident) => moment().subtract(25, 'days').isBefore(moment(incident.end))

gcloud._splitIncidents = (incidents) => {
  let ongoing = []
  let recent = []
  for (let i = 0; i < incidents.length; i++) {
    if (gcloud._isOngoing(incidents[i])) {
      ongoing.push(incidents[i])
      break
    }
    if (gcloud._isRecent(incidents[i])) {
      recent.push(incidents[i])
      break
    }
  }
  return [ongoing, recent]
}

gcloud._transformIncident = (incident) => {
  return {
    startTime: incident.begin,
    creationTime: incident.created,
    resolutionTime: gcloud._isOngoing(incident) ? null : incident.end,
    service: {
      key: incident.service_key,
      name: incident.service_name
    },
    affectedRegions: [], // Not easily provided, can parse in future?
    shortSummary: incident.external_desc,
    updates: incident.updates.map(x => { return { time: x.created, text: x.text } }),
    directUri: `${config.incidentDirectUriBase}${incident.uri}`
  }
}

gcloud.v1 = (raw, ddData) => {
  const [ongoing, recent] = gcloud._splitIncidents(raw)

  return {
    uiMeta: gcloud._uiMeta(),
    ongoingIncidents: ongoing.map(gcloud._transformIncident),
    recentIncidents: recent.map(gcloud._transformIncident),
    downDetectorData: ddParser.jsonOverview(ddData)
  }
}