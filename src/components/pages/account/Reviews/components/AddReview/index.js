import React, { useEffect, useState, useContext } from 'react';
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
import Textarea from '../../../../../inputs/Textarea/Textarea';
import Select from '../../../../../inputs/Select/Select';
import * as styles from './add-review.module.scss';
import VeryBad from '../../../../../../Icons/1.png';
import Bad from '../../../../../../Icons/2.png';
import Ok from '../../../../../../Icons/3.png';
import Great from '../../../../../../Icons/4.png';
import Amazing from '../../../../../../Icons/5.png';
import { ReviewSchema } from './validationSchema';
import { AlertsContext } from '../../../../../state/AlertsContext';
import { statesList as states } from '../../../../../../utils/states';

const CREATE_REVIEW = gql`
  mutation createReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      review {
        id
        overall
        carrierId
        claimSatisfaction
        stars
        customerService
        recommend
        review
        createdAt
        userState
        lineOfBusiness
        cachedWeightedAverage
        priceValue
        user {
          firstName
          lastName
        }
        carrier {
          name
        }
      }
      clientMutationId
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
  selected: {},
  label: {
    textTransform: 'none',
  },
})(ToggleButton);

function AddReviewDialog({
  open,
  setOpen,
  carrierId,
  carrierName,
  reviewData,
  handleUpdateData,
}) {
  const [scroll] = useState('paper');
  const { dispatchAlert } = useContext(AlertsContext);

  const [createReview, { data }] = useMutation(CREATE_REVIEW, {
    errorPolicy: 'all',
  });

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (data) {
      if (!data?.createReview?.success) {
        dispatchAlert('Something unexpected happened');
      } else {
        handleUpdateData(data.createReview);
        dispatchAlert('Thank you.', 'success');
        handleClose(true);
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
        fullWidth={true}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          className={styles.dialogTitle}
        >
          <span className={styles.modalTitle}>Leave a Review for {carrierName}</span>
        </DialogTitle>
        <Formik
          initialValues={{
            policy: reviewData?.lineOfBusiness || 'home',
            overallRate: reviewData?.overall || 0,
            review: reviewData?.review || '',
            customerServiceRate: reviewData?.customerService || 0,
            claimsProcessRate: reviewData?.claimSatisfaction || 0,
            priceRate: reviewData?.priceValue || 0,
            state: reviewData?.userState || '',
            recommend: reviewData?.recommend || false,
          }}
          // validateOnChange={false}
          validationSchema={ReviewSchema}
          onSubmit={async values => {
            try {
              await createReview({
                variables: {
                  input: {
                    id: reviewData?.id || null,
                    carrierId: carrierId,
                    overall: values?.overallRate,
                    priceValue: values?.priceRate,
                    claimSatisfaction: values?.claimsProcessRate,
                    customerService: values?.customerServiceRate,
                    recommend: values?.recommend,
                    review: values?.review,
                    lineOfBusiness: values?.policy,
                    userState: values?.state,
                  },
                },
              });
            } catch (err) {
              dispatchAlert('Something unexpected happened');
            }
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <div className={styles.line} />
                <Field name="policy" value={values?.policy}>
                  {({ form }) => (
                    <div className={styles.inputDiv}>
                      <label htmlFor="policy" className={styles.fontBold}>
                        What kind of policy was this for?
                      </label>
                      <ToggleButtonGroup
                        exclusive
                        value={values?.policy}
                        onChange={(e, p) => form.setFieldValue('policy', p)}
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
                  )}
                </Field>
                <div className={styles.line} />
                <Field name="overallRate" value={values?.overallRate}>
                  {({ form }) => (
                    <div className={styles.inputDiv}>
                      <label htmlFor="">
                        How was your{' '}
                        <span className={styles.fontBold}>overall experience </span>?
                      </label>
                      <EmojiRate
                        active={values?.overallRate || 0}
                        handleClick={rate => form.setFieldValue('overallRate', rate)}
                      />
                      {errors.overallRate && touched.overallRate && (
                        <p className={styles.errorClass}> {errors.overallRate} </p>
                      )}
                    </div>
                  )}
                </Field>
                <div className={styles.inputDiv}>
                  <div className={styles.textAreaCont}>
                    <label htmlFor="review">
                      Why was your experience{' '}
                      <span className={styles.fontBold}>
                        {Emojis[values?.overallRate]}{' '}
                      </span>
                      ?
                    </label>
                    <Textarea
                      hasError={errors?.review && touched?.review}
                      name="review"
                      id="textAreaCont"
                      cols="30"
                      rows="8"
                      value={values?.review}
                      onChange={handleChange}
                      className={styles.reviewTextArea}
                    />
                    {errors.review && touched.review && (
                      <p className={styles.errorClass}> {errors.review} </p>
                    )}
                  </div>
                </div>
                <div className={styles.line} />
                <Field name="customerServiceRate" value={values?.customerServiceRate}>
                  {({ form }) => {
                    return (
                      <div className={styles.inputDiv}>
                        <label htmlFor="">
                          How would you rate {carrierName}&apos;s{' '}
                          <span className={styles.fontBold}>customer service</span>?
                        </label>
                        <EmojiRate
                          active={values?.customerServiceRate}
                          handleClick={rate =>
                            form.setFieldValue('customerServiceRate', rate)
                          }
                        />
                        {errors.customerServiceRate && touched.customerServiceRate && (
                          <p className={styles.errorClass}>
                            {' '}
                            {errors.customerServiceRate}{' '}
                          </p>
                        )}
                      </div>
                    );
                  }}
                </Field>
                <div className={styles.line} />
                <Field name="claimsProcessRate" value={values?.claimsProcessRate}>
                  {({ form }) => {
                    return (
                      <div className={styles.inputDiv}>
                        <label htmlFor="">
                          How would you rate {carrierName}&apos;s{' '}
                          <span className={styles.fontBold}>claims process handling</span>
                          ?
                        </label>
                        <EmojiRate
                          active={values?.claimsProcessRate}
                          handleClick={rate =>
                            form.setFieldValue('claimsProcessRate', rate)
                          }
                        />
                        {errors.claimsProcessRate && touched.claimsProcessRate && (
                          <p className={styles.errorClass}>
                            {' '}
                            {errors.claimsProcessRate}{' '}
                          </p>
                        )}
                      </div>
                    );
                  }}
                </Field>
                <div className={styles.line} />
                <Field name="priceRate" value={values?.priceRate}>
                  {({ form }) => {
                    return (
                      <div className={styles.inputDiv}>
                        <label htmlFor="">
                          How would you rate {carrierName}&apos;s
                          <span className={styles.fontBold}> value for the price </span>?
                        </label>
                        <EmojiRate
                          active={values?.priceRate || 0}
                          handleClick={rate => form.setFieldValue('priceRate', rate)}
                        />
                        {errors.priceRate && touched.priceRate && (
                          <p className={styles.errorClass}> {errors.priceRate} </p>
                        )}
                      </div>
                    );
                  }}
                </Field>
                <div className={styles.line} />
                <div className={styles.inputDiv}>
                  <label htmlFor="state">
                    <span className={styles.fontBold}>
                      One last thing, what state do you live in?{' '}
                    </span>
                  </label>
                  <Select
                    hasError={errors?.state && touched?.state}
                    name="state"
                    label=""
                    inputClassName={styles.inputSelect}
                    value={values?.state}
                    options={states}
                    onChange={handleChange}
                  />
                  {errors.state && touched.state && (
                    <p className={styles.errorClass}> {errors.state} </p>
                  )}
                </div>
                <div className={styles.line} />
                <Field name="recommend" value={values?.recommend}>
                  {({ form }) => {
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
                </Field>
              </DialogContent>
              <div className={styles.footer}>
                <div className={styles.cancelCont} onClick={handleClose}>
                  Cancel
                </div>
                <Button type="submit" className={styles.submitBtn}>
                  Submit Review
                </Button>
                <div className={styles.cancelCont} />
              </div>
            </form>
          )}
        </Formik>
      </Dialog>
    </>
  );
}

const Emojis = ['', 'Very Bad', 'Bad', 'Ok', 'Great', 'Amazing'];
const EmojiRate = ({ active, handleClick }) => {
  const isActive = rate => (active === rate ? styles.emojiActive : styles.emoji);
  return (
    <div className={styles.emojiRate}>
      <div className={styles.emojiContainer} onClick={() => handleClick(1)}>
        <div className={isActive(1)}>
          <img loading="lazy" src={VeryBad} alt="1" />
        </div>
        <label>Very Bad</label>
      </div>
      <div className={styles.emojiContainer} onClick={() => handleClick(2)}>
        <div className={isActive(2)}>
          <img loading="lazy" src={Bad} alt="2" />
        </div>
        <label>Bad</label>
      </div>
      <div className={styles.emojiContainer} onClick={() => handleClick(3)}>
        <div className={isActive(3)}>
          <img loading="lazy" src={Ok} alt="3" />
        </div>
        <label>Ok</label>
      </div>
      <div className={styles.emojiContainer} onClick={() => handleClick(4)}>
        <div className={isActive(4)}>
          <img loading="lazy" src={Great} alt="4" />
        </div>
        <label>Great</label>
      </div>
      <div className={styles.emojiContainer} onClick={() => handleClick(5)}>
        <div className={isActive(5)}>
          <img loading="lazy" src={Amazing} alt="5" />
        </div>
        <label>Amazing</label>
      </div>
    </div>
  );
};

EmojiRate.propTypes = {
  active: PropTypes.number,
  handleClick: PropTypes.func,
};

AddReviewDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  carrierId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  carrierName: PropTypes.string,
  reviewData: PropTypes.object,
  handleUpdateData: PropTypes.func,
};

export default AddReviewDialog;
