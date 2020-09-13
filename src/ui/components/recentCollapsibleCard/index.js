import { h } from 'preact'
import style from './style.scss'
import ModularCssHelper from '../../lib/ModularCssHelper.js'
import statuses from '../../lib/statusConstants.js'
import CollapsibleBox from '../collapsibleBox'
import DetailedIncident from '../detailedIncident'

const c = new ModularCssHelper(style)

const RecentCollapsibleCard = ({ serviceKey, fetchStatus, data }) => {
  if (fetchStatus !== statuses.COMPLETED_SUCCESSFULLY) return null

  return (
    <CollapsibleBox 
      id={`${serviceKey}-recent-collapsible`}
      header={{ text: 'Recent Incidents' }}
    >
      {data && data.recentIncidents && data.recentIncidents.length > 0
      ? (
        <>
          {data.recentIncidents.map((x, i) => <DetailedIncident incident={x} type='ongoing' index={i} isLastChild={i === data.recentIncidents.length-1} />)}
        </>
      ) : (
        <div class={c.ss('pt-5 pb-5 pl-5 pr-5 has-text-centered')}>
          <h5 class={c.ss('title is-5 has-text-success has-text-weight-bold')}>No issues</h5>
          <h6 class={c.ss('subtitle is-6')}>There have been no incidents declared in the last 48 hours</h6>
        </div>
      )}
    </CollapsibleBox>
  )
}

export default RecentCollapsibleCard