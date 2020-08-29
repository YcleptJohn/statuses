import { h, Component } from 'preact';
import style from './style.scss';
import ModularCssHelper from '../../lib/ModularCssHelper.js';
import Services from '../../lib/Services.js'
import statuses from '../../lib/statusConstants.js'

const c = new ModularCssHelper(style)

export default class Service extends Component {
  constructor(props) {
    super()
    const { key } = props.matches
    const serviceInfo = (new Services()).getByKey(key)
    this.state = {
      key,
      ...serviceInfo,
      fetchStatus: statuses.PENDING,
      data: null
    }
  }

  async componentDidMount() {
    this.changeStatus(statuses.IN_PROGRESS)
    fetch(`http://localhost:9999/api/fetch/${this.state.key}`)
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

  render(props) {
    const { key } = props.matches
    return <p>You want to view {key}</p>
  }
}
