import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import TabPanel from './TabPanel';
import { useStaticQuery, graphql } from 'gatsby';
import _ from 'lodash';
import PanelFooter from './PanelFooter';

const ContactSupport = ({ styles, policyData, activeTab, handleEditPolicy }) => {
  const {
    allAirtable: { nodes: contactNodes },
  } = useStaticQuery(graphql`
    query getCarrierContactInfo {
      allAirtable(
        filter: {
          table: { eq: "Contact" }
          data: {
            Carrier: {
              elemMatch: {
                data: {
                  slug: { glob: "*" }
                  Company_Logos: {
                    elemMatch: {
                      data: {
                        Attachments: { localFiles: { elemMatch: { size: { gt: 0 } } } }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      ) {
        nodes {
          recordId
          data {
            Customer_Service_Phone
            Claims_Phone
            Customer_Service_Email
            Claims_Email
            Fax
            Carrier {
              data {
                slug
                name
                Company_Logos {
                  data {
                    Attachments {
                      raw {
                        thumbnails {
                          large {
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
        }
      }
    }
  `);

  const carrierContactInfoFilter = contactNodes.find(
    node => node.data.Carrier[0]?.data.slug === policyData.carrier.slug
  );

  const carrierContactInfo = _.isEmpty(carrierContactInfoFilter)
    ? null
    : carrierContactInfoFilter.data;

  const logo = carrierContactInfo
    ? carrierContactInfo.Carrier[0].data.Company_Logos[0]?.data?.Attachments?.raw[0]
        .thumbnails.large.url
    : null;
  return (
    <TabPanel
      styles={styles}
      value={activeTab}
      index={4}
      className={styles.policyPanelPolicyTab}
    >
      <Grid container direction={'column'} justifyContent={'center'}>
        {!carrierContactInfo ? (
          <Grid item md={12} sm={12} xs={12} className={styles.policyCollapseSupport}>
            <h4>We don&apos;t have {policyData.carrier.name} contact data</h4>
          </Grid>
        ) : (
          <>
            {!!logo && (
              <Grid item md={12} sm={12} xs={12}>
                <div className={styles.contactInfoLogoContainer}>
                  <img
                    src={logo}
                    alt={carrierContactInfo.Carrier[0]?.data.name}
                    className={styles.contactInfoLogo}
                  />
                </div>
              </Grid>
            )}
            <Grid item md={12} sm={12} xs={12} className={styles.policyCollapseSupport}>
              <div className={styles.policyCollapseSupportNumber}>
                <h4>
                  <a
                    title="Tel"
                    href={`tel:${carrierContactInfo?.Customer_Service_Phone.replaceAll(
                      '-',
                      ''
                    )}`}
                  >
                    {carrierContactInfo?.Customer_Service_Phone}
                  </a>
                </h4>
                <p>Contact {policyData.carrier.name} by phone or email your agent.</p>
              </div>
            </Grid>
          </>
        )}
      </Grid>
      <PanelFooter
        styles={styles}
        handleEditPolicy={handleEditPolicy}
        policyData={policyData}
      />
    </TabPanel>
  );
};

ContactSupport.propTypes = {
  styles: PropTypes.object.isRequired,
  activeTab: PropTypes.number.isRequired,
  policyData: PropTypes.object.isRequired,
  handleEditPolicy: PropTypes.func.isRequired,
};

export default ContactSupport;
