import { h } from 'preact';
import style from './style.scss';
import ModularCssHelper from '../../lib/ModularCssHelper.js';

const c = new ModularCssHelper(style)

const Card = () => (
  <div class={c.ss('column is-one-third')}>
    <div class={c.ss('card')}>
      <header class={c.ss('card-header')}>
        <p class={c.ss('card-header-title')}>
          Component
        </p>
        <a href="#" class={c.ss('card-header-icon')} aria-label="more options">
          <span class={c.ss('icon')}>
            <i class="fas fa-angle-down" aria-hidden="true" />
          </span>
        </a>
      </header>
      <div class={c.ss('card-content')}>
        <div class={c.ss('content')}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
          <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
          <br />
          <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
        </div>
      </div>
      <footer class={c.ss('card-footer')}>
        <a href="#" class={c.ss('card-footer-item')}>See More</a>
      </footer>
    </div>
  </div>
);

export default Card;
