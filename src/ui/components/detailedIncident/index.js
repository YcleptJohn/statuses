import { h } from 'preact';
import style from './style.scss';
import ModularCssHelper from '../../lib/ModularCssHelper.js';
import Time from '../time.js';
import { metaFields } from '../../lib/IncidentMetaFields.js';
import { FontAwesomeIcon } from '@aduh95/preact-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink'

const c = new ModularCssHelper(style)

const DetailedIncident = ({ incident, type, index, isLastChild }) => {
  const latestUpdate = incident.updates.shift(1)
  return (
    <>
      <h6 class={c.ss('title is-6 has-text-primary')}>{incident.shortSummary}</h6>
      <div>
        {metaFields.map(field => {
          if (!field.exists(incident)) return null
          const value = field.extract(incident)
          return (
            <p class={c.ss('is-flex')}>
              {field.uiIcon && <span class={c.ss('icon has-text-primary-dark')}>
                <FontAwesomeIcon icon={field.uiIcon} />
              </span>}
              <span class={c.ss('has-text-weight-bold')}>{field.uiText}</span>
              &nbsp;-&nbsp;
              <div>
                <span>
                  {value.value || value}
                </span>
                {value.subValue && (
                  <>
                    <span class={c.ss('has-text-primary has-text-weight-bold')}>&nbsp;/&nbsp;</span>
                    <span class={c.ss('is-italic has-text-grey')}>{value.subValue}</span>
                  </>
                )}
              </div>
            </p>
          )
        })}
        {incident.directUri && <a href={incident.directUri} target='_blank' rel='noreferrer'>
          <span class={c.ss('icon has-text-primary-dark')}>
            <FontAwesomeIcon icon={faLink} />
          </span>
          <span class={c.ss('has-text-weight-bold has-text-grey-dark')}>Incident Page</span>
        </a>}
        {latestUpdate && <>
          <p class={c.ss('has-text-centered is-italic has-text-grey has-text-weight-bold mt-3')}>Latest Update</p>
          <div class={c.ss('update')}>
            <div class={c.ss('has-text-centered mb-2')}>
              <Time timeString={latestUpdate.time} preferMultiline={false} />
            </div>
            <div>{latestUpdate.text}</div>
          </div>
        </>}
      </div>
      {!isLastChild && <hr class={c.ss('has-background-primary-dark')} />}
    </>
  )
}

export default DetailedIncident;
