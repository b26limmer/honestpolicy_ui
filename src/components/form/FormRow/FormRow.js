import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import * as styles from './form-row.module.scss';

const FormRow = ({ rootClassName = '', children }) => {
  return <div className={className(styles.formRow, rootClassName)}>{children}</div>;
};
FormRow.propTypes = {
  rootClassName: PropTypes.string,
  children: PropTypes.node,
};
export default FormRow;
