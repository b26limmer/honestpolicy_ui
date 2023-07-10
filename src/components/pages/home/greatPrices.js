import React from 'react';
import * as styles from '../../scss/home/greatprices.module.scss';

const GreatPrices = () => {
  const content = [
    {
      title: 'Auto Coverage',
      date: 'PER MONTH',
      price: 39,
      cta: 'Get Car Insurance',
      ctaLink: '/search',
    },
    {
      title: 'Home Coverage',
      date: 'PER MONTH',
      price: 49,
      cta: 'Get Home Insurance',
      ctaLink: '/search',
    },
  ];
  return (
    <div className={styles.container}>
      <div className={[styles.rowContainer, styles.greenBg].join(' ')}>
        <div className={styles.textContainer}>
          <h3 className={styles.subtitle}>Honest Policies, Great Prices</h3>
          <div className={styles.cardsContainer}>
            {content.map((card, idx) => (
              <div className={styles.card} key={idx}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDate}>{card.date}</p>
                <p className={styles.cardPrice}>{card.price}</p>
                <button className={styles.reusableButton} type="button">
                  {card.cta}
                </button>
              </div>
            ))}
          </div>
          <p className={styles.text}>
            <strong>Already insure?</strong> We’ll take care of the switching hassle for
            you
          </p>
        </div>
      </div>
    </div>
  );
};
export default GreatPrices;
