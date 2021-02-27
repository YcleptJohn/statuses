import { h } from 'preact'
import style from './style.scss'
import ModularCssHelper from '../../lib/ModularCssHelper.js'

import { FontAwesomeIcon } from '@aduh95/preact-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin'
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp'
import { faAt } from '@fortawesome/free-solid-svg-icons/faAt'
import { faCopy } from '@fortawesome/free-regular-svg-icons/faCopy'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons/faPaperPlane'

import Logo from '../../components/logo'
import { useState } from 'preact/hooks'
import * as clipboard from "clipboard-polyfill/text";
import statuses from '../../lib/statusConstants.js'

const c = new ModularCssHelper(style)

const Footer = () => {
  const [isExpanded, setExpanded] = useState(false)
  const [showEmailActions, setShowEmailActions] = useState(false)
  const [copyStatus, setCopyStatus] = useState(statuses.PENDING)

  const toggleExpanded = () => setExpanded(prev => {
    if (!prev) {
      // This looks a bit funky but there is no better way to keep the footer in display when it has to
      // push the page boundary down -- negative margins on/off on the content were worse.
      const scrollInterval = setInterval(() => {
        window.scrollTo({
        top: document.documentElement.scrollHeight
      })}, 10)
      setTimeout(() => clearInterval(scrollInterval), 300)
    }
    if (showEmailActions) toggleEmailActions()
    return !prev
  })

  const toggleEmailActions = () => setShowEmailActions(prev => {
    setCopyStatus(statuses.PENDING)
    return !prev
  })

  const copyEmail = () => {
    clipboard.writeText('johntaylorjjt@gmail.com')
      .then(() => setCopyStatus(statuses.COMPLETED_SUCCESSFULLY))
      .catch(() => setCopyStatus(statuses.COMPLETED_ERRONEOUSLY))
  }

  const preventBubble = (e) => e.stopPropagation()

  return (
    <footer class={c.ss(`footer compact-footer is-unselectable ${isExpanded ? 'is-expanded' : ''}`)}>
      <div class={c.ss('collapse-button-wrapper')} onClick={toggleExpanded}>
        <button class={c.ss('button is-small is-rounded collapse-button')}>
          <span class={c.ss(`icon is-small flippable-icon ${isExpanded ? 'is-flipped' : ''}`)}>
            <FontAwesomeIcon icon={faChevronUp} />
          </span>
        </button>
      </div>
      <div class={c.ss('level h-100')}>
        <div class={c.ss('level-item creator-credit-wrapper h-100')}>
          <div class={c.ss('created-by')}>
            <span class={c.ss('is-size-5')}>
              <Logo small inline />
            </span>
            <span class={c.ss('pb-1')}>
              &nbsp;by&nbsp;
              <a
                href='https://www.linkedin.com/in/johnjosephtaylor/'
                target='_blank'
                rel='noreferrer'
                class={c.ss('has-text-weight-semibold')}
              >
                John Taylor
              </a>
            </span>
          </div>
          <div class={c.ss(`expanded-content ${isExpanded ? 'is-expanded' : ''}`)}>
            <a
              class={c.ss('circle circle-link')}
              title='LinkedIn | JohnJosephTaylor'
              href='https://www.linkedin.com/in/johnjosephtaylor/'
              target='_blank'
              rel='noreferrer'
            >
              <span class={c.ss('icon is-medium')}>
                <FontAwesomeIcon icon={faLinkedin} size='lg' />
              </span>
            </a>
            <div class={c.ss(`circle circle-email ${showEmailActions ? 'is-expanded' : ''}`)} title='Email | JohnTaylorJJT@gmail.com' onClick={toggleEmailActions}>
              <span class={c.ss('icon is-medium')}>
                <FontAwesomeIcon icon={faAt} size='lg' />
              </span>
              <div class={c.ss(`email-reveal ${showEmailActions ? 'show' : ''}`)} onClick={preventBubble}>
                <span class={c.ss('is-size-7')}>johntaylorjjt@gmail.com</span>
              </div>
            </div>
            <a
              class={c.ss('circle circle-link')}
              title='Github | YcleptJohn'
              href='https://github.com/YcleptJohn'
              target='_blank'
              rel='noreferrer'
            >
              <span class={c.ss('icon is-medium')}>
                <FontAwesomeIcon icon={faGithub} size='lg' />
              </span>
            </a>
          </div>
          <div class={c.ss(`email-actions px-2 ${showEmailActions ? 'show' : ''}`)}>
            <button
              class={c.ss(`button email-action is-small is-rounded is-info mr-1 ${copyStatus === statuses.COMPLETED_ERRONEOUSLY ? 'is-danger' : ''} ${copyStatus === statuses.COMPLETED_SUCCESSFULLY ? 'is-success' : ''}`)}
              onClick={copyEmail}
              title={copyStatus === statuses.COMPLETED_ERRONEOUSLY ? 'Sorry, that didn\'t quite work - please copy manually' : ''}
            >
              <FontAwesomeIcon icon={faCopy} />
              <span class={c.ss('ml-1')}>
                {copyStatus === statuses.PENDING && 'Copy'}
                {copyStatus === statuses.COMPLETED_ERRONEOUSLY && 'Uh oh!'}
                {copyStatus === statuses.COMPLETED_SUCCESSFULLY && 'Copied!'}
              </span>
            </button>
            <a class={c.ss('button email-action is-small is-rounded is-dark ml-1')} href='mailto:johntaylorjjt@gmail.com'>
              <FontAwesomeIcon icon={faPaperPlane} />
              <span class={c.ss('ml-1')}>Compose</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;