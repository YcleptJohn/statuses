import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Footer from './footer';

// Code-splitting is automated for routes
import Home from '../routes/home';
import Service from '../routes/service';

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id='app'>
				<Header />
				<div id='main-content'>
					<Router onChange={this.handleRoute}>
						<Home path="/" />
						<Service path="/service/:key" />
					</Router>
				</div>
				<Footer />
			</div>
		);
	}
}
