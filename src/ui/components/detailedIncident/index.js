import { h } from 'preact';
import style from './style.scss';
import ModularCssHelper from '../../lib/ModularCssHelper.js';
import CollapsibleSection from '../collapsibleSection';

const c = new ModularCssHelper(style)

const DetailedIncident = ({ incident, type, index, collapsible }) => {
  if (collapsible) {
    return (
      <CollapsibleSection id={`detailed-${type}-${index}`} title={'TITLE'} isCompact={true}>
        CONTENT
      </CollapsibleSection>
    )
  }
  return (
    <p>THERE IS A FOKIN PROBLEM</p>
  )
}

export default DetailedIncident;
