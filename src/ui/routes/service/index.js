import { h, Component } from 'preact';
import style from './style.scss';
import ModularCssHelper from '../../lib/ModularCssHelper.js';
import Services from '../../lib/Services.js'
import statuses from '../../lib/statusConstants.js'
import DetailedPanel from '../../components/detailedPanel';
import CollapsibleBox from '../../components/collapsibleBox';
import { setPageTitle } from '../../lib/DynamicPageMeta.js';
import { route } from 'preact-router';

const c = new ModularCssHelper(style)
const apiUrl = process.env.NODE_ENV === 'production' ? 'https://statuses.tech' : 'http://localhost:9999'

export default class Service extends Component {
  constructor(props) {
    super()
    const { key } = props.matches
    const service = (new Services()).getByKey(key)
    this.state = {
      serviceKey: key,
      service,
      fetchStatus: statuses.PENDING,
      data: null
    }
    this.fetchAborter = new AbortController()
  }

  async componentDidMount() {
    const { service, serviceKey } = this.state
    if (!service.config || !service.meta) return route('/')
    setPageTitle(`statuses.tech: ${service.meta.providerName} | Simplifying status monitoring across DevOps platforms and tools`)
    this.changeStatus(statuses.IN_PROGRESS)
    fetch(`${apiUrl}/api/fetch/${serviceKey}`, { signal: this.fetchAborter.signal })
      .then(res => res.json())
      .then(data => {
        this.setData(data)
        this.changeStatus(statuses.COMPLETED_SUCCESSFULLY)
      })
      .catch(err => {
        if (err.name !== 'AbortError') this.changeStatus(statuses.COMPLETED_ERRONEOUSLY)
      })
  }

  componentWillUnmount() {
    this.fetchAborter.abort()
  }

  changeStatus(fetchStatus) {
    this.setState({ fetchStatus })
  }
  setData(data) { this.setState({ data }) }

  render() {
    return (
      <div class={c.ss('container mt-3')}>
        <DetailedPanel {...this.state} />
      </div>
    )
  }
}
