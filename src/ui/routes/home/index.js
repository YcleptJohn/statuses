import { h, Component } from 'preact';
import style from './style.scss';
import Services from '../../lib/Services.js'
import Card from '../../components/card'
import ModularCssHelper from '../../lib/ModularCssHelper.js';
import { setPageTitle } from '../../lib/DynamicPageMeta.js';
import statuses from '../../lib/statusConstants.js'

const c = new ModularCssHelper(style)
const apiUrl = process.env.NODE_ENV === 'production' ? 'https://statuses-dot-tech.herokuapp.com' : 'http://localhost:9999'

class Home extends Component {
	constructor() {
		super()
		const services = (new Services()).getAll()
		this.state = {
			services,
			fetchStatuses: Object.fromEntries(services.names.map(sName => [sName, statuses.PENDING])),
			data: Object.fromEntries(services.names.map(sName => [sName, null]))
		}
	}

	async componentDidMount() {
		setPageTitle('statuses.tech: Simplifying status monitoring across DevOps platforms and tools')
		const { services } = this.state
		services.names.forEach(name => {
			this.changeStatus(name, statuses.IN_PROGRESS)
			// Need to make this cancellable in some way to stop this.setStates() if a delayed fetch
      // arrives after an unmount
			fetch(`${apiUrl}/api/fetch/${name}`)
				.then(res => res.json())
				.catch(() => this.changeStatus(name, statuses.COMPLETED_ERRONEOUSLY))
				.then(data => {
					this.setData(name, data)
					this.changeStatus(name, statuses.COMPLETED_SUCCESSFULLY)
				})
				.catch(() => this.changeStatus(name, statuses.COMPLETED_ERRONEOUSLY))
		})
	}

	changeStatus(name, newStatus) {
		this.setState(prevState => {
			let mutated = Object.assign({}, prevState)
			mutated.fetchStatuses[name] = newStatus
			return mutated
		})
	}

	setData(name, data) {
		this.setState(prevState => {
			let mutated = Object.assign({}, prevState)
			mutated.data[name] = data
			return mutated
		})
	}

	render() {
		const { services, fetchStatuses, data } = this.state
		return (
			<div class={c.ss('columns is-multiline container')}>
				{services && services.names.map(sName => {
					return (
						<Card
							key={sName}
							meta={services.metas.filter(x => x.providerKey === sName)[0]}
							status={fetchStatuses[sName]}
							data={data[sName]}
						/>
					)
				})}
			</div>
		)
	}
}

export default Home;
