const gcloud = module.exports = {}
const moment = require('moment-timezone/builds/moment-timezone-with-data-10-year-range')
const config = require('../../../config').gcloud
const ddParser = require('../lib/downDetectorParser.js')
const shared = require('./shared.js')

gcloud._uiMeta = shared.uiMeta

gcloud._isOngoing = (incident) => incident.begin && (!incident.end || incident.end === null)
gcloud._isRecent = (incident) => moment.utc().subtract(2, 'days').isBefore(moment.tz(incident.end, 'America/Los_Angeles'))

gcloud._splitIncidents = (incidents) => shared._splitIncidents(incidents, gcloud._isOngoing, gcloud._isRecent)

gcloud._transformIncident = (incident) => {
  if (!incident) return null
  return {
    startTime: moment.tz(incident.begin, 'America/Los_Angeles').toISOString(),
    creationTime: moment.tz(incident.created, 'America/Los_Angeles').toISOString(),
    resolutionTime: gcloud._isOngoing(incident) ? null : moment.tz(incident.end, 'America/Los_Angeles').toISOString(),
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
    uiMeta: gcloud._uiMeta(config),
    ongoingIncidents: ongoing && ongoing.map(gcloud._transformIncident) || null,
    recentIncidents: recent && recent.map(gcloud._transformIncident) || null,
    downDetectorData: ddParser.jsonOverview(ddData)
  }
}