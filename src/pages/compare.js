import React, { useState, useRef, useContext } from 'react';
import { graphql } from 'gatsby';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import StateAvailability from '../components/pages/carrier/StateAvailability';
import CompareCoverageOptions from '../components/pages/compare/CompareCoverageOptions/CompareCoverageOptions';
import CompareDiscounts from '../components/pages/compare/CompareDiscounts';
import AddCarriersToCompareDialog from '../components/dialogs/AddCarriersToCompareDialog';
import { Grid } from '@mui/material';
import { CompareContext } from '../components/state/CompareContextProvider';
import { getStateNameFromCode } from '../utils/states';
import CompareHeader from '../components/pages/compare/CompareHeader';
import Container from '../components/container';
import * as styles from '../components/scss/carrier/compare.module.scss';
import CompareRatings from '../components/pages/compare/CompareRatings/CompareRatings';
import Layout from '../components/layout/layout';
import SEO from '../components/layout/seo';
import PropTypes from 'prop-types';

const colors = ['#ECA508', '#D287FB', '#00AD84', '#3636D2', '#FBD430'];

const Compare = ({ data }) => {
  const {
    carriersToCompare,
    setCarriersToCompare,
    removeCarrier,
    selectedLine,
    setSelectedLine,
  } = useContext(CompareContext);
  const [isSticky, setIsSticky] = useState(false);
  const [open, setOpen] = useState(false);
  const headingRef = useRef();
  useScrollPosition(
    ({ currPos }) => {
      setIsSticky(!(-currPos.y < headingRef?.current?.offsetTop + 20));
    },
    [],
    null,
    false,
    20
  );

  const availableDiscounts = [];

  const selectedCarriers = data.carriers.nodes
    .filter(c => carriersToCompare.includes(c.data.name))
    .map(({ data: c }, i) => {
      const carrier = { ...c, coverageOptions: {} };
      carrier.logoSmall =
        c?.Company_Logos[0]?.data?.Attachments?.raw[0].thumbnails.small.url;
      if (c.Optional_Coverage && c.Optional_Coverage[0] && c.Optional_Coverage[0].data) {
        carrier.coverageOptions = c.Optional_Coverage[0].data;
      }
      const filterRatingByLine = ratings => {
        return ratings.find(rating => rating.data.Line == selectedLine);
      };
      if (c.Ratings && c.Ratings.length && filterRatingByLine(c.Ratings)) {
        carrier.smartScoreRating = filterRatingByLine(c.Ratings).data.Smart_Score;
        carrier.customerServiceRating = filterRatingByLine(
          c.Ratings
        ).data.Customer_Service;
        carrier.claimsProcessRating = filterRatingByLine(c.Ratings).data.Claims_Process;
        carrier.valueForPriceRating = filterRatingByLine(c.Ratings).data.Value_for_Price;
        carrier.complaintIndex = filterRatingByLine(c.Ratings).data.Complaint_Index;
      }

      if (c.Carrier_Discounts) {
        const discounts = [];

        c.Carrier_Discounts.forEach(d => {
          if (
            d.data &&
            d.data.Discount &&
            d.data.Discount[0] &&
            d.data.Discount[0].data
          ) {
            const discount = d.data.Discount[0].data;
            const { Discount_Name } = discount;
            discounts.push(discount);
            availableDiscounts.push(Discount_Name);
          }
        });

        carrier.discounts = discounts;
      }

      if (c.Rideshare && c.Rideshare[0] && c.Rideshare[0].data) {
        carrier.rideshareStates = c.Auto_States[0].data;
      }

      if (c.SR22 && c.SR22[0] && c.SR22[0].data) {
        carrier.sr22States = c.SR22[0].data;
      }

      const lineByStateAutoStates = {};
      c.Line_by_State &&
        c.Line_by_State.forEach(({ data: lineData }) => {
          /*
         line: { data: {State: "AZ", Line: "auto"} }
      */
          if (lineData.Line === 'auto') {
            const state = getStateNameFromCode(lineData.State);
            if (state) {
              lineByStateAutoStates[state.replaceAll(' ', '_')] = 'Y';
            }
          }
        });

      return {
        ...carrier,
        color: colors[i],
        autoStates: lineByStateAutoStates,
      };
    });

  const displayModal = open || !carriersToCompare.length;

  return (
    <Layout header={{ isFixed: true }}>
      <SEO title="Compare Carriers" />
      <div className={styles.compare}>
        <CompareHeader
          selectedCarriers={selectedCarriers}
          onAddCarrier={() => setOpen(true)}
          onRemoveCarrier={removeCarrier}
          headingRef={headingRef}
          isSticky={isSticky && !open}
        />
        {displayModal && (
          <AddCarriersToCompareDialog
            open={displayModal}
            setOpen={setOpen}
            carriers={data.carriers.nodes}
            selectedCarriers={carriersToCompare}
            setCarriersToCompare={setCarriersToCompare}
            selectedLine={selectedLine}
            setSelectedLine={setSelectedLine}
          />
        )}
        <div className={styles.compareMain}>
          <Container>
            <CompareRatings data={data} selectedCarriers={selectedCarriers} />
            <Grid container>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={12}>
                    <h2 className={styles.carrierTemplateTitle}>
                      Carrier Coverage Options
                    </h2>
                  </Grid>
                  <CompareCoverageOptions
                    selectedCarriers={selectedCarriers}
                    coveragesDescriptions={data.coveragesDescriptions.nodes}
                  />
                </Grid>
              </Grid>
            </Grid>
            <div>
              <StateAvailability
                name={'Carrier'}
                styles={styles}
                selectedCarriers={selectedCarriers}
              />
            </div>
            <Grid container>
              <Grid item xs={12}>
                <h2 className={styles.carrierDiscountsTitle}>Carrier Discounts</h2>
              </Grid>
              <CompareDiscounts
                availableDiscounts={availableDiscounts}
                selectedCarriers={selectedCarriers}
              />
            </Grid>
          </Container>
        </div>
      </div>
    </Layout>
  );
};
Compare.propTypes = {
  data: PropTypes.object,
};
export default Compare;

