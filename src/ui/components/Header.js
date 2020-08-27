import { h } from 'preact';

const Header = () => (
	<nav class="navbar level" role="navigation" aria-label="main navigation">
		<p class="level-item has-text-centered no-select is-size-4 has-text-weight-bold">
			<span>TECH</span>
			<span class="icon is-medium has-text-danger">
				<i class="fas fa-heartbeat fa" />
				{/* <i class="fas fa-heart-broken fa" /> -- Logic to SWAP when a status is bad or USE STACK ABOVE? */}
			</span>
			<span>STATUS</span>
		</p>
	</nav>
);

export default Header;
