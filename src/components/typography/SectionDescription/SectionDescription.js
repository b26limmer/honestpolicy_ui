import React from 'react';
import classNames from 'classnames';
import * as styles from './section-desciption.module.scss';

const SectionDescription = ({ children, className, Component = 'p' }) => {
  return (
    <Component className={classNames(styles.sectionDescription, className)}>
      {children}
    </Component>
  );
};

export default SectionDescription;
