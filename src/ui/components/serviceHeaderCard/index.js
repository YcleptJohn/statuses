import { h } from 'preact'
import style from './style.scss'
import ModularCssHelper from '../../lib/ModularCssHelper.js'
import statuses from '../../lib/statusConstants.js'
import { FontAwesomeIcon } from '@aduh95/preact-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const c = new ModularCssHelper(style)

const ServiceHeaderCard = ({ serviceKey, fetchStatus, service, data }) => {

  let headerColour = 'bg-loading-gradient'
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
        </p>
        <span class={c.ss('icon is-large')} />
      </header>
    </div>
  )
}

export default ServiceHeaderCard