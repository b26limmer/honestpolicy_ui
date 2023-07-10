import React from 'react';
import * as styles from './options-table.module.scss';

const OptionsTable = ({ selectedCarriers, coveragesDescriptions }) => {
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

  return (
    <div className={styles.optionsTable}>
      <div className={styles.optionsTableHeader}>
        <div className={styles.optionsTableHeaderTitle}>Availlable options</div>
      </div>
    </div>
  );
};

export default OptionsTable;
