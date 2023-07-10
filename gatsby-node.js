/* eslint-disable no-undef */
const path = require('path');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

module.exports.createPages = async ({ graphql, actions, reporter }) => {
  const states = require('./src/utils/statesForNode');
  const { createPage } = actions;
  const carrierTemplate = path.resolve('./src/templates/carrierTemplate.js');
  const searchPage = path.resolve('./src/templates/search.js');

  const lineOfBusinesses = await graphql(`
    query createCarriersLineOfBusinessesPageQuery {
      allAirtable(
        filter: {
          table: { eq: "Ratings" }
          data: {
            Line: { in: ["Auto", "Home"] }
            Carrier: { elemMatch: { data: { slug: { glob: "*" } } } }
          }
        }
      ) {
        nodes {
          id
          recordId
          data {
            Line
            Carrier {
              data {
                name
                slug
                Company_Logos {
                  id
                }
              }
            }
          }
        }
      }
      allCarriersToCompare: allAirtable(
        filter: { table: { eq: "Carriers" }, data: { slug: { glob: "*" } } }
      ) {
        nodes {
          data {
            slug
            name
            Ratings {
              data {
                Line
                Customer_Service
                Claims_Process
                Complaint_Index
                Smart_Score
                Value_for_Price
                Percent_Recommend
                CI_Claims_Process
                CI_Value_for_Price
                CI_Customer_Service
              }
            }
          }
        }
      }
      carriers: allAirtable(
        limit: 6
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
            Company_Logos {
              data {
                Attachments {
                  localFiles {
                    childImageSharp {
                      gatsbyImageData(
                        quality: 70
                        placeholder: TRACED_SVG
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
            Ratings {
              data {
                Line
                Customer_Service
                Claims_Process
                Complaint_Index
                Smart_Score
                Value_for_Price
                Percent_Recommend
                CI_Claims_Process
                CI_Value_for_Price
                CI_Customer_Service
              }
            }
          }
        }
      }
    }
  `);
  const backendCarriers = await graphql(`
    {
      hpGraphql {
        allCarriers {
          nodes {
            id
            name
            slug
          }
        }
      }
    }
  `);
  const searchPageQuery = await graphql(
    `
      query GET_ALL_CARRIERS {
        allAirtable(
          sort: { fields: data___name, order: ASC }
          filter: {
            table: { eq: "Carriers" }
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
        ) {
          edges {
            node {
              data {
                name
                slug
                Line_by_State {
                  data {
                    State
                    Line
                  }
                }
                Company_Logos {
                  data {
                    Attachments {
                      localFiles {
                        childImageSharp {
                          gatsbyImageData(
                            quality: 70
                            placeholder: TRACED_SVG
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
              }
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
            }
          }
        }
      }
    `
  );
  const backendCarriersNodes = backendCarriers.data.hpGraphql.allCarriers.nodes;
  const allAvailableLines = lineOfBusinesses.data.allAirtable.nodes;

  Object.values(states).forEach(state => {
    createPage({
      component: searchPage,
      path: `search/${state.toLowerCase().replace(/ /g, '-')}`,
      context: {
        state: state,
        data: searchPageQuery.data,
      },
    });
  });
  createPage({
    component: searchPage,
    path: 'search',
    context: {
      data: searchPageQuery.data,
    },
  });

  allAvailableLines.forEach(node => {
    const carrier = node.data.Carrier[0].data;
    let carrierId = null;
    let line = node.data.Line.toLowerCase();
    if (line === 'auto') {
      line = 'car';
    } else if (line != 'home') {
      return;
    }
    let carrierIdx = backendCarriersNodes.findIndex(
      backNode => backNode.slug === carrier.slug
    );
    if (carrierIdx !== -1) {
      carrierId = backendCarriersNodes[carrierIdx].id;
    } else {
      reporter.error(
        `Carrier ${carrier.name} not found!!!`,
        new Error(
          JSON.stringify({
            carrierSlug: carrier.slug,
            env: process.env.NODE_ENV,
            endpoint: process.env.HP_GRAPHQL_API_ENDPOINT,
          })
        )
      );
    }
    if (carrier.slug && carrier.Company_Logos && carrierId) {
      createPage({
        component: carrierTemplate,
        path: `insurance/${carrier.slug}/${line}`,
        context: {
          name: carrier.name,
          id: carrierId,
          recordId: node.recordId,
          line: node.data.Line,
          carriers: lineOfBusinesses.data.carriers,
          carriersToCompare: lineOfBusinesses.data.allCarriersToCompare,
          slug: carrier.slug,
        },
      });
    }
  });
};

exports.onCreateWebpackConfig = ({ actions, plugins }) => {
  const allowList = [
    'HP_GRAPHQL_API_ENDPOINT',
    'HEAP_APP_ID',
    'LOGROCKET_APP_ID',
    'NODE_ENV',
  ];
  const varobj = Object.keys(process.env).reduce((acc, key) => {
    if (allowList.indexOf(key) >= 0) {
      acc[`process.env.${key}`] = JSON.stringify(process.env[key]);
    }
    return acc;
  }, {});

  let pluginsToAdd;
  if (Object.keys(varobj).length) {
    pluginsToAdd = [
      plugins.define(varobj),
      new FilterWarningsPlugin({
        exclude:
          /mini-css-extract-plugin[^]*Conflicting order. Following module has been added:/,
      }),
    ];
  }
  actions.setWebpackConfig({ plugins: pluginsToAdd });
};

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;
  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/account/)) {
    page.matchPath = '/account/*';
    // Update the page.
    createPage(page);
  }
};
