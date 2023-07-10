import { useMutation } from '@apollo/client';
import { CREATE_LEAD } from '../../utils/queries';
import getCreateQuoteRenterInputVariables from '../../pages/quoterenters/components/getCreateQuoteRenterInputVariables';
import getCreateQuoteInputHomeVariables from '../../pages/quotehome/components/getCreateQuoteInputHomeVariables';
import { getCreateQuoteInputAutoVariables } from '../../pages/quoteauto/components/getCreateQuoteInputAutoVariables';
import _ from 'lodash';
import { AlertsContext } from '../../state/AlertsContext';
import { useContext } from 'react';

const removeEmptyFields = values => {
  Object.keys(values).forEach(field => {
    let fieldValue = values[field];

    if (typeof fieldValue == 'object') {
      let isArray = _.isArray(fieldValue);
      if (isArray) {
        removeEmptyFields(fieldValue);
        fieldValue.forEach((obj, idx) => {
          (!obj || _.isEmpty(obj)) && fieldValue.splice(idx);
        });
      }
      if (_.isEmpty(fieldValue)) {
        delete values[field];
      } else if (!isArray) {
        removeEmptyFields(fieldValue);
      }
    }
    if (!fieldValue) {
      delete values[field];
    }
  });
  return values;
};

const variablesSwitch = (quoteType, leadInput, values) => {
  switch (quoteType) {
    case 'home':
      leadInput.homeData = getCreateQuoteInputHomeVariables(values);
      break;
    case 'auto':
      leadInput.autoData = getCreateQuoteInputAutoVariables(values);
      break;
    case 'renter':
      leadInput.renterData = getCreateQuoteRenterInputVariables(values);
      break;
  }
  removeEmptyFields(leadInput);
};

const createLeadInput = (values, quoteType, requestACall) => {
  let leadInput = {
    quoteType,
    requestACall,
  };
  if (values.leadId) {
    leadInput.leadId = values.leadId;
  }
  variablesSwitch(quoteType, leadInput, values);

  return leadInput;
};

const useCreateLead = () => {
  const [createLeadMutation, { loading: createLeadLoading }] = useMutation(CREATE_LEAD);
  const { dispatchAlert } = useContext(AlertsContext);
  const createLead = (values, setValues, quoteType, requestACall = false) =>
    createLeadMutation({
      variables: { input: createLeadInput(values, quoteType, requestACall) },
      onCompleted: ({ createLead }) => {
        let leadId = createLead.lead.leadId;
        if (!values.leadId || values.leadId !== leadId) {
          setValues({ ...values, leadId: createLead.lead.leadId });
        }
        if (requestACall) {
          dispatchAlert('An agent will call you soon!', 'success');
        }
      },
      onError: error => console.error(error),
    });

  return { createLead, createLeadLoading };
};

export default useCreateLead;
