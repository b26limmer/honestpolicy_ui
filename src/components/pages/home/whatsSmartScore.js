import React, { useLayoutEffect, useRef, useState } from 'react';
import * as styles from '../../scss/home/whats-smart-score.module.scss';
import PlusIcon from '../../icons/PlusIcon';
import Button from '../../form-button/FormButton';
import { Player } from '@lottiefiles/react-lottie-player';
import { default as animationOne } from '../../../components/lottieFiles/home/1cry.json';
import { default as animationTwo } from '../../../components/lottieFiles/home/2frown.json';
import { default as animationThree } from '../../../components/lottieFiles/home/3neutral.json';
import { default as animationFour } from '../../../components/lottieFiles/home/4smile.json';
import { default as animationFive } from '../../../components/lottieFiles/home/5amazing.json';
import { navigate } from 'gatsby-link';
import { StaticImage } from 'gatsby-plugin-image';

const WhatsSmartScore = () => {
  const data = [
    {
      title: 'Customer Service',
      text: `Our customer service score measures two primary things: user satisfaction when interacting with the carrier's representatives, and their experience with online tools like quoting and managing a policy via website or app.`,
    },
    {
      title: 'Claims Process',
      text: `Our claims process score looks at users' experiences when filling claims with carriers. It takes into account not only claim outcomes, but also the ease of making and tracking it, as well as how fast the carrier handles it.`,
    },
    {
      title: 'Value for Price',
      text: 'Value for Price score measures customer satisfaction when considering how much they pay versus the quality of their experience when dealing with the company.',
    },
  ];
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [heightStyleVar, setHeightStyleVar] = useState(undefined);
  const helpRef = useRef();
  useLayoutEffect(() => {
    setHeightStyleVar(helpRef.current.offsetHeight);
  }, []);
  return (
    <div className={styles.columnContainer}>
      <h2 className={styles.title}>
        What&apos;s <strong>Smart Score?</strong>
      </h2>
      <p className={styles.text}>
        Reviews from real customers as well as value for price and ease of making a claim
        —including how fast the insurer handles it!— goes into the Smart Score. It&apos;s
        the easiest way to compare auto or home insurance.
      </p>
      <div className={styles.animationContainer}>
        <Player autoplay loop src={animationOne} className={styles.lottiePlayer} />
        <Player autoplay loop src={animationTwo} className={styles.lottiePlayer} />
        <Player autoplay loop src={animationThree} className={styles.lottiePlayer} />
        <Player autoplay loop src={animationFour} className={styles.lottiePlayer} />
        <Player autoplay loop src={animationFive} className={styles.lottiePlayer} />
      </div>
      <div className={styles.smartScoreContainer}>
        <StaticImage
          alt="Smart Score"
          objectFit="contain"
          src={'../../../images/logos/hpDoubleShield.png'}
          height={200}
          aspectRatio={4 / 5}
          placeholder="blurred"
          className={styles.doubleShieldImg}
        />
        <h3 className={styles.smartScore}>
          Smart
          <br />
          Score
        </h3>
      </div>
      <div className={styles.descriptionsContainer}>
        {data.map((t, idx) => (
          <div
            key={idx}
            className={styles.descriptionContainer}
            onMouseOver={() => setActiveTooltip(idx)}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <PlusIcon />
            <h3 className={styles.smartDescription}>{t.title}</h3>
            <div className={activeTooltip === idx ? styles.tooltip : styles.hide}>
              <p>{t.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.getQuoteContainer}>
        <Button onClick={() => navigate('/quotes')} className={styles.getQuotesButton}>
          Get Quotes
        </Button>
        <p className={styles.getQuoteText}>
          Fill out one form to compare quotes from multiple carriers.
        </p>
      </div>
      <div
        className={styles.helpContainer}
        ref={helpRef}
        style={{ '--heightStyleVar': `${heightStyleVar}px` }}
      >
        <h3>
          <strong>Need help?</strong> CALL US AT{' '}
          <a title="Call us" href="tel:+18772908182">
            (877) 290-8182
          </a>
        </h3>
        <p>
          Licensed agents offer support to help you find the right insurance
          <br />
          on 8 AM - 9 PM EST M-F and 10 AM - 6 PM EST on Saturdays
        </p>
      </div>
    </div>
  );
};

WhatsSmartScore.propTypes = {};

export default WhatsSmartScore;
