import React from 'react';
import PropTypes from 'prop-types';
import * as styles from '../../scss/carrier/rightForYou.module.scss';
import Paper from '../../utils/paper';

const RightForYou = ({ name }) => {
  const prosCons = {
    pros: [
      'You like managing your insurance through an agent. ',
      'You need multiple lines of insurance that you can bundle together with Encompass.',
      'You want upgraded features, like Accident Forgiveness, on your auto policy, or jewelry coverage on your home policy.',
    ],
    cons: [
      'You prefer to manage your insurance independently online.',
      'You only need minimum coverage for your home or car.',
      'You want the cheapest premium.',
    ],
  };
  return (
    <Paper>
      <h2 className={styles.carrierTemplateTitle}>Is {name} right for you?</h2>
      <p className={styles.text}>
        {name} charges higher premiums for home and auto insurance than the average
        carrier. But in return, you get reliable customer service through an agent, plus
        premium coverage features. The carrier also offers multiple discounts and
        customization options, so you can tailor your insurance and the premiums to suit
        your needs.
      </p>
      <div className={styles.prosConsContainer}>
        <Paper className={styles.prosConsPaper}>
          <h3 className={styles.prosConsTitle}>Benefits</h3>
          {prosCons.pros.map((p, idx) => (
            <p className={styles.text} key={idx}>
              {p}
            </p>
          ))}
        </Paper>
        <Paper className={styles.prosConsPaper}>
          <h3 className={styles.prosConsTitle}>Drawbacks</h3>
          {prosCons.cons.map((p, idx) => (
            <p className={styles.text} key={idx}>
              {p}
            </p>
          ))}
        </Paper>
      </div>
    </Paper>
  );
};

RightForYou.propTypes = {
  name: PropTypes.string.isRequired,
};

export default RightForYou;
