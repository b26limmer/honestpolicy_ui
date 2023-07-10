import React from 'react';
import classNames from 'classnames';
import Container from '../../../container';
import * as styles from './carrier-navbar.module.scss';

const sections = [
  {
    title: 'Overview',
    id: '#overview',
  },
  {
    title: 'Ratings',
    id: '#ratings',
  },
  {
    title: 'Complaints',
    id: '#complaints',
  },
  {
    title: 'Reviews',
    id: '#reviews',
  },
  {
    title: 'Coverages',
    id: '#coverages',
  },
  {
    title: 'Availability',
    id: '#availability',
  },
  {
    title: 'Discounts',
    id: '#discounts',
  },
];

const CarrierNavbar = ({ activeSection, setActiveSection, coverageMenuActive }) => {
  const handleScroll = id => {
    const element = document.querySelector(`${id}`);

    if (element) {
      const offset = 150;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };
  return (
    <div className={styles.carrierNavbar}>
      <Container className={styles.carrierNavbarInner}>
        {sections.map((item, key) => {
          if (item.title == 'Coverages' && !coverageMenuActive) {
            return <></>;
          } else {
            return (
              <div
                key={`${item?.id}-${key}`}
                to={item.id}
                className={classNames(styles.carrierNavbarItem, {
                  [styles.carrierNavbarItemActive]: activeSection === item?.id,
                })}
                onClick={() => {
                  handleScroll(item?.id);
                  setActiveSection(item?.id);
                }}
              >
                {item?.title}
              </div>
            );
          }
        })}
      </Container>
    </div>
  );
};

export default CarrierNavbar;
