import { h } from 'preact';
import style from './style.scss';
import ModularCssHelper from '../../lib/ModularCssHelper.js';
import CollapsibleSection from '../../components/collapsibleSection';
import DetailedIncident from '../../components/detailedIncident';
import statuses from '../../lib/statusConstants.js';
import { FontAwesomeIcon } from '@aduh95/preact-fontawesome'
import { faArrowLeft, faCircleNotch } from '@fortawesome/free-solid-svg-icons'

const c = new ModularCssHelper(style)

const DetailedPanel = (props) => {
  const { serviceKey, fetchStatus, service, data } = props

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
        <div class={c.ss('card-content')}>
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
              {fetchStatus === statuses.IN_PROGRESS
              ? (
              <div class={c.ss('vertical-loading')}>
                  <div class={c.ss('loading-text m-2')}>
                    <img src={`/assets/logo-loading.gif`} class={c.ss('loading-logo')} alt={`${service.meta.providerKey}-status-loading`} />
                    <h5 class={c.ss('title is-size-5 has-text-grey-dark is-italic ml-2')}>Checking status...</h5>
                  </div>
                </div>
              ) : (
                <>
                  <CollapsibleSection
                    id={`${serviceKey}-ongoing`}
                    title={'Ongoing Incidents'}
                  >
                    {data && data.ongoingIncidents && data.ongoingIncidents.length > 0
                    ? <div class={c.ss('pt-2 pb-2 pl-2 pr-2')}>
                      {data.ongoingIncidents.map((x, i) => <DetailedIncident incident={x} type='ongoing' index={i} isLastChild={i === data.ongoingIncidents.length-1} />)}
                    </div>
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
                    ? <div class={c.ss('pt-2 pb-2 pl-2 pr-2')}>
                      {data.recentIncidents.map((x, i) => <DetailedIncident incident={x} type='recent' index={i} isLastChild={i === data.recentIncidents.length-1} />)}
                    </div>
                    : <div class={c.ss('pt-5 pb-5 pl-5 pr-5 has-text-centered')}>
                      <h5 class={c.ss('title is-5 has-text-success has-text-weight-bold')}>No issues</h5>
                      <h6 class={c.ss('subtitle is-6')}>There have been no incidents within the last 48 hours</h6>
                    </div>
                    }
                  </CollapsibleSection>
                </>
              )}
            </div>
          </div>
        </div>
        <footer class={c.ss('card-footer')}>
          <a href='#' class={c.ss('card-footer-item is-hidden-desktop')}>Back to top</a>
        </footer>
      </div>
  )
}

export default DetailedPanel;
