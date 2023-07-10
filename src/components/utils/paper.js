import React, { forwardRef } from 'react';
import PropTypes, { array, element } from 'prop-types';
import * as styles from '../scss/variables.module.scss';

const Paper = forwardRef(({ children, className, id, ...props }, ref) => {
  return (
    <div
      id={id}
      ref={ref}
      className={[styles.paperComponent, className ? className : ''].join(' ')}
      {...props}
    >
      {children}
    </div>
  );
});

Paper.displayName = 'Paper';

Paper.propTypes = {
  children: PropTypes.oneOfType([element, array]),
  className: PropTypes.string,
  id: PropTypes.string,
};

export default Paper;
