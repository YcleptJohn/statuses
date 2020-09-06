import { h } from 'preact'
import style from './style.scss'
import ModularCssHelper from '../../lib/ModularCssHelper.js'

import Logo from '../../components/logo'

const c = new ModularCssHelper(style)

const Header = () => (
	<nav class={c.ss('navbar')} role='navigation' aria-label='main navigation'>
		<div class={c.ss('container centered-row')}>
			<div class={c.ss('navbar-brand centered-row')}>
				<a class={c.ss('navbar-item is-size-4 consistent-colour')} href={'/'}>
					<Logo />
				</a>
			</div>
		</div>
	</nav>
);

export default Header;