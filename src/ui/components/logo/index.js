import { h } from 'preact'
import style from './style.scss'
import ModularCssHelper from '../../lib/ModularCssHelper.js'
import { FontAwesomeIcon } from '@aduh95/preact-fontawesome'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'

const c = new ModularCssHelper(style)

const Logo = ({ small, inline }) => (
  <div class={c.ss(`logo-font logo-wrapper is-unselectable ${inline ? 'is-inline-flex' : ''}`)}>
    <span class={c.ss(`icon ${small ? 'is-small mr-1' : 'is-medium'} has-text-grey-dark`)}>
      <FontAwesomeIcon icon={faLayerGroup} />
    </span>
    <span>statuses</span>
    <span>.</span>
    <span class={c.ss('has-text-primary')}>tech</span>
  </div>
)

export default Logo