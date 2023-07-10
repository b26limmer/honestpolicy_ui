import React, { Fragment } from 'react';
import classNames from 'classnames';
import UserIcon from '@mui/icons-material/People';
import HouseIcon from '@mui/icons-material/House';
import AmpStoriesIcon from '@mui/icons-material/AmpStories';
import Icon from '@mdi/react';
import { mdiAlarmLight } from '@mdi/js';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import * as styles from './step-nav.module.scss';

const AlarmLightIcon = _ => (
  <Icon path={mdiAlarmLight} title="Alarm" size={1} color={'#69798c'} />
);

const navIcons = [
  { Icon: UserIcon },
  { Icon: HouseIcon },
  { Icon: AmpStoriesIcon },
  { Icon: AlarmLightIcon },
  { Icon: ReportProblemIcon },
  { Icon: MonetizationOnIcon },
];

const StepNav = ({ className, step }) => {
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
