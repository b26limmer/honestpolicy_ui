import React from 'react';
import PropTypes from 'prop-types';
import FormFooter from '../FormFooter';
import * as styles from './policyInfo.module.scss';
import SEO from '../../../../../../../layout/seo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/pro-regular-svg-icons';
import Select from '../../../../../../../inputs/Select/Select';
import { useStaticQuery, graphql } from 'gatsby';
import TextInput from '../../../../../../../inputs/TextInput/TextInput';
import AddOption from '../../../../../../../inputs/AddOption/AddOption';
import RemoveButton from '../../../../../../../RemoveButton/RemoveButton';
import { allStates } from '../../../../../../search/allStates';
import SliderInput from '../../../../../../../inputs/SliderInput';
import { navigate } from '@reach/router';
import FormBlock from '../../../../../../../form/FormBlock/FormBlock';
import InfoText from '../../../../../../../InfoText/InfoText';

const PolicyInfo = ({
  onSubmit,
  handleFormChange,
  policyData,
  validateForms,
  routeIdx,
  useRouteBaseValidation,
  setPercentageCompleted,
  formSteps,
  setFormSteps,
  updateBreadcrumbs,
}) => {
  const {
    allAirtable: { nodes: carriersData },
  } = useStaticQuery(graphql`
    query getWalletCarriers {
      allAirtable(
        sort: { fields: data___name, order: ASC }
        filter: {
          table: { eq: "Carriers" }
          data: { slug: { glob: "*" }, name: { glob: "*" } }
        }
      ) {
        nodes {
          id
          data {
            name
            slug
          }
        }
      }
    }
  `);
  const handleOptionSelect = e => {
    let selected;
    for (let i = 0; i < e.target.children.length; i++) {
      const element = e.target.children[i];
      if (element.selected) {
        selected = element;
        break;
      }
    }
    handleFormChange([
      {
        name: 'carrier',
        value: { name: selected.dataset.text, slug: e.target.value, discounts: false },
      },
    ]);
  };
  const maxPeopleCovered = 3;
  const handleAddPeopleCovered = () => {
    if (policyData.otherPeopleCovered.length >= maxPeopleCovered) return;
    let newPerson = { firstName: '', lastName: '' };
    handleFormChange([
      {
        name: 'otherPeopleCovered',
        value: [...policyData.otherPeopleCovered, newPerson],
      },
    ]);
  };
  const handleAddOtherPersonChange = (idx, field, value) => {
    let prev = policyData.otherPeopleCovered;
    prev[idx][field] = value;
    handleFormChange([
      {
        name: 'otherPeopleCovered',
        value: prev,
      },
    ]);
  };
  const handleRemoveOtherPeopleCovered = idx => {
    let prev = policyData.otherPeopleCovered;
    prev.splice(idx, 1);
    handleFormChange([
      {
        name: 'otherPeopleCovered',
        value: prev,
      },
    ]);
    validateForms(routeIdx);
  };
  const states = allStates.map(state => ({ value: state, text: state }));
  let otherPeopleErrors =
    policyData?.errors?.otherPeopleCovered?.length &&
    policyData.errors.otherPeopleCovered.length === policyData.otherPeopleCovered.length
      ? policyData.errors.otherPeopleCovered
      : undefined;
  useRouteBaseValidation(
    validateForms,
    routeIdx,
    setPercentageCompleted,
    formSteps,
    setFormSteps,
    updateBreadcrumbs
  );
  const policyDetailsActive =
    !!Object.keys(policyData.carrier).length && policyData?.carrier.slug;
  const policyNumberActive = policyDetailsActive && !!policyData?.insuranceName;
  const policyHolderActive = policyNumberActive && !!policyData?.policyNumber;
  const firstNameActive = policyHolderActive;
  const lastNameActive = firstNameActive && !!policyData?.firstName;
  const addOtherPeopleCoveredActive = lastNameActive && !!policyData?.lastName;
  const addressActive = addOtherPeopleCoveredActive;
  const cityActive = addressActive && !!policyData?.address;
  const stateActive = cityActive && !!policyData?.city;
  const zipActive = stateActive && !!policyData?.state;
  const effectiveDateActive = zipActive && !!policyData?.zip;
  const effectiveDateEndActive = effectiveDateActive && !!policyData?.effectiveDateStart;
  const monthlyCostActive = effectiveDateEndActive && !!policyData?.effectiveDateEnd;

  return (
    <div className={styles.formContainer}>
      <SEO title="Policy Info" />
      <FormBlock isActive={true} rootClassName={styles.initialContainer}>
        <div className={styles.initialContainer}>
          <FontAwesomeIcon icon={faUser} className={styles.formTopIcon} />
          <h2 className={styles.formTitle}>Let’s add your policy info.</h2>
          <p className={styles.questionTitle}>Who is your insurance carrier?</p>
          <Select
            rootClassName={styles.selectCarrier}
            options={carriersData.map(carrier => {
              return {
                text: carrier.data.name,
                value: carrier.data.slug,
              };
            })}
            errors={policyData.errors.carrier}
            value={policyData.carrier.slug}
            onChange={handleOptionSelect}
          />
        </div>
      </FormBlock>
      {policyDetailsActive && (
        <div className={styles.formSection}>
          <h3 className={styles.formSectionTitle}>Policy Details</h3>
          <FormBlock rootClassName={styles.questionBlock} isActive={true}>
            <label className={styles.itemTitle}>
              Policy Name
              <InfoText
                className={styles.infoText}
                helpText="This is how you will recognize your policy in your insurance Wallet"
              />
            </label>
            <TextInput
              value={policyData?.insuranceName}
              placeholder={'Policy Name'}
              onChangeFunc={v => handleFormChange([{ name: 'insuranceName', value: v }])}
              errors={policyData?.errors?.insuranceName}
            />
          </FormBlock>
          <FormBlock rootClassName={styles.questionBlock} isActive={policyNumberActive}>
            <label className={styles.itemTitle}>
              Policy Number{' '}
              <InfoText
                className={styles.infoText}
                helpText="The primary named insured on your policy documents."
              />
            </label>
            <TextInput
              value={policyData?.policyNumber}
              placeholder={'Policy Number'}
              onChangeFunc={v => handleFormChange([{ name: 'policyNumber', value: v }])}
              errors={policyData?.errors?.policyNumber}
            />
          </FormBlock>
          <FormBlock rootClassName={styles.questionBlock} isActive={policyHolderActive}>
            <label className={styles.itemTitle}>Policy Holder</label>
            <div className={styles.multipleInputContainer}>
              <FormBlock rootClassName={styles.questionBlock} isActive={firstNameActive}>
                <TextInput
                  value={policyData?.firstName}
                  placeholder={'First Name'}
                  onChangeFunc={v => handleFormChange([{ name: 'firstName', value: v }])}
                  errors={policyData?.errors?.firstName}
                />
              </FormBlock>
              <FormBlock rootClassName={styles.questionBlock} isActive={lastNameActive}>
                <TextInput
                  value={policyData?.lastName}
                  placeholder={'Last Name'}
                  onChangeFunc={v => handleFormChange([{ name: 'lastName', value: v }])}
                  errors={policyData?.errors?.lastName}
                />
              </FormBlock>
            </div>
          </FormBlock>
          {!!policyData.otherPeopleCovered.length && (
            <>
              <label className={styles.itemTitle}>Other People Covered</label>
              {policyData.otherPeopleCovered.map((person, idx) => (
                <div key={idx} className={styles.multipleInputContainer}>
                  <TextInput
                    value={person.firstName}
                    placeholder={'First Name'}
                    onChangeFunc={v => handleAddOtherPersonChange(idx, 'firstName', v)}
                    errors={otherPeopleErrors ? otherPeopleErrors[idx].firstName : ''}
                  />
                  <TextInput
                    value={person.lastName}
                    placeholder={'Last Name'}
                    onChangeFunc={v => handleAddOtherPersonChange(idx, 'lastName', v)}
                    errors={otherPeopleErrors ? otherPeopleErrors[idx].lastName : ''}
                  />
                  <RemoveButton
                    showText={false}
                    onClick={() => handleRemoveOtherPeopleCovered(idx)}
                    rootClassname={styles.removeOtherPeopleButton}
                  />
                </div>
              ))}
            </>
          )}
          {policyData.otherPeopleCovered.length < 3 && (
            <FormBlock
              rootClassName={styles.questionBlock}
              isActive={addOtherPeopleCoveredActive}
            >
              <AddOption
                rootClass={styles.addAnotherContainer}
                onClick={handleAddPeopleCovered}
                optionName={'Other People Covered'}
              />
            </FormBlock>
          )}
          <FormBlock
            rootClassName={styles.questionBlock}
            isActive={addOtherPeopleCoveredActive}
          >
            <FormBlock rootClassName={styles.questionBlock} isActive={addressActive}>
              <label className={styles.itemTitle}>Address</label>
              <TextInput
                value={policyData?.address}
                onChangeFunc={v => handleFormChange([{ name: 'address', value: v }])}
                placeholder={'Address'}
                autoComplete="street-address"
                errors={policyData.errors?.address}
              />
            </FormBlock>
            <div className={styles.multipleInputContainer}>
              <FormBlock rootClassName={styles.questionBlock} isActive={cityActive}>
                <TextInput
                  value={policyData?.city}
                  placeholder={'City'}
                  onChangeFunc={v => handleFormChange([{ name: 'city', value: v }])}
                  errors={policyData.errors?.city}
                  autoComplete="address-level2"
                />
              </FormBlock>
              <FormBlock rootClassName={styles.questionBlock} isActive={stateActive}>
                <Select
                  errors={policyData.errors?.state}
                  placeholder="State"
                  value={policyData?.state}
                  options={states}
                  onChange={e =>
                    handleFormChange([{ name: 'state', value: e.target.value }])
                  }
                />
              </FormBlock>
              <FormBlock rootClassName={styles.questionBlock} isActive={zipActive}>
                <TextInput
                  value={policyData?.zip}
                  placeholder={'ZIP'}
                  autoComplete="postal-code"
                  onChangeFunc={v => handleFormChange([{ name: 'zip', value: v }])}
                  errors={policyData.errors?.zip}
                />
              </FormBlock>
            </div>
          </FormBlock>
          <FormBlock rootClassName={styles.questionBlock} isActive={effectiveDateActive}>
            <label className={styles.itemTitle}>
              Effective Date
              <InfoText
                className={styles.infoText}
                helpText="The date when your current policy first went into effect."
              />
            </label>
            <div className={styles.multipleInputContainer}>
              <FormBlock
                rootClassName={styles.questionBlock}
                isActive={effectiveDateActive}
              >
                <label className={styles.dateLabel}>Start</label>
                <TextInput
                  value={policyData?.effectiveDateStart}
                  type="date"
                  onChangeFunc={v =>
                    handleFormChange([{ name: 'effectiveDateStart', value: v }])
                  }
                  errors={policyData.errors?.effectiveDateStart}
                />
              </FormBlock>
              <FormBlock
                rootClassName={styles.questionBlock}
                isActive={effectiveDateEndActive}
              >
                <label className={styles.dateLabel}>End</label>
                <TextInput
                  value={policyData?.effectiveDateEnd}
                  type="date"
                  onChangeFunc={v =>
                    handleFormChange([{ name: 'effectiveDateEnd', value: v }])
                  }
                  errors={policyData.errors?.effectiveDateEnd}
                />
              </FormBlock>
            </div>
          </FormBlock>
          <FormBlock rootClassName={styles.questionBlock} isActive={monthlyCostActive}>
            <label className={styles.itemTitle}>
              Monthly Cost
              <InfoText
                className={styles.infoText}
                helpText="The monthly premium or price you pay for your insurance policy."
              />
            </label>
            <SliderInput
              value={policyData.monthlyCost}
              onChange={value =>
                handleFormChange([{ name: 'monthlyCost', value: value }])
              }
              max={1000}
              percentageField={false}
              errors={policyData.errors?.monthlyCost}
              labelLeft={'Monthly Cost'}
              labelRight={'Cost'}
            />
          </FormBlock>
        </div>
      )}
      <FormFooter
        onSubmit={onSubmit}
        returnButtonText={'Back'}
        canSubmit={false}
        onReturn={() => navigate('./')}
      />
    </div>
  );
};

PolicyInfo.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleFormChange: PropTypes.func.isRequired,
  policyData: PropTypes.object.isRequired,
  validateForms: PropTypes.func.isRequired,
  routeIdx: PropTypes.number.isRequired,
  useRouteBaseValidation: PropTypes.func.isRequired,
  setPercentageCompleted: PropTypes.func.isRequired,
  formSteps: PropTypes.array.isRequired,
  setFormSteps: PropTypes.func.isRequired,
  updateBreadcrumbs: PropTypes.func.isRequired,
};

export default PolicyInfo;
