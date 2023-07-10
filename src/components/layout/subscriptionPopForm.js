import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shield from '../../images/ico.png';
import * as styles from '../scss/layout/layout.module.scss';

const SubscriptionPopForm = ({ toggleFormPopUp }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    if (email && name) {
      let data = {
        name,
        email,
      };
      fetch('https://hook.integromat.com/kgx2p2awqxmcq7g8fdov4qgb8r06s37e', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(data),
      }).then(res => {
        if (res.ok) {
          alert('Thank you! We received your data');
          toggleFormPopUp();
        }
      });
    }
  };
  return (
    <div className={styles.formContainer} value={'Container'}>
      <form onSubmit={e => handleSubmit(e)} className={styles.subscriptionForm}>
        <div className={styles.formHeader}>
          <h2 className={styles.subtitle}>Sign up now!</h2>
          <button
            className={styles.formHeaderClose}
            type="button"
            onClick={toggleFormPopUp}
          >
            X
          </button>
        </div>
        <div className={styles.formColumns}>
          <img
            loading="lazy"
            className={styles.shieldImage}
            src={shield}
            alt="Honest Policy Logo"
          />
          <p className={styles.text}>
            Sign up for updates and be the first to be notified when we launch our new
            user accounts and insurance rating features.
          </p>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.inputGroup}>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className={styles.subscriptionInput}
              autoComplete="given-name"
              required={true}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>E-mail</label>
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={styles.subscriptionInput}
              autoComplete="email"
              required={true}
            />
          </div>
        </div>
        <button type="submit" className={styles.subscriptionSubmitButton}>
          Subscribe
        </button>
      </form>
    </div>
  );
};

SubscriptionPopForm.propTypes = {
  toggleFormPopUp: PropTypes.func.isRequired,
};

export default SubscriptionPopForm;
