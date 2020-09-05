import { h } from 'preact';
import style from './style.scss';
import ModularCssHelper from '../../lib/ModularCssHelper.js';
import { FontAwesomeIcon } from '@aduh95/preact-fontawesome'
import { faCheckCircle, faExclamationCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

const c = new ModularCssHelper(style)

const incidentsSummary = ({ data, type }) => {
  if (!data) return null
  if (data.length === 0) return (
    <p class='has-text-centered'>
      <FontAwesomeIcon icon={faCheckCircle} className={c.ss('has-text-success mr-1')} />
      No {type} issues
    </p>
  )

  const issuePlural = data.length > 1 ? 'issues' : 'issue'
  const faIcon = type === 'ongoing' ? faExclamationCircle : faExclamationTriangle
  const faColour = type === 'ongoing' ? 'has-text-danger' : 'has-text-warning'
  return (
    <p class='has-text-centered has-text-weight-bold'>
      <FontAwesomeIcon icon={faIcon} className={c.ss(`${faColour} mr-1`)} />
      {data.length} {type} {issuePlural}
    </p>
  )
};

export default incidentsSummary;
