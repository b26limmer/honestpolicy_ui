import React, { useState, useContext, useRef } from 'react';
import * as styles from '../../scss/home/hero.module.scss';
import { ZipContext } from '../../state/zipContext';
import { navigate, useStaticQuery, graphql } from 'gatsby';
import { ArrowDropDown } from '@mui/icons-material';
import { ClickAwayListener } from '@mui/material';
import { AlertsContext } from '../../state/AlertsContext';
import { GatsbyImage } from 'gatsby-plugin-image';
import useInterval from '../../../utils/useInterval';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faHome, faKey } from '@fortawesome/fontawesome-pro-solid';
import { ScriptsContext } from '../../state/ScriptsDataProvider';
import { FormattedMessage } from 'react-intl';

const Hero = () => {
  const {
    allAirtable: { nodes: companyLogos },
  } = useStaticQuery(graphql`
    query getHeroCompanies {
      allAirtable(
        filter: {
          table: { eq: "Carriers" }
          data: {
            slug: {
              in: [
                "bristol-west"
                "dairyland"
                "infinity"
                "kemper"
                "liberty-mutual"
                "mapfre"
                "mercury"
                "farmers"
                "nationwide"
                "plymouth-rock"
                "safeco"
                "state-auto"
                "stillwater"
                "the-general"
                "travelers"
              ]
            }
          }
        }
      ) {
        nodes {
          id
          data {
            name
            Company_Logos {
              data {
                Attachments {
                  localFiles {
                    childImageSharp {
                      gatsbyImageData(
                        transformOptions: { grayscale: true, fit: CONTAIN }
                        width: 100
                        height: 70
                        placeholder: BLURRED
                        layout: CONSTRAINED
                        formats: [AUTO]
                        backgroundColor: "#ffffff00"
                      )
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
  const { zipCode, setZipCode, activeInsurance, setActiveInsurance, findState } =
    useContext(ZipContext);
  const [dropdownActive, setDropdownActive] = useState(false);
  const [goLeft, setGoLeft] = useState(false);
  const { dispatchAlert } = useContext(AlertsContext);
  const { track } = useContext(ScriptsContext);
  const handleSubmit = async e => {
    e.preventDefault();
    if (!activeInsurance) {
      dispatchAlert('Please select an insurance type');
      return;
    }
    if (!zipCode.match(/^[0-9]{5}(?:-[0-9]{4})?$/)) {
      dispatchAlert('Zipcode is not valid!', 'error');
      setZipCode('');
      return;
    }
    findState();
    let url = '';
    switch (activeInsurance) {
      case 'car':
        url = '/quote-auto';
        break;
      case 'home':
        url = '/quote-home';
        break;
      default:
        url = '/quote-renter';
        break;
    }
    track('hero-zipcode-submitted', { lineOfBusiness: activeInsurance });
    navigate(url);
  };
  const values = [
    { text: 'Home Insurance', value: 'home', icon: faHome },
    { text: 'Car Insurance', value: 'car', icon: faCar },
    { text: "Renter's Insurance", value: 'renter', icon: faKey },
  ];
  const toggleDropDown = () => {
    dropdownActive ? setDropdownActive(false) : setDropdownActive(true);
  };
  const carouselRef = useRef(null);
  const moveCarousel = () => {
    const { clientWidth, scrollWidth, scrollLeft } = carouselRef.current;
    if (Math.round(clientWidth + scrollLeft) == scrollWidth) {
      setGoLeft(true);
      carouselRef.current.scrollLeft -= 2;
    } else if (scrollLeft == 0) {
      setGoLeft(false);
      carouselRef.current.scrollLeft += 2;
    }
    if (goLeft) {
      carouselRef.current.scrollLeft -= 2;
    } else {
      carouselRef.current.scrollLeft += 2;
    }
  };
  useInterval(moveCarousel, 50);
  return (
    <div className={styles.heroContainer}>
      <h1 className={styles.heroTitle}>Unbiased advice on insurance.</h1>
      <p className={styles.heroDescription}>
        <FormattedMessage
          id="index.hero.initialTitle"
          defaultMessage={
            'Know everything you ever (or never) wanted to know about auto and home insurance. <strong>Find the best value for your situation and get covered.</strong>'
          }
          values={{
            strong: words => <strong>{words}</strong>,
          }}
        />
      </p>
      <form className={styles.zipForm} onSubmit={handleSubmit}>
        <button
          type="button"
          className={
            !dropdownActive ? styles.customInputSelect : styles.customInputSelectDisabled
          }
          onClick={toggleDropDown}
          disabled={dropdownActive}
        >
          {values.map((item, idx) => (
            <div
              key={idx}
              className={
                item.value === activeInsurance
                  ? styles.selectedOption
                  : styles.hiddenOption
              }
            >
              <FontAwesomeIcon icon={item.icon} />
              <span>{item.text}</span>
              <ArrowDropDown />
            </div>
          ))}
          {dropdownActive && (
            <ClickAwayListener onClickAway={toggleDropDown}>
              <div className={styles.showAvailableOptions}>
                {values.map((item, idx) => (
                  <div
                    key={idx}
                    className={styles.availableOption}
                    onClick={() => {
                      setActiveInsurance(item.value);
                      toggleDropDown();
                    }}
                  >
                    <FontAwesomeIcon icon={item.icon} />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </ClickAwayListener>
          )}
        </button>
        <div className={styles.zipInputContainer}>
          <input
            className={styles.zipCodeInput}
            type="number"
            placeholder="What's your zip?"
            autoComplete="postal-code"
            value={zipCode}
            onChange={e => setZipCode(e.target.value)}
          />
          <button type="submit" className={styles.submitButton}>
            <strong>Get</strong> quotes
          </button>
        </div>
      </form>
      <p className={styles.text}>
        Fill out one form to compare quotes from multiple carriers!
      </p>
      <div className={styles.companyLogosContainer} ref={carouselRef}>
        {companyLogos.map(node => (
          <div key={node.id} className={styles.companyLogoContainer}>
            <GatsbyImage
              objectFit="contain"
              alt={`${node.data.name} Logo`}
              image={
                node.data.Company_Logos[0].data.Attachments.localFiles[0].childImageSharp
                  .gatsbyImageData
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
