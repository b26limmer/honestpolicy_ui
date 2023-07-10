import React from 'react';
import classNames from 'classnames';
import * as styles from './linear-step-nav.module.scss';
import PropTypes from 'prop-types';

const LinearStepNav = ({ navItems, step, navSize }) => {
  return (
    <div style={{ '--navSize': navSize }} className={styles.stepNav}>
      {navItems.map((item, key) => {
        return (
          <div
            key={key}
            className={classNames(
              key + 1 == step ? styles.halfBorderBottom : '',
              styles.navOption
            )}
          >
            <span>{item.name}</span>
          </div>
        );
      })}
      <span className={styles.mobileNavIndicator}>
        {navItems.map((item, key) => key + 1 === step && item.name)}
      </span>
    </div>
  );
};

LinearStepNav.propTypes = {
  navItems: PropTypes.array.isRequired,
  step: PropTypes.number,
  navSize: PropTypes.number,
};

export default LinearStepNav;
