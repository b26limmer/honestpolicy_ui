import React, { useState, useEffect } from 'react';
import { Link, navigate } from '@reach/router';
import classnames from 'classnames';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';

import MyAccountIcon from '../../icons/MyAccountIcon';
import CoinIcon from '../../icons/CoinIcon';
import WalletIcon from '../../icons/WalletIcon';
import StarIcon from '../../icons/StarIcon';
import CogIcon from '../../icons/CogIcon';

import logo from '../../../images/main-logo.png';

import SidebarItem from './components/SidebarItem/SidebarItem';
import SidebarMobileItem from './components/SidebarMobileItem';

import * as styles from './account-sidebar.module.scss';
import FormButton from '../../form-button/FormButton';

const drawerItems = [
  {
    name: 'Dashboard',
    link: '/account/dashboard',
    icon: MyAccountIcon,
  },
  {
    name: 'My Quotes',
    link: '/account/quotes',
    icon: CoinIcon,
  },
  {
    name: 'Insurance Wallet',
    icon: WalletIcon,
    link: '/account/wallet',
  },
  {
    name: 'Reviews',
    link: '/account/reviews',
    icon: StarIcon,
  },
  {
    name: 'Settings',
    link: '/account/settings',
    icon: CogIcon,
  },
];

const drawer = (
  <div className={styles.accountSidebarInner}>
    <Link to="/" title="Home" className={styles.accountSidebarLogo}>
      <img loading="lazy" alt="Honest Policy Logo" src={logo} />
    </Link>
    <List classes={{ root: styles.accountSidebarItems }}>
      {drawerItems.map((item, index) => (
        <SidebarItem
          key={`sidebar-item-${index}`}
          item={item}
          index={index}
          Icon={item.icon}
        />
      ))}
    </List>
    <FormButton onClick={() => navigate('/quotes')} className={styles.quotesButton}>
      Get Quotes
    </FormButton>
  </div>
);

const AccountSidebar = () => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(document.body.clientWidth < 769 ? false : true);
  }, []);

  return (
    <>
      <Drawer
        classes={{
          root: styles.root,
          paper: styles.accountSidebar,
        }}
        variant="persistent"
        open={open}
        onClose={() => {}}
        ModalProps={{
          BackdropProps: {
            invisible: true,
            classes: { root: styles.backdrop },
          },
        }}
      >
        {drawer}
      </Drawer>
      <div className={classnames(styles.accountSidebarMobile)}>
        <div className={styles.accountSidebarMobileLinks}>
          {drawerItems.map((item, index) => (
            <SidebarMobileItem
              key={`sidebar-mobile-item-${index}`}
              item={item}
              index={index}
              Icon={item.icon}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AccountSidebar;
