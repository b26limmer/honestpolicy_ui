import React, { useState, useRef } from 'react';
import SEO from '../components/layout/seo';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import CarrierHero from '../components/pages/carrier/CarrierHero/CarrierHero';
import CarrierOverview from '../components/pages/carrier/CarrierOverview/CarrierOverview';
import CoverageOptions from '../components/pages/carrier/CarrierCoverage';
import StateAvailability from '../components/pages/carrier/StateAvailability';
import Discounts from '../components/pages/carrier/CarrierDiscounts';
import Compare from '../components/pages/carrier/CarrierCompare';
import useDeviceDetect from '../components/utils/useDeviceDetect';
import CarrierNavbar from '../components/pages/carrier/CarrierNavbar';

import Header from '../components/layout/header';
import CarrierInsurance from '../components/pages/carrier/CarrierInsurance/CarrierInsurance';
import Container from '../components/container';
import Ratings from '../components/pages/carrier/CarrierRatings/CarrierRatings';
import CustomerReviews from '../components/pages/carrier/CarrierCustomerReviews';
import Footer from '../components/layout/Footer';
import LoginPopup from '../components/forms/login-form/LoginPopup/login';

import * as styles from '../components/scss/carrier/carrierTemplate.module.scss';

const CarrierTemplate = ({ pageContext, data }) => {
  const [activeSection, setActiveSection] = useState('#overview');
  const [activeLineOfBusiness, setActiveLineOfBusiness] = useState(pageContext.line);
  const carrier = data.carrier?.data;
  const industryAvg = data.industryAvg.nodes.filter(
    indicator => indicator.data.Line == activeLineOfBusiness
  );
  const carriers = pageContext.carriers.nodes.filter(
    node => node.data.slug !== pageContext.slug
  );
  const carriersToCompare = pageContext.carriersToCompare.nodes.filter(
    node => node.data.slug !== pageContext.slug
  );
  const coveragesDescriptions = data.coveragesDescriptions.nodes;

  const carrierDiscounts =
    carrier.Carrier_Discounts?.filter(
      node => node.data.Line == activeLineOfBusiness.toLowerCase()
    ) || [];
  const ratingRules = data.ratingRules.nodes;
  const lineByState = data.lineByState.nodes || [];
  const headingRef = useRef();
  const overviewRef = useRef();
  const ratingsRef = useRef();
  const reviewsRef = useRef();
  const CoverageRef = useRef();
  const StateAvailabilityRef = useRef();
  const { isMobile } = useDeviceDetect();
  const [coverageMenuActive, setCoverageMenuActive] = useState(true);

  const complaints = data?.carrier?.data?.Complaints;

  const returnIndicator = indicatorName => {
    let indicator = industryAvg.filter(
      indicator => indicator.data.Indicator_Name === indicatorName
    );

    return indicator[0];
  };

  const hideCoverageMenu = () => {
    setCoverageMenuActive(false);
  };
  const carrierLogo =
    carrier?.Company_Logos[0]?.data?.Attachments?.localFiles[0].childImageSharp
      .gatsbyImageData;
  return (
    <>
      <SEO
        title={carrier.name}
        description={carrier.About_Carrier[0].data.About_Carrier_Text}
        url={`/carrier/${carrier.slug}`}
      />
      <>
        <div className={styles.carrierHeader}>
          <Header />
          <CarrierNavbar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            coverageMenuActive={coverageMenuActive}
          />
        </div>
        <Container className={styles.carrierHeaderData}>
          <CarrierInsurance
            logo={carrierLogo}
            name={carrier.name}
            isCar={activeLineOfBusiness === 'Auto'}
          />
        </Container>
        <Container className={styles.carrierHeroWrapper}>
          <CarrierHero
            isMobile={isMobile}
            headingRef={headingRef}
            name={carrier.name}
            ratingData={
              carrier?.Ratings?.filter(
                rating => rating.data.Line === activeLineOfBusiness
              )[0].data
            }
            industryAvg={industryAvg}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            sectionRef={headingRef}
            returnIndicator={returnIndicator}
          />
        </Container>
        <Container classes={{ root: 'fluidContainer ph-20' }}>
          <CarrierOverview
            slug={carrier.slug}
            ratings={carrier.Ratings}
            name={carrier.name}
            about={carrier.About_Carrier[0]}
            activeLineOfBusiness={activeLineOfBusiness}
            setActiveLineOfBusiness={setActiveLineOfBusiness}
            sectionRef={overviewRef}
          />
        </Container>
        <div className={styles.carrierTemplateGray}>
          <Container classes={{ root: 'fluidContainer ph-20' }}>
            <Ratings
              complaintsData={complaints}
              ratingRules={ratingRules}
              isMobile={isMobile}
              sectionRef={ratingsRef}
              name={carrier.name}
              ratingsData={carrier.Ratings}
              activeLineOfBusiness={activeLineOfBusiness}
              industryAvg={industryAvg}
              returnIndicator={returnIndicator}
            />
            <CustomerReviews
              sectionRef={reviewsRef}
              isMobile={isMobile}
              carrierId={pageContext.id}
              carrierName={pageContext.name}
              activeLineOfBusiness={activeLineOfBusiness}
            />
            <CoverageOptions
              activeLineOfBusiness={activeLineOfBusiness}
              name={carrier.name}
              sectionRef={CoverageRef}
              isMobile={isMobile}
              coveragesDescriptions={coveragesDescriptions}
              hideCoverageMenu={hideCoverageMenu}
            />
            {lineByState.length > 0 ? (
              <StateAvailability
                name={carrier.name}
                sectionRef={StateAvailabilityRef}
                lineByState={lineByState}
                activeLineOfBusiness={activeLineOfBusiness}
                styles={styles}
              />
            ) : (
              <h2 id="availability" className={styles.carrierTemplateTitle}>
                Carrier Doesn&apos;t have availability in any state
              </h2>
            )}
            {carrierDiscounts.length ? (
              0 && (
                <Discounts
                  activeLineOfBusiness={activeLineOfBusiness}
                  name={carrier.name}
                  carrierDiscounts={carrierDiscounts}
                />
              )
            ) : (
              <h2 id="discounts" className={styles.carrierTemplateTitle}>
                Carrier Doesn&apos;t have {activeLineOfBusiness} discounts
              </h2>
            )}
            <Compare
              name={carrier.name}
              logo={carrierLogo}
              carriers={carriers}
              carriersToCompare={carriersToCompare}
              isMobile={isMobile}
              activeLineOfBusiness={activeLineOfBusiness}
            />
          </Container>
        </div>
      </>
      <LoginPopup />
      <Footer />
    </>
  );
};

