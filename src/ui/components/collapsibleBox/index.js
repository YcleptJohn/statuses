import { h } from 'preact'
import style from './style.scss'
import ModularCssHelper from '../../lib/ModularCssHelper.js'
const c = new ModularCssHelper(style)

const CollapsibleBox = () => (
  <div>
    I will collapse soon
  </div>
)

export default CollapsibleBox