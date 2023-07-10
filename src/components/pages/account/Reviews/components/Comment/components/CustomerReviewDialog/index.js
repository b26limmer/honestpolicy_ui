import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Field } from 'formik';
import { gql, useMutation } from '@apollo/client';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import { withStyles } from '@mui/styles';
import MuiDialogTitle from '@mui/material/DialogTitle';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import RateComponent from '../../../../../../../rate/RateComponent';
import Input from '../../../../../../../inputs/Input/Input';
import Textarea from '../../../../../../../inputs/Textarea/Textarea';
import Select from '../../../../../../../inputs/Select/Select';
import * as styles from '../../../../../../../scss/carrier/customerReviewsDialog.module.scss';
import { AlertsContext } from '../../../../../../../state/AlertsContext';
import { statesList as states } from '../../../../../../../../utils/states';

const UPDATE_REVIEW = gql`
  mutation updateReview($input: UpdateReviewInput!) {
    updateReview(input: $input) {
      review {
        overall
        priceValue
        claimSatisfaction
        customerService
        lineOfBusiness
        recommend
        review
        userPolicy
        userState
      }
      errors
      success
    }
  }
`;

const materialStyles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    textAlign: 'center',
    paddingBottom: '44px',
    paddingTop: '44px',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(materialStyles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle className={classes.root} {...other}>
      {children}
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const GreenToggleButton = withStyles({
  root: {
    height: 36,
    minWidth: 100,
    border: '2px solid #808080',
    color: '#818187',
    '&.Mui-selected': {
      color: 'white',
      backgroundColor: '#808080',
      '&:hover': {
        backgroundColor: '#808080',
      },
    },
  },
  label: {
    textTransform: 'none',
  },
})(ToggleButton);

function CustomerReviewDialog({
  review,
  open,
  setOpen,
  carrierId,
  carrierName,
  updateReviewResponse,
}) {
  const [scroll] = useState('paper');

  const { dispatchAlert } = useContext(AlertsContext);
  // TODO: add dropdown for carrier selection in case there is no carrierId(In my preview page)
  // const [companyName, setCompanyName] = useState('');

  const [updateReview, { data }] = useMutation(UPDATE_REVIEW, {
    onError: error => {
      console.error(error);
    },
  });
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (data) {
      if (!data?.updateReview?.success) {
        dispatchAlert('Something unexpected happened');
      } else {
        dispatchAlert('Thank you.', 'success');
        handleClose(true);
        updateReviewResponse(data.updateReview.review);
      }
    }
  }, [data]);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth={'md'}
        style={{ width: '100%' }}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          className={styles.dialogTitle}
        >
          <span className={styles.modalTitle}>Leave a Review for {carrierName}</span>
        </DialogTitle>
        <DialogContent className={styles.dialogContentContainer}>
          <Formik
            initialValues={{
              reviewId: review?.id,
              policy: review?.userPolicy,
              overallRate: review?.overall * 2,
              review: review?.review,
              customerServiceRate: review?.customerService * 2,
              claimsProcessRate: review?.claimSatisfaction * 2,
              priceRate: review?.priceValue * 2,
              state: review?.userState,
              recommend: review?.recommend,
              lineOfBusiness: review?.lineOfBusiness,
            }}
            validate={values => {
              const errors = {};

              const requiredValues = [
                'lineOfBusiness',
                'overallRate',
                'review',
                'customerServiceRate',
                'claimsProcessRate',
                'priceRate',
                'state',
              ];

              requiredValues.forEach(item => {
                if (!values[item]) {
                  errors[item] = 'Required field';
                }
              });

              return errors;
            }}
            validateOnChange={false}
            onSubmit={async values => {
              try {
                await updateReview({
                  variables: {
                    input: {
                      id: values?.reviewId,
                      overall: values?.overallRate / 2.0,
                      priceValue: values?.priceRate / 2.0,
                      claimSatisfaction: values?.claimsProcessRate / 2.0,
                      customerService: values?.customerServiceRate / 2.0,
                      recommend: values?.recommend,
                      review: values?.review,
                      userPolicy: values?.policy,
                      userState: values?.state,
                      lineOfBusiness: values?.lineOfBusiness,
                    },
                  },
                });
              } catch (err) {
                dispatchAlert('Something unexpected happened');
              }
            }}
          >
            {({ values, errors, handleChange, handleSubmit }) => (
              <form className={styles.customerReviewForm} onSubmit={handleSubmit}>
                {!carrierId && ( // TODO: change to dropdown with carrier ids and names
                  <div className={styles.inputDiv}>
                    <label htmlFor="companyName">
                      What insurance Company would you like to review?
                    </label>
                    <Input
                      id="companyName"
                      name="review"
                      value={''}
                      // onChange ={e => setCompanyName(e.target.value)}
                      inputClassName={styles.reviewInput}
                      rootClassName={styles.inputCont}
                      size="middle"
                    />
                  </div>
                )}
                <Field
                  name="lineOfBusiness"
                  value={values?.lineOfBusiness}
                  render={({ form }) => {
                    return (
                      <div className={styles.inputDiv}>
                        <label htmlFor="lineOfBusiness">
                          What kind of policy was this for?
                        </label>
                        <ToggleButtonGroup
                          exclusive
                          value={values?.lineOfBusiness}
                          onChange={(e, p) => form.setFieldValue('lineOfBusiness', p)}
                          classes={{
                            root: styles.inputCont,
                            grouped: styles.inputContGroup,
                          }}
                        >
                          <GreenToggleButton
                            value="auto"
                            classes={{
                              selected: styles.inputContSelected,
                              label: styles.inputContLabel,
                            }}
                          >
                            Auto
                          </GreenToggleButton>
                          <GreenToggleButton
                            value="home"
                            classes={{
                              selected: styles.inputContSelected,
                              label: styles.inputContLabel,
                            }}
                          >
                            Home
                          </GreenToggleButton>
                        </ToggleButtonGroup>
                      </div>
                    );
                  }}
                />

                <Field
                  name="overallRate"
                  value={values?.overallRate}
                  render={({ form }) => {
                    return (
                      <div className={styles.inputDiv}>
                        <label htmlFor="">
                          Tell us about your experience, what score from 1-10 would you
                          give this company?
                        </label>
                        <RateComponent
                          error={errors?.overallRate}
                          start={1}
                          end={10}
                          step={1}
                          rate={values?.overallRate}
                          handleClick={rate => form.setFieldValue('overallRate', rate)}
                        />
                      </div>
                    );
                  }}
                />

                <div className={styles.inputDiv}>
                  <label htmlFor="review">
                    Why did you give {carrierName} a score of {values?.overallRate}?
                  </label>
                  <div className={styles.textAreaCont}>
                    <Textarea
                      hasError={errors?.review}
                      name="review"
                      id="textAreaCont"
                      cols="30"
                      rows="8"
                      value={values?.review}
                      onChange={handleChange}
                      className={styles.reviewTextArea}
                    />
                  </div>
                </div>

                <Field
                  name="customerServiceRate"
                  value={values?.customerServiceRate}
                  render={({ form }) => {
                    return (
                      <div className={styles.inputDiv}>
                        <label htmlFor="">
                          How would you rate {carrierName}&apos;s customer service?
                        </label>
                        <RateComponent
                          error={errors?.customerServiceRate}
                          start={1}
                          end={10}
                          step={1}
                          rate={values?.customerServiceRate}
                          handleClick={rate =>
                            form.setFieldValue('customerServiceRate', rate)
                          }
                        />
                      </div>
                    );
                  }}
                />
                <Field
                  name="claimsProcessRate"
                  value={values?.claimsProcessRate}
                  render={({ form }) => {
                    return (
                      <div className={styles.inputDiv}>
                        <label htmlFor="">
                          How would you rate {carrierName}&apos;s claims process handling?
                        </label>

                        <RateComponent
                          error={errors?.claimsProcessRate}
                          start={1}
                          end={10}
                          step={1}
                          rate={values?.claimsProcessRate}
                          handleClick={rate =>
                            form.setFieldValue('claimsProcessRate', rate)
                          }
                        />
                      </div>
                    );
                  }}
                />

                <Field
                  name="priceRate"
                  value={values?.priceRate}
                  render={({ form }) => {
                    return (
                      <div className={styles.inputDiv}>
                        <label htmlFor="">
                          How would you rate {carrierName}&apos;s value for the price?
                        </label>

                        <RateComponent
                          error={errors?.priceRate}
                          start={1}
                          end={10}
                          step={1}
                          rate={values?.priceRate}
                          handleClick={rate => form.setFieldValue('priceRate', rate)}
                        />
                      </div>
                    );
                  }}
                />

                <div className={styles.inputDiv}>
                  <label htmlFor="state">
                    Great! Thanks for sharing! One last thing, what state do you live in?
                  </label>
                  <Select
                    hasError={errors?.state}
                    name="state"
                    label=""
                    inputClassName={styles.inputSelect}
                    value={values?.state}
                    options={states}
                    onChange={handleChange}
                  />
                </div>
                <Field
                  name="recommend"
                  value={values?.recommend}
                  render={({ form }) => {
                    return (
                      <div className={styles.inputDiv}>
                        <label>Would you recommend this company to a friend?</label>
                        <ToggleButtonGroup
                          exclusive
                          value={values?.recommend}
                          onChange={(e, p) => form.setFieldValue('recommend', p)}
                          classes={{
                            root: styles.inputCont,
                            grouped: styles.inputContGroup,
                          }}
                        >
                          <GreenToggleButton
                            value={true}
                            classes={{
                              selected: styles.inputContSelected,
                              label: styles.inputContLabel,
                            }}
                          >
                            Yes
                          </GreenToggleButton>
                          <GreenToggleButton
                            value={false}
                            classes={{
                              selected: styles.inputContSelected,
                              label: styles.inputContLabel,
                            }}
                          >
                            No
                          </GreenToggleButton>
                        </ToggleButtonGroup>
                      </div>
                    );
                  }}
                />
                <div className={styles.submitCont}>
                  <Button type="submit" className={styles.submitBtn}>
                    Submit
                  </Button>
                  <Button className={styles.cancelBtn} onClick={handleClose}>
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
}

CustomerReviewDialog.propTypes = {
  review: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  carrierId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  carrierName: PropTypes.string,
  updateReviewResponse: PropTypes.func.isRequired,
};

export default CustomerReviewDialog;
