import React, { useContext } from 'react';
import classNames from 'classnames';
import Button from '../../../form-button';
import Container from '../../../../components/container';
import HeaderCarrierBox from './components/HeaderCarrierBox';
import { CompareContext } from '../../../state/CompareContextProvider';

import * as styles from './compare-header.module.scss';
import PropTypes from 'prop-types';

const CompareHeader = ({ selectedCarriers, onAddCarrier, headingRef, isSticky }) => {
  const { removeCarrier } = useContext(CompareContext);
  return (
    <div
      className={classNames(
        styles.compareHeader,
        isSticky ? styles.compareHeaderSticky : ''
      )}
      ref={headingRef}
    >
      <Container className={styles.compareHeaderInner}>
        <div className={styles.compareHeaderDetails}>
          <div className={styles.compareHeaderTitle}>Compare Carriers</div>
          <Button onClick={onAddCarrier}>Add a Carrier</Button>
        </div>
        <div className={styles.compareHeaderBoxes}>
          <div className={styles.compareHeaderLeftSide}></div>
          {selectedCarriers?.map((item, key) => {
            return (
              <HeaderCarrierBox
                key={key}
                {...item}
                onRemoveCarrier={removeCarrier}
                isSmall={isSticky}
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
};

CompareHeader.propTypes = {
  selectedCarriers: PropTypes.array,
  onAddCarrier: PropTypes.func,
  headingRef: PropTypes.object,
  isSticky: PropTypes.bool,
};

export default CompareHeader;
