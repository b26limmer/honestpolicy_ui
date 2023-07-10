import { getStateNameFromCode } from '../../../../../../utils/states';

const useHandlePackageInfo = (
  allPackagesByStateNodes,
  quotes,
  setPackageInfo,
  setShowPackageInfo
) => {
  const handlePackageInfo = packageType => {
    allPackagesByStateNodes.forEach(node => {
      let data = node.data;
      let packageName = data.Package_Name;
      let state = data.State;
      let stateName = getStateNameFromCode(state);
      if (state === quotes[packageType].address_state && packageName === packageType) {
        let bodilyInjury = data.Bodily_Injury;
        let collisionDeductible = data.Collision_Deductible;
        let comprehensiveDeductible = data.Comprehensive_Deductible;
        let pip = data.PIP__Not_Required_In_All_States_;
        let propertyDamage = data.Property_Damage;
        let substituteTransportation = data.Substitute_Transportation;
        let towing = data.Towing;
        let underInsuredMotorist = data.Underinsured_Motorist;
        let uninsuredMotorist = data.Uninsured_Motorist;
        setPackageInfo({
          bodilyInjury,
          collisionDeductible,
          comprehensiveDeductible,
          pip,
          propertyDamage,
          substituteTransportation,
          towing,
          underInsuredMotorist,
          uninsuredMotorist,
          stateName,
          packageName,
        });
      }
    });
    setShowPackageInfo(true);
  };
  return handlePackageInfo;
};
export default useHandlePackageInfo;
