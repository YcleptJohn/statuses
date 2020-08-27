import { h } from 'preact';
import style from './style.scss';
import ModularCssHelper from '../../lib/ModularCssHelper.js';

const c = new ModularCssHelper(style)

const Header = () => (
	<nav class={c.ss('navbar level')} role="navigation" aria-label="main navigation">
		<p class={c.ss('level-item has-text-centered no-select is-size-4 has-text-weight-bold')}>
			<span>TECH</span>
			<span class={c.ss('icon is-medium has-text-danger')}>
				<i class="fas fa-heartbeat fa" />
				{/* <i class="fas fa-heart-broken fa" /> -- Logic to SWAP when a status is bad or USE STACK ABOVE? */}
			</span>
			<span>STATUS</span>
		</p>
	</nav>
);

export default Header;
