import { h, Component } from 'preact';

class Home extends Component {
	state = {
		value: 0
	}

	render() {
		return (
			<div class='pt-5'>
				<button onClick={() => this.setState({ value: this.state.value + 1 })}>Increment</button>
				<button onClick={() => this.setState({ value: this.state.value - 1 })}>Decrement</button>
				<p>{this.state.value}</p>
			</div>
		)
	}
}

export default Home;
