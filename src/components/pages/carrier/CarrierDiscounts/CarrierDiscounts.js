import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Paper from '../../../utils/paper';
import SomethingWrongDialog from '../../../../components/dialogs/SomethingWrongDialog';
import Button from '../../../form-button';

import * as styles from './carrier-discounts.module.scss';

const Discounts = ({ name, activeLineOfBusiness, carrierDiscounts }) => {
  const [somethingWrongDialogOpen, setSomethingWrongDialogOpen] = useState(false);
  const [max, setMax] = useState(3);

  const options = [];

  carrierDiscounts.map(discount => {
    let rawLine = discount.data.Line;
    let line = rawLine.charAt(0).toUpperCase() + rawLine.slice(1);
    let discountData = discount.data.Discount[0].data;
    if (line !== activeLineOfBusiness) {
      return;
    }
    let discountValue = discount.data.Value_Low
      ? `${Math.round(discount.data.Value_Low * 100)}% to ${Math.round(
          discount.data.Value_High * 100
        )}%`
      : discount.data.Discount_Data;
    options.push({
      title: discountData.Discount_Name,
      description: discountData.Description,
      discountData: discountValue,
    });
  });
  const toggleOptionsLength = () => {
    max === options.length ? setMax(6) : setMax(options.length);
  };

  return (
    <>
      <SomethingWrongDialog
        open={somethingWrongDialogOpen}
        setOpen={setSomethingWrongDialogOpen}
      />
      <Paper id="discounts">
        <h2 className={styles.carrierTemplateTitle}>
          {name} {activeLineOfBusiness} Discounts
        </h2>
        <p className={styles.text}>
          While all companies offer a range of {activeLineOfBusiness.toLowerCase()}{' '}
          insurance discounts, it&apos;s hard to judge any individual discount&apos;s
          value in a meaningful way. For one, the discounts are typically a percentage off
          the base price, instead of the whole policy.
          <br />
          <br />
          <strong>What does this mean?</strong>
          <br />
          <br />
          Your best bet is to directly discuss your particular situation with an agent to
          make sure you&apos;re getting all the discounts that you may be eligible for on
          your {activeLineOfBusiness.toLowerCase()} policy. For reference, we&apos;ve
          listed all the discounts we believe {name} has below in order to help determine
          which ones may fit your profile (though keep in mind that they can vary by
          state).
        </p>
        <table className={styles.optionsContainer}>
          <thead>
            <tr className={styles.row}>
              <th className={styles.tableH}>Available Option</th>
              <th className={styles.tableH}>Discount Data</th>
              <th className={styles.tableH}>What it means</th>
            </tr>
          </thead>
          <tbody>
            {options.map(
              (option, idx) =>
                idx < max && (
                  <tr
                    className={classNames(styles.row, { [styles.rowGray]: !(idx % 2) })}
                    key={idx}
                  >
                    <td>
                      <h5 className={styles.optionTitle}>{option.title}</h5>
                    </td>
                    <td>
                      <p className={styles.optionDescription}>{option.discountData}</p>
                    </td>
                    <td>
                      <p className={styles.optionDescription}>{option.description}</p>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
        <div className={styles.carrierDiscountsButtonWrapper}>
          <Button type="primary" isOutline onClick={toggleOptionsLength}>
            {max !== options.length ? 'See more' : 'Hide'}
          </Button>
        </div>
      </Paper>
    </>
  );
};

Discounts.propTypes = {
  name: PropTypes.string.isRequired,
  activeLineOfBusiness: PropTypes.string.isRequired,
  carrierDiscounts: PropTypes.array.isRequired,
};

export default Discounts;
