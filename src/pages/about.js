import React from 'react';
import Layout from '../components/layout/layout';
import SEO from '../components/layout/seo';
import * as styles from '../components/scss/about/about.module.scss';
import FormButton from '../components/form-button/FormButton';
import { navigate, Link } from 'gatsby';
import classNames from 'classnames';
import { StaticImage } from 'gatsby-plugin-image';

const About = () => {
  const data = [
    {
      image: () => (
        <StaticImage
          placeholder="blurred"
          layout="constrained"
          objectFit="contain"
          quality={100}
          className={styles.featureImgWrapper}
          src={'../images/about/feature-smart-score.png'}
          alt="Smart Score"
          formats={['auto', 'webp']}
        />
      ),
      title: 'Smart Score',
      description:
        'Reviews from real customers as well as value for price and ease of making a claim —including how fast the insurer handles it!— goes into the Smart Score.',
    },
    {
      image: () => (
        <StaticImage
          placeholder="blurred"
          layout="constrained"
          objectFit="contain"
          quality={100}
          className={styles.featureImgWrapper}
          src={'../images/about/feature-carrier-research.png'}
          alt="Carrier Research"
          formats={['auto', 'webp']}
        />
      ),
      title: 'Carrier Research',
      description:
        'Better understand the various terms, coverage options, and differences that exist between insurance companies.',
    },
    {
      image: () => (
        <StaticImage
          placeholder="blurred"
          layout="constrained"
          objectFit="contain"
          quality={100}
          className={styles.featureImgWrapper}
          src={'../images/about/feature-insurance-quotes.png'}
          alt="Insurance Quotes"
          formats={['auto', 'webp']}
        />
      ),
      title: 'Insurance Quotes',
      description:
        'Honest Policy offers instant quotes from 100+ insurance carriers nationwide.',
    },
    {
      image: () => (
        <StaticImage
          placeholder="blurred"
          layout="constrained"
          objectFit="contain"
          quality={100}
          className={styles.featureImgWrapper}
          src={'../images/about/feature-insurance-wallet.png'}
          alt="Insurance Wallet"
          formats={['auto', 'webp']}
        />
      ),
      title: 'Insurance Wallet',
      description: 'Manage all their insurance policies in one place—the Honest Policy! ',
    },
    {
      image: () => (
        <StaticImage
          placeholder="blurred"
          layout="constrained"
          objectFit="contain"
          quality={100}
          className={styles.featureImgWrapper}
          src={'../images/about/feature-latest-rates.png'}
          alt="Latest Rates"
          formats={['auto', 'webp']}
        />
      ),
      title: 'Latest Rates',
      description:
        'Sign in to get the latest rates and offers. Always get the best insurance rates for your needs.',
    },
  ];
  return (
    <Layout>
      <SEO
        title="About Honest Policy"
        url="/about"
        description="HonestPolicy offers rates for an unmatched number of insurers, and provide reviews from real customers based
          on national surveys as well as price comparisons, insurer size and feature information,
          insurer reliability, and purchase options."
      />
      <div className={styles.heroContainer}>
        <h1 className={styles.heroTitle}>About</h1>
        <p className={styles.heroDescription}>
          HonestPolicy offers rates for an unmatched number of insurers, and provide
          reviews from real customers based on national surveys as well as price
          comparisons, insurer size and feature information, insurer reliability, and
          purchase options.
        </p>
        <FormButton
          className={styles.requestInfoButton}
          onClick={() => navigate('/quotes')}
        >
          <strong>Get</strong> Quotes
        </FormButton>
        <Link
          className={styles.link}
          to="/quotes"
          title="Fill out one form to compare quotes from multiple carriers."
        >
          Fill out one form to compare quotes from multiple carriers.
        </Link>
      </div>
      <div className={styles.whyUseHp}>
        <h2 className={styles.sectionTitle}>Why use Honest Policy?</h2>
        <p className={styles.text}>
          Instead of simply shopping for the cheapest policy, we want to help you find the
          policy that offers the best value for your situation. We long for more
          transparency in the insurance industry. While comparing policies and carriers at
          HonestPolicy, you can be assured all of our data is designed to present an
          unbiased, fair comparison of your options.
        </p>
        <div className={styles.featuresContainer}>
          {data.map((data, idx) => (
            <div
              key={idx}
              className={classNames(styles.featureRow, idx % 2 === 1 ? styles.odd : '')}
            >
              <div className={styles.textContainer}>
                <h3 className={styles.sectionSubtitle}>{data.title}</h3>
                <p className={styles.text}>{data.description}</p>
              </div>
              <data.image />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.readyToStartContainer}>
        <div className={styles.ctaContainer}>
          <h3 className={styles.ctaTitle}>
            NEED HELP? - CALL US AT{' '}
            <a title="Call us" href="tel:+18772908182">
              (877) 290-8182
            </a>
          </h3>
          <p className={styles.ctaText}>
            Licensed agents offer support to help you find the right insurance on 8 AM - 9
            PM EST M-F and 10 AM - 6 PM EST on Saturdays
          </p>
        </div>
        <StaticImage
          src={'../images/hpLogo.png'}
          height={60}
          objectFit="contain"
          placeholder="tracedSVG"
          quality={90}
          alt="HP Logo"
        />
        <h2 className={styles.sectionTitle}>Ready to get started?</h2>
        <p className={styles.readyText}>
          Fill out one form to compare quotes from multiple carriers.
        </p>
        <FormButton
          className={styles.requestInfoButton}
          onClick={() => navigate('/quotes')}
        >
          <strong>Get</strong> Quotes
        </FormButton>
      </div>
    </Layout>
  );
};
export default About;
