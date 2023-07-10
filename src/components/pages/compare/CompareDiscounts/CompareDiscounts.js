import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import CheckCircle from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Switch from '../../../inputs/Switch/Switch';
import Hidden from '@mui/material/Hidden';
import * as styles from '../../../scss/carrier/coverageOptions.module.scss';

const OptionRow = ({ option, carriers, showDiff }) => {
  const carriersIncludingOption = carriers.filter(c => {
    return c.options.find(cOption => {
      return cOption.Discount_Name === option;
    });
  });

  const isDiff =
    showDiff &&
    (carriers.length !== carriersIncludingOption.length || !carriersIncludingOption);

  const isDiffClass = isDiff && styles.isDiff;

  return (
    <Grid classes={{ root: `${styles.optionsRow} ${isDiffClass}` }} container>
      <Grid classes={{ root: styles.optionsNameContainer }} xs={12} sm={3} item>
        {option}
      </Grid>
      {carriers.map((c, idx) => {
        const included = c.options.find(cOption => {
          return cOption.Discount_Name === option;
        });

        return (
          <Grid className={styles.optionsCell} item key={idx} xs={12} sm>
            <Grid classes={{ root: styles.optionsIconContainer }} container>
              <Hidden smUp>
                <Grid item xs={6}>
                  <h3 style={{ fontFamily: 'Montserrat' }}>{c.name}</h3>
                </Grid>
              </Hidden>
              <Grid classes={{ root: styles.optionsIconCell }} item xs={6} sm>
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

const OptionsTable = ({ isMobile, options = [], carriers }) => {
  const toggleOptionsLength = () => {
    !isMobile ? (max === options.length ? setMax(6) : setMax(options.length)) : null;
    isMobile ? (max === options.length ? setMax(3) : setMax(options.length)) : null;
  };
  const [showDiff, setShowDiff] = useState(false);

  const [max, setMax] = useState(7);
  useEffect(() => {
    isMobile && setMax(3);
  }, [isMobile]);

  const partialCarriers = carriers.map(carrier => {
    return {
      color: carrier.color,
      name: carrier.name,
      options: carrier.discounts || [],
    };
  });

  return (
    <Grid container classes={{ root: styles.tableContainer }}>
      <Grid container classes={{ root: styles.optionsContainer }}>
        <Grid container classes={{ root: styles.optionHeaderRow }}>
          <Grid item xs classes={{ root: styles.tableH }}>
            Availlable options
          </Grid>
          <Grid classes={{ root: styles.diffContainer }} item xs>
            <Grid container>
              <Grid item xs={12} sm={10} classes={{ root: styles.showMeDiff }}>
                <span className={styles.diffText}>Show me the differences</span>
              </Grid>
              <Grid item xs={12} sm={2} classes={{ root: styles.showMeDiffSwitch }}>
                <Switch checked={showDiff} onChange={setShowDiff} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {options.slice(0, max - 1).map((o, idx) => (
          <OptionRow
            key={idx}
            option={o}
            carriers={partialCarriers}
            showDiff={showDiff}
          />
        ))}
      </Grid>
      <div className={styles.seeMoreButton} onClick={toggleOptionsLength}>
        {max !== options.length ? 'See more' : 'Hide'}
      </div>
    </Grid>
  );
};

export default ({ selectedCarriers, availableDiscounts = [] }) => {
  if (availableDiscounts.length === 0) {
    return null;
  }

  return (
    <Grid item xs={12}>
      {
        <OptionsTable
          isMobile={false}
          options={availableDiscounts}
          carriers={selectedCarriers}
        />
      }
    </Grid>
  );
};
