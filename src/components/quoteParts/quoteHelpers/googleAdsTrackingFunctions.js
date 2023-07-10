import doIfNoDevelopment from '../../utils/doIfNotDevelopment';

const gtag = typeof window !== 'undefined' ? window.gtag : () => {};

export const trackSignUpOnQuotesFirstStep = url => {
  doIfNoDevelopment(() => {
    let callback = () => {
      if (typeof url != 'undefined') {
        window.location = url;
      }
    };
    gtag('event', 'conversion', {
      send_to: 'AW-10983414151/au1ICMLIt90DEIezpvUo',
      event_callback: callback,
    });
    return false;
  });
};
