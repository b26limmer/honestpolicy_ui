import _ from 'lodash';
import LogRocket from 'logrocket';
import doIfNoDevelopment from './doIfNotDevelopment';

// eslint-disable-next-line no-undef
const heapId = process.env.HEAP_APP_ID;
// eslint-disable-next-line no-undef
const logrocketAppId = process.env.LOGROCKET_APP_ID;

const loadHeap = (heap, setHeap) => {
  if (_.isEmpty(heap) && typeof window !== 'undefined') {
    let head = document.querySelector('head');
    const googleCDATA = document.createElement('script');
    googleCDATA.type = 'text/javascript';
    googleCDATA.innerHTML = `// <![CDATA[
      function googleTranslateElementInit() {
      new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
      }
      // ]]`;
    const googleScript = document.createElement('script');
    googleScript.type = 'text/javascript';
    googleScript.src =
      'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';

    doIfNoDevelopment(() => {
      LogRocket.init(logrocketAppId);
      let googleTagManager = document.createElement('script');
      googleTagManager.setAttribute('async', '');
      googleTagManager.setAttribute('id', 'google-tag-script');
      googleTagManager.src = 'https://www.googletagmanager.com/gtag/js?id=UA-65972639-6';

      let googleDatalayer = document.createElement('script');
      googleDatalayer.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-65972639-6');
      `;

      head.appendChild(googleTagManager);
      head.appendChild(googleDatalayer);
    });
    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', 'heap');
    script.type = 'text/javascript';
    script.innerHTML = `
    window.heap=window.heap||[], 
    heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.setAttribute('id', 'heapSrc'),r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};
        heap.load(${heapId}, {secureCookie: true});`;

    head.appendChild(script);
    head.appendChild(googleCDATA);
    head.appendChild(googleScript);
    head.appendChild(script);
    let heapSrc = document.querySelector('#heapSrc');
    heapSrc.addEventListener('load', () => {
      doIfNoDevelopment(() =>
        LogRocket.getSessionURL(sessionURL => {
          window.heap.track('LogRocket', { sessionURL: sessionURL });
        })
      );
      setHeap(window.heap);
    });
  }
};

export default loadHeap;
