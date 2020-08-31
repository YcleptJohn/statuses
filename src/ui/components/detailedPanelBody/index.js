import { h } from 'preact';
import style from './style.scss';
import ModularCssHelper from '../../lib/ModularCssHelper.js';
import CollapsibleSection from '../collapsibleSection';
import DetailedIncident from '../detailedIncident';
import statuses from '../../lib/statusConstants.js';

const c = new ModularCssHelper(style)

const DetailedPanelBody = ({ serviceKey, service, fetchStatus, data }) => {
  if (fetchStatus === statuses.IN_PROGRESS) return (
    <div class={c.ss('has-text-primary has-text-centered')}>
      <i class={c.ss('fas fa-circle-notch fa-spin fa-5x')} />
      <p class={c.ss('is-size-4 is-italic my-2')}>Checking status...</p>
    </div>
  )

  return (
    <div class={c.ss('content columns')}>
      <div class={c.ss('column is-one-quarter has-text-centered')}>
        <img src={`/assets/${service.meta.providerLogo}`} width='256' height='256' class={c.ss('scaled-logo')} />
        <p>
          <a href={service.meta.statusPageUrl} target='_blank' rel='noreferrer'>status</a>
          <span class={c.ss('mx-1')}>|</span>
          <a href={service.meta.historicalStatusPageUrl} target='_blank' rel='noreferrer'>historical</a>
        </p>
      </div>
      <div class={c.ss('column is-three-quarters')}>
        <CollapsibleSection
          id={`${serviceKey}-ongoing`}
          title={'Ongoing Incidents'}
        >
          {data && data.ongoingIncidents && data.ongoingIncidents.length > 0
          ? 'Some element'
          : <div class={c.ss('pt-5 pb-5 pl-5 pr-5 has-text-centered')}>
            <h5 class={c.ss('title is-5 has-text-success has-text-weight-bold')}>No issues</h5>
            <h6 class={c.ss('subtitle is-6')}>There are no ongoing incidents</h6>
            <article class={c.ss('message is-info')}>
              <div class={c.ss('message-body')}>
                <strong>Please note:</strong> this metric is based entirely on the status reported by the platform itself. 
                There could still be an issue that hasn't been recognised or publicised yet!
              </div>
            </article>
          </div>
          }
        </CollapsibleSection>
        <CollapsibleSection
          id={`${serviceKey}-recent`}
          title={'Recent Incidents'}
          subTitle={'Within 48 hours'}
        >
          {data && data.recentIncidents && data.recentIncidents.length > 0
          ? 'Some element'
          : <div class={c.ss('pt-5 pb-5 pl-5 pr-5 has-text-centered')}>
            <h5 class={c.ss('title is-5 has-text-success has-text-weight-bold')}>No issues</h5>
            <h6 class={c.ss('subtitle is-6')}>There have been no incidents within the last 48 hours</h6>
          </div>
          }
        </CollapsibleSection>
      </div>
    </div>
  )
}

export default DetailedPanelBody;
