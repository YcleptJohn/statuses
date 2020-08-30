import { h } from 'preact';
import style from './style.scss';
import ModularCssHelper from '../../lib/ModularCssHelper.js';
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
        CONTENT
      </div>
    </div>
  )
}

export default DetailedPanelBody;
