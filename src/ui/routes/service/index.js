import { h, Component } from 'preact';
import style from './style.scss';
import ModularCssHelper from '../../lib/ModularCssHelper.js';
import Services from '../../lib/Services.js'
import statuses from '../../lib/statusConstants.js'
import DetailedPanel from '../../components/detailedPanel';
import { route } from 'preact-router';

const c = new ModularCssHelper(style)
const apiUrl = process.env.NODE_ENV === 'production' ? 'https://statuses-dot-tech.herokuapp.com' : 'http://localhost:9999'

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
  }

  async componentDidMount() {
    console.log('API_URL', apiUrl)
    const { service } = this.state
    if (!service.config || !service.meta) return route('/')
    this.changeStatus(statuses.IN_PROGRESS)
    // Need to make this cancellable in some way to stop this.setStates() if a delayed fetch
    // arrives after an unmount
    fetch(`${apiUrl}/api/fetch/${this.state.serviceKey}`)
      .then(res => res.json())
      .catch(() => this.changeStatus(statuses.COMPLETED_ERRONEOUSLY))
      .then(data => {
        this.setData(data)
        this.changeStatus(statuses.COMPLETED_SUCCESSFULLY)
      })
      .catch(() => this.changeStatus(statuses.COMPLETED_ERRONEOUSLY))
  }

  changeStatus(fetchStatus) { this.setState({ fetchStatus }) }
  setData(data) { this.setState({ data }) }

  render() {
    return (
      <div class={c.ss('container')}>
        <DetailedPanel {...this.state} />
      </div>
    )
  }
}
