import React from 'react';
import PropTypes from 'prop-types';

import homeIcon from '../../../../images/carrierTemplate/casa.png';
import autoIcon from '../../../../images/carrierTemplate/eco-car.png';

import * as styles from './carrier-overview.module.scss';
import { Link } from 'gatsby';
import classNames from 'classnames';

const CarrierOverview = ({
  name,
  about,
  activeLineOfBusiness,
  sectionRef,
  ratings,
  slug,
}) => {
  const activeLines = ['Auto', 'Home'];
  return (
    <div ref={sectionRef} id={'overview'}>
      <h1 className={styles.carrierOverviewTitle}>{name} Overview</h1>
      <p className={styles.text}>{about.data.About_Carrier_Text}</p>
      <div className={styles.linesOfBusiness}>
        <p className={styles.linesOfBusinessTitle}>Lines of Business:</p>
        <div className={styles.buttonsContainer}>
          {ratings.map(
            (line, idx) =>
              activeLines.includes(line.data.Line) && (
                <Link
                  to={`/insurance/${slug}/${
                    line.data.Line === 'Auto' ? 'car' : line.data.Line.toLowerCase()
                  }`}
                  key={idx}
                  className={classNames(
                    styles.sectionLink,
                    activeLineOfBusiness === line.data.Line
                      ? styles.activeSectionLink
                      : ''
                  )}
                >
                  <img
                    loading="lazy"
                    src={line.data.Line === 'Auto' ? autoIcon : homeIcon}
                    className={styles.lineIcon}
                    alt="Insurance type icon"
                  />
                  {line.data.Line}
                </Link>
              )
          )}
        </div>
      </div>
    </div>
  );
};

CarrierOverview.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  about: PropTypes.object.isRequired,
  activeLineOfBusiness: PropTypes.string.isRequired,
  setActiveLineOfBusiness: PropTypes.func.isRequired,
  sectionRef: PropTypes.object.isRequired,
  ratings: PropTypes.array.isRequired,
};

export default CarrierOverview;
