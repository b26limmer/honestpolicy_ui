import React from 'react';
import classNames from 'classnames';
import * as styles from './section-title.module.scss';

const SectionTitle = ({ children, Component = 'h2', className }) => {
  return (
    <Component className={classNames(styles.sectionTitle, className)}>
      {children}
    </Component>
  );
};

export default SectionTitle;
