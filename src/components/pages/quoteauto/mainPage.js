import React, { useContext, useEffect } from 'react';

import { faCar, faHome, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as styles from './main-page.module.scss';
import { Link } from 'gatsby';
import { ZipContext } from '../../state/zipContext';

const MainPage = () => {
  const linkItems = [
    { path: '/quote-auto', label: 'Car', icon: faCar },
    { path: '/quote-home', label: 'Home', icon: faHome },
    { path: '/quote-renter', label: 'Renter', icon: faKey },
  ];
  const { zipCode, stateData, findState } = useContext(ZipContext);
  useEffect(() => {
    findState();
  }, []);
  return (
    <div className={styles.mainSection}>
      <div className={styles.quoteTitle}>Get Quotes</div>
      <div className={styles.subText}>Choose the insurance you need.</div>
      <ul className={styles.linkLists}>
        {linkItems.map(({ path, label, icon }, index) => (
          <Link
            className={styles.itemLink}
            to={path}
            key={label + index}
            state={{ zipCode, stateData }}
          >
            <div className={styles.item}>
              <FontAwesomeIcon icon={icon} size={'3x'} color={'#008462'} />
              <div className={styles.itemLabel}>{label}</div>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default MainPage;
