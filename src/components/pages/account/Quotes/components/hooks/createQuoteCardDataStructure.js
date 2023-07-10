export const createQuoteCardDataStructure = (
  insuranceType,
  carrierData,
  ratingRules,
  carrierName
) => {
  let name = carrierData ? carrierData.name : carrierName;
  let slug = carrierData ? carrierData.slug : '21st-century';
  let indicators = [];
  let smartScore = 'NA';
  let aboutCarrier = `We are working on getting enough data about ${carrierName} to provide more information`;
  let logo = '';
  if (carrierData) {
    logo = carrierData.Company_Logos[0].data.Attachments.raw[0].thumbnails.small.url;
    aboutCarrier = carrierData.About_Carrier[0].data.About_Carrier_Text;
    let lineOfBusiness;
    switch (insuranceType) {
      case 'auto':
        lineOfBusiness = 'Auto';
        break;
      case 'home':
        lineOfBusiness = 'Home';
        break;
      default:
        lineOfBusiness = 'Home';
        break;
    }
    const scoresFilter = carrierData?.Ratings?.filter(
      rating => rating.data.Line === lineOfBusiness
    );
    smartScore =
      !!scoresFilter && scoresFilter.length > 0 && scoresFilter[0].data.Smart_Score;
    const getComplaintPrettyIndicator = index => {
      let average = ratingRules.Complaints_Chart.rules.filter(
        rule => rule.ruleName === 'Average'
      )[0];
      if (index < average.low) {
        return 'Worse than average';
      } else if (index > average.high) {
        return 'Better than average';
      } else return 'Average';
    };
    indicators = [
      {
        title: 'Customer Service',
        data: scoresFilter[0]?.data.Customer_Service,
      },
      {
        title: 'Value for Price',
        data: scoresFilter[0]?.data.Value_for_Price,
      },
      {
        title: 'Claims Process',
        data: scoresFilter[0]?.data.Claims_Process,
      },
      {
        title: 'Official Complaints',
        data: getComplaintPrettyIndicator(scoresFilter[0]?.data.Complaint_Index),
      },
    ];
  }
  return { indicators, smartScore, aboutCarrier, logo, name, slug };
};
