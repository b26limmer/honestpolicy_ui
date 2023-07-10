import React from 'react';
import * as styles from '../../scss/home/intuitivefeatures.module.scss';
import { IconedCard } from '../../utils/sharable';
import shieldSvg from '../../../images/shield.svg';
import heartSvg from '../../../images/heart.svg';
import techSupportSvg from '../../../images/technical-support.svg';

const IntuitiveFeautes = () => {
  const content = {
    title: 'Intuitive Features, Powerful Results',
    text: 'We provide our customers a seamless research, comparison and buying process that is open and transparent. We play no favorites with insurers, and aim to make the process as painless as possible.',
  };
  const cards = [
    {
      icon: shieldSvg,
      title: 'Solid and Secure',
      text: 'We keep your data secure. We won’t sell it to the highest bidder, or any bidder for that matter.',
    },
    {
      icon: heartSvg,
      title: 'Everything taken care of',
      text: 'We do the heavy lifting behind the scenes, leaving you with a quick and easy experience.',
    },
    {
      icon: techSupportSvg,
      title: '24/7 live agent support',
      text: 'We offer round the clock support from licensed agents to answer your questions and help find a policy whenever you want.',
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h2 className={styles.subtitle}>{content.title}</h2>
        <p className={styles.text}>{content.text}</p>
      </div>
      <div className={styles.icons}>
        {cards.map((card, idx) => (
          <IconedCard
            key={idx}
            icon={card.icon}
            title={card.title}
            text={card.text}
            shadow={false}
          />
        ))}
      </div>
    </div>
  );
};
export default IntuitiveFeautes;
