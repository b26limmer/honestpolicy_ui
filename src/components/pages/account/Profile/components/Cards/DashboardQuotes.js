import React, { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import * as styles from './dashboad-card-styles.module.scss';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { LIST_QUOTES } from '../../../../../utils/queries';
import { useMutation } from '@apollo/client';
import { returnParsedApiString } from '../../../../../../utils/validation';
import Loading from '../../../../../Loading';
import { faCar, faHome, faKey, faUsdCircle } from '@fortawesome/fontawesome-pro-solid';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import _ from 'lodash';

const DashboardQuotes = () => {
  const [listQuotes, { loading: listQuotesLoading }] = useMutation(LIST_QUOTES);
  const [lastAutoQuote, setLastAutoQuote] = useState(null);
  const [lastHomeQuote, setLastHomeQuote] = useState(null);
  useEffect(() => {
    let isMounted = true;
    listQuotes({
      variables: { input: { limit: 100, offset: 0 } },
      onCompleted: ({ listQuote }) => {
        let parsedQuotes = returnParsedApiString(listQuote.quotes);
        let homeQuotes = parsedQuotes
          .filter(quote => quote.quote_type === 'home')
          .sort((a, b) => a.id - b.id);
        let autoQuotes = parsedQuotes
          .filter(quote => quote.quote_type === 'auto')
          .sort((a, b) => a.id - b.id);
        if (isMounted) {
          !!homeQuotes.length && setLastHomeQuote(homeQuotes[homeQuotes.length - 1]);
          !!autoQuotes.length && setLastAutoQuote(autoQuotes[autoQuotes.length - 1]);
        }
      },
      onError: error => console.error(error),
      fetchPolicy: 'network-only',
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const texts = {
    subheader: {
      loading: 'We are loading your quotes',
      hasQuotes: 'Access your coverage information',
      noQuotes: 'Fill out one form to compare quotes from multiple carriers!',
    },
  };
  const noQuotesButtons = [
    {
      title: 'Car',
      icon: faCar,
      path: '/quote-auto',
    },
    {
      title: 'Home',
      icon: faHome,
      path: '/quote-home',
    },
    {
      title: 'Renter',
      icon: faKey,
      path: '/quote-renter',
    },
  ];
  const hasQuotes = !!lastAutoQuote || !!lastHomeQuote;
  const getSectionDetail = section => {
    let sectionObject = texts[section];
    let text = '';
    if (listQuotesLoading) {
      text = sectionObject.loading;
    } else if (hasQuotes) {
      text = sectionObject.hasQuotes;
    } else {
      text = sectionObject.noQuotes;
    }
    return text;
  };
  const getTimeFromNow = timeString => {
    return moment(timeString).fromNow();
  };
  const quotes = [
    {
      title: 'Auto',
      isEmpty: _.isEmpty(lastAutoQuote),
      newQuotePath: '/quote-auto',
      quote: lastAutoQuote,
    },
    {
      title: 'Home',
      isEmpty: _.isEmpty(lastHomeQuote),
      newQuotePath: '/quote-home',
      quote: lastHomeQuote,
    },
  ];
  return (
    <Card classes={{ root: styles.profileQuotesCardRoot }}>
      <CardHeader
        avatar={
          <FontAwesomeIcon
            className={styles.profileQuotesDollarIcon}
            icon={faUsdCircle}
          />
        }
        title={'Quotes'}
        subheader={getSectionDetail('subheader')}
        classes={{
          title: styles.accountProfileCardTitle,
          subheader: styles.accountProfileCardSubTitle,
        }}
      />
      <Divider variant={'middle'} />
      <CardContent classes={{ root: styles.profileQuotesContent }}>
        {listQuotesLoading ? (
          <Loading size={120} />
        ) : (
          <Grid container justifyContent="space-between">
            {hasQuotes ? (
              <>
                {quotes.map(({ quote, isEmpty, newQuotePath, title }, idx) => (
                  <Grid item xs={12} key={idx}>
                    <Link
                      className={styles.profileQuotesTypeName}
                      to={isEmpty ? newQuotePath : '/account/quotes'}
                      state={isEmpty ? null : { quote: quote }}
                    >
                      <div className={styles.quoteLinkContainer}>
                        <span className={styles.quoteLinkTitle}>
                          {title} Quotes <ArrowRightAltIcon />
                        </span>
                        <ChevronRightIcon />
                      </div>
                      <p>
                        {isEmpty
                          ? 'Not yet started'
                          : `Last updated: ${getTimeFromNow(quote.updated_at)}`}
                      </p>
                    </Link>
                    <Divider />
                  </Grid>
                ))}
              </>
            ) : (
              noQuotesButtons.map((button, idx) => (
                <Link
                  className={styles.getQuoteLinkButton}
                  to={button.path}
                  title={`Get a ${button.title.toLowerCase()} insurance quote`}
                  key={idx}
                >
                  <FontAwesomeIcon icon={button.icon} />
                  <span>{button.title}</span>
                </Link>
              ))
            )}
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardQuotes;
