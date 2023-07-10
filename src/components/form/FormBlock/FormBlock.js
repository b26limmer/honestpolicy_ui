import React, { useRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import * as styles from './form-block.module.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/fontawesome-pro-solid';

const FormBlock = ({
  title,
  children,
  rightSideChildren,
  isActive = false,
  index,
  block,
  rootClassName = '',
  helpText,
  ...rest
}) => {
  const [hasAnimations, setHasAnimations] = useState(true);
  const [showHelpText, setShowHelpText] = useState(false);
  const formBlock = useRef();

  useEffect(() => {
    if (formBlock.current) {
      formBlock.current.addEventListener('animationend', animationEndCallback);
    }
    return () => {
      if (formBlock.current) {
        formBlock.current.removeEventListener('animationend', animationEndCallback);
      }
    };
  }, []);

  useEffect(() => {
    if (isActive && formBlock.current && index !== 0) {
      setTimeout(() => {
        if (formBlock.current) {
          formBlock.current.scrollIntoView({
            behavior: 'smooth',
            block: block || 'center',
            inline: 'nearest',
          });
        }
      }, 500);
    }
  }, [isActive, formBlock.current]);

  const animationEndCallback = () => {
    setHasAnimations(false);
  };

  return (
    <div
      ref={formBlock}
      className={classNames(styles.formBlock, {
        [styles.formBlockAnimation]: hasAnimations,
        [styles.formBlockActive]: isActive,
        [rootClassName]: !!rootClassName,
      })}
      {...rest}
    >
      {title && (
        <div className={styles.formBlockTitle}>
          <span>
            {title}
            {helpText && (
              <FontAwesomeIcon
                className={styles.questionIcon}
                icon={faQuestion}
                onMouseEnter={() => setShowHelpText(true)}
                onMouseLeave={() => setShowHelpText(false)}
              />
            )}
          </span>
          {showHelpText && (
            <div className={styles.tooltip}>
              <p className={styles.text}>{helpText}</p>
            </div>
          )}
          <div>{rightSideChildren}</div>
        </div>
      )}
      <div className={styles.formBlockMain}>{children}</div>
    </div>
  );
};

FormBlock.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  rightSideChildren: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  isActive: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  index: PropTypes.number,
  rootClassName: PropTypes.string,
  block: PropTypes.string,
  helpText: PropTypes.string,
};

export default FormBlock;
