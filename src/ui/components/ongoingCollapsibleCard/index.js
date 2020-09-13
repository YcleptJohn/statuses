import { h } from 'preact'
import style from './style.scss'
import ModularCssHelper from '../../lib/ModularCssHelper.js'
import statuses from '../../lib/statusConstants.js'
import CollapsibleBox from '../collapsibleBox'
import DetailedIncident from '../detailedIncident'

const c = new ModularCssHelper(style)

const OngoingCollapsibleCard = ({ serviceKey, fetchStatus, data }) => {
  if (fetchStatus !== statuses.COMPLETED_SUCCESSFULLY) return null

  return (
    <CollapsibleBox 
      id={`${serviceKey}-ongoing-collapsible`}
      header={{ text: 'Ongoing Incidents' }}
    >
      {data && data.ongoingIncidents && data.ongoingIncidents.length > 0
      ? (
        <>
          {data.ongoingIncidents.map((x, i) => <DetailedIncident incident={x} type='ongoing' index={i} isLastChild={i === data.ongoingIncidents.length-1} />)}
        </>
      ) : (
        <div class={c.ss('pt-5 pb-5 pl-5 pr-5 has-text-centered')}>
          <h5 class={c.ss('title is-5 has-text-success has-text-weight-bold')}>No issues</h5>
          <h6 class={c.ss('subtitle is-6')}>There are no ongoing incidents</h6>
          <article class={c.ss('message is-info')}>
            <div class={c.ss('message-body')}>
              <strong>Please note:</strong> this metric is based entirely on the status reported by the platform itself. 
              There could still be an issue that hasn't been recognised or publicised yet.
            </div>
          </article>
        </div>
      )}
    </CollapsibleBox>
  )
}

export default OngoingCollapsibleCard