export const query = graphql`
  query {
    carriers: allAirtable(
      filter: {
        table: { eq: "Carriers" }
        data: {
          slug: { glob: "*" }
          Company_Logos: {
            elemMatch: {
              data: { Attachments: { localFiles: { elemMatch: { size: { gt: 0 } } } } }
            }
          }
        }
      }
    ) {
      nodes {
        data {
          name
          slug
          About_Carrier {
            data {
              Website
              About_Carrier_Text
            }
          }
          Line_by_State {
            data {
              State
              Line
            }
          }
          Carrier_Discounts {
            data {
              Discount {
                data {
                  Discount_Name
                  Line
                  Bucket
                  Description
                }
              }
            }
          }
          Ratings {
            data {
              Line
              Smart_Score
              Customer_Service
              Claims_Process
              Value_for_Price
              CI_Customer_Service
              CI_Claims_Process
              CI_Value_for_Price
              Percent_Recommend
              Complaint_Index
              Website_App_Average
              Billing_Policy_Average
              Customer_Support_Average
            }
          }
          Optional_Coverage {
            data {
              Incident_Forgiveness
              Loss_of_Use_Coverage
              Mechanical_Breakdown_Insurance
              Emergency_Assistance_Coverage
              Roadside_Assistance
              Rental_Reimbursement
              Gap_Insurance
              Original_Equipment_Manufacturer_Coverage
              Comprehensive_Claim_Forgiveness
              Antique_or_Collector_Car_Insurance
              No_Fault_Coverage
              Work_Loss_Coverage
              Glass_Coverage
              New_Car_Replacement_Coverage
              Emergency_Lockout_Coverage
              Pet_Coverage
              First_Aid_Reimbursement
              Accident_Forgiveness
              Personal_Auto_Plus
              Extended_Coverage
              Umbrella_Policy
              Airbag_Replacement_Coverage
              Legal_Defense_Costs_Coverage
              Named_Operator_Endorsement_Buy_Back_Option
              Sound_System_Coverage
              Vanishing_Deductible
              Ridesharing_Coverage
              Preferred_Repair_Services
              Child_Safety_Seat_Replacement
              Platinum_Choice_Auto
              Small_Claim_Forgiveness
              Build_Your_Own_Plan
              Better_Car_Replacement
              Teachers_Insurance
              Lifetime_Repair_Guarantee
              Tenant_Rental_Coverage
              Reconditioned_Vehicle_Program
              Comprehensive_Coverage
              Bodily_Injury_Coverage
              Property_Damage_Coverage
              Uninsured_Motorist_Coverage
              Personal_Injury_Protection
              Collision_Coverage
            }
          }
          Auto_States {
            data {
              Wisconsin
              Oregon
              Kansas
              North_Carolina
              Kentucky
              Rhode_Island
              Washington
              Georgia
              Maine
              Idaho
              Florida
              Iowa
              Massachusetts
              New_York
              Ohio
              Illinois
              North_Dakota
              Mississippi
              Indiana
              Tennessee
              Nevada
              Oklahoma
              Missouri
              Virginia
              South_Carolina
              Nebraska
              Arizona
              Connecticut
              New_Mexico
              Utah
              Michigan
              Minnesota
              Maryland
              Colorado
              Texas
              West_Virginia
              Pennsylvania
              South_Dakota
              California
              New_Jersey
              Alabama
              Wyoming
              Alaska
              New_Hampshire
              Arkansas
              Montana
              Vermont
              Delaware
              Hawaii
              Louisiana
            }
          }
          Home_States {
            data {
              Wisconsin
              Oregon
              Kansas
              North_Carolina
              Kentucky
              Rhode_Island
              Washington
              Georgia
              Maine
              Idaho
              Florida
              Iowa
              Massachusetts
              New_York
              Ohio
              Illinois
              North_Dakota
              Mississippi
              Indiana
              Tennessee
              Nevada
              Oklahoma
              Missouri
              Virginia
              South_Carolina
              Nebraska
              Arizona
              Connecticut
              New_Mexico
              Utah
              Michigan
              Minnesota
              Maryland
              Colorado
              Texas
              West_Virginia
              Pennsylvania
              South_Dakota
              California
              New_Jersey
              Alabama
              Wyoming
              Alaska
              New_Hampshire
              Arkansas
              Montana
              Vermont
              Delaware
              Hawaii
              Louisiana
            }
          }
          Rideshare {
            data {
              Wisconsin
              Oregon
              Kansas
              North_Carolina
              Kentucky
              Rhode_Island
              Washington
              Georgia
              Maine
              Idaho
              Florida
              Iowa
              Massachusetts
              New_York
              Ohio
              Illinois
              North_Dakota
              Mississippi
              Indiana
              Tennessee
              Nevada
              Oklahoma
              Missouri
              Virginia
              South_Carolina
              Nebraska
              Arizona
              Connecticut
              New_Mexico
              Utah
              Michigan
              Minnesota
              Maryland
              Colorado
              Texas
              West_Virginia
              Pennsylvania
              South_Dakota
              California
              New_Jersey
              Alabama
              Wyoming
              Alaska
              New_Hampshire
              Arkansas
              Montana
              Vermont
              Delaware
              Hawaii
              Louisiana
            }
          }
          SR22 {
            data {
              Wisconsin
              Oregon
              Kansas
              North_Carolina
              Kentucky
              Rhode_Island
              Washington
              Georgia
              Maine
              Idaho
              Florida
              Iowa
              Massachusetts
              New_York
              Ohio
              Illinois
              North_Dakota
              Mississippi
              Indiana
              Tennessee
              Nevada
              Oklahoma
              Missouri
              Virginia
              South_Carolina
              Nebraska
              Arizona
              Connecticut
              New_Mexico
              Utah
              Michigan
              Minnesota
              Maryland
              Colorado
              Texas
              West_Virginia
              Pennsylvania
              South_Dakota
              California
              New_Jersey
              Alabama
              Wyoming
              Alaska
              New_Hampshire
              Arkansas
              Montana
              Vermont
              Delaware
              Hawaii
              Louisiana
            }
          }
          Life_States {
            data {
              Wisconsin
              Oregon
              Kansas
              North_Carolina
              Kentucky
              Rhode_Island
              Washington
              Georgia
              Maine
              Idaho
              Florida
              Iowa
              Massachusetts
              New_York
              Ohio
              Illinois
              North_Dakota
              Mississippi
              Indiana
              Tennessee
              Nevada
              Oklahoma
              Missouri
              Virginia
              South_Carolina
              Nebraska
              Arizona
              Connecticut
              New_Mexico
              Utah
              Michigan
              Minnesota
              Maryland
              Colorado
              Texas
              West_Virginia
              Pennsylvania
              South_Dakota
              California
              New_Jersey
              Alabama
              Wyoming
              Alaska
              New_Hampshire
              Arkansas
              Montana
              Vermont
              Delaware
              Hawaii
              Louisiana
            }
          }
          Motorcycle_States {
            data {
              Wisconsin
              Oregon
              Kansas
              North_Carolina
              Kentucky
              Rhode_Island
              Washington
              Georgia
              Maine
              Idaho
              Florida
              Iowa
              Massachusetts
              New_York
              Ohio
              Illinois
              North_Dakota
              Mississippi
              Indiana
              Tennessee
              Nevada
              Oklahoma
              Missouri
              Virginia
              South_Carolina
              Nebraska
              Arizona
              Connecticut
              New_Mexico
              Utah
              Michigan
              Minnesota
              Maryland
              Colorado
              Texas
              West_Virginia
              Pennsylvania
              South_Dakota
              California
              New_Jersey
              Alabama
              Wyoming
              Alaska
              New_Hampshire
              Arkansas
              Montana
              Vermont
              Delaware
              Hawaii
              Louisiana
            }
          }
          Renter_States {
            data {
              Wisconsin
              Oregon
              Kansas
              North_Carolina
              Kentucky
              Rhode_Island
              Washington
              Georgia
              Maine
              Idaho
              Florida
              Iowa
              Massachusetts
              New_York
              Ohio
              Illinois
              North_Dakota
              Mississippi
              Indiana
              Tennessee
              Nevada
              Oklahoma
              Missouri
              Virginia
              South_Carolina
              Nebraska
              Arizona
              Connecticut
              New_Mexico
              Utah
              Michigan
              Minnesota
              Maryland
              Colorado
              Texas
              West_Virginia
              Pennsylvania
              South_Dakota
              California
              New_Jersey
              Alabama
              Wyoming
              Alaska
              New_Hampshire
              Arkansas
              Montana
              Vermont
              Delaware
              Hawaii
              Louisiana
            }
          }
          RV_States {
            data {
              Wisconsin
              Oregon
              Kansas
              North_Carolina
              Kentucky
              Rhode_Island
              Washington
              Georgia
              Maine
              Idaho
              Florida
              Iowa
              Massachusetts
              New_York
              Ohio
              Illinois
              North_Dakota
              Mississippi
              Indiana
              Tennessee
              Nevada
              Oklahoma
              Missouri
              Virginia
              South_Carolina
              Nebraska
              Arizona
              Connecticut
              New_Mexico
              Utah
              Michigan
              Minnesota
              Maryland
              Colorado
              Texas
              West_Virginia
              Pennsylvania
              South_Dakota
              California
              New_Jersey
              Alabama
              Wyoming
              Alaska
              New_Hampshire
              Arkansas
              Montana
              Vermont
              Delaware
              Hawaii
              Louisiana
            }
          }
          Umbrella_States {
            data {
              Wisconsin
              Oregon
              Kansas
              North_Carolina
              Kentucky
              Rhode_Island
              Washington
              Georgia
              Maine
              Idaho
              Florida
              Iowa
              Massachusetts
              New_York
              Ohio
              Illinois
              North_Dakota
              Mississippi
              Indiana
              Tennessee
              Nevada
              Oklahoma
              Missouri
              Virginia
              South_Carolina
              Nebraska
              Arizona
              Connecticut
              New_Mexico
              Utah
              Michigan
              Minnesota
              Maryland
              Colorado
              Texas
              West_Virginia
              Pennsylvania
              South_Dakota
              California
              New_Jersey
              Alabama
              Wyoming
              Alaska
              New_Hampshire
              Arkansas
              Montana
              Vermont
              Delaware
              Hawaii
              Louisiana
            }
          }
          Business_States {
            data {
              Wisconsin
              Oregon
              Kansas
              North_Carolina
              Kentucky
              Rhode_Island
              Washington
              Georgia
              Maine
              Idaho
              Florida
              Iowa
              Massachusetts
              New_York
              Ohio
              Illinois
              North_Dakota
              Mississippi
              Indiana
              Tennessee
              Nevada
              Oklahoma
              Missouri
              Virginia
              South_Carolina
              Nebraska
              Arizona
              Connecticut
              New_Mexico
              Utah
              Michigan
              Minnesota
              Maryland
              Colorado
              Texas
              West_Virginia
              Pennsylvania
              South_Dakota
              California
              New_Jersey
              Alabama
              Wyoming
              Alaska
              New_Hampshire
              Arkansas
              Montana
              Vermont
              Delaware
              Hawaii
              Louisiana
            }
          }
          Company_Logos {
            data {
              Attachments {
                raw {
                  thumbnails {
                    small {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    industryAvg: allAirtable(
      filter: {
        table: { eq: "Industry Averages" }
        data: { Line_of_Business: { eq: "Auto" } }
      }
    ) {
      nodes {
        data {
          Indicator_Name
          Average
          Minimum
          Maximum
        }
      }
    }
    coveragesDescriptions: allAirtable(
      filter: { table: { eq: "Coverage Descriptions" } }
    ) {
      nodes {
        data {
          Coverage_Name
          Coverage_Description
          Coverage_Type
          Line_of_Business
        }
      }
    }
    ratingRules: allAirtable(filter: { table: { eq: "Rating Rules" } }) {
      nodes {
        data {
          ruleName
          Category
          Low
          High
        }
      }
    }
  }
`;
