import React, { useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import * as styles from './dashboard-layout.module.scss';
import ErrorIcon from '@mui/icons-material/Error';
import PropTypes from 'prop-types';
import AlertMessage from '../../alert/Alert';

const DashboardLayout = ({
  title,
  subTitle,
  noPadding,
  children,
  rightSideChildren,
  classes = {},
  helpText,
}) => {
  const [showHelptText, setShowHelptText] = useState(false);
  const [helpTextHeight, setHelpTextHeight] = useState(0);
  const helpTextRef = useRef(null);
  useLayoutEffect(() => {
    if (helpTextRef.current) {
      setHelpTextHeight(helpTextRef.current.clientHeight);
    }
  }, [helpTextRef, showHelptText]);
  return (
    <div
      className={classNames(styles?.dashboardLayout, {
        [styles.dashboardLayoutPaddingless]: noPadding,
        [classes?.layoutRoot]: !!classes?.layoutRoot,
      })}
    >
      {(title || subTitle) && (
        <div className={styles?.dashboardLayoutTitleHeader}>
          <div>
            {title && <h1 className={styles?.dashboardLayoutTitle}>{title}</h1>}
            {subTitle && (
              <p
                className={classNames(styles.dashboardLayoutSubTitle, {
                  [classes?.subTitleRoot]: !!classes?.subTitleRoot,
                })}
                onMouseEnter={() => !!helpText && setShowHelptText(true)}
                onMouseLeave={() => !!helpText && setShowHelptText(false)}
              >
                <ErrorIcon />
                <span className={styles.dashboardLayoutSubTitleText}>{subTitle}</span>
              </p>
            )}
          </div>
          {!!showHelptText && (
            <div
              ref={helpTextRef}
              style={{ '--helpTextHeight': helpTextHeight }}
              className={styles.helpTextContainer}
            >
              <p>{helpText}</p>
            </div>
          )}
          {!!rightSideChildren && (
            <div className={styles.dashboardLayoutHeaderRightside}>
              {rightSideChildren}
            </div>
          )}
        </div>
      )}
      <div
        className={classNames(styles.dashboardLayoutInner, {
          [classes.layoutInner]: !!classes?.layoutInner,
        })}
      >
        {children}
      </div>
      <AlertMessage />
    </div>
  );
};
DashboardLayout.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  noPadding: PropTypes.bool,
  children: PropTypes.node,
  rightSideChildren: PropTypes.object,
  classes: PropTypes.object,
  helpText: PropTypes.string,
};
export default DashboardLayout;
