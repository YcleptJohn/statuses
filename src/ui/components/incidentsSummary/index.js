import { h } from 'preact';
import style from './style.scss';
import ModularCssHelper from '../../lib/ModularCssHelper.js';

const c = new ModularCssHelper(style)

const incidentsSummary = ({ data, type }) => {
  if (!data) return null
  if (data.length === 0) return (
    <p class='has-text-centered'>
      <i class='fas fa-check-circle has-text-success mr-1' />
      No {type} issues
    </p>
  )

  const issuePlural = data.length > 1 ? 'issues' : 'issue'
  const faIcon = type === 'ongoing' ? 'fa-exclamation-circle' : 'fa-exclamation-triangle'
  const faColour = type === 'ongoing' ? 'has-text-danger' : 'has-text-warning'
  return (
    <p class='has-text-centered has-text-weight-bold'>
      <i class={`fas ${faIcon} ${faColour} mr-1`} />
      {data.length} {type} {issuePlural}
    </p>
  )
};

export default incidentsSummary;
