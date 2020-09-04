import { h } from 'preact';
import style from './style.scss';
import ModularCssHelper from '../../lib/ModularCssHelper.js';

const c = new ModularCssHelper(style)

const Header = () => (
	<nav class={c.ss('navbar')} role='navigation' aria-label='main navigation'>
		<div class={c.ss('container centered-row')}>
			<div class={c.ss('navbar-brand centered-row')}>
				<a class={c.ss('navbar-item is-size-4 consistent-colour')} href={'/'}>
					<span class={c.ss('icon is-medium has-text-grey-dark')}>
						<i class={c.ss('fas fa-layer-group')} />
					</span>
					<span>statuses</span>
					<span>.</span>
					<span class={c.ss('has-text-info')}>tech</span>
				</a>
			</div>
		</div>
	</nav>
);

export default Header;