import { h } from 'preact';
import style from './style.scss';
import ModularCssHelper from '../../lib/ModularCssHelper.js';
import IncidentsSummary from '../incidentsSummary';
import DownDetectorSummary from '../downDetectorSummary';
import statuses from '../../lib/statusConstants.js';

const c = new ModularCssHelper(style)

const Card = ({ meta, status, data }) => {
  let headerColour = 'bg-loading-gradient'
  if (status === statuses.COMPLETED_SUCCESSFULLY) {
    headerColour = 'has-background-success'
    if (data.ongoingIncidents.length >= 1) headerColour = 'has-background-danger'
  }
  return (
    <div class={c.ss('column is-one-third')}>
      <div class={c.ss('card')}>
        <header class={c.ss(`card-header ${headerColour}`)}>
          <p class={c.ss('card-header-title is-centered')}>
            {meta.providerName}
          </p>
        </header>
        <div class={c.ss('card-content')}>
          <div class='has-text-centered'>
            <img
              src={`/assets/${meta.providerLogo}`}
              width='256'
              height='256'
              class={c.ss('scaled-logo')}
              alt={`${meta.providerKey}-logo`}
            />
          </div>
          <div class={c.ss(`content ${status === statuses.IN_PROGRESS ? 'content-loading' : ''}`)}>
            {status === statuses.IN_PROGRESS
            ? (
              <>
                <progress class={c.ss('progress is-small is-primary')} max='100' />
                <div class={c.ss('loading-text')}>
                  <img src={`/assets/logo-loading.gif`} class={c.ss('loading-logo')} alt={`${meta.providerKey}-status-loading`} />
                  <h5 class={c.ss('title is-size-5 has-text-grey-dark is-italic ml-2')}>Checking status...</h5>
                </div>
              </>
            ) : (
              <>
                <IncidentsSummary data={data && data.ongoingIncidents} type='ongoing' />
                <IncidentsSummary data={data && data.recentIncidents} type='recent' />
                <DownDetectorSummary data={data && data.downDetectorData} url={`https://downdetector.co.uk/status/${meta.downDetectorIdentifier}/`} />
              </>
            )}
          </div>
        </div>
        <footer class={c.ss('card-footer')}>
          {status === statuses.COMPLETED_SUCCESSFULLY && <a href={`/service/${meta.providerKey}`} class={c.ss('card-footer-item')}>See More</a>}
        </footer>
      </div>
    </div>
  )
}

export default Card;
