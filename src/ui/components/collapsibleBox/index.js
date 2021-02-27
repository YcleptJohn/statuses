import { h } from 'preact'
import style from './style.scss'
import ModularCssHelper from '../../lib/ModularCssHelper.js'
import { useState, useEffect } from 'preact/hooks'
import { FontAwesomeIcon } from '@aduh95/preact-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp'
const c = new ModularCssHelper(style)

const CollapsibleBox = ({ id, header, footerItems, children }) => {
  const [isCollapsed, setCollapsed] = useState(false)

  const toggleCollapse = () => setCollapsed((prev) => {
    const element = document.querySelector(`#collapsible-section-${id}`)
    if (element.style.maxHeight) element.style.maxHeight = null
    else element.style.maxHeight = `${element.scrollHeight}px`
    return !prev
  })

  return (
    <div class={c.ss('card collapsible-box')}>
      <header class={c.ss(`card-header ${header && header.wrapperClasses || ''}`)} onClick={toggleCollapse}>
        <p class={c.ss(`card-header-title ${header && header.textClasses || ''}`)}>
          {header && header.text || 'Header'}
        </p>
        <div class={c.ss(`card-header-icon ${isCollapsed && 'has-text-grey-light'}`)}>
          <a>
            <span class={c.ss('icon')}>
              <FontAwesomeIcon icon={faChevronUp} className={c.ss(`flippable-icon ${!isCollapsed && 'is-flipped'}`)} />
            </span>
          </a>
        </div>
      </header>
      <div id={`collapsible-section-${id}`} class={c.ss(`collapsible-section`)}>
        <div class={c.ss('card-content')}>
          {children}
        </div>
        <footer class={c.ss('card-footer')}>
          {footerItems && footerItems.map(item => {
            if (item.text && item.link) return <a href={item.link} class={c.ss('card-footer-item')}>{item.text}</a>
            if (item.text && item.func) return <a class={c.ss('card-footer-item')} onClick={item.func}>{item.text}</a>
          })}
        </footer>
      </div>
    </div>
  )
}

export default CollapsibleBox