import React, { useContext, useState } from 'react';
import logo from '../../../images/main-logo.png';
import emoji from '../../../images/Bitmap.png';
import comingSoonTag from '../../../images/Badge.png';
import * as styles from '../../scss/comingsoon/comingSoon.module.scss';
// import FormControlLabel from '@mui/material/FormControlLabel';

import { Link } from 'gatsby';
import Input from '../../inputs/FormInput/FormInput';
import Button from '../../form-button';
import Checkbox from '../../inputs/Checkbox/Checkbox';
import { isEmail } from '../../../utils/validation';
import { AlertsContext } from '../../state/AlertsContext';

const ComingSoonTemplate = () => {
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmited] = useState(false);
  const [wantsToReceiveNews, setWantsToReceiveNews] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { dispatchAlert } = useContext(AlertsContext);

  const webHookEndpoint = 'https://hook.integromat.com/kgx2p2awqxmcq7g8fdov4qgb8r06s37e';
  const handleSubmit = e => {
    e & e.preventDefault();
    setSubmitting(true);
    if (email && isEmail(email)) {
      fetch(webHookEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({ email, wantsToReceiveNews }),
      }).then(res => {
        if (res.ok) {
          setEmailSubmited(true);
          setSubmitting(false);
        }
      });
    } else {
      dispatchAlert('Please submit a valid email');
      setSubmitting(false);
    }
  };
  const initialView = (
    <>
      <span className={styles.getNotifiedText}>Get notified when we launch!</span>
      <div className={styles.emailInput}>
        <Input
          type="email"
          placeholder="Email Address"
          onChange={e => {
            setEmail(e.target.value);
          }}
          value={email}
          autoComplete="email"
        />
        <Button isDisabled={submitting} onClick={handleSubmit}>
          Submit
        </Button>
      </div>
      <div className={styles.termPolicyCheckbox}>
        <Checkbox
          value={wantsToReceiveNews}
          onChange={e => setWantsToReceiveNews(e.target.checked)}
          name="terms"
          color="primary"
        />
        <span className={styles.agreeText}>
          Yes, I want to receive news and emails from Honest Policy.
          <br />
          <Link to="/privacypolicy">Privacy Policy</Link>
        </span>
      </div>
    </>
  );

  const emailSubmittedView = (
    <>
      <img loading="lazy" src={emoji} alt="smile" height="50px" />
      <div className={styles.emailReceivedMsg}> Great—you’ll be the first to know! </div>
    </>
  );

  return (
    <div className={styles.container}>
      <img
        loading="lazy"
        alt="coming soon"
        src={comingSoonTag}
        className={styles.comingSoon}
      />
      <Link to="/" title="Home" className={styles.logoWrapper}>
        <img loading="lazy" alt="Honest Policy Logo" src={logo} />
      </Link>
      <div className={styles.slogan}>Honest prices, Honest policies.</div>
      <div className={styles.emailForm}>
        {emailSubmitted ? emailSubmittedView : initialView}
      </div>{' '}
      <span className={styles.footer}>© 2021 Honest Policy. All rights reserved.</span>
    </div>
  );
};

export default ComingSoonTemplate;
