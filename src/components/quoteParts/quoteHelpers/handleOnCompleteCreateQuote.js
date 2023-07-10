import { navigate } from 'gatsby';

const handleOnCompleteCreateQuote = (heap, createQuote, quoteType) => {
  heap.track(`${quoteType}-quote-submitted`);
  navigate('/account/quotes', { state: { quote: createQuote.quote } });
};
export default handleOnCompleteCreateQuote;
