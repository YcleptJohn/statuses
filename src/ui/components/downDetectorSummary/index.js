import { h } from 'preact';
import style from './style.scss';
import ModularCssHelper from '../../lib/ModularCssHelper.js';

const c = new ModularCssHelper(style)

const downDetectorSummary = ({ data, url }) => {
  if (!data || !data.reportVolume) return null
  let colourMap = {
    low: 'has-text-success',
    medium: 'has-text-warning',
    high: 'has-text-danger'
  }
  const colour = colourMap[data.reportVolume]
  return (
    <>
      <hr class={c.ss('my-1 mx-6')} />
      <p class='has-text-centered'>
        DownDetector reports:&nbsp; 
        <a class={c.ss(`${colour} has-text-weight-bold`)} href={url} target='_blank' rel='noreferrer'>{data.reportVolume}</a>
      </p>
    </>
  )
};

export default downDetectorSummary;
