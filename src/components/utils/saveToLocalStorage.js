import lodash from 'lodash';
import store2 from 'store2';

const saveToLocalStorage = (propertyName, values, pickByValues) => {
  const formValues = lodash.pickBy(values, function (_, key) {
    return Object.keys(pickByValues).includes(key);
  });
  const json = JSON.stringify(formValues);
  store2.set(propertyName, json, true);
};
export default saveToLocalStorage;
