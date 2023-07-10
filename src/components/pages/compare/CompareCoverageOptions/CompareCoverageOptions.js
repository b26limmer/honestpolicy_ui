import React, { useState } from 'react';
import { Grid } from '@mui/material';
import CheckCircle from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Hidden from '@mui/material/Hidden';
import Switch from '../../../inputs/Switch/Switch';
import OptionsToggle from '../../../options-toggle/OptionsToggle';
import * as styles from '../../../scss/carrier/coverageOptions.module.scss';
import PropTypes from 'prop-types';

const OptionRow = ({ option, carriers, showDiff }) => {
  const carriersIncludingOption = carriers.filter(c => {
    return c.options.find(cOption => {
      return cOption.title === option.title;
    });
  });

  const isDiff =
    showDiff &&
    (carriers.length !== carriersIncludingOption.length || !carriersIncludingOption);

  const isDiffClass = isDiff && styles.isDiff;

  return (
    <Grid classes={{ root: `${styles.optionsRow} ${isDiffClass}` }} container>
      <Grid classes={{ root: styles.optionsNameContainer }} xs={12} md={3} item>
        {option.title}
      </Grid>
      {carriers.map((c, idx) => {
        const included = c.options.find(cOption => {
          return cOption.title === option.title;
        });

        return (
          <Grid
            item
            key={idx}
            xs={12}
            className={styles.optionsCell}
            md
            style={{ display: 'flex' }}
          >
            <Grid classes={{ root: styles.optionsIconContainer }} container>
              <Hidden mdUp>
                <Grid item xs={6}>
                  <h3 style={{ fontFamily: 'Montserrat' }}>{c.name}</h3>
                </Grid>
              </Hidden>
              <Grid classes={{ root: styles.optionsIconCell }} item xs={6} md>
                {included ? (
                  <CheckCircle
                    style={{ color: c.color }}
                    classes={{ root: styles.optionsIcon }}
                  />
                ) : (
                  <RemoveCircleIcon
                    style={{ color: '#C4C4C4' }}
                    classes={{ root: styles.optionsIcon }}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        );
      })}
      {carriers.length === 1 && <Grid item xs={12} sm />}
    </Grid>
  );
};
OptionRow.propTypes = {
  option: PropTypes.object,
  carriers: PropTypes.array,
  showDiff: PropTypes.bool,
};
const OptionsTable = ({ options, selected, optionsName, carriers }) => {
  const [showDiff, setShowDiff] = useState(false);
  const partialCarriers = carriers.map(carrier => {
    return {
      color: carrier.color,
      name: carrier.name,
      options: carrier.options[optionsName[selected].toLowerCase()],
    };
  });

  return (
    <Grid container classes={{ root: styles.optionsContainer }}>
      <Grid container alignItems="center" classes={{ root: styles.optionHeaderRow }}>
        <Grid item xs classes={{ root: styles.tableH }}>
          Available Options
        </Grid>
        <Grid classes={{ root: styles.diffContainer }} item xs>
          <Grid container>
            <Grid item xs={12} md={10} classes={{ root: styles.showMeDiff }}>
              <span className={styles.diffText}>Show me the differences</span>
            </Grid>
            <Grid item xs={12} md={2} classes={{ root: styles.showMeDiffSwitch }}>
              <Switch checked={showDiff} onChange={setShowDiff} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {options[selected].map((o, idx) => (
        <OptionRow key={idx} option={o} carriers={partialCarriers} showDiff={showDiff} />
      ))}
    </Grid>
  );
};
OptionsTable.propTypes = {
  options: PropTypes.array,
  selected: PropTypes.number,
  optionsName: PropTypes.array,
  carriers: PropTypes.array,
};
const selectOptions = [
  { value: 'Optional', type: 0 },
  { value: 'Standard', type: 1 },
];

const CompareCoverageoptions = ({ selectedCarriers, coveragesDescriptions = [] }) => {
  const optional = [];
  const standard = [];
  const carriers = selectedCarriers.map(c => {
    const rawOptions = c.coverageOptions;
    const cOptional = [];
    const cStandard = [];

    Object.keys(rawOptions).map(option => {
      if (rawOptions[option]) {
        const descriptionIndex = coveragesDescriptions.findIndex(
          description => description.data.Coverage_Name === option
        );

        if (descriptionIndex !== -1) {
          let description = coveragesDescriptions[descriptionIndex].data;

          let structuredOption = {
            title: option.replace(/_/g, ' '),
            active: Boolean(rawOptions[option]),
            description: description.Coverage_Description,
            type: description.Coverage_Type,
          };
          if (structuredOption.type === 'Optional') {
            const alreadyInOptions = optional.find(
              o => o.title === structuredOption.title
            );
            if (!alreadyInOptions) {
              optional.push(structuredOption);
            }
            cOptional.push(structuredOption);
          } else if (structuredOption.type === 'Standard') {
            const alreadyInOptions = standard.find(
              o => o.title === structuredOption.title
            );
            if (!alreadyInOptions) {
              standard.push(structuredOption);
            }
            cStandard.push(structuredOption);
          }
        }
      }
    });

    const cc = {
      name: c.name,
      options: {
        optional: cOptional,
        standard: cStandard,
      },
      color: c.color,
    };

    return cc;
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
    return <></>;
  }

  return (
    <Grid item xs={12}>
      <OptionsToggle
        options={selectOptions}
        optionValue={selected}
        setOptionValue={setSelected}
      />

      <OptionsTable
        isMobile={false}
        options={options}
        selected={selected}
        optionsName={optionsName}
        carriers={carriers}
      />
    </Grid>
  );
};
CompareCoverageoptions.propTypes = {
  selectedCarriers: PropTypes.array,
  coveragesDescriptions: PropTypes.array,
};
export default CompareCoverageoptions;
