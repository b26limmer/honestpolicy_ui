import React, { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'gatsby';

import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as styles from './sidebar-item.module.scss';
import PropTypes from 'prop-types';
import Divider from '@mui/material/Divider';

const SidebarItem = ({ Icon, item, index }) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem
        button
        key={index}
        to={item.link}
        component={item.link ? Link : 'div'}
        activeClassName={item.link ? styles.sidebarItemActive : ''}
        onClick={handleClick}
        classes={{
          root: classNames(styles.sidebarItem, item.className),
        }}
      >
        <ListItemIcon classes={{ root: styles.sidebarItemIcon }}>
          <Icon />
        </ListItemIcon>
        <ListItemText
          primary={item.name}
          classes={{
            root: classNames(styles.sidebarItemText),
            primary: classNames(styles.sidebarItemText),
          }}
        />
      </ListItem>
      {item?.items?.length > 0 && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <div className={styles.sidebarItemSubListWrapper}>
              {item?.items.map((item, key) => {
                return (
                  <ListItem
                    button
                    key={key}
                    to={item.link}
                    component={Link}
                    activeClassName={styles.sidebarItemActive}
                    classes={{
                      root: classNames(
                        styles.sidebarItem,
                        styles.sidebarItemSubList,
                        item.className
                      ),
                    }}
                  >
                    <ListItemIcon classes={{ root: styles.sidebarItemIcon }}>
                      {item.Icon && <item.Icon />}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      classes={{ root: styles.sidebarItemText }}
                    />
                  </ListItem>
                );
              })}
            </div>
          </List>
        </Collapse>
      )}
      <Divider />
    </>
  );
};
SidebarItem.propTypes = {
  item: PropTypes.object,
  Icon: PropTypes.func,
  index: PropTypes.number,
  isActive: PropTypes.bool,
};
export default SidebarItem;
