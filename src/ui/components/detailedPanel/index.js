import { h } from 'preact';
import style from './style.scss';
import ModularCssHelper from '../../lib/ModularCssHelper.js';
import DetailedPanelBody from '../detailedPanelBody';
import statuses from '../../lib/statusConstants.js';
import { FontAwesomeIcon } from '@aduh95/preact-fontawesome'
import { faArrowLeft, faCircleNotch } from '@fortawesome/free-solid-svg-icons'

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
          <a href='/' class={c.ss('has-text-grey-dark')}>
            <span class={c.ss('icon is-large')}>
              <FontAwesomeIcon icon={faArrowLeft} size='lg' />
            </span>
          </a>

          <p class={c.ss('card-header-title is-centered')}>
            {service.meta.providerName}
            {fetchStatus === statuses.IN_PROGRESS && <FontAwesomeIcon spin fixedWidth icon={faCircleNotch} className={c.ss('has-text-primary ml-2')} />}
          </p>
          <span class={c.ss('icon is-large')} />
        </header>
        <div class={c.ss('card-content')}>
          <DetailedPanelBody {...props} />
        </div>
        <footer class={c.ss('card-footer')}>
          <a href='#' class={c.ss('card-footer-item is-hidden-desktop')}>Back to top</a>
        </footer>
      </div>
  )
}

export default DetailedPanel;
