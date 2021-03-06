const shared = module.exports = {}

shared.uiMeta = (config) => {
  const relevantKeys = [
    'providerKey',
    'providerName',
    'providerLogo',
    'labels',
    'statusPageUrl',
    'historicalStatusPageUrl',
    'downDetectorIdentifier'
  ]
  return {
    ...Object.fromEntries(Object.entries(config).filter(c => relevantKeys.includes(c[0])))
  }
}

/*
  Now only used by gcloud as AWS ended up being finnicky. Will keep for now but consider
  moving back to unique functions if future transformers can't make use of it also.
*/
shared._splitIncidents = (incidents, ongoingClassifierFunc, recentClassifierFunc, sortFunc) => {
  if (!incidents || !Array.isArray(incidents)) return [null, null]
  let ongoing = []
  let recent = []
  for (let i = 0; i < incidents.length; i++) {
    if (ongoingClassifierFunc(incidents[i])) {
      ongoing.push(incidents[i])
      continue
    }
    if (recentClassifierFunc(incidents[i])) {
      recent.push(incidents[i])
      continue
    }
  }
  if (sortFunc) {
    recent.sort(sortFunc)
    ongoing.sort(sortFunc)
  }
  return [ongoing, recent]
}