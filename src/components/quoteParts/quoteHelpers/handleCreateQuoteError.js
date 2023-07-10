const handleCreateQuoteError = (setCreateQuoteLoading, dispatchAlert, error) => {
  setCreateQuoteLoading(false);
  dispatchAlert(
    "We've run into a problem with your submission, for more information and help with this quote, please call an Honest Agent at (877) 290-8182",
    'error',
    10
  );
  console.error(error);
};
export default handleCreateQuoteError;
