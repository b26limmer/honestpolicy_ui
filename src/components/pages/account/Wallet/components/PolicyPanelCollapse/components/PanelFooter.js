import React from 'react';
import PropTypes from 'prop-types';
import PencilIcon from '../../../../../../../Icons/pencil.svg';
import Grid from '@mui/material/Grid';

const PanelFooter = ({ styles, policyData, handleEditPolicy }) => {
  return (
    <Grid container>
      <Grid item md={6} sm={6} xs={6}>
        <label
          className={styles.getQuotes}
          onClick={() => {
            handleEditPolicy(policyData);
          }}
        >
          Get Quotes
        </label>
      </Grid>
      <Grid item md={6} sm={6} xs={6}>
        <label
          className={styles.editPolicy}
          onClick={() => {
            handleEditPolicy(policyData);
          }}
        >
          <img loading="lazy" src={PencilIcon} alt="Edit" />
          Edit Policy
        </label>
      </Grid>
    </Grid>
  );
};

PanelFooter.propTypes = {
  styles: PropTypes.object.isRequired,
  handleEditPolicy: PropTypes.func.isRequired,
  policyData: PropTypes.object.isRequired,
};

export default PanelFooter;
