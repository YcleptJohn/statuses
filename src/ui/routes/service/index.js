import { h, Component } from 'preact';
import style from './style.scss';
import ModularCssHelper from '../../lib/ModularCssHelper.js';
import Services from '../../lib/Services.js'
import statuses from '../../lib/statusConstants.js'
import DetailedPanel from '../../components/detailedPanel';

const c = new ModularCssHelper(style)

export default class Service extends Component {
  constructor(props) {
    super()
    const { key } = props.matches
    const service = (new Services()).getByKey(key)
    // If service doesn't exist, re-route back to home
    this.state = {
      serviceKey: key,
      service,
      fetchStatus: statuses.PENDING,
      data: null
    }
  }

  async componentDidMount() {
    this.changeStatus(statuses.IN_PROGRESS)
    fetch(`http://localhost:9999/api/fetch/${this.state.serviceKey}`)
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
