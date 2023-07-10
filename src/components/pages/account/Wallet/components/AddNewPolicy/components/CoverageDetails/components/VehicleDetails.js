import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../../../../../../inputs/TextInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAltFast } from '@fortawesome/pro-regular-svg-icons';
import SliderInput from '../../../../../../../../inputs/SliderInput/SliderInput';
import OptionsSelect from '../../../../../../../../inputs/OptionsSelect/OptionsSelect';
import InfoText from '../../../../../../../../InfoText/InfoText';
import FormBlock from '../../../../../../../../form/FormBlock/FormBlock';

const VehicleDetails = ({
  styles,
  handleAssetCoverageChange,
  idx,
  asset,
  coverageDetailsErrors,
  policyData,
  handleFormChange,
}) => {
  const combinedSingleLimitOptions = [
    { name: 'Yes', value: false },
    { name: 'No', value: false },
  ];
  const handlecombinedSingleLimitOptionsChange = (options, assetIdx) => {
    let selected = options.filter(option => option.value == true)[0];
    let prev = policyData.insuranceOptions;
    if (selected.name === 'Yes') {
      prev[assetIdx].coverageDetails.hasCombinedSingleLimit = true;
    } else {
      prev[assetIdx].coverageDetails.hasCombinedSingleLimit = false;
    }
    handleFormChange([
      {
        name: 'insuranceOptions',
        value: prev,
      },
    ]);
  };
  const additonalCoverageActive = () => {
    if (!asset?.coverageDetails?.hasCombinedSingleLimit) {
      if (
        asset?.coverageDetails?.bodilyInjuryPerson &&
        asset?.coverageDetails?.bodilyInjuryAccident &&
        asset?.coverageDetails?.propertyDamage
      ) {
        return true;
      }
    } else if (asset?.coverageDetails?.combinedSingleLimit) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <FormBlock isActive={true} rootClassName={styles.initialContainer}>
        <div className={styles.initialContainer}>
          <FontAwesomeIcon icon={faTachometerAltFast} className={styles.formTopIcon} />
          <h2 className={styles.formTitle}>
            How much are you covered? - {asset.year} {asset.model}
          </h2>
          <p className={styles.questionTitle}>
            Do you have a Combined Single Limit?
            <InfoText
              helpText="Combined single limit combines your property damage and bodily injury coverage, providing one stated limit per accident. If you have CSL coverage of $75,000, your insurer will pay for any combination of bodily injury and property damage repairs up to $75,000 per accident. That could entail $15,000 in property damage and $60,000 in medical bills, or the other way around."
              className={styles.tooltip}
            />
          </p>
          <div className={styles.optionsContainer}>
            <OptionsSelect
              options={combinedSingleLimitOptions}
              onChange={v => handlecombinedSingleLimitOptionsChange(v, idx)}
              selected={
                asset.coverageDetails.hasCombinedSingleLimit === undefined
                  ? ''
                  : asset.coverageDetails.hasCombinedSingleLimit === true
                  ? 'Yes'
                  : 'No'
              }
              multipleSelect={false}
              errors={policyData.errors.insuranceType}
            />
          </div>
        </div>
      </FormBlock>
      {asset.coverageDetails.hasCombinedSingleLimit !== undefined && (
        <>
          <div className={styles.formSection}>
            <h3 className={styles.formSectionTitle}>Bodily Injury & Property Damage</h3>
            {asset.coverageDetails.hasCombinedSingleLimit ? (
              <FormBlock rootClassName={styles.questionBlock} isActive={true}>
                <SliderInput
                  labelLeft={'Combined Single Limit'}
                  labelRight="Coverage"
                  value={asset.coverageDetails.combinedSingleLimit}
                  onChange={value =>
                    handleAssetCoverageChange(idx, 'combinedSingleLimit', value)
                  }
                  max={1000000}
                  percentageField={false}
                  errors={
                    coverageDetailsErrors
                      ? coverageDetailsErrors[idx].combinedSingleLimit
                      : ''
                  }
                />
              </FormBlock>
            ) : (
              <>
                <FormBlock rootClassName={styles.questionBlock} isActive={true}>
                  <SliderInput
                    labelLeft={'Bodily Injury (per person)'}
                    labelRight="Coverage"
                    value={asset.coverageDetails.bodilyInjuryPerson}
                    onChange={value =>
                      handleAssetCoverageChange(idx, 'bodilyInjuryPerson', value)
                    }
                    max={500000}
                    percentageField={false}
                    errors={
                      coverageDetailsErrors
                        ? coverageDetailsErrors[idx].bodilyInjuryPerson
                        : ''
                    }
                  />
                  <SliderInput
                    labelLeft={'Bodily Injury (per accident)'}
                    labelRight="Coverage"
                    value={asset.coverageDetails.bodilyInjuryAccident}
                    onChange={value =>
                      handleAssetCoverageChange(idx, 'bodilyInjuryAccident', value)
                    }
                    max={1000000}
                    percentageField={false}
                    errors={
                      coverageDetailsErrors
                        ? coverageDetailsErrors[idx].bodilyInjuryAccident
                        : ''
                    }
                  />
                  <SliderInput
                    labelLeft={'Property Damage'}
                    labelRight="Coverage"
                    value={asset.coverageDetails.propertyDamage}
                    onChange={value =>
                      handleAssetCoverageChange(idx, 'propertyDamage', value)
                    }
                    max={500000}
                    percentageField={false}
                    errors={
                      coverageDetailsErrors
                        ? coverageDetailsErrors[idx].propertyDamage
                        : ''
                    }
                  />
                </FormBlock>
              </>
            )}
          </div>
          <div className={styles.formSection}>
            <FormBlock
              rootClassName={styles.questionBlock}
              isActive={additonalCoverageActive(idx)}
              block="start"
              index={0}
            >
              <h3 className={styles.formSectionTitle}>Additional Coverage</h3>
              <label className={styles.itemTitle}>Check what applies:</label>
              <div className={styles.sliderToggleContainer}>
                <OptionsSelect
                  options={[
                    {
                      name: 'Comprehensive/Collision Deductible',
                      value: asset.coverageDetails.hasComprehensiveCollisionDeductible,
                      helpText:
                        'Comprehensive protects you against most perils your vehicle faces (that aren’t your fault). It’s generally quite affordable. Collision covers repair costs after running into things or being run into, regardless of fault. It can be much more expensive. Your deductible for these is the amount you pay before your insurer covers the rest. The lower the deductible, the more it costs.',
                    },
                  ]}
                  onChange={option =>
                    handleAssetCoverageChange(
                      idx,
                      'hasComprehensiveCollisionDeductible',
                      option[0].value
                    )
                  }
                  multipleSelect={false}
                />
                {!!asset.coverageDetails.hasComprehensiveCollisionDeductible && (
                  <FormBlock
                    rootClassName={styles.questionBlock}
                    isActive={
                      additonalCoverageActive(idx) &&
                      !!asset.coverageDetails.hasComprehensiveCollisionDeductible
                    }
                    index={0}
                  >
                    <SliderInput
                      labelLeft={'Comprehensive Deductible'}
                      labelRight="Deductible"
                      value={asset.coverageDetails.comprehensiveDeductible}
                      onChange={value =>
                        handleAssetCoverageChange(idx, 'comprehensiveDeductible', value)
                      }
                      max={5000}
                      percentageField={false}
                      errors={
                        coverageDetailsErrors
                          ? coverageDetailsErrors[idx].comprehensiveDeductible
                          : ''
                      }
                    />
                    <SliderInput
                      labelLeft={'Collision Deductible'}
                      labelRight="Deductible"
                      value={asset.coverageDetails.collisionDeductible}
                      onChange={value =>
                        handleAssetCoverageChange(idx, 'collisionDeductible', value)
                      }
                      max={5000}
                      percentageField={false}
                      errors={
                        coverageDetailsErrors
                          ? coverageDetailsErrors[idx].collisionDeductible
                          : ''
                      }
                    />
                  </FormBlock>
                )}
              </div>
              <div className={styles.sliderToggleContainer}>
                <OptionsSelect
                  options={[
                    {
                      name: 'Uninsured Motorist',
                      value: asset.coverageDetails.hasUninsuredMotorist,
                      helpText:
                        'This mimics your primary bodily injury and property damage coverage, but applies to cases where the other driver in an accident does not have insurance to cover your claims against them.',
                    },
                  ]}
                  onChange={option =>
                    handleAssetCoverageChange(
                      idx,
                      'hasUninsuredMotorist',
                      option[0].value
                    )
                  }
                  multipleSelect={false}
                />
                {!!asset.coverageDetails.hasUninsuredMotorist && (
                  <FormBlock
                    rootClassName={styles.questionBlock}
                    isActive={!!asset.coverageDetails.hasUninsuredMotorist}
                    index={0}
                  >
                    <SliderInput
                      labelLeft={'Bodily Injury (per person)'}
                      labelRight="Coverage"
                      value={asset.coverageDetails.uninsuredMotoristBodilyInjuryPerson}
                      onChange={value =>
                        handleAssetCoverageChange(
                          idx,
                          'uninsuredMotoristBodilyInjuryPerson',
                          value
                        )
                      }
                      max={500000}
                      percentageField={false}
                      errors={
                        coverageDetailsErrors
                          ? coverageDetailsErrors[idx].uninsuredMotoristBodilyInjuryPerson
                          : ''
                      }
                    />
                    <SliderInput
                      labelLeft={'Bodily Injury (per accident)'}
                      labelRight="Coverage"
                      value={asset.coverageDetails.uninsuredMotoristBodilyInjuryAccident}
                      onChange={value =>
                        handleAssetCoverageChange(
                          idx,
                          'uninsuredMotoristBodilyInjuryAccident',
                          value
                        )
                      }
                      max={500000}
                      percentageField={false}
                      errors={
                        coverageDetailsErrors
                          ? coverageDetailsErrors[idx]
                              .uninsuredMotoristBodilyInjuryAccident
                          : ''
                      }
                    />
                    <SliderInput
                      labelLeft={'Property Damage'}
                      labelRight="Coverage"
                      value={asset.coverageDetails.uninsuredMotoristPropertyDamage}
                      onChange={value =>
                        handleAssetCoverageChange(
                          idx,
                          'uninsuredMotoristPropertyDamage',
                          value
                        )
                      }
                      max={500000}
                      percentageField={false}
                      errors={
                        coverageDetailsErrors
                          ? coverageDetailsErrors[idx].uninsuredMotoristPropertyDamage
                          : ''
                      }
                    />
                  </FormBlock>
                )}
              </div>
              <div className={styles.sliderToggleContainer}>
                <OptionsSelect
                  options={[
                    {
                      name: 'Underinsured Motorist',
                      value: asset.coverageDetails.hasUnderInsuredMotorist,
                      helpText:
                        'This works like your primary bodily injury and property damage coverage, but is for when the other driver in a crash doesn’t have enough insurance to cover your claims against them.',
                    },
                  ]}
                  onChange={option =>
                    handleAssetCoverageChange(
                      idx,
                      'hasUnderInsuredMotorist',
                      option[0].value
                    )
                  }
                  multipleSelect={false}
                />
                {!!asset.coverageDetails.hasUnderInsuredMotorist && (
                  <FormBlock
                    rootClassName={styles.questionBlock}
                    isActive={!!asset.coverageDetails.hasUnderInsuredMotorist}
                    index={0}
                  >
                    <SliderInput
                      labelLeft={'Bodily Injury (per person)'}
                      labelRight="Coverage"
                      value={asset.coverageDetails.underInsuredMotoristBodilyInjuryPerson}
                      onChange={value =>
                        handleAssetCoverageChange(
                          idx,
                          'underInsuredMotoristBodilyInjuryPerson',
                          value
                        )
                      }
                      max={500000}
                      percentageField={false}
                      errors={
                        coverageDetailsErrors
                          ? coverageDetailsErrors[idx]
                              .underInsuredMotoristBodilyInjuryPerson
                          : ''
                      }
                    />
                    <SliderInput
                      labelLeft={'Bodily Injury (per accident)'}
                      labelRight="Coverage"
                      value={
                        asset.coverageDetails.underInsuredMotoristBodilyInjuryAccident
                      }
                      onChange={value =>
                        handleAssetCoverageChange(
                          idx,
                          'underInsuredMotoristBodilyInjuryAccident',
                          value
                        )
                      }
                      max={500000}
                      percentageField={false}
                      errors={
                        coverageDetailsErrors
                          ? coverageDetailsErrors[idx]
                              .underInsuredMotoristBodilyInjuryAccident
                          : ''
                      }
                    />
                    <SliderInput
                      labelLeft={'Property Damage'}
                      labelRight="Coverage"
                      value={asset.coverageDetails.underInsuredMotoristPropertyDamage}
                      onChange={value =>
                        handleAssetCoverageChange(
                          idx,
                          'underInsuredMotoristPropertyDamage',
                          value
                        )
                      }
                      max={500000}
                      percentageField={false}
                      errors={
                        coverageDetailsErrors
                          ? coverageDetailsErrors[idx].underInsuredMotoristPropertyDamage
                          : ''
                      }
                    />
                  </FormBlock>
                )}
              </div>
              <div className={styles.sliderToggleContainer}>
                <OptionsSelect
                  options={[
                    {
                      name: 'Medical Payments',
                      value: asset.coverageDetails.hasMedicalPayments,
                      helpText:
                        'This optional coverage helps pay for medical and funeral costs after an accident, regardless of fault.',
                    },
                  ]}
                  onChange={option =>
                    handleAssetCoverageChange(idx, 'hasMedicalPayments', option[0].value)
                  }
                  multipleSelect={false}
                />
                {!!asset.coverageDetails.hasMedicalPayments && (
                  <FormBlock
                    rootClassName={styles.questionBlock}
                    isActive={!!asset.coverageDetails.hasMedicalPayments}
                  >
                    <SliderInput
                      labelLeft={'Medical Payments'}
                      labelRight="Coverage"
                      value={asset.coverageDetails.medicalPayments}
                      onChange={value =>
                        handleAssetCoverageChange(idx, 'medicalPayments', value)
                      }
                      max={10000}
                      percentageField={false}
                      errors={
                        coverageDetailsErrors
                          ? coverageDetailsErrors[idx].medicalPayments
                          : ''
                      }
                    />
                  </FormBlock>
                )}
              </div>
              <div className={styles.sliderToggleContainer}>
                <OptionsSelect
                  options={[
                    {
                      name: 'PIP (Personal Injury Protection)',
                      value: asset.coverageDetails.hasPip,
                      helpText:
                        'Similar to Medical Payments coverage, this pays for medical bills and lost wages if you or your passengers are injured.',
                    },
                  ]}
                  onChange={option =>
                    handleAssetCoverageChange(idx, 'hasPip', option[0].value)
                  }
                  multipleSelect={false}
                />
                {!!asset.coverageDetails.hasPip && (
                  <FormBlock
                    rootClassName={styles.questionBlock}
                    isActive={!!asset.coverageDetails.hasPip}
                  >
                    <SliderInput
                      labelLeft={'PIP'}
                      labelRight="Coverage"
                      value={asset.coverageDetails.personalInjuryProtection}
                      onChange={value =>
                        handleAssetCoverageChange(idx, 'personalInjuryProtection', value)
                      }
                      max={5000}
                      percentageField={false}
                      errors={
                        coverageDetailsErrors
                          ? coverageDetailsErrors[idx].personalInjuryProtection
                          : ''
                      }
                    />
                  </FormBlock>
                )}
              </div>
              <h3 className={styles.formSectionTitle}>Additional Notes</h3>
              <TextInput
                value={asset.coverageDetails.additionalNotes}
                onChangeFunc={v => handleAssetCoverageChange(idx, 'additionalNotes', v)}
              />
            </FormBlock>
          </div>
        </>
      )}
    </>
  );
};

VehicleDetails.propTypes = {
  styles: PropTypes.object.isRequired,
  handleAssetCoverageChange: PropTypes.func.isRequired,
  handleFormChange: PropTypes.func.isRequired,
  idx: PropTypes.number.isRequired,
  asset: PropTypes.object.isRequired,
  policyData: PropTypes.object.isRequired,
  coverageDetailsErrors: PropTypes.any,
};

export default VehicleDetails;
