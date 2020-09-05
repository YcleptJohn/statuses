import { h } from 'preact'
import style from './style.scss'
import ModularCssHelper from '../../lib/ModularCssHelper.js'
import { FontAwesomeIcon } from '@aduh95/preact-fontawesome'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import Logo from '../../components/logo'

const c = new ModularCssHelper(style)

const Footer = () => (
  <footer class={c.ss('footer compact-footer')}>
    <div class={c.ss('level h-100')}>
      <p class={c.ss('level-item has-text-centered')}>
        Created by&nbsp;<span>John Taylor</span>
      </p>
      <div>
      <Logo small />

      </div>
    </div>
  </footer>
);

export default Footer;