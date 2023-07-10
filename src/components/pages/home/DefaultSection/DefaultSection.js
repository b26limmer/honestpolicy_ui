import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import classNames from 'classnames';
import Button from '../../../form-button';
import Title from '../../../typography/SectionTitle';
import Description from '../../../typography/SectionDescription';

import * as styles from './default-section.module.scss';

const DefaultSection = ({
  image,
  imageAlt = '',
  title,
  description,
  buttonText,
  buttonTo,
  isReversed,
  isExternal,
}) => {
  return (
    <div
      className={classNames(styles.defaultSection, {
        [styles.defaultSectionReversed]: isReversed,
      })}
    >
      <div className={styles.defaultSectionImage}>
        <img loading="lazy" src={image} alt={imageAlt || title} />
      </div>
      <div className={styles.defaultSectionDetails}>
        <Title className={styles.defaultSectionTitle}>{title}</Title>
        <Description className={styles.defaultSectionDescription}>
          {description}
        </Description>
        <div className={styles.defaultSectionButton}>
          <Button
            type="primary"
            isOutline
            Component={isExternal ? 'a' : Link}
            to={buttonTo}
            href={buttonTo}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

DefaultSection.propTypes = {
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  buttonText: PropTypes.string,
  buttonTo: PropTypes.string,
  isReversed: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  isExternal: PropTypes.bool,
};

export default DefaultSection;
