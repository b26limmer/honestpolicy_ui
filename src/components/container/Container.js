import React, { forwardRef } from 'react';
import classNames from 'classnames';
import * as styles from './container.module.scss';
import PropTypes from 'prop-types';

const Container = forwardRef(({ children, className, ...rest }, ref) => {
  return (
    <div ref={ref} className={classNames(styles.sectionContainer, className)} {...rest}>
      {children}
    </div>
  );
});
Container.displayName = 'Container';
Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
export default Container;
