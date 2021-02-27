const ddParser = module.exports = {}
const { parse } = require('node-html-parser')

ddParser.jsonOverview = (ddHtml) => {
  if (!ddHtml) return null
  const fakeDom = parse(ddHtml, { script: true })
  const reportVolume = ddParser._getReportVolume(fakeDom.querySelector('.entry-title').innerHTML)
  const chartData = ddParser._extractChartData(fakeDom.querySelector('#chart-row').innerHTML)
  return {
    reportVolume,
    chartData
  }
}

ddParser._getReportVolume = (text) => {
  if (text.toLowerCase().includes('no current problems at')) return 'low'
  if (text.toLowerCase().includes('possible problems at')) return 'medium'
  if (text.toLowerCase().includes('problems at')) return 'high'
}

// Parse the <script> tags to extract the chart x,y report data - we can render our own graph in future
ddParser._extractChartData = (chartHtml) => {
  const chartDataRegex = /series:\s\[([\n\s{}a-zA-Z0-9'-:.+,]*)\]/
  const matches = chartDataRegex.exec(chartHtml)
  let chartData
  if (matches && matches[1]) {
    chartData = matches[1].split(',\n')
      .map(x => { return x.replace(/\s/g, '') })
      .filter(x => x)
      .map(x => {
        x = x.replace('x', '"x"')
        x = x.replace('y', '"y"')
        x = x.replace(/'/g, '"')
        return JSON.parse(x)
      })
  }
  return chartData
}
