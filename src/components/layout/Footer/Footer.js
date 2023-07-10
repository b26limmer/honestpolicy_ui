import React, { useContext } from 'react';
import { Link, navigate } from 'gatsby';
import { ZipContext } from '../../state/zipContext';
import * as styles from './footer.module.scss';
import Container from '../../container';
import ZipCodeForm from '../../forms/zip-code-form';
import { AlertsContext } from '../../state/AlertsContext';
import { StaticImage } from 'gatsby-plugin-image';
import HyperLink from '../../HyperLink';

const Footer = () => {
  const { zipCode, setZipCode } = useContext(ZipContext);
  const { dispatchAlert } = useContext(AlertsContext);
  const handleSubmit = e => {
    e.preventDefault();
    if (!zipCode.match(/^[0-9]{5}(?:-[0-9]{4})?$/)) {
      dispatchAlert('Zipcode is not valid!');
      setZipCode('');
      return;
    } else {
      navigate('/search');
    }
  };
  const links = [
    {
      title: 'Home',
      url: '/',
      internal: true,
    },
    {
      title: 'About',
      url: '/about',
      internal: true,
    },
    {
      title: 'Carriers',
      url: '/search',
      internal: true,
    },
    {
      title: 'Partners',
      url: '/our-partners',
      internal: true,
    },
    {
      title: 'Learning Center',
      url: '/learn',
      internal: false,
    },
    {
      title: 'Contact Us',
      url: '/contact-us',
      internal: true,
    },
    {
      title: 'Privacy Policy',
      url: '/privacypolicy',
      internal: true,
    },
    {
      title: 'Terms & Conditions',
      url: '/terms',
      internal: true,
    },
  ];
  const states = [
    { text: 'Austin, TX', search: 'texas' },
    { text: 'Boulder, CO', search: 'colorado' },
    { text: 'Cleveland, OH', search: 'ohio' },
    { text: 'Chicago, IL', search: 'illinois' },
    { text: 'Columbus, OH', search: 'ohio' },
    { text: 'Denver, CO', search: 'colorado' },
    { text: 'Houston, TX', search: 'texas' },
    { text: 'Indianapolis, IN', search: 'indiana' },
    { text: 'Kissimmee, FL', search: 'florida' },
    { text: 'Los Angeles, CA', search: 'california' },
    { text: 'Miami, FL', search: 'florida' },
    { text: 'New Orleans, LA', search: 'louisiana' },
    { text: 'New York, NY', search: 'new-york' },
    { text: 'Philadelphia, PA', search: 'pennsylvania' },
    { text: 'San Francisco, CA', search: 'california' },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerLeftColumn}>
        <Link to="/" className={styles.logo} title="Home">
          <StaticImage
            formats={['auto', 'webp']}
            objectFit="contain"
            placeholder="tracedSVG"
            className={styles.footerLogo}
            src={'../../../images/hpLogo.png'}
            alt="Footer Logo"
            height={120}
            layout="constrained"
          />
          <StaticImage
            formats={['auto', 'webp']}
            height={120}
            objectFit="contain"
            placeholder="blurred"
            layout="constrained"
            className={styles.footerLetterLogo}
            src={'../../../images/logos/hpLetterLogoWhite.png'}
            alt="Footer Letter Logo"
          />
        </Link>
        <ul className={styles.linksListContainer}>
          {links.map((link, idx) => (
            <li className={styles.linkItem} key={idx}>
              <HyperLink to={link.url} title={link.title} internal={link.internal}>
                {link.title}
              </HyperLink>
            </li>
          ))}
        </ul>
        <p className={styles.copyrightMessage}>
          © 2022 Honest Policy. All rights reserved.
          <br />
          <br />
          MassDrive Insurance Group, LLC, is the licensed agent for all products. View the
          licensing information for MassDrive Insurance Group{' '}
          <a
            href="https://bindable.com/licensing-information"
            target="_blank"
            rel="noopener noreferrer"
            title="Bindable licensing information"
          >
            here
          </a>
          .
        </p>
      </div>
      <div className={styles.footerRightColumn}>
        <Container className={styles.footerIntroInner}>
          <h2 className={styles.footerIntroDetails}>Look Up Insurance Carriers</h2>
          <ZipCodeForm
            className={styles.footerIntroForm}
            handleSubmit={handleSubmit}
            setZipCode={setZipCode}
            zipCode={zipCode}
          />
        </Container>
        <ul className={styles.statesListContainer}>
          {states.map((state, idx) => (
            <li className={styles.linkItem} key={idx}>
              <Link
                title={state.text}
                onClick={() => setZipCode('')}
                to={`/search/${state.search}`}
              >
                {state.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
export default Footer;
