import React, { useContext } from 'react';
import Container from '../../../container';
import ZipCodeForm from '../../../forms/zip-code-form';
import { ZipContext } from '../../../state/zipContext';
import * as styles from './search-hero.module.scss';
import PropTypes from 'prop-types';
import { AlertsContext } from '../../../state/AlertsContext';
import { StaticImage } from 'gatsby-plugin-image';

const SearchHero = ({ activeLineOfBusiness, pageContext, filteredState }) => {
  const { zipCode, setZipCode } = useContext(ZipContext);
  const { dispatchAlert } = useContext(AlertsContext);

  const handleSubmit = e => {
    e.preventDefault();
    if (!zipCode.match(/^[0-9]{5}(?:-[0-9]{4})?$/)) {
      dispatchAlert('Zipcode is not valid!');
      setZipCode('');
      return;
    }
  };
  return (
    <div className={styles.searchHero}>
      <div className={styles.searchHeroBackgroundWrapper}>
        <StaticImage
          className={styles.gatsbyImgWrapper}
          src={'../../../../images/search-hero.png'}
          alt="Search Hero"
          layout="fullWidth"
          objectFit="cover"
          placeholder="blurred"
          formats={['auto', 'webp']}
        />
      </div>
      <Container className={styles.searchHeroInner}>
        <div className={styles.searchHeroTitle}>
          Check out all the{' '}
          {activeLineOfBusiness === 'Auto' ? 'Car' : activeLineOfBusiness} Insurance
          Companies{' '}
          {filteredState
            ? `in ${filteredState}`
            : pageContext.state
            ? `in ${pageContext.state}`
            : ''}{' '}
          on Honest Policy
        </div>
        <div className={styles.searchHeroForm}>
          <ZipCodeForm
            handleSubmit={handleSubmit}
            zipCode={zipCode}
            setZipCode={setZipCode}
          />
        </div>
      </Container>
    </div>
  );
};

SearchHero.propTypes = {
  activeLineOfBusiness: PropTypes.string.isRequired,
  filteredState: PropTypes.string,
  pageContext: PropTypes.object.isRequired,
};
export default SearchHero;
