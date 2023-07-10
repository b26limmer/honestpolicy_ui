import React from 'react';
import DarkBgPopup from '../../../../../popups/DarkBgPopup/DarkBgPopup';
import { Grid } from '@mui/material';
import { navigate } from '@reach/router';
import Button from '../../../../../form-button/FormButton';
import * as styles from './no-quotes-popup.module.scss';

const NoQuotesPopup = () => {
  return (
    <DarkBgPopup>
      <Grid
        alignItems="center"
        container
        justifyContent="center"
        direction="column"
        alignContent="center"
        classes={{ root: styles.noFormSubmittedContainer }}
      >
        <p className={styles.noQuotesText}>
          Looks like you haven&apos;t submitted a form yet.
          <br />
          Fill out one form to compare quotes from multiple carriers!
        </p>
        <Grid container justifyContent="space-evenly">
          <Button onClick={() => navigate('/quote-auto')}>Get a quote</Button>
          <Button isOutline onClick={() => navigate('/')}>
            Go home
          </Button>
        </Grid>
      </Grid>
    </DarkBgPopup>
  );
};

export default NoQuotesPopup;
