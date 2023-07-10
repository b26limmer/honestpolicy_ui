import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import * as styles from './request-call.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/fontawesome-pro-solid';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

const RequestCallButton = ({ requestACall, step }) => {
  const [isShrinked, shrink] = useReducer(
    currentValue => (currentValue ? false : true),
    false
  );
  useScrollPosition(
    ({ currPos }) => {
      if (currPos.y < -10 && !isShrinked) {
        shrink();
      } else if (currPos.y > -10 && isShrinked) {
        shrink();
      }
    },
    [isShrinked],
    null,
    false,
    100
  );

  return (
    <>
      {step > 1 && (
        <button
          onClick={() => requestACall()}
          className={isShrinked ? styles.shrinkedButton : styles.expandedButton}
        >
          <FontAwesomeIcon className={styles.icon} icon={faQuestion} />
          <span>Get Help</span>
        </button>
      )}
    </>
  );
};

RequestCallButton.propTypes = {
  requestACall: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};

export default RequestCallButton;
