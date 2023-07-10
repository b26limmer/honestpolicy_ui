import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Paper from '../../../utils/paper';
import useWindowSize from '../../../utils/UseWindowSize';
// import collapseArrow from '../../../../images/collapse-arrow-down.svg';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CarrierLineGraph from './components/CarrierLineGraph/CarrierLineGraph';
import CarrierBarGraph from './components/CarrierBarGraph/CarrierBarGraph';
import * as styles from './carrier-ratings.module.scss';

const Graph = ({
  graphRef,
  ratingData,
  graphWidth,
  sectionWidth,
  carrierScoreRef,
  carrierScoreWidth,
  name,
  classToApply,
}) => {
  return (
    <>
      <div
        className={[styles.graphArea, classToApply].join(' ')}
        ref={graphRef}
        style={{
          paddingLeft: `${
            ratingData.section === 'Smart Score'
              ? (graphWidth * ratingData?.industryAvg?.Minimum) / 100
              : (graphWidth * ratingData?.industryAvg?.Minimum) / 10
          }px`,
          paddingRight: `${
            ratingData.section === 'Smart Score'
              ? ((100 - ratingData?.industryAvg?.Maximum) / 100) * graphWidth
              : ((10 - ratingData?.industryAvg?.Maximum) / 10) * graphWidth
          }px`,
        }}
      >
        <span className={styles.coloredGraph} />
      </div>
      <div
        className={[styles.graphHelpText, classToApply].join(' ')}
        style={{
          right: `${sectionWidth * 0.1 + 20}px`,
          width: `${(sectionWidth - 50) * 0.5}px`,
        }}
      >
        <div
          className={styles.graphNumber}
          ref={carrierScoreRef}
          style={{
            left: `${
              ratingData.section === 'Smart Score'
                ? (graphWidth * ratingData.score) / 100 - carrierScoreWidth
                : (graphWidth * ratingData.score) / 10 - carrierScoreWidth
            }px`,
          }}
        >
          {name.slice(0, 15)}: {ratingData.score}
          <div
            style={{
              width: '12px',
              height: '12px',
              border: '1px solid #00bf91',
              backgroundColor: '#00bf91',
            }}
          />
        </div>
        <span
          className={[styles.graphNumber, styles.graphNumberBottom].join(' ')}
          style={{
            right: `${
              ratingData.section === 'Smart Score'
                ? ((100 - ratingData?.industryAvg?.Average) / 100) * graphWidth
                : ((10 - ratingData?.industryAvg?.Average) / 10) * graphWidth
            }px`,
            top: '17px',
            display: 'flex',
            flexDirection: 'column-reverse',
          }}
        >
          Industry Average: {ratingData?.industryAvg?.Average}
          <div
            style={{
              width: '12px',
              height: '12px',
              border: '1px solid #000080',
              backgroundColor: '#000080',
              alignSelf: 'flex-end',
            }}
          />
        </span>
      </div>
    </>
  );
};

export function getSmartScoreDescription(score, name) {
  return `${name}’s Smart Score of ${score} was created by combining weighted averages of ratings for customer service, claims process, and value for price from 3rd party sources as well as our own research. We view these as the most important factors since they cover the entire experience of shopping for, maintaining, and making a claim on an insurance policy.`;
}

export function getClaimsProcessDescription(name) {
  return `Our claims process score looks at users' experiences when filing claims with ${name}. It takes into account not only claim outcomes, but also the ease of making and tracking a claim, as well as how fast ${name} handles it.`;
}

