import { useStaticQuery, graphql } from 'gatsby';

const UseBlogs = () => {
  const blogData = useStaticQuery(graphql`
    query HpFeed {
      allFeedHonestPolicyFeed(limit: 3) {
        edges {
          node {
            title
            link
          }
        }
      }
    }
  `);
  return blogData;
};

export default UseBlogs;
