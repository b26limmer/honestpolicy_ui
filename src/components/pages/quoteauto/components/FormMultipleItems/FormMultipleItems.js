import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CloseIcon from '@mui/icons-material/Close';

import * as styles from './form-multiple-items.module.scss';

import './form-multiple-items.module.scss';

const FormMultipleItems = ({
  items,
  handleSelectItem = () => {},
  handleAddNewItem = () => {},
  handleDelete = () => {},
  type = 'driver',
  isEdit = false,
  isActive = true,
}) => {
  return (
    <div
      className={classNames({
        [styles.formMultipleEdit]: isEdit,
        [styles.formMultipleItems]: !isEdit,
      })}
    >
      <div className={styles.formMultipleItemsInner}>
        <div
          className={classNames(styles?.formMultipleItemsMain, {
            [styles.formMultipleItemsBottomNone]: !isActive,
          })}
        >
          {items?.map((item, key) => {
            return (
              <div
                className={classNames(styles.formMultipleItem, {
                  [styles.formMultipleItemActive]: item?.isActive,
                })}
                key={'multi_' + item?.title + key}
                onClick={() => handleSelectItem(key)}
              >
                {item.subTitle && (
                  <div className={styles.formMultipleItemSubTitle}>
                    {item.subTitle}
                    <CloseIcon
                      className={styles?.formMultipleCloseIcon}
                      onClick={e => {
                        e.stopPropagation();
                        handleDelete(key);
                      }}
                    />
                  </div>
                )}
                {item.title && (
                  <div className={styles.formMultipleItemTitle}>
                    {item.title}{' '}
                    {!item.subTitle ? (
                      <CloseIcon
                        className={styles?.formMultipleCloseIcon}
                        onClick={() => handleDelete(key)}
                      />
                    ) : (
                      ''
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div
          className={classNames(styles.formMultipleItemsAdd, {
            [styles.formMultipleItemsHidden]: !isActive,
          })}
          onClick={handleAddNewItem}
        >
          + Add another {type}
        </div>
      </div>
    </div>
  );
};

FormMultipleItems.propTypes = {
  items: PropTypes.array,
  type: PropTypes.string,
  isActive: PropTypes.bool,
  isEdit: PropTypes.bool,
  handleSelectItem: PropTypes.func,
  handleAddNewItem: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default FormMultipleItems;
