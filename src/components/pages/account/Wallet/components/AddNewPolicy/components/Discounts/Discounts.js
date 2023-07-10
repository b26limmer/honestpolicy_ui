import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import SEO from '../../../../../../../layout/seo';
import hpLogo from '../../../../../../../../images/logos/hpDoubleShield.png';
import hpLetterLogo from '../../../../../../../../images/logos/hpLetterLogo.png';
import * as styles from './discounts.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPig } from '@fortawesome/pro-regular-svg-icons';
import OptionsSelect from '../../../../../../../inputs/OptionsSelect/OptionsSelect';
import FormFooter from '../FormFooter/FormFooter';
import { useStaticQuery } from 'gatsby';
import { graphql } from 'gatsby';
import { navigate } from '@reach/router';
import FormBlock from '../../../../../../../form/FormBlock/FormBlock';
import InfoText from '../../../../../../../InfoText/InfoText';

const Discounts = ({
  onSubmit,
  handleFormChange,
  policyData,
  validateForms,
  routeIdx,
  useRouteBaseValidation,
  setPercentageCompleted,
  formSteps,
  setFormSteps,
  createPolicyLoading,
  updateBreadcrumbs,
}) => {
  const {
    allAirtable: { nodes: carrierNodes },
  } = useStaticQuery(graphql`
    query getCarriersDiscounts {
      allAirtable(
        filter: { table: { eq: "Carriers" } }
        sort: { fields: data___name, order: ASC }
      ) {
        nodes {
          data {
            slug
            name
            Carrier_Discounts {
              data {
                Line
                Discount_Data
                Discount {
                  data {
                    Discount_Name
                    Description
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
  let insuranceType =
    policyData.insuranceType === 'Vehicle'
      ? 'auto'
      : policyData.insuranceType === 'Property'
      ? 'home'
      : 'personal';
  const filteredCarrier = carrierNodes.filter(node => {
    if (Object.keys(policyData.carrier).length) {
      return node.data.slug === policyData.carrier?.slug;
    }
  });

  useEffect(() => {
    if (!policyData.carrier.discounts) {
      let carrierDiscounts = [];
      if (filteredCarrier.length > 0) {
        if (filteredCarrier[0].data.Carrier_Discounts) {
          filteredCarrier[0].data.Carrier_Discounts.forEach(discount => {
            let line = discount.data.Line;
            if (insuranceType === line) {
              carrierDiscounts.push({
                name: discount.data.Discount[0].data.Discount_Name,
                helpText: discount.data.Discount[0].data.Description,
                line: line,
                discountData: discount.data.Discount_Data,
                value: false,
              });
            }
          });
        }
        let prev = policyData.carrier;
        prev.discounts = carrierDiscounts;
        handleFormChange([{ name: 'carrier', value: prev }]);
      }
    }
  }, [filteredCarrier]);

  useRouteBaseValidation(
    validateForms,
    routeIdx,
    setPercentageCompleted,
    formSteps,
    setFormSteps,
    updateBreadcrumbs
  );
  const initialDiscountsOptions = [
    { name: 'Yes', value: false },
    { name: 'No', value: false },
  ];
  const handleDiscountsChange = options => {
    let prev = policyData.carrier;
    let selected = options.filter(option => option.value == true)[0];
    if (selected.name === 'Yes') {
      prev.hasDiscounts = true;
      handleFormChange([{ name: 'carrier', value: prev }]);
    } else {
      prev.hasDiscounts = false;
      handleFormChange([{ name: 'carrier', value: prev }]);
    }
  };
  const handleDiscountChange = changedOptions => {
    let prev = policyData.carrier;
    prev.discounts = changedOptions;
    handleFormChange([{ name: 'carrier', value: prev }]);
  };
  const handleAddOption = () => {
    let prev = policyData.carrier;
    let newCustomOption = {
      name: '',
      line: insuranceType,
      discountData: '',
      value: true,
      isCustomOption: true,
    };
    prev.discounts = [...prev.discounts, newCustomOption];
    handleFormChange([{ name: 'carrier', value: prev }]);
  };

  return (
    <>
      <SEO title="Discounts" />
      <FormBlock isActive={true} rootClassName={styles.initialContainer}>
        <div className={styles.initialContainer}>
          {!createPolicyLoading ? (
            <>
              <FontAwesomeIcon icon={faPig} className={styles.formTopIcon} />
              <h2 className={styles.formTitle}>Get your discounts.</h2>
              <p className={styles.questionTitle}>
                Do you have insurance discounts?
                <InfoText
                  helpText="There are many things which can qualify you for discounts on your insurance policy. We have a comprehensive list of the most common ones to select from."
                  className={styles.tooltip}
                />
              </p>
              <div className={styles.optionsContainer}>
                <OptionsSelect
                  options={initialDiscountsOptions}
                  onChange={v => handleDiscountsChange(v)}
                  selected={
                    policyData.carrier?.hasDiscounts === undefined
                      ? ''
                      : policyData.carrier?.hasDiscounts === true
                      ? 'Yes'
                      : 'No'
                  }
                  multipleSelect={false}
                  errors={policyData.errors?.carrier?.hasDiscounts}
                />
              </div>
            </>
          ) : (
            <div className={styles.loadingContainer}>
              <img loading="lazy" className={styles.logo} src={hpLogo} alt="HP logo" />
              <img
                loading="lazy"
                className={styles.logoLetter}
                src={hpLetterLogo}
                alt="HP Letter logo"
              />
              <h4 className={styles.loadingText}>Great—we’re adding your policy!</h4>
              <div className={styles.loadingIndicator}>
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
        </div>
      </FormBlock>
      {!createPolicyLoading && !!policyData.carrier?.hasDiscounts && (
        <div className={styles.formSection}>
          <FormBlock rootClassName={styles.questionBlock} isActive={true} block="start">
            <h3 className={styles.formSectionTitle}>Available Discounts</h3>
            <OptionsSelect
              options={policyData.carrier.discounts}
              onChange={changedOptions => handleDiscountChange(changedOptions)}
              multipleSelect={true}
              errors={policyData.errors.discounts}
              canAddEditableOption={true}
              addOptionButtonText={'Add special discount'}
              handleAddOption={handleAddOption}
            />
          </FormBlock>
        </div>
      )}
      <FormFooter
        nextActionText="Submit"
        onSubmit={!createPolicyLoading ? onSubmit : () => {}}
        canSubmit={false}
        returnButtonText="Back"
        onReturn={() => navigate('./addons')}
      />
    </>
  );
};

Discounts.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleFormChange: PropTypes.func.isRequired,
  policyData: PropTypes.object.isRequired,
  validateForms: PropTypes.func.isRequired,
  routeIdx: PropTypes.number.isRequired,
  useRouteBaseValidation: PropTypes.func.isRequired,
  setPercentageCompleted: PropTypes.func.isRequired,
  formSteps: PropTypes.array.isRequired,
  setFormSteps: PropTypes.func.isRequired,
  createPolicyLoading: PropTypes.bool,
  updateBreadcrumbs: PropTypes.func.isRequired,
};

export default Discounts;