export function getValueForPriceDescription(name) {
  return `${name}’s value score measures customer satisfaction when considering how much they pay versus the quality of their experience when dealing with the company.`;
}
const RatingSection = ({
  complaints,
  ratingData,
  name,
  isMobile,
  ratingsData,
  rules,
  websiteData,
  billingData,
  activeLineOfBusiness,
}) => {
  const [activeSection, setActiveSection] = useState(false);
  const [graphWidth, setGraphWidth] = useState(0);
  const [sectionWidth, setSectionWidth] = useState(0);
  const [carrierScoreWidth, setCarrierScoreWidth] = useState(0);

  const size = useWindowSize();

  const sectionRef = useRef(null);
  const desktopGraphRef = useRef(null);
  const mobileGraphRef = useRef(null);
  const carrierScoreRef = useRef(null);
  const carrierScoreRefMob = useRef(null);

  const toggleSection = e => {
    e.stopPropagation();
    activeSection ? setActiveSection(false) : setActiveSection(true);
  };
  const calculateCarrierScoreWidth = () => {
    if (!isMobile) {
      carrierScoreWidth !== carrierScoreRef.current.clientWidth
        ? setCarrierScoreWidth(carrierScoreRef.current.clientWidth)
        : null;
    } else {
      carrierScoreWidth !== carrierScoreRefMob.current.clientWidth
        ? setCarrierScoreWidth(carrierScoreRefMob.current.clientWidth)
        : null;
    }
  };
  useEffect(() => {
    if (!isMobile && desktopGraphRef.current) {
      if (sectionRef.current.clientWidth !== sectionWidth) {
        setSectionWidth(sectionRef.current.clientWidth);
      }
      if (desktopGraphRef.current.clientWidth !== graphWidth) {
        setGraphWidth(desktopGraphRef.current.clientWidth);
      }
      if (carrierScoreRef.current) {
        calculateCarrierScoreWidth();
      }
    } else if (mobileGraphRef.current) {
      if (sectionRef.current.clientWidth !== sectionWidth) {
        setSectionWidth(sectionRef.current.clientWidth);
      }
      if (mobileGraphRef.current.clientWidth !== graphWidth) {
        setGraphWidth(mobileGraphRef.current.clientWidth);
      }
      if (carrierScoreRefMob.current) {
        calculateCarrierScoreWidth();
      }
    }
  }, [
    desktopGraphRef,
    mobileGraphRef,
    sectionRef,
    graphWidth,
    sectionWidth,
    size,
    carrierScoreRef,
    isMobile,
  ]);
  return (
    <div
      className={classNames(
        ratingData.section.search('Complaints') !== -1
          ? styles.ratingPaperContainerAverage
          : '',
        styles.ratingCard
      )}
      ref={sectionRef}
      id={ratingData.section.search('Complaints') !== -1 ? 'complaints' : 'ratings'}
      onClick={toggleSection}
    >
      <Paper
        className={[
          styles.headerSection,
          !activeSection && styles.headerSectionInactive,
        ].join(' ')}
      >
        <div className={styles.spaceEvenlyRow}>
          <h3
            className={
              ratingData.section.search('Complaints') === -1
                ? styles.carrierTemplateSectionTitle
                : styles.carrierTemplateSectionTitleExtended
            }
          >
            {ratingData.section}
          </h3>
          <h3
            className={
              ratingData.section.search('Complaints') === -1
                ? styles.carrierTemplateSectionTitleGreen
                : styles.carrierTemplateSectionTitleGreenExtended
            }
          >
            {ratingData.section.search('Complaints') === -1
              ? ratingData.score
              : `${
                  ratingsData.Complaint_Index <
                  rules.Complaints_Chart.rules.filter(
                    rule => rule.ruleName === 'Average'
                  )[0].low
                    ? 'Better than average'
                    : ratingsData.Complaint_Index <
                      rules.Complaints_Chart.rules.filter(
                        rule => rule.ruleName === 'Average'
                      )[0].high
                    ? 'Average'
                    : 'Worse than average'
                }`}
          </h3>
          {ratingData.section.search('Complaints') === -1 && (
            <Graph
              graphRef={desktopGraphRef}
              ratingData={ratingData}
              graphWidth={graphWidth}
              sectionWidth={sectionWidth}
              carrierScoreRef={carrierScoreRef}
              carrierScoreWidth={carrierScoreWidth}
              calculateCarrierScoreWidth={calculateCarrierScoreWidth}
              name={name}
              classToApply={styles.desktopGraphArea}
            />
          )}
          <div className={styles.buttonContainer} onClick={toggleSection}>
            {!activeSection ? <AddIcon /> : <RemoveIcon />}
          </div>
        </div>
      </Paper>
      <Paper className={activeSection ? styles.sectionBody : styles.sectionBodyInactive}>
        {ratingData.section.search('Complaints') === -1 && (
          <Graph
            graphRef={mobileGraphRef}
            ratingData={ratingData}
            graphWidth={graphWidth}
            sectionWidth={sectionWidth}
            carrierScoreRef={carrierScoreRefMob}
            carrierScoreWidth={carrierScoreWidth}
            calculateCarrierScoreWidth={calculateCarrierScoreWidth}
            name={name}
            classToApply={styles.mobileGraphArea}
          />
        )}
        <div className={styles.ratingSectionBody}>
          <div
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: ratingData.text }}
          />
          {ratingData.section.search('Complaints') !== -1 && (
            <CarrierLineGraph
              activeLineOfBusiness={activeLineOfBusiness}
              complaints={complaints}
              rules={rules?.Complaints_Chart?.rules}
            />
          )}
        </div>
        {ratingData?.section === 'Customer Service' && (
          <CarrierBarGraph
            name={name}
            complaints={complaints}
            rules={rules?.Complaints_Chart?.rules}
            websiteData={websiteData}
            billingData={billingData}
            ratingData={{
              value: ratingData?.score,
              average: ratingData?.industryAvg?.Average,
            }}
          />
        )}
      </Paper>
    </div>
  );
};

