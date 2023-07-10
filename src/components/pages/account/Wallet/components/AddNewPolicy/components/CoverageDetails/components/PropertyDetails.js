import React from 'react';
import PropTypes from 'prop-types';
import OptionsSelect from '../../../../../../../../inputs/OptionsSelect/OptionsSelect';
import SliderInput from '../../../../../../../../inputs/SliderInput/SliderInput';
import SelectInput from '../../../../../../../../inputs/Select/Select';
import CurrencyInput from '../../../../../../../../inputs/CurrencyInput';
import FormBlock from '../../../../../../../../form/FormBlock/FormBlock';

const PropertyDetails = ({
  styles,
  handleAssetCoverageChange,
  idx,
  asset,
  coverageDetailsErrors,
}) => {
  const propertyDeductibleOptions = [
    'No Deductible',
    '$250',
    '$500',
    '$750',
    '$1,000',
    '$1,500',
    '$2,000',
    '$2,500',
    '$5,000',
    '1%',
    '2%',
    '3%',
    '4%',
    '5%',
    '6%',
    '7%',
    '8%',
    '9%',
    '10%',
  ];
  return (
    <>
      <div className={styles.formSection}>
        <FormBlock rootClassName={styles.questionBlock} isActive={true} block="start">
          <h3 className={styles.formSectionTitle}>
            How much are you covered? -{' '}
            <strong>
              {asset.city}, {asset.zipCode}
            </strong>
          </h3>
          <div className={styles.sliderToggleContainer}>
            <OptionsSelect
              options={[
                {
                  name: 'Coverage A (Dwelling)',
                  value: asset.coverageDetails.hasDwelling,
                },
              ]}
              onChange={option =>
                handleAssetCoverageChange(idx, 'hasDwelling', option[0].value)
              }
              multipleSelect={false}
              onCheckComponent={
                <CurrencyInput
                  onClick={e => e.stopPropagation()}
                  styles={styles.insideCheckTextInput}
                  value={asset.coverageDetails.dwelling}
                  onChange={value => handleAssetCoverageChange(idx, 'dwelling', value)}
                  placeholder="Coverage"
                  errors={
                    coverageDetailsErrors ? coverageDetailsErrors[idx].dwelling : ''
                  }
                />
              }
            />
          </div>
          <div className={styles.sliderToggleContainer}>
            <OptionsSelect
              options={[
                {
                  name: 'Coverage B (Other Structures)',
                  value: asset.coverageDetails.hasOtherStructures,
                },
              ]}
              onChange={option =>
                handleAssetCoverageChange(idx, 'hasOtherStructures', option[0].value)
              }
              multipleSelect={false}
            />
            {!!asset.coverageDetails.hasOtherStructures && (
              <>
                <SliderInput
                  labelLeft={'Coverage B (Other Structures)'}
                  labelRight="Coverage"
                  value={asset.coverageDetails.otherStructures}
                  onChange={value =>
                    handleAssetCoverageChange(idx, 'otherStructures', value)
                  }
                  max={50}
                  percentageField={true}
                  errors={
                    coverageDetailsErrors
                      ? coverageDetailsErrors[idx].otherStructures
                      : ''
                  }
                />
              </>
            )}
          </div>
          <div className={styles.sliderToggleContainer}>
            <OptionsSelect
              options={[
                {
                  name: 'Coverage C (Personal Property)',
                  value: asset.coverageDetails.hasPersonalProperty,
                },
              ]}
              onChange={option =>
                handleAssetCoverageChange(idx, 'hasPersonalProperty', option[0].value)
              }
              multipleSelect={false}
              onCheckComponent={
                <CurrencyInput
                  onClick={e => e.stopPropagation()}
                  styles={styles.insideCheckTextInput}
                  placeholder="Coverage"
                  value={asset.coverageDetails.personalProperty}
                  onChange={value =>
                    handleAssetCoverageChange(idx, 'personalProperty', value)
                  }
                  max={100000}
                  percentageField={false}
                  errors={
                    coverageDetailsErrors
                      ? coverageDetailsErrors[idx].personalProperty
                      : ''
                  }
                />
              }
            />
          </div>
          <div className={styles.sliderToggleContainer}>
            <OptionsSelect
              options={[
                {
                  name: 'Coverage D (Additional Living Expense)',
                  value: asset.coverageDetails.hasAdditionalLivingExpense,
                },
              ]}
              onChange={option =>
                handleAssetCoverageChange(
                  idx,
                  'hasAdditionalLivingExpense',
                  option[0].value
                )
              }
              multipleSelect={false}
            />
            {!!asset.coverageDetails.hasAdditionalLivingExpense && (
              <>
                <SliderInput
                  labelLeft={'Coverage D (Additional Living Expense)'}
                  labelRight="Coverage"
                  value={asset.coverageDetails.additionalLivingExpense}
                  onChange={value =>
                    handleAssetCoverageChange(idx, 'additionalLivingExpense', value)
                  }
                  max={50}
                  percentageField={true}
                  errors={
                    coverageDetailsErrors
                      ? coverageDetailsErrors[idx].additionalLivingExpense
                      : ''
                  }
                />
              </>
            )}
          </div>
          <div className={styles.sliderToggleContainer}>
            <OptionsSelect
              options={[
                {
                  name: 'Coverage E (Personal Liability)',
                  value: asset.coverageDetails.hasPersonalLiability,
                },
              ]}
              onChange={option =>
                handleAssetCoverageChange(idx, 'hasPersonalLiability', option[0].value)
              }
              multipleSelect={false}
            />
            {!!asset.coverageDetails.hasPersonalLiability && (
              <>
                <SliderInput
                  labelLeft={'Coverage E (Personal Liability)'}
                  labelRight="Coverage"
                  value={asset.coverageDetails.personalLiability}
                  onChange={value =>
                    handleAssetCoverageChange(idx, 'personalLiability', value)
                  }
                  max={1000000}
                  percentageField={false}
                  errors={
                    coverageDetailsErrors
                      ? coverageDetailsErrors[idx].personalLiability
                      : ''
                  }
                />
              </>
            )}
          </div>
          <div className={styles.sliderToggleContainer}>
            <OptionsSelect
              options={[
                {
                  name: 'Coverage F (Medical Payments)',
                  value: asset.coverageDetails.hasMedicalPayments,
                },
              ]}
              onChange={option =>
                handleAssetCoverageChange(idx, 'hasMedicalPayments', option[0].value)
              }
              multipleSelect={false}
            />
            {!!asset.coverageDetails.hasMedicalPayments && (
              <>
                <SliderInput
                  labelLeft={'Coverage F (Medical Payments)'}
                  labelRight="Coverage"
                  value={asset.coverageDetails.medicalPayments}
                  onChange={value =>
                    handleAssetCoverageChange(idx, 'medicalPayments', value)
                  }
                  max={1000000}
                  percentageField={false}
                  errors={
                    coverageDetailsErrors
                      ? coverageDetailsErrors[idx].medicalPayments
                      : ''
                  }
                />
              </>
            )}
          </div>
        </FormBlock>
        <div className={styles.sliderToggleContainer}>
          <label>Deductible</label>
          <SelectInput
            options={propertyDeductibleOptions.map(opt => {
              return { name: opt, value: opt };
            })}
            value={asset?.coverageDetails.deductible}
            onChange={e => handleAssetCoverageChange(idx, 'deductible', e.target.value)}
            errors={coverageDetailsErrors ? coverageDetailsErrors[idx].deductible : ''}
          />
        </div>
        <div className={styles.sliderToggleContainer}>
          <OptionsSelect
            options={[
              {
                name: 'Wind/Hail Deductible',
                value: asset.coverageDetails.hasWindHailDeductible,
              },
            ]}
            onChange={option =>
              handleAssetCoverageChange(idx, 'hasWindHailDeductible', option[0].value)
            }
            multipleSelect={false}
            onCheckComponent={
              <CurrencyInput
                onClick={e => e.stopPropagation()}
                styles={styles.insideCheckTextInput}
                placeholder="Coverage"
                percentageField={false}
                value={asset.coverageDetails.windHailDeductible}
                onChange={value =>
                  handleAssetCoverageChange(idx, 'windHailDeductible', value)
                }
                max={1000000}
                errors={
                  coverageDetailsErrors
                    ? coverageDetailsErrors[idx].windHailDeductible
                    : ''
                }
              />
            }
          />
        </div>
        <div className={styles.sliderToggleContainer}>
          <OptionsSelect
            options={[
              {
                name: 'Dwelling Replacement',
                value: asset.coverageDetails.hasDwellingReplacementCost,
              },
            ]}
            onChange={option =>
              handleAssetCoverageChange(
                idx,
                'hasDwellingReplacementCost',
                option[0].value
              )
            }
            multipleSelect={false}
          />
        </div>
        <div className={styles.sliderToggleContainer}>
          <OptionsSelect
            options={[
              {
                name: 'Personal Property Replacement Cost',
                value: asset.coverageDetails.hasPersonalPropertyReplacementCost,
              },
            ]}
            onChange={option =>
              handleAssetCoverageChange(
                idx,
                'hasPersonalPropertyReplacementCost',
                option[0].value
              )
            }
            multipleSelect={false}
          />
        </div>
      </div>
    </>
  );
};

PropertyDetails.propTypes = {
  styles: PropTypes.object.isRequired,
  handleAssetCoverageChange: PropTypes.func.isRequired,
  idx: PropTypes.number.isRequired,
  asset: PropTypes.object.isRequired,
  coverageDetailsErrors: PropTypes.any,
};

export default PropertyDetails;
