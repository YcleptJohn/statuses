import { h } from 'preact'
import style from './style.scss'
import ModularCssHelper from '../../lib/ModularCssHelper.js'
import statuses from '../../lib/statusConstants.js'
import { FontAwesomeIcon } from '@aduh95/preact-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import IncidentsSummary from '../incidentsSummary'
import DownDetectorSummary from '../downDetectorSummary'

const c = new ModularCssHelper(style)

const ServiceHeaderCard = ({ serviceKey, fetchStatus, service, data }) => {

  let headerColour = 'bg-loading-gradient'
  if (fetchStatus === statuses.COMPLETED_SUCCESSFULLY) {
    headerColour = 'has-background-success'
    if (data.ongoingIncidents.length >= 1) headerColour = 'has-background-danger'
  }

  return (
    <div class={c.ss('card mb-5')}>
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
      <div class={c.ss('card-content columns')}>
        <div class={c.ss('column service-logo has-text-centered')}>
          <img src={`/assets/${service.meta.providerLogo}`} width='256' height='256' class={c.ss('scaled-logo')} />
          <p>
            <a href={service.meta.statusPageUrl} target='_blank' rel='noreferrer'>status</a>
            <span class={c.ss('mx-1')}>|</span>
            <a href={service.meta.historicalStatusPageUrl} target='_blank' rel='noreferrer'>historical</a>
          </p>
        </div>
        <div class={c.ss('column vertical-center')}>
          {fetchStatus === statuses.IN_PROGRESS
          ? (
            <div class={c.ss('vertical-loading')}>
              <div class={c.ss('loading-text m-2')}>
                <img src={`/assets/logo-loading.gif`} class={c.ss('loading-logo')} alt={`${service.meta.providerKey}-status-loading`} />
                <h5 class={c.ss('is-size-5 has-text-grey-dark is-italic ml-2')}>Checking status...</h5>
              </div>
            </div>
          ) : (
            <>
              <IncidentsSummary data={data && data.ongoingIncidents} type='ongoing' />
              <IncidentsSummary data={data && data.recentIncidents} type='recent' />
              <DownDetectorSummary data={data && data.downDetectorData} url={`https://downdetector.co.uk/status/${service.meta.downDetectorIdentifier}/`} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ServiceHeaderCard