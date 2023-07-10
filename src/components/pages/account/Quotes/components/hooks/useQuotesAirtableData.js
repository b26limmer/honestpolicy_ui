import { useStaticQuery } from 'gatsby';
import { graphql } from 'gatsby';

const useQuotesAirtableData = () => {
  const {
    allAirtable: { nodes: allPackagesByStateNodes },
    carriersData: { nodes: carrierNodes },
    ratingRules: { nodes: ratingRulesNodes },
    lineByState: { nodes: lineByStateNodes },
  } = useStaticQuery(graphql`
    query createCarriersLineOfBusinessesPageQuery {
      allAirtable(filter: { table: { eq: "Packages Coverages" } }) {
        nodes {
          data {
            State
            Package_Name
            Bodily_Injury
            Property_Damage
            Uninsured_Motorist
            Underinsured_Motorist
            Collision_Deductible
            Comprehensive_Deductible
            Towing
            Substitute_Transportation
            PIP__Not_Required_In_All_States_
          }
        }
      }
      lineByState: allAirtable(
        filter: {
          table: { eq: "Line by State" }
          data: {
            lineByStateRelatedCompany: { elemMatch: { data: { slug: { glob: "*" } } } }
          }
        }
      ) {
        nodes {
          data {
            Line
            State
            lineByStateRelatedCompany {
              data {
                name
                slug
              }
            }
          }
        }
      }
      carriersData: allAirtable(
        sort: { fields: data___name, order: ASC }
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
            Line_by_State {
              data {
                State
                Line
              }
            }
            About_Carrier {
              data {
                About_Carrier_Text
              }
            }
            Ratings {
              data {
                Line
                Smart_Score
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
            Ratings {
              data {
                Line
                Complaint_Index
                Customer_Service
                Value_for_Price
                Smart_Score
                Claims_Process
              }
            }
            Bindable_Carriers {
              data {
                bindableCarrierId
                bindableCarrierName
                bindableProduct
                airtableLineOfBusiness
              }
            }
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
  `);

  const ratingRules = {};
  ratingRulesNodes.map(rule => {
    let newRule = rule.data;
    let fixedCategory = newRule.Category.replace(/\s/g, '_');
    if (!(fixedCategory in ratingRules)) {
      ratingRules[fixedCategory] = {
        rules: [],
      };
    }
    ratingRules[fixedCategory]['rules'].push({
      ruleName: newRule.ruleName,
      low: newRule.Low,
      high: newRule.High,
    });
  });
  return { allPackagesByStateNodes, carrierNodes, ratingRules, lineByStateNodes };
};

export default useQuotesAirtableData;
