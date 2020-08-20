const shared = module.exports = {}

shared._uiMeta = (affectedRegions, config) => {
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

shared._splitIncidents = (incidents, ongoingClassifierFunc, recentClassifierFunc) => {
  if (!incidents || !Array.isArray(incidents)) return [null, null]
  let ongoing = []
  let recent = []
  for (let i = 0; i < incidents.length; i++) {
    if (ongoingClassifierFunc(incidents[i])) {
      ongoing.push(incidents[i])
      break
    }
    if (recentClassifierFunc(incidents[i])) {
      recent.push(incidents[i])
      break
    }
  }
  return [ongoing, recent]
}