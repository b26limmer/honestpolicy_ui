import React from 'react';
import classNames from 'classnames';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import * as styles from './header-carrier-box.module.scss';
import PropTypes from 'prop-types';

const HeaderCarrierBox = ({ color, logoSmall, onRemoveCarrier, name, isSmall }) => {
  return (
    <div
      className={classNames(styles.headerCarrierBox, {
        [styles.headerCarrierBoxSmall]: isSmall,
      })}
    >
      <div className={styles.headerCarrierBoxInner} style={{ borderColor: color }}>
        <div className={styles.headerCarrierBoxImg}>
          <img
            className={styles.compareDialogGatsbyImageWrapper}
            src={logoSmall}
            alt={name}
          />
        </div>
        <div className={styles.headerCarrierBoxTitle}>
          {name}
          <span
            className={styles.headerCarrierBoxTitleIcon}
            onClick={() => {
              onRemoveCarrier(name);
            }}
          >
            <RemoveCircleOutlineIcon />
          </span>
        </div>
      </div>
      <div
        className={styles.headerCarrierRemoveButton}
        onClick={() => {
          onRemoveCarrier(name);
        }}
      >
        <RemoveCircleOutlineIcon /> Remove
      </div>
    </div>
  );
};
HeaderCarrierBox.propTypes = {
  color: PropTypes.string,
  logoSmall: PropTypes.string,
  onRemoveCarrier: PropTypes.func,
  name: PropTypes.string,
  isSmall: PropTypes.bool,
};
export default HeaderCarrierBox;
