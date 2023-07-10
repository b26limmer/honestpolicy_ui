import React from 'react';
import { Grid, Paper } from '@mui/material';
import stylesVariables from '../../scss/variables.module.scss';
import stylesCarrier from '../../scss/carrier/carrierTemplate.module.scss';
import * as styles from '../../scss/carrier/CompareBenefitsDrawbacks.module.scss';

import CustomPaper from '../../utils/paper';

export default ({ selectedCarriers = [] }) => {
  return (
    <Grid item xs={12}>
      {/*<Paper
        classes={{
          root: stylesVariables.paperComponent
        }}
        elevation="3"
      >*/}
      <CustomPaper>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h2 className={stylesCarrier.carrierTemplateTitle}>Who is Right for You?</h2>
          </Grid>

          {selectedCarriers.map((c, idx) => {
            return (
              <Grid key={idx} item xs={12} sm>
                <Grid item xs={12}>
                  {/*<Paper
                        classes={{
                          root: `${stylesVariables.paperComponent} ${styles.borderBottom}`
                        }}
                        elevation="3"
                      >*/}
                  <CustomPaper
                    style={{ borderColor: c.color }}
                    className={styles.borderBottom}
                  >
                    <h2 className={styles.cardTitle}>Benefits</h2>
                    <p>- You like managing your insurance through an agent.</p>
                    <p>
                      - You need multiple lines of insurance that you can bundle together
                      with Encompass.
                    </p>
                    <p>
                      - You want upgraded features, like Accident Forgiveness, on your
                      auto policy, or jewelry coverage on your home policy.
                    </p>
                  </CustomPaper>
                  {/*</Paper>*/}
                </Grid>

                <Grid item xs={12}>
                  <CustomPaper
                    style={{ borderColor: c.color }}
                    className={styles.borderBottom}
                  >
                    <h2 className={styles.cardTitle}>Drawbacks</h2>
                    <p>- You prefer to manage your insurance independently online.</p>
                    <p>- You only need minimum coverage for your home or car.</p>
                    <p>- You want the cheapest premium.</p>
                  </CustomPaper>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </CustomPaper>
      {/*</Paper>*/}
    </Grid>
  );
};
