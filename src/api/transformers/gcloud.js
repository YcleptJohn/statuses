const gcloud = module.exports = {}
const moment = require('moment')
const config = require('../../../config').gcloud
const ddParser = require('../../lib/downDetectorParser.js')
const shared = require('./shared.js')

gcloud._uiMeta = (affectedRegions) => shared._uiMeta(affectedRegions, config)

gcloud._isOngoing = (incident) => incident.begin && (!incident.end || incident.end === null)
gcloud._isRecent = (incident) => moment().subtract(2, 'days').isBefore(moment(incident.end))

gcloud._splitIncidents = (incidents) => shared._splitIncidents(incidents, gcloud._isOngoing, gcloud._isRecent)

gcloud._transformIncident = (incident) => {
  if (!incident) return null
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
    ongoingIncidents: ongoing && ongoing.map(gcloud._transformIncident) || null,
    recentIncidents: recent && recent.map(gcloud._transformIncident) || null,
    downDetectorData: ddParser.jsonOverview(ddData)
  }
}