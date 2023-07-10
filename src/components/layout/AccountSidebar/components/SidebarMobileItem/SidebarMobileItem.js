import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'gatsby';

import * as styles from './sidebar-mobile-item.module.scss';

const SidebarMobileItem = ({ item }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.sidebarMobileItemWrapper}>
      <div
        className={classNames(styles.sidebarMobileItem, {
          [styles.sidebarMobileItemBox]: !!item?.items,
          [styles.sidebarMobileItemActive]: isActive,
        })}
      >
        {!item?.items ? (
          <Link to={item?.link} className={styles.sidebarMobileItemIcon}>
            <item.icon />
          </Link>
        ) : (
          <div className={styles.sidebarMobileItemIcon}>
            <item.icon />
          </div>
        )}
      </div>
      {item.items && (
        <div
          className={styles.tooltip}
          onMouseOver={() => {
            setIsActive(true);
          }}
          onMouseLeave={() => {
            setIsActive(false);
          }}
        >
          <div className={styles.tooltipInner}>
            {item?.items?.map((item, key) => {
              return (
                <Link key={key} to={item?.link} className={styles.tooltipItem}>
                  {item?.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

SidebarMobileItem.propTypes = {
  item: PropTypes.object,
};

export default SidebarMobileItem;