export default CarrierTemplate;
CarrierTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
};
export const query = graphql`
  query CarrierPage($name: String!) {
    carrier: airtable(table: { eq: "Carriers" }, data: { name: { eq: $name } }) {
      data {
        name
        slug
        About_Carrier {
          data {
            Website
            About_Carrier_Text
          }
        }
        Carrier_Discounts {
          data {
            Line
            Value_Low
            Value_High
            Discount_Data
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
        Complaints {
          id
          data {
            Line
            Year
            Complaint_Index
          }
        }
        Company_Logos {
          data {
            Attachments {
              localFiles {
                childImageSharp {
                  gatsbyImageData(
                    quality: 70
                    placeholder: BLURRED
                    layout: CONSTRAINED
                    transformOptions: { fit: CONTAIN }
                    formats: [AUTO]
                    backgroundColor: "#ffffff00"
                  )
                }
              }
            }
          }
        }
      }
    }
    lineByState: allAirtable(
      filter: {
        table: { eq: "Line by State" }
        data: {
          lineByStateRelatedCompany: { elemMatch: { data: { name: { eq: $name } } } }
        }
      }
    ) {
      nodes {
        data {
          lineByStateRelatedCompany {
            recordId
            data {
              name
            }
          }
          Line
          State
        }
      }
    }
    industryAvg: allAirtable(filter: { table: { eq: "Industry Averages" } }) {
      nodes {
        data {
          Indicator_Name
          Average
          Minimum
          Maximum
          Line
        }
      }
    }
    coveragesDescriptions: allAirtable(
      filter: { table: { eq: "Coverage Descriptions" } }
      sort: { order: ASC, fields: data___Coverage_Name }
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
