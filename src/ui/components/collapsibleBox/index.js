import { h } from 'preact'
import style from './style.scss'
import ModularCssHelper from '../../lib/ModularCssHelper.js'
import { useState } from 'preact/hooks'
import { FontAwesomeIcon } from '@aduh95/preact-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
const c = new ModularCssHelper(style)

const CollapsibleBox = ({ id }) => {
  const [isCollapsed, setCollapsed] = useState(false)

  const toggleCollapse = () => setCollapsed((prev) => {
    const element = document.querySelector(`#collapsible-section-${id}`)
    if (element.style.maxHeight) element.style.maxHeight = null
    else element.style.maxHeight = `${element.scrollHeight}px`
    return !prev
  })

  return (
    <div class={c.ss('card collapsible-box')}>
      <header class={c.ss('card-header')} onClick={toggleCollapse}>
        <p class={c.ss('card-header-title')}>
          Header
        </p>
        <div class={c.ss(`card-header-icon ${isCollapsed && 'has-text-grey-light'}`)}>
          <a>
            <span class={c.ss('icon')}>
              <FontAwesomeIcon icon={faChevronUp} className={c.ss(`flippable-icon ${isCollapsed && 'is-flipped'}`)} />
            </span>
          </a>
        </div>
      </header>
      <div id={`collapsible-section-${id}`} class={c.ss(`collapsible-section ${!isCollapsed && 'show'}`)}>
        <div class={c.ss('card-content')}>
          I will collapse soon
          I will collapse soon
          I will collapse soon
          I will collapse soon
          I will collapse soon
          I will collapse soon
          I will collapse soon
          I will collapse soon
          I will collapse soon
          I will collapse soon
          I will collapse soon
          I will collapse soon
          I will collapse soon
          I will collapse soon
          I will collapse soon
          I will collapse soon
          I will collapse soon
          I will collapse soon
          I will collapse soon
          I will collapse soon
          I will collapse soon
        </div>
        <footer class={c.ss('card-footer')}>Footer</footer>
      </div>
    </div>
  )
}

export default CollapsibleBox