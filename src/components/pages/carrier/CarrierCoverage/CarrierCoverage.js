import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import SomethingWrongDialog from '../../../dialogs/SomethingWrongDialog';
import Paper from '../../../utils/paper';
import Button from '../../../form-button';

import * as styles from './carrier-coverage.module.scss';

const OptionsTable = ({ isMobile, options, selected }) => {
  const toggleOptionsLength = () => {
    !isMobile
      ? max === options[selected].length
        ? setMax(6)
        : setMax(options[selected].length)
      : null;
    isMobile ? (max === options.length ? setMax(3) : setMax(options.length)) : null;
  };
  const [somethingWrongDialogOpen, setSomethingWrongDialogOpen] = React.useState(false);
  const [max, setMax] = useState(7);
  useEffect(() => {
    isMobile && setMax(3);
  }, [isMobile]);

  return (
    <>
      <SomethingWrongDialog
        open={somethingWrongDialogOpen}
        setOpen={setSomethingWrongDialogOpen}
      />
      <table className={styles.optionsContainer}>
        <thead>
          <tr className={styles.row}>
            <th className={styles.tableH}>Available Option</th>
            <th className={styles.tableH}>What it means</th>
          </tr>
        </thead>
        <tbody>
          {!isMobile
            ? options[selected].map(
                (option, idx) =>
                  idx < max && (
                    <tr
                      className={classNames(styles.row, { [styles.rowGray]: !(idx % 2) })}
                      key={idx}
                    >
                      <td>
                        <h5 className={styles.optionTitle}>{option.title}</h5>
                      </td>
                      <td colSpan={2}>
                        <p className={styles.optionDescription}>{option.description}</p>
                      </td>
                    </tr>
                  )
              )
            : options.map(
                (option, idx) =>
                  idx < max && (
                    <tr
                      className={classNames(styles.row, { [styles.rowGray]: !(idx % 2) })}
                      key={idx}
                    >
                      <td>
                        <h5 className={styles.optionTitle}>{option.title}</h5>
                      </td>
                      <td colSpan={2}>
                        <p className={styles.optionDescription}>{option.description}</p>
                      </td>
                    </tr>
                  )
              )}
        </tbody>
      </table>
      <div className={styles.carrierCoverageSeeMoreWrapper}>
        <Button type="primary" isOutline onClick={toggleOptionsLength}>
          {!isMobile ? (max !== options[selected].length ? 'See more' : 'Hide') : ''}
          {isMobile ? (max !== options.length ? 'See more' : 'Hide') : ''}
        </Button>
      </div>
    </>
  );
};
const CoverageOptions = ({
  name,
  isMobile,
  coveragesDescriptions,
  activeLineOfBusiness,
  hideCoverageMenu,
}) => {
  const optional = [];
  const standard = [];
  coveragesDescriptions.map(coverage => {
    if (coverage.data.Line_of_Business === activeLineOfBusiness) {
      let structuredOption = {
        title: coverage.data.Coverage_Name.replace(/_/g, ' '),
        description: coverage.data.Coverage_Description,
        type: coverage.data.Coverage_Type,
      };
      if (structuredOption.type === 'Optional') {
        optional.push(structuredOption);
      } else if (structuredOption.type === 'Standard') {
        standard.push(structuredOption);
      }
    }
  });

  const options = [];
  const optionsName = [];
  if (optional.length > 0) {
    options.push(optional);
    optionsName.push('Optional');
  }
  if (standard.length > 0) {
    options.push(standard);
    optionsName.push('Standard');
  }
  const [selected, setSelected] = useState(0);

  if (options.length === 0) {
    hideCoverageMenu();
    return <></>;
  } else
    return (
      <div id="coverages" className={styles.carrierCoverage}>
        <h2 className={styles.carrierCoverageTitle}>{name} Coverage Options</h2>
        <p className={styles.carrierCoverageDescription}>
          When it comes to their {activeLineOfBusiness.toLowerCase()}, everyone has a
          different situation and differing needs for protection. While every{' '}
          {activeLineOfBusiness.toLowerCase()} insurer offers the same standard coverages.
          they tend to differ when it comes to what they offer or optional additional
          protections. Below we list and describe all the extras offered by {name}
        </p>
        <div className={styles.carrierCoverageToggleWrapper}>
          <div className={styles.carrierCoverageToggle}>
            {optionsName.map((optionName, idx) => (
              <div
                key={idx}
                className={classNames(styles.carrierCoverageButton, {
                  [styles.carrierCoverageButtonActive]: selected === idx,
                })}
                onClick={() => setSelected(idx)}
              >
                {optionName}
              </div>
            ))}
          </div>
        </div>
        <Paper>
          {!isMobile ? (
            <OptionsTable isMobile={isMobile} options={options} selected={selected} />
          ) : (
            options.map((optionGroup, idx) => (
              <OptionsTable
                isMobile={isMobile}
                optionsName={optionsName}
                options={optionGroup}
                key={idx}
                optionIdx={idx}
              />
            ))
          )}
        </Paper>
      </div>
    );
};

CoverageOptions.propTypes = {
  name: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
  coveragesDescriptions: PropTypes.array.isRequired,
  activeLineOfBusiness: PropTypes.string,
  hideCoverageMenu: PropTypes.func,
};
OptionsTable.propTypes = {
  options: PropTypes.array.isRequired,
  isMobile: PropTypes.bool.isRequired,
  selected: PropTypes.number,
  optionsName: PropTypes.array,
  optionIdx: PropTypes.number,
};

export default CoverageOptions;
