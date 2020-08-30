import { h, Component } from 'preact';
import style from './style.scss';
import ModularCssHelper from '../../lib/ModularCssHelper.js';
import { useState } from 'preact/hooks';
import statuses from '../../lib/statusConstants.js';

const c = new ModularCssHelper(style)
const CollapsibleIncidents = ({ type, data, id }) => {
  const [isCollapsed, setCollapsed] = useState(false)
  const toggleCollapse = () => setCollapsed((prev) => {
    const element = document.querySelector(`#collapsible-content-${type}`)
    if (element.style.maxHeight) element.style.maxHeight = null
    else element.style.maxHeight = `${element.scrollHeight}px`
    return !prev
  })

  return (
    <>
      <div class={c.ss(`collapsible-header ${isCollapsed ? 'active' : ''}`)} onClick={toggleCollapse}>
        <h5 class={c.ss('title is-5 is-capitalized has-text-centered')}>
          {type}
          <span class={c.ss('is-pulled-right')}>
            <span class={c.ss('icon has-text-primary')}>
              {!isCollapsed
              ? <i class='fas fa-plus' />
              : <i class='fas fa-minus' />}
            </span>
          </span>
        </h5>
        {type === 'recent' && <h6 class={c.ss('subtitle is-6 has-text-centered mr-5')}>within 48 hours</h6>}
      </div>
      <div id={`collapsible-content-${type}`} class={c.ss(`collapsible-content`)}>
        Content
      </div>
    </>
  )
}

export default CollapsibleIncidents;
