import { h } from 'preact';
import style from './style.scss';
import ModularCssHelper from '../../lib/ModularCssHelper.js';
import IncidentMetaFields from '../../lib/IncidentMeteFields.js';

const c = new ModularCssHelper(style)

const DetailedIncident = ({ incident, type, index, isLastChild }) => {
  return (
    <>
      <h6 class={c.ss('title is-6 has-text-primary')}>{incident.shortSummary}</h6>
      <div class={c.ss('')}>
        {IncidentMetaFields.map(field => {
          if (!field.exists(incident)) return null
          const value = field.extract(incident)
          return (
            <p>
              {field.uiIcon && <span class={c.ss('icon has-text-primary-dark')}>
                <i class={`fas ${field.uiIcon}`} />
              </span>}
              {field.uiText}
              &nbsp;-&nbsp;{JSON.stringify(value)}
            </p>
          )
        })}
      </div>
      {!isLastChild && <hr class={c.ss('has-background-primary-dark')} />}
    </>
  )
}

export default DetailedIncident;
