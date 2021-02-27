import { h } from 'preact';
import style from './style.scss';
import ModularCssHelper from '../../lib/ModularCssHelper.js';
import { useState } from 'preact/hooks';
import { FontAwesomeIcon } from '@aduh95/preact-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus'

const c = new ModularCssHelper(style)

const CollapsibleSection = ({ id, title, subTitle, isCompact, children }) => {
  const [isCollapsed, setCollapsed] = useState(false)

  const toggleCollapse = () => setCollapsed((prev) => {
    const element = document.querySelector(`#collapsible-content-${id}`)
    const old = element.style.maxHeight
    const updated = element.scrollHeight
    const diff = updated - old
    if (element.style.maxHeight) element.style.maxHeight = null
    else element.style.maxHeight = `${element.scrollHeight}px`
    const collapsibleParent = element.parentElement.closest('[id^="collapsible-content"]')
    if (collapsibleParent) collapsibleParent.style.maxHeight = `${parseInt(collapsibleParent.style.maxHeight, 10) + diff}px`
    return !prev
  })

  if (isCompact) {
    return (
      <>
        <div class={c.ss('compact-collapsible-header is-unselectable')} onClick={toggleCollapse}>
          <h6 class={c.ss('title is-6 has-text-primary')}>
            <span class={c.ss('compact-collapsible-header-icon')}>
              <span class={c.ss('icon')}>
                {!isCollapsed
                ? <FontAwesomeIcon icon={faChevronRight} />
                : <FontAwesomeIcon icon={faChevronDown} />}
              </span>
            </span>
            {title}
          </h6>
        </div>
        <div id={`collapsible-content-${id}`} class={c.ss('collapsible-content')}>
          {children}
        </div>
      </>
    )
  }

  return (
    <>
      <div class={c.ss(`collapsible-header mt-3 is-unselectable ${isCollapsed ? 'active' : ''}`)} onClick={toggleCollapse}>
        <h5 class={c.ss('title is-5 is-capitalized has-text-centered')}>
          {title}
          <span class={c.ss('collapsible-header-icon')}>
            <span class={c.ss('icon has-text-primary-dark')}>
              {!isCollapsed
              ? <FontAwesomeIcon icon={faPlus} />
              : <FontAwesomeIcon icon={faMinus} />}
            </span>
          </span>
        </h5>
        {subTitle && <h6 class={c.ss('subtitle is-6 has-text-centered mr-5')}>{subTitle}</h6>}
      </div>
      <div id={`collapsible-content-${id}`} class={c.ss(`collapsible-content`)}>
        {children}
      </div>
    </>
  )
}

export default CollapsibleSection;
