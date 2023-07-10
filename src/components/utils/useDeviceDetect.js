import { useState, useEffect } from 'react';

export default function useDeviceDetect() {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOs, setMobileOs] = useState('');
  const [typeOfUserAgent, setTypeOfUserAgent] = useState('');

  useEffect(() => {
    const userAgent = typeof window === 'undefined' ? '' : navigator.userAgent;

    const mobile = Boolean(
      userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    );
    function iOS() {
      return (
        [
          'iPad Simulator',
          'iPhone Simulator',
          'iPod Simulator',
          'iPad',
          'iPhone',
          'iPod',
        ].includes(navigator.platform) ||
        (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
      );
    }
    const kindOfMobile = () => {
      if (mobile) {
        if (iOS()) {
          return 'ios';
        } else return 'android';
      }
    };

    setIsMobile(mobile);
    setTypeOfUserAgent(userAgent);
    setMobileOs(kindOfMobile());
  }, []);

  return { isMobile, mobileOs, typeOfUserAgent };
}
