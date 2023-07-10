import React from 'react';
import classNames from 'classnames';
import * as styles from './box.module.scss';
import PropTypes from 'prop-types';

const Box = ({ className, children }) => {
  return <div className={classNames(styles.box, className)}>{children}</div>;
};

Box.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Box;
