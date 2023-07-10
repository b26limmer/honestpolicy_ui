import React, { useEffect, useRef, useState } from 'react';
import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCar } from '@fortawesome/free-solid-svg-icons';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import * as styles from './policy-panel-collapse.module.scss';
import PropTypes from 'prop-types';
import PolicyInfo from './components/PolicyInfo';
import Coverages from './components/Coverages';
import ContactSupport from './components/ContactSupport';
import Addons from './components/Addons';
import Discounts from './components/Discounts';
import { faUser } from '@fortawesome/pro-regular-svg-icons';

const PolicyPanelCollapse = ({ policy, handleEditPolicy = () => {}, openPolicy }) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [policyData, setPolicyData] = useState({});

  const handleClick = () => {
    setOpen(!open);
  };
  const policyCardRef = useRef();
  useEffect(() => {
    setPolicyData(policy);
    !!openPolicy && setOpen(true);
  }, [policy]);
  useEffect(() => {
    if (open) {
      policyCardRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [open]);

  const handleChange = (event, value) => {
    setActiveTab(value);
  };
  const allTabs = [
    {
      label: 'Policy Info',
    },
    {
      label: 'Coverage Details',
    },
    {
      label: 'Addons',
    },
    {
      label: 'Discounts',
    },
    {
      label: 'Contact Support',
    },
  ];
  const insuranceType = policyData?.insuranceType ? policyData.insuranceType : 'Vehicle';

  return (
    <div className={styles.policyCollapse} ref={policyCardRef}>
      <ListItem
        classes={{ root: styles.policyCollapseHeader }}
        button
        onClick={handleClick}
      >
        <div className={styles.policyCollapseItemName}>
          {insuranceType === 'Vehicle' ? (
            <FontAwesomeIcon icon={faCar} />
          ) : insuranceType === 'Property' ? (
            <FontAwesomeIcon icon={faHome} />
          ) : (
            <FontAwesomeIcon icon={faUser} />
          )}
          <label>
            {policy?.carrier?.name}
            <span>{policy?.policyNumber}</span>
          </label>
        </div>
        <div className={styles.policyCollapseTitle}>
          <span>{policy?.insuranceName}</span>
        </div>
        <div className={styles.policyCollapseRightSide}>
          <div className={styles.policyCollapseItemPrice}>${policy?.monthlyCost}/mo</div>
          <div>{open ? <ExpandLess /> : <ExpandMore />}</div>
        </div>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          className={styles.policyCollapseTabs}
          variant="scrollable"
          scrollButtons="auto"
          classes={{ indicator: styles.policyCollapseIndicator }}
        >
          {allTabs.map((tab, index) => (
            <Tab key={index} label={tab.label} className={styles.policyCollapseTab} />
          ))}
        </Tabs>
        <PolicyInfo
          styles={styles}
          insuranceType={insuranceType}
          activeTab={activeTab}
          policyData={policyData}
          handleEditPolicy={handleEditPolicy}
        />
        <Coverages
          styles={styles}
          activeTab={activeTab}
          policyData={policyData}
          handleEditPolicy={handleEditPolicy}
          insuranceType={insuranceType}
        />
        <Addons
          styles={styles}
          activeTab={activeTab}
          policyData={policyData}
          handleEditPolicy={handleEditPolicy}
        />
        <Discounts
          styles={styles}
          activeTab={activeTab}
          policyData={policyData}
          handleEditPolicy={handleEditPolicy}
        />
        <ContactSupport
          styles={styles}
          activeTab={activeTab}
          policyData={policyData}
          handleEditPolicy={handleEditPolicy}
        />
      </Collapse>
    </div>
  );
};

PolicyPanelCollapse.propTypes = {
  handleEditPolicy: PropTypes.func.isRequired,
  policy: PropTypes.object.isRequired,
  openPolicy: PropTypes.bool.isRequired,
};

export default PolicyPanelCollapse;
