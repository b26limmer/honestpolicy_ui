import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import English from '../../locale/en-US.json';
import Spanish from '../../locale/es-MX.json';

const LocaleContext = createContext();
const Provider = LocaleContext.Provider;

const LocaleWrapper = ({ children }) => {
  const navigatorLanguage =
    typeof navigator !== 'undefined' ? navigator.language : 'en-US';
  const [local, setLocal] = useState(navigatorLanguage);
  const [lang, setLang] = useState(English);

  const searchLang = lang => {
    return local.search(lang) !== -1;
  };

  useEffect(() => {
    if (searchLang('es')) {
      setLang(Spanish);
    }
  }, [local]);

  const state = {
    local,
    setLocal,
  };
  return (
    <IntlProvider locale={local} messages={lang}>
      <Provider value={state}>{children}</Provider>
    </IntlProvider>
  );
};

LocaleWrapper.propTypes = { children: PropTypes.node.isRequired };

export default LocaleWrapper;
