import { h } from 'preact';
import style from './style.scss';
import ModularCssHelper from '../../lib/ModularCssHelper.js';
import DetailedPanelBody from '../detailedPanelBody';
import statuses from '../../lib/statusConstants.js';

const c = new ModularCssHelper(style)

const DetailedPanel = (props) => {
  const { serviceKey, service, fetchStatus, data } = props
  let headerColour = 'has-background-grey-light'
  if (fetchStatus === statuses.COMPLETED_SUCCESSFULLY) {
    headerColour = 'has-background-success'
    if (data.ongoingIncidents.length >= 1) headerColour = 'has-background-danger'
  }
  return (
    <div class={c.ss('card')}>
        <header class={c.ss(`card-header ${headerColour}`)}>
          <p class={c.ss('card-header-title is-centered')}>
            {service.meta.providerName}
            {fetchStatus === statuses.IN_PROGRESS && <i class={c.ss('fas fa-circle-notch fa-spin fa-fw has-text-primary ml-2')} />}
          </p>
        </header>
        <div class={c.ss('card-content')}>
          <DetailedPanelBody {...props} />
        </div>
        <footer class={c.ss('card-footer')}>
          FOOTER
        </footer>
      </div>
  )
}

export default DetailedPanel;
