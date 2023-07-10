import {
  capitalizeFirst,
  returnParsedApiString,
} from '../../../../../../utils/validation';
import { createQuoteCardDataStructure } from './createQuoteCardDataStructure';

const useHandleGetRatesCompleted = (
  carrierNodes,
  ratingRules,
  lineByStateNodes,
  setUnavailableQuotes,
  setQuotes,
  setSelectedPackageType,
  setQuotesLoading,
  unavailableQuotes,
  quotes
) => {
  const handleGetRatesCompleted = (getQuoteRates, latestQuote) => {
    let insuranceType = latestQuote.quote_type;
    let lineToCompare = insuranceType;
    if (lineToCompare == 'renter') {
      lineToCompare = 'home';
    }
    let bindable_quotes = [];
    returnParsedApiString(getQuoteRates.rates).forEach(quote => {
      let carrierName = quote.carrier_name || quote.quote_data?.carrier_name;
      if (quote.result !== 'success' || carrierName == 'Lemonade') {
        return;
      }
      let carrierNode = carrierNodes.find(carrier => {
        let bindableCarriers = carrier.data.Bindable_Carriers;
        return (
          !!bindableCarriers &&
          bindableCarriers[0].data.bindableCarrierName === carrierName
        );
      });
      let carrier = carrierNode ? carrierNode.data : false;
      const { indicators, smartScore, aboutCarrier, logo, name, slug } =
        createQuoteCardDataStructure(insuranceType, carrier, ratingRules, carrierName);
      let quoteDetails;
      let coverages;
      let price;
      let qtb_url = false;
      if (quote.qtb) {
        qtb_url = quote.qtb_url;
      }
      if (insuranceType == 'auto') {
        quoteDetails = quote?.QuoteExecutionDetail?.EZQuoteResult?.EZQuote;
        coverages = quoteDetails?.Coverages?.Coverage;
        price = quoteDetails?.PremiumDetails?.TotalPremium / 12;
      } else {
        coverages = [];
        Object.entries(quote.quote_data).forEach(([field, value]) => {
          let notCoverages = ['premium', 'carrier_name', 'carrier_id'];
          if (!notCoverages.includes(field)) {
            coverages.push({ name: field, value: value });
          }
        });
        price = parseFloat(quote.quote_data.premium) / 12;
      }
      bindable_quotes.push({
        quoteId: parseInt(quote.quote_id),
        refcode: quote.refcode,
        userHash: quote.user_hash,
        qtb_url,
        coverages,
        price,
        name,
        slug,
        insuranceType,
        aboutCarrier,
        smartScore,
        indicators,
        logo,
      });
    });
    latestQuote.bindable_quotes = bindable_quotes;
    let coverageLevel;
    if (insuranceType === 'auto') {
      coverageLevel = latestQuote.auto_coverage_level;
      coverageLevel = capitalizeFirst(coverageLevel);
    }

    let carrierWithQuotes = [];
    let newUnavailableQuotes = [];

    let quote_state = latestQuote.garage_address_state || latestQuote.address_state;
    latestQuote.bindable_quotes.forEach(quote => carrierWithQuotes.push(quote.name));
    lineByStateNodes.forEach(line => {
      if (
        line.data.Line == lineToCompare &&
        line.data.State == quote_state &&
        !carrierWithQuotes.includes(line.data.lineByStateRelatedCompany[0].data.name)
      ) {
        let carrierNode = carrierNodes.find(
          node => node.data.slug == line.data.lineByStateRelatedCompany[0].data.slug
        );
        let carrier = carrierNode ? carrierNode.data : false;
        if (carrier) {
          let carrierCard = createQuoteCardDataStructure(
            insuranceType,
            carrier,
            ratingRules,
            carrier.name
          );
          newUnavailableQuotes.push({ ...carrierCard, insuranceType });
        }
      }
    });
    setUnavailableQuotes({ ...unavailableQuotes, [coverageLevel]: newUnavailableQuotes });
    setQuotes({ ...quotes, [coverageLevel]: latestQuote });
    setSelectedPackageType(coverageLevel);
    setQuotesLoading(false);
  };
  return handleGetRatesCompleted;
};
export default useHandleGetRatesCompleted;
