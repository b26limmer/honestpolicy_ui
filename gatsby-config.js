/* eslint-disable no-undef */
const baseId = process.env.AIRTABLE_BASE_ID;
module.exports = {
  siteMetadata: {
    title: `Honest Policy`,
    description: `Instant Quotes, Great Prices, Honest Policies`,
    author: `@honestpolicy`,
    siteUrl: `https://honestpolicy.com`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-remove-generator`,
    `gatsby-plugin-material-ui`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Honest Policy`,
        short_name: `Honest Policy`,
        start_url: `/`,
        background_color: `#f2f9f6`,
        theme_color: `#f2f9f6`,
        display: `minimal-ui`,
        icon: `src/images/ico.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        createLinkInHead: true,
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allFeedHonestPolicyFeed {
              edges {
                node {
                  slug: link
                  isoDate
                }
              }
            }
            allSitePage {
              edges {
                node {
                  slug: path
                }
              }
            }
          }`,
        excludes: ['request-reset-password', 'reset-password', 'account'],
        resolveSiteUrl: ({ site: { siteMetadata } }) => siteMetadata.siteUrl,
        resolvePages: ({
          allSitePage: { edges: allPages },
          allFeedHonestPolicyFeed: { edges: allWpNodes },
        }) => {
          const wpSlugs = allWpNodes.map(edge => {
            let slug = edge.node.slug;
            let gmtDate = new Date(edge.node.isoDate).toGMTString();
            return {
              path: slug.replace('https://honestpolicy.com', ''),
              modifiedGmt: gmtDate,
            };
          });

          const pageSlugs = allPages.map(page => {
            let slug = page.node.slug;
            let gmtDate = new Date().toGMTString();
            return { path: slug, modifiedGmt: gmtDate };
          });
          return [...wpSlugs, ...pageSlugs];
        },
        serialize: ({ path, modifiedGmt }) => {
          return {
            url: path,
            lastmod: modifiedGmt,
          };
        },
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        concurrency: 5,
        tables: [
          {
            baseId: baseId,
            tableName: `Carriers`,
            queryName: true,
            tableLinks: [
              `Carrier_Discounts`,
              `Company_Logos`,
              `Ratings`,
              `Auto_States`,
              `Home_States`,
              `Life_States`,
              `Motorcycle_States`,
              `Renter_States`,
              `RV_States`,
              `Umbrella_States`,
              `Business_States`,
              `About_Carrier`,
              `Optional_Coverage`,
              `Line_by_State`,
              `Rideshare`,
              `SR22`,
              `Complaints`,
              `Bindable_Carriers`,
            ],
          },
          {
            baseId: baseId,
            tableName: `Company Logos`,
            mapping: { Attachments: `fileNode` },
          },
          {
            baseId: baseId,
            tableName: `Packages Coverages`,
          },
          {
            baseId: baseId,
            tableName: `Complaints`,
          },
          {
            baseId: baseId,
            tableName: `Line by State`,
            tableLinks: [`lineByStateRelatedCompany`],
          },
          {
            baseId: baseId,
            tableName: `Rideshare`,
          },
          {
            baseId: baseId,
            tableName: `Ratings`,
            tableLinks: [`Carrier`],
          },
          {
            baseId: baseId,
            tableName: `Rating Rules`,
          },
          {
            baseId: baseId,
            tableName: `Industry Averages`,
            mapping: { Name: `text/markdown` }, // optional, e.g. "text/markdown", "fileNode"
          },
          {
            baseId: baseId,
            tableName: `Auto States`,
          },
          {
            baseId: baseId,
            tableName: `Home States`,
          },
          {
            baseId: baseId,
            tableName: `Life States`,
          },
          {
            baseId: baseId,
            tableName: `Motorcycle States`,
          },
          {
            baseId: baseId,
            tableName: `Renter States`,
          },
          {
            baseId: baseId,
            tableName: `RV States`,
          },
          {
            baseId: baseId,
            tableName: `Umbrella States`,
          },
          {
            baseId: baseId,
            tableName: `Business States`,
          },
          {
            baseId: baseId,
            tableName: `About Carrier`,
          },
          {
            baseId: baseId,
            tableName: `Optional Coverage`,
          },
          {
            baseId: baseId,
            tableName: `Coverage Descriptions`,
          },
          {
            baseId: baseId,
            tableName: `Carrier Discounts`,
            tableLinks: [`Discount`, `Discount_Carrier_Name`],
          },
          {
            baseId: baseId,
            tableName: `Discounts Names`,
          },
          {
            baseId: baseId,
            tableName: `SR22`,
          },
          {
            baseId: baseId,
            tableName: `Contact`,
            tableLinks: [`Carrier`],
          },
          {
            baseId: baseId,
            tableName: `Bindable Carriers`,
            tableLinks: [`airtableCarrier`],
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: `https://blog.honestpolicy.com/feed/`,
        name: `HonestPolicyFeed`,
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'hpGraphql',
        fieldName: 'hpGraphql',
        url: process.env.HP_GRAPHQL_API_ENDPOINT,
      },
    },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {}, // option to add more headers. `Link` headers are transformed by the below criteria
        allPageHeaders: [
          'Access-Control-Allow-Origin: https://honestpolicy.com',
          'X-Frame-Options: sameorigin',
          'X-Content-Type-Options: nosniff',
          'Referrer-Policy: strict-origin-when-cross-origin',
          `content-security-policy: default-src data: blob: 'self' \
          *.netlify.app *.netlify.com *.heapanalytics.com \
          *.segment.com *.honestpolicy.com *.lr-in.com *.cloudfront.net \
          *.googletagmanager.com translate.googleapis.com translate.google.com  *.google-analytics.com \
          *.honestpolicy.com *.lr-in.com *.cloudfront.net 'unsafe-inline'; img-src * data:;`,
        ], // option to add headers for all pages. `Link` headers are transformed by the below criteria
        mergeSecurityHeaders: true, // boolean to turn off the default security headers
      },
    },
  ],
};
