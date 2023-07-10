import React from 'react';
import PropTypes from 'prop-types';
import Error from '../../../../error/Error';
import { Checkbox } from '@mui/material';
import * as styles from '../../quote-renters.module.scss';

const AgreementBox = ({ errors, values, handleChange }) => {
  return (
    <div className={styles.agreementBox}>
      <Checkbox
        checked={values.agreement}
        onChange={e =>
          handleChange({
            target: { name: 'agreement', value: e.target.checked },
          })
        }
        color="default"
      />
      <p className={styles.agreementText}>
        I acknowledge Honest Policy&apos;s{' '}
        <a
          href="/privacypolicy"
          title="Privacy Policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          privacy policy
        </a>{' '}
        and agree to the{' '}
        <a
          href="/terms"
          title="Terms of service"
          target="_blank"
          rel="noopener noreferrer"
        >
          terms of service
        </a>{' '}
        and use of my information for the purpose of getting insurance rates and improving
        Honest Policy services
        <br />
        <Error error={errors.agreement} />
      </p>
    </div>
  );
};

AgreementBox.propTypes = {
  errors: PropTypes.object,
  values: PropTypes.object,
  handleChange: PropTypes.func,
};

export default AgreementBox;
