export default [
  {
    key: 'startTime',
    uiText: 'Issue start',
    uiIcon: 'fa-hourglass-start',
    exists: (incident) => !!incident.startTime,
    extract: (incident) => incident.startTime
  },
  {
    key: 'creationTime',
    uiText: 'Incident start',
    uiIcon: 'fa-hourglass-half',
    exists: (incident) => !!incident.creationTime,
    extract: (incident) => incident.creationTime
  },
  {
    key: 'resolutionTime',
    uiText: 'Resolved',
    uiIcon: 'fa-hourglass-end',
    exists: (incident) => !!incident.resolutionTime,
    extract: (incident) => incident.resolutionTime
  },
  {
    key: 'service',
    uiText: 'Service',
    uiIcon: 'fa-server',
    exists: (incident) => incident.service && (incident.service.key || incident.service.name),
    extract: (incident) => {
      const service = incident.service
      if (service.key && service.name) return { value: service.name, subValue: service.key }
      if (service.name) return service.name
      return service.key
    }
  },
  {
    key: 'affectedRegions',
    uiText: 'Regions',
    uiIcon: 'fa-globe-americas',
    exists: (incident) => incident.affectedRegions && Array.isArray(incident.affectedRegions) && incident.affectedRegions.length > 0,
    extract: (incident) => incident.affectedRegions.join(', ')
  }
]