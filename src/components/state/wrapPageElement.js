import React from 'react';
import PropTypes from 'prop-types';
import UrlParamsWrapper from '../UrlParamsWrapper/UrlParamsWrapper';
import GoogleTranslateElement from '../GoogleTranslateElement/GoogleTranslateElement';

const wrapPageElement = ({ element }) => {
  return (
    <UrlParamsWrapper>
      <GoogleTranslateElement />
      {element}
    </UrlParamsWrapper>
  );
};

wrapPageElement.propTypes = {
  element: PropTypes.object,
};

export default wrapPageElement;
