import React from 'react';
import FormLayout from '../FormLayout';
import PolicyBox from '../PolicyBox';
import CoverageBox from '../CoverageBox';
import CoverageRow from '../CoverageRow';

import CollisionIcon from '../../../../icons/CollisionIcon';
import ShieldIcon from '../../../../icons/ShieldIcon';
import InjuryIcon from '../../../../icons/InjuryIcon';
import RoadIcon from '../../../../icons/RoadIcon';
import CarRentalIcon from '../../../../icons/CarRentalIcon';
import PersonalInjuryIcon from '../../../../icons/PersonalInjuryIcon';
import CarsGapIcon from '../../../../icons/CarsGapIcon';
import MoneyIcon from '../../../../icons/MoneyIcon';
import HomeIcon from '@mui/icons-material/Home';

import * as styles from './results-form.module.scss';

const ResultsForm = () => {
  return (
    <FormLayout
      className={styles?.resultFormWrapper}
      type="Big"
      title="Check out these Honest Policies from our best carriers"
    >
      <div className={styles.resultsForm}>
        <div className={styles.resultsFormPolicies}>
          <PolicyBox name="Progressive" price="290" score="91" />
          <PolicyBox name="USAA" price="97" score="94" />
          <PolicyBox name="Travelers" price="149" score="88" />
          <PolicyBox name="Progressive" price="170" score="94" />
        </div>
        <div className={styles.resultFormCoverage}>
          <div className={styles.resultFormCoverageInner}>
            <div className={styles.resultFormCoverageOptions}>
              <div className={styles.resultFormCoverageTitle}>Coverage options</div>
              <div className={styles.resultFormCoverageBoxes}>
                <CoverageBox
                  title="Collision"
                  description="Helps pay to repair or replace your car if it’s dameged in an accident with another vehicle or object"
                  price="50,000"
                  Icon={CollisionIcon}
                />
                <CoverageBox
                  title="Comprehensive"
                  description="Covers damageto your car caused by events that are out of your control"
                  price="50,000"
                  Icon={ShieldIcon}
                />
                <CoverageBox
                  title="Bodily Injury"
                  description="Covers damageto your car caused by events that are out of your control"
                  price="50,000"
                  Icon={InjuryIcon}
                />
                <CoverageBox
                  title="Comprehensive"
                  description="Covers damageto your car caused by events that are out of your control"
                  price="50,000"
                  Icon={HomeIcon}
                />
              </div>
            </div>
            <div className={styles.resultFormCoverageAddons}>
              <div className={styles.resultFormCoverageTitle}>Add-on Coverage</div>
              <div className={styles.resultFormCoverageRows}>
                <CoverageRow
                  title="Roadside Coverage"
                  description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
                  price="3"
                  Icon={RoadIcon}
                />
                <CoverageRow
                  title="Car Rental"
                  description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
                  price="3"
                  Icon={CarRentalIcon}
                />
                <CoverageRow
                  title="Personal Injury Protection"
                  description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
                  price="3"
                  Icon={PersonalInjuryIcon}
                />
                <CoverageRow
                  title="Gap Coverage"
                  description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
                  price="3"
                  Icon={CarsGapIcon}
                />
                <CoverageRow
                  title="Shrinking Deductible"
                  description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
                  price="3"
                  Icon={MoneyIcon}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormLayout>
  );
};

export default ResultsForm;
