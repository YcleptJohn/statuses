import { h } from 'preact';
import style from './style.scss';
import ModularCssHelper from '../../lib/ModularCssHelper.js';
import IncidentsSummary from '../incidentsSummary';
import statuses from '../../lib/statusConstants.js';

const c = new ModularCssHelper(style)

const Card = ({ meta, status, data }) => {
  let headerColour = 'has-background-grey-light'
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
            {status === statuses.IN_PROGRESS && <i class={c.ss('fas fa-circle-notch fa-spin fa-fw has-text-primary ml-2')} />}
          </p>
        </header>
        <div class={c.ss('card-content')}>
          <div class='has-text-centered'>
            <img src={`/assets/${meta.providerLogo}`} width='256' height='256' class={c.ss('scaled-logo')} />
          </div>
          <div class={c.ss('content')}>
            {status === statuses.IN_PROGRESS && <progress class={c.ss('progress is-small is-primary')} max='100' />}
            <IncidentsSummary data={data && data.ongoingIncidents} type='ongoing' />
            <IncidentsSummary data={data && data.recentIncidents} type='recent' />
          </div>
        </div>
        <footer class={c.ss('card-footer')}>
          <a href='#' class={c.ss('card-footer-item')}>See More</a>
        </footer>
      </div>
    </div>
  )
}

export default Card;
