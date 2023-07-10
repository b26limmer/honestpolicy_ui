import React from 'react';
import { Info } from '@mui/icons-material';
import { Link } from 'gatsby';
import * as styles from '../../scss/home/we-did-the-research.module.scss';

const WeDidTheResearch = () => {
  return (
    <div className={styles.columnContainer}>
      <h2 className={styles.sectionTitle}>
        We did the research<span>, so you don&apos;t have to</span>
      </h2>
      <p className={styles.text}>
        Get an honest look under the hood of how insurance works and what to watch out
        for. Plus: We don&apos;t play favorites or sell your information to every insurer
        or agency in town.
      </p>
      <Link to="/learn" className={styles.link} title="Learn">
        <Info />
        How Honest Policy stays independent
      </Link>
    </div>
  );
};

export default WeDidTheResearch;
