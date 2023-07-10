import React, { Fragment } from 'react';
import classNames from 'classnames';
import UserIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import WheelIcon from '../../../../icons/WheelIcon';
import IncidentIcon from '../../../../icons/IncidentIcon';
import * as styles from './step-nav.module.scss';

const navIcons = [
  { Icon: UserIcon },
  { Icon: AssignmentIcon },
  { Icon: WheelIcon },
  { Icon: DriveEtaIcon },
  { Icon: IncidentIcon },
  { Icon: MonetizationOnIcon },
];

const StepNav = ({ className, step, total }) => {
  return (
    <div className={classNames(styles.stepNav, className, 'step-nav')}>
      {navIcons.map((item, key) => {
        return (
          <Fragment key={key}>
            <div
              className={classNames(styles.stepNavItem, {
                [styles.stepNavItemActive]: key + 1 <= step,
              })}
            >
              <item.Icon />
            </div>
            {key !== navIcons.length - 1 && (
              <div
                className={classNames(styles.line, {
                  [styles.lineActive]: key + 2 <= step,
                })}
              ></div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default StepNav;
