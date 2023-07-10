import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { Formik } from 'formik';

import Checkbox from '../../../../../inputs/Checkbox/Checkbox';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '../../../../../form-button/FormButton';

import * as styles from './filter-quote.module.scss';

const FilterQuotes = ({ open, setOpen }) => {
  const [scroll, setScroll] = React.useState('paper');

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          classes={{ root: styles.filterDialogTitle }}
        >
          <span>Filter Quotes</span>
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <Formik
              initialValues={{
                roadAssistance: false,
                collectorCar: false,
                noFaultCoverage: false,
                denfensiveDriver: false,
                antiTheftDevise: false,
                multipleVehicle: false,
                goodDriver: false,
                homeInsurance: false,
                healthInsurance: false,
                workLossCoverage: false,
              }}
              validateOnChange={false}
              onSubmit={async values => {}}
            >
              {({ values, errors, handleChange, handleSubmit, setFieldValue }) => (
                <Grid container>
                  <Grid item md={12} xs={12} sm={12}>
                    <h3>Add-Ons</h3>
                  </Grid>
                  <Grid item md={6} xs={12} sm={6}>
                    <div>
                      <Checkbox
                        checked={values.roadAssistance}
                        onChange={handleChange}
                        name="roadAssistance"
                        color="primary"
                      />
                      <label>RoadSide Assistance</label>
                    </div>
                    <div>
                      <Checkbox
                        checked={values.collectorCar}
                        onChange={handleChange}
                        name="collectorCar"
                        color="primary"
                      />
                      <label>Antique or Collector car</label>
                    </div>
                  </Grid>
                  <Grid item md={6} xs={12} sm={6}>
                    <div>
                      <Checkbox
                        checked={values.noFaultCoverage}
                        onChange={handleChange}
                        name="noFaultCoverage"
                        color="primary"
                      />
                      <label>No Fault Coverage</label>
                    </div>
                    <div>
                      <Checkbox
                        checked={values.workLossCoverage}
                        onChange={handleChange}
                        name="workLossCoverage"
                        color="primary"
                      />
                      <span>Work Loss Coverage</span>
                    </div>
                  </Grid>
                  <Grid item md={12} xs={12} sm={12}>
                    <div className={styles.filterExpandLink}>
                      <span>Show all add-ons</span>
                      <KeyboardArrowDownIcon />
                    </div>
                    <Divider />
                  </Grid>
                  <Grid item md={12} xs={12} sm={12}>
                    <h3>Discounts</h3>
                  </Grid>
                  <Grid item md={6} xs={12} sm={6}>
                    <div>
                      <Checkbox
                        checked={values.denfensiveDriver}
                        onChange={handleChange}
                        name="denfensiveDriver"
                        color="primary"
                      />
                      <label>Defensive Driver</label>
                    </div>
                    <div>
                      <Checkbox
                        checked={values.antiTheftDevise}
                        onChange={handleChange}
                        name="antiTheftDevise"
                        color="primary"
                      />
                      <label>Anti Theft Devise</label>
                    </div>
                  </Grid>
                  <Grid item md={6} xs={12} sm={6}>
                    <div>
                      <Checkbox
                        checked={values.multipleVehicle}
                        onChange={handleChange}
                        name="multipleVehicle"
                        color="primary"
                      />
                      <label>Multiple Vehicle</label>
                    </div>
                    <div>
                      <Checkbox
                        checked={values.goodDriver}
                        onChange={handleChange}
                        name="goodDriver"
                        color="primary"
                      />
                      <label>Good Driver</label>
                    </div>
                  </Grid>
                  <Grid item md={12} xs={12} sm={12}>
                    <div className={styles.filterExpandLink}>
                      <span>Show all discounts</span>
                      <KeyboardArrowDownIcon />
                    </div>
                    <Divider />
                  </Grid>
                  <Grid item md={12} xs={12} sm={12}>
                    <h3>Also Offers</h3>
                  </Grid>
                  <Grid item md={6} xs={12} sm={6}>
                    <div>
                      <Checkbox
                        checked={values.homeInsurance}
                        onChange={handleChange}
                        name="homeInsurance"
                        color="primary"
                      />
                      <label>Home Insurance</label>
                    </div>
                  </Grid>
                  <Grid item md={6} xs={12} sm={6}>
                    <div>
                      <Checkbox
                        checked={values.healthInsurance}
                        onChange={handleChange}
                        name="healthInsurance"
                        color="primary"
                      />
                      <label>Health Insurance</label>
                    </div>
                  </Grid>
                  <Grid item md={12} xs={12} sm={12}>
                    <div className={styles.filterExpandLink}>
                      <span>Show all options</span>
                      <KeyboardArrowDownIcon />
                    </div>
                    <Divider />
                  </Grid>
                  <Grid item md={12} xs={12} sm={12}>
                    <div className={styles.dialogBottom}>
                      <span
                        onClick={e => {
                          setFieldValue('roadAssistance', false);
                          setFieldValue('collectorCar', false);
                          setFieldValue('noFaultCoverage', false);
                          setFieldValue('denfensiveDriver', false);
                          setFieldValue('antiTheftDevise', false);
                          setFieldValue('multipleVehicle', false);
                          setFieldValue('goodDriver', false);
                          setFieldValue('homeInsurance', false);
                          setFieldValue('healthInsurance', false);
                          setFieldValue('workLossCoverage', false);
                        }}
                      >
                        Clear all
                      </span>
                      <Button>Show 20+ quotes</Button>
                    </div>
                  </Grid>
                </Grid>
              )}
            </Formik>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FilterQuotes;