const Ratings = ({
  sectionRef,
  name,
  ratingsData: allRatingsData,
  activeLineOfBusiness,
  returnIndicator,
  isMobile,
  ratingRules,
  complaintsData: allComplaintsData,
}) => {
  const ratingsData = allRatingsData.filter(
    ratingData => ratingData.data.Line === activeLineOfBusiness
  )[0].data;
  const rules = {};
  const complaintsData = allComplaintsData?.filter(
    complaint => complaint.data.Line === activeLineOfBusiness
  );

  ratingRules.map(rule => {
    let newRule = rule.data;
    let fixedCategory = newRule.Category.replace(/\s/g, '_');
    if (!(fixedCategory in rules)) {
      rules[fixedCategory] = {
        rules: [],
      };
    }
    rules[fixedCategory]['rules'].push({
      ruleName: newRule.ruleName,
      low: newRule.Low,
      high: newRule.High,
    });
  });
  const varyingRules = {
    'are very consistent': 'tiny',
    'are pretty consistent': 'narrow',
    'vary a bit': 'moderate',
    'vary a lot': 'wide',
  };
  const condifentRules = {
    'are very consistent': 'very confident',
    'are pretty consistent': 'confident',
    'vary a bit': 'pretty confident',
    'vary a lot': 'only mildly confident',
  };

  const ratings = [
    {
      section: 'Smart Score',
      text: `<h4>Why our Smart Score matters</h4>
      <p class=${styles.ratingParagraph}>${getSmartScoreDescription(
        ratingsData.Smart_Score,
        name
      )}</p>
      </br>
      <h4>How our Smart Score is calculated</h4>
      <p class=${
        styles.ratingParagraph
      }>Data comes from customer reviews, officially filed complaints,
      financial stability data, and other insurance industry rating companies.
      Combining these metrics and sources provides the most accurate and broad-based
      analysis of what matters most when considering ${name}’s overall quality compared
      to other ${activeLineOfBusiness.toLowerCase()} insurers.
      While there is some overlap between our three primary metrics, each has unique
      characteristics that set them apart from each other.</p>
      </br>
      <h4>What does this mean for you?</h4>
      <p class=${styles.ratingParagraph}>With a score of ${
        ratingsData.Smart_Score
      }, ${name}

       ${
         ratingsData.Smart_Score <
         returnIndicator('Smart Score')?.data?.Average -
           rules.Smart_Score_Averageness.rules[0].low
           ? 'falls short of'
           : ratingsData.Smart_Score <
             returnIndicator('Smart Score')?.data?.Average +
               rules.Smart_Score_Averageness.rules[0].high
           ? 'sits near'
           : 'rises above'
       }

       the industry average of ${returnIndicator('Smart Score')?.data?.Average}.
        While this metric isn’t the be-all and end-all,
       it’s definitely a good point of reference when
       comparing ${activeLineOfBusiness.toLowerCase()} insurance options.</p>
      `,
      industryAvg: returnIndicator('Smart Score')?.data,
      score: ratingsData.Smart_Score,
    },
    {
      section: 'Customer Service',
      text: `<p class=${
        styles.ratingParagraph
      }>Our customer service score measures two primary things:
      user satisfaction when interacting with ${name}’s representatives,
      and their experience with online tools like quoting and managing a policy
      via website or app.

      ${name}’s customer service score comes from a variety of places.
      These include user reviews on Honest Policy, as well as other analytics
      companies such as JD Power, Insure.com, and Consumer Reports.</p><br/>
      <h4>What does this mean for you?</h4>
      <p class=${styles.ratingParagraph}>As you can see from ${name}’s service score of ${
        ratingsData.Customer_Service
      }, they have a

      ${
        ratingsData.Customer_Service <
        returnIndicator('Customer Service')?.data?.Average -
          rules.Customer_Service_Averageness.rules[0].low
          ? 'weak'
          : ratingsData.Customer_Service <
            returnIndicator('Customer Service')?.data?.Average +
              rules.Customer_Service_Averageness.rules[0].high
          ? 'decent'
          : 'solid'
      }

      rating compared to similar ${activeLineOfBusiness.toLowerCase()} insurance
      companies, which clock in at an average of ${
        returnIndicator('Customer Service')?.data?.Average
      }.</p>
      </br>
      ${
        !ratingsData.CI_Customer_Service
          ? `<p class=${styles.ratingParagraph}>With minimal sources reporting customer service data for this company,
          we can’t calculate the estimated range. Consequently, we’re not certain about
          the accuracy of this score, but it’s the closest estimate we have.</p>`
          : `<p class=${styles.ratingParagraph}>The ratings between sources

          ${rules.Ratings_CI.rules
            .map(rule => {
              if (
                ratingsData.CI_Customer_Service > rule.low &&
                ratingsData.CI_Customer_Service < rule.high
              ) {
                return rule.ruleName;
              }
            })
            .join('')}.
          Calculating with the given range and number of sources reporting,
          we’re almost certain the true score lies between ${Math.min(
            Math.round(
              (ratingsData.Customer_Service - ratingsData.CI_Customer_Service) * 10
            ) / 10,
            10
          )}
          and ${Math.min(
            Math.round(
              (ratingsData.Customer_Service + ratingsData.CI_Customer_Service) * 10
            ) / 10,
            10
          )}. With those
          ${rules.Ratings_CI.rules
            .map(rule => {
              if (
                ratingsData.CI_Customer_Service > rule.low &&
                ratingsData.CI_Customer_Service < rule.high
              ) {
                return varyingRules[rule.ruleName];
              }
            })
            .join('')}
          bounds,
          we’re ${rules.Ratings_CI.rules
            .map(rule => {
              if (
                ratingsData.CI_Customer_Service > rule.low &&
                ratingsData.CI_Customer_Service < rule.high
              ) {
                return condifentRules[rule.ruleName];
              }
            })
            .join('')}
          about the accuracy of their ${ratingsData.Customer_Service} rating.</p>`
      }`,
      industryAvg: returnIndicator('Customer Service')?.data,
      score: ratingsData.Customer_Service,
    },
    {
      section: 'Claims Process',
      text: `<p class=${styles.ratingParagraph}>${getClaimsProcessDescription(
        name
      )}</p><br/>
      <p class=${
        styles.ratingParagraph
      }>${name}’s claim score is derived from various sources.
      These include reviews from Honest Policy users, and outside sources
      including Consumer Reports, Insure.com and JD Power. We round off our
      calculation with official complaints filed with the National Association
      of Insurance Commissioners (which primarily are claim related). These complaints
      are weighted against the size of each company to ensure an apples-to-apples comparison.
      This gives our claim score the most complete picture of what to expect when filing a
      claim with ${name}.</p><br/>
      <h4>What does this mean for you?</h4>
        <p class=${styles.ratingParagraph}>Evident from a claims score of ${
        ratingsData.Claims_Process
      }, ${name} has
        ${
          ratingsData.Claims_Process <
          returnIndicator('Claims Process')?.data?.Average -
            rules.Claims_Processing_Averageness.rules[0].low
            ? 'a less stellar'
            : ratingsData.Claims_Process <
              returnIndicator('Claims Process')?.data?.Average +
                rules.Claims_Processing_Averageness.rules[0].high
            ? 'a reasonable'
            : 'an outstanding'
        }
        rating compared to the average claim score of ${
          returnIndicator('Claims Process')?.data?.Average
        } for similar ${activeLineOfBusiness.toLowerCase()} insurance companies.</p><br/>
        ${
          ratingsData.CI_Claims_Process
            ? `<p class=${styles.ratingParagraph}>The ratings between sources
            ${rules.Ratings_CI.rules
              .map(rule => {
                if (
                  ratingsData.CI_Claims_Process > rule.low &&
                  ratingsData.CI_Claims_Process < rule.high
                ) {
                  return rule.ruleName;
                }
              })
              .join('')}.
            Calculating with the given range and number of sources reporting,
            we’re almost certain the true score lies between
            ${Math.min(
              Math.round(
                (ratingsData.Claims_Process - ratingsData.CI_Claims_Process) * 10
              ) / 10,
              10
            )}
            and ${Math.min(
              Math.round(
                (ratingsData.Claims_Process + ratingsData.CI_Claims_Process) * 10
              ) / 10,
              10
            )}. With those
            ${rules.Ratings_CI.rules
              .map(rule => {
                if (
                  ratingsData.CI_Claims_Process > rule.low &&
                  ratingsData.CI_Claims_Process < rule.high
                ) {
                  return varyingRules[rule.ruleName];
                }
              })
              .join('')}
             bounds,
            we’re ${rules.Ratings_CI.rules
              .map(rule => {
                if (
                  ratingsData.CI_Claims_Process > rule.low &&
                  ratingsData.CI_Claims_Process < rule.high
                ) {
                  return condifentRules[rule.ruleName];
                }
              })
              .join('')}
            about the accuracy of their ${ratingsData.Claims_Process} rating.</p>`
            : `<p class=${styles.ratingParagraph}>With minimal sources reporting claims quality data for this company,
            we can’t calculate an estimated range. Thus, we can’t be certain about
            the accuracy of this score, it’s just our best estimate.</p>`
        }

      `,
      industryAvg: returnIndicator('Claims Process')?.data,
      score: ratingsData.Claims_Process,
    },
    {
      section: 'Value for Price',
      text: `<p class=${styles.ratingParagraph}>${getValueForPriceDescription(
        name
      )}</p><br/>
      <p class=${
        styles.ratingParagraph
      }>How ${name} comes up with the price of a policy varies by state, and
      relates to a number of different factors. Some of these include driving
      record, how much you use your car, location, age, gender, and the car you drive.
      While price is a critical factor for most insurance customers, what they get for
      that money is even more important.
      As with our other scores, this rating comes from a variety of sources:
      Honest Policy, JD Power, Insure.com, Clearsurance, and Consumer Reports.</p><br/>
      <h4>What does this mean for you?</h4>
      <p class=${styles.ratingParagraph}>${name}’s value for price score of ${
        ratingsData.Value_for_Price
      } is
      ${
        ratingsData.Value_for_Price <
        returnIndicator('Value for Price')?.data?.Average -
          rules.Value_for_Price_Averageness.rules[0].low
          ? 'not great'
          : ratingsData.Smart_Score <
            returnIndicator('Value for Price')?.data?.Average +
              rules.Value_for_Price_Averageness.rules[0].high
          ? 'okay'
          : 'excellent'
      }
       compared to the average of ${returnIndicator('Value for Price')?.data?.Average}
        from other ${activeLineOfBusiness.toLowerCase()} insurance companies.</p>
      ${
        ratingsData.CI_Value_for_Price
          ? `<p class=${styles.ratingParagraph}>The ratings between sources
          ${rules.Ratings_CI.rules
            .map(rule => {
              if (
                ratingsData.CI_Value_for_Price > rule.low &&
                ratingsData.CI_Value_for_Price < rule.high
              ) {
                return rule.ruleName;
              }
            })
            .join('')}.
          Calculating with the given range and number of sources reporting,
          we’re almost certain the true score lies between ${Math.min(
            Math.round(
              (ratingsData.Value_for_Price - ratingsData.CI_Value_for_Price) * 10
            ) / 10,
            10
          )}
          and ${Math.min(
            Math.round(
              (ratingsData.Value_for_Price + ratingsData.CI_Value_for_Price) * 10
            ) / 10,
            10
          )}. With those ${rules.Ratings_CI.rules
              .map(rule => {
                if (
                  ratingsData.CI_Value_for_Price > rule.low &&
                  ratingsData.CI_Value_for_Price < rule.high
                ) {
                  return varyingRules[rule.ruleName];
                }
              })
              .join('')} bounds, we’re ${rules.Ratings_CI.rules
              .map(rule => {
                if (
                  ratingsData.CI_Value_for_Price > rule.low &&
                  ratingsData.CI_Value_for_Price < rule.high
                ) {
                  return condifentRules[rule.ruleName];
                }
              })
              .join('')} about the accuracy of their <vscore> rating.</p>`
          : `<p class=${styles.ratingParagraph}>With few sources reporting price value data for this company,
          we don’t have an estimated range. As a result, we’re not 100% sure
          about this score. It’s more of an educated guess, so take it with a grain of salt.</p>`
      }
      `,
      industryAvg: returnIndicator('Value for Price')?.data,
      score: ratingsData.Value_for_Price,
    },
  ];
  const complaints = [
    {
      section: `${activeLineOfBusiness} Official Complaints`,
      text: `<p class=${
        styles.ratingParagraph
      }>Tracks how many more or less official complaints ${name} has than
      average. With an index of ${ratingsData.Complaint_Index} ${name}
      ${
        ratingsData.Complaint_Index <
        rules.Complaints_Chart.rules.filter(rule => rule.ruleName === 'Average')[0].low
          ? 'is better than average'
          : ratingsData.Complaint_Index <
            rules.Complaints_Chart.rules.filter(rule => rule.ruleName === 'Average')[0]
              .high
          ? 'is about average'
          : 'is worse than average'
      }.</p><br/>
      <p class=${
        styles.ratingParagraph
      }>The complaint index comes from two variables for each year and type of insurance.</p>
      <ul>
      <li><p class=${
        styles.ratingParagraph
      }>The percentage of how many complaints ${name} has filed against them with
      the National Association of Insurance Commissioners (NAIC) compared to the
      total number of complaints filed with every company.<p class=${
        styles.ratingParagraph
      }></li>
      <li><p class=${
        styles.ratingParagraph
      }>The percentage of how much insurance business (total policy premiums) ${name}
       has compared to the total amount of business of all the other companies.<p class=${
         styles.ratingParagraph
       }></li>
      </ul>
      <p class=${
        styles.ratingParagraph
      }>By weighting complaints and business against their totals, and then dividing
      share of compliants by share of the market, we get the index value.
      With 1.0 being an average number of complaints, a 0.5 would be half as many
      complaints. With an index of ${ratingsData.Complaint_Index} ${name}
      ${
        ratingsData.Complaint_Index <
        rules.Complaints_Chart.rules.filter(rule => rule.ruleName === 'Average')[0].low
          ? 'is better than average'
          : ratingsData.Complaint_Index <
            rules.Complaints_Chart.rules.filter(rule => rule.ruleName === 'Average')[0]
              .high
          ? 'falls in the middle of the pack'
          : 'is worse than average'
      }.</p>
      `,
      industryAvg: '',
      score: ratingsData.Complaint_Index,
    },
  ];

  return (
    <div className={styles.ratingsWrapper} ref={sectionRef} id={'ratings'}>
      <h2 className={styles.carrierScoreTitle}>{name} Ratings Breakdown</h2>
      {ratings.map((ratingData, idx) => (
        <RatingSection
          key={idx}
          ratingData={ratingData}
          activeLineOfBusiness={activeLineOfBusiness}
          name={name}
          isMobile={isMobile}
          billingData={{
            value: ratingsData?.['Billing_Policy_Average'],
            average: returnIndicator('Billing and Policy')?.data?.Average,
          }}
          websiteData={{
            value: ratingsData?.['Website_App_Average'],
            average: returnIndicator('Website and Apps')?.data?.Average,
          }}
        />
      ))}
      <h2 className={styles.carrierScoreTitle} id={'complaints'}>
        {name} {activeLineOfBusiness} Official Complaints
      </h2>
      {complaints.map((ratingData, idx) => (
        <RatingSection
          key={idx}
          ratingData={ratingData}
          ratingsData={ratingsData}
          activeLineOfBusiness={activeLineOfBusiness}
          name={name}
          isMobile={isMobile}
          rules={rules}
          complaints={complaintsData}
        />
      ))}
    </div>
  );
};

Ratings.propTypes = {
  sectionRef: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  ratingsData: PropTypes.array.isRequired,
  activeLineOfBusiness: PropTypes.string.isRequired,
  returnIndicator: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  ratingRules: PropTypes.array.isRequired,
  complaintsData: PropTypes.array,
};
RatingSection.propTypes = {
  ratingData: PropTypes.object.isRequired,
  activeLineOfBusiness: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
  ratingsData: PropTypes.object,
  rules: PropTypes.object,
  complaints: PropTypes.array,
  websiteData: PropTypes.object,
  illingData: PropTypes.object,
  billingData: PropTypes.object,
};
Graph.propTypes = {
  graphRef: PropTypes.object.isRequired,
  ratingData: PropTypes.object.isRequired,
  graphWidth: PropTypes.number.isRequired,
  sectionWidth: PropTypes.number.isRequired,
  carrierScoreRef: PropTypes.object.isRequired,
  carrierScoreWidth: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  classToApply: PropTypes.string.isRequired,
};

export default Ratings;
