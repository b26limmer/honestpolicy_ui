import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { GET_CURRENT_USER } from '../../pages/carrier/CarrierCustomerReviews/components/AllReviews/AllReviews';
// import PropTypes from 'prop-types';

const useHandlePreviousForm = (location, setStep, setValues) => {
  let { quote_step, quote_id } = location?.state || {};
  quote_step = parseInt(quote_step);
  // TODO IMPLEMENT getQuoteData query
  const [getCurrentUser] = useLazyQuery(GET_CURRENT_USER);
  const handleGetPreviousForm = data => {
    // TODO: LOGIC TO SET DATA FROM QUOTE GOES HERE
    console.log({ ...setValues, data });
    // setValues(data);
    // ? Final step after setting values would be setting the form step
    setStep(quote_step);
  };
  useEffect(() => {
    if (quote_step && quote_id) {
      // ? quote_id will be used to retrieve quote data
      //  and following mutation will be the one to get it
      //   getCurrentUser only used as example of implementation of getQuoteData
      getCurrentUser({ onCompleted: data => handleGetPreviousForm(data) });
    } else if (quote_step) {
      setStep(quote_step);
    }
  }, []);
};

useHandlePreviousForm.propTypes = {};

export default useHandlePreviousForm;
