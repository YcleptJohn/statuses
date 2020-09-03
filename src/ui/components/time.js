import { h } from 'preact';
import { createTimeDisplay } from '../lib/IncidentMetaFields.js';

const Time = ({ timeString, timeObject, preferMultiline }) => {
  if (timeString) timeObject = createTimeDisplay(timeString)
  
  return (
    <span class={'mb-2'}>
      <span class={'has-text-weight-bold'}>{timeObject.value || 'No date'}</span>
      {timeObject.subValue && (
        preferMultiline
        ? <><br /><span class='is-italic has-text-grey'>{timeObject.subValue}</span></>
        : <>
          <span class='has-text-primary has-text-weight-bold'>&nbsp;/&nbsp;</span>
          <span class='is-italic has-text-grey'>{timeObject.subValue}</span>
        </>
      )}
    </span>
  )
}

export default Time;
