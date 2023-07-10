import React from 'react';
import classNames from 'classnames';
import Container from '../../../container';
import Button from '../../../form-button';
import PostPreview from '../../../post-preview/PostPreview';
import UseBlogs from '../../../utils/useBlogs';
import * as styles from './latest-blog-posts.module.scss';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

const LatestBlogPosts = () => {
  const { allFeedHonestPolicyFeed: blogData } = UseBlogs();
  const images = [
    {
      image: () => (
        <StaticImage
          backgroundColor="transparent"
          quality={60}
          placeholder="blurred"
          className={styles.gatsbyImgWrapper}
          objectFit="cover"
          layout="fullWidth"
          objectPosition="50% 50%"
          src={
            '../../../../images/adult-woman-sitting-in-car-and-using-smartphone-4005059.jpg'
          }
          alt={'Women on car'}
        />
      ),
    },
    {
      image: () => (
        <StaticImage
          backgroundColor="transparent"
          quality={60}
          placeholder="blurred"
          className={styles.gatsbyImgWrapper}
          objectFit="cover"
          layout="fullWidth"
          objectPosition="50% 50%"
          src={'../../../../images/bench-accounting-8D2k7a3wMKQ-unsplash.jpg'}
          alt={'Bench accounting'}
        />
      ),
    },
    {
      image: () => (
        <StaticImage
          backgroundColor="transparent"
          quality={60}
          placeholder="blurred"
          className={styles.gatsbyImgWrapper}
          objectFit="cover"
          layout="fullWidth"
          objectPosition="50% 50%"
          src={'../../../../images/elderly-man-helped-by-daughter.jpg'}
          alt={'Man Helped by daughter'}
        />
      ),
    },
  ];
  return (
    <div className={styles.latestPosts}>
      <Container className={styles.latestPostsInner}>
        <StaticImage
          src={'../../../../images/hpLogo.png'}
          alt="Honest Policy Logo"
          className={styles.logo}
          height={60}
          layout="constrained"
          backgroundColor="transparent"
          placeholder="tracedSVG"
          objectFit="contain"
          quality={100}
        />
        <h2 className={styles.title}>
          <strong>Learn the basics,</strong> make smart choices.
        </h2>
        <p className={styles.description}>
          Understand your options so that you can make the most informed decision about
          your insurance policy and avoid unwanted surprises.
        </p>
        <Link className={styles.learningLink} to="/learn" title="Learn">
          Visit the learning center
        </Link>
        <div className={styles.latestPostsWrapper}>
          <div className={styles.latestPostsRow}>
            {blogData.edges.slice(0, 1).map((post, id) => {
              return (
                <PostPreview
                  key={`long-${id}`}
                  isLong={true}
                  title={post.node.title}
                  Image={images[id].image}
                  link={post.node.link}
                />
              );
            })}
          </div>
          <div
            className={classNames(styles.latestPostsRow, styles.latestPostsRowSmaller)}
          >
            {blogData.edges.slice(1).map((post, id) => {
              return (
                <PostPreview
                  key={`short-${id}`}
                  isLong={false}
                  title={post.node.title}
                  Image={images[id + 1]?.image}
                  link={post.node.link}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.latestPostsButton}>
          <Button
            href="https://honestpolicy.com/learn/auto-insurance/"
            isOutline
            type="primary"
          >
            See more
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default LatestBlogPosts;
