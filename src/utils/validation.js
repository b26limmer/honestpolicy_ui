export const messages = {
  EMAIL: 'This should be an email',
  NUMBER: 'Only numbers allowed',
  VIN: 'Invalid VIN value, must have 17 characters',
  MILEAGE: 'Invalid Mileage value',
  ZIP: 'Invalid Zip code. Must have 5 digits',
  PHONE: 'Phone must have (xxx) xxx-xxxx format',
  YY: 'Only values from 1900-2010 are allowed',
  DD: 'Day is not valid',
  MM: 'Month is not valid',
  INVALID: 'Input is invalid',
  NOT_SELECTED: 'Please select an option',
  BIGGER_THAN_ZERO: 'Should be bigger than 0',
  EMPTY: 'Please provide the required data',
  PASSWORD: 'Password must have at least 8 characters',
};

export const isNumber = str => {
  return /^\d+$/.test(str);
};
export const phoneFormatToNumbers = phone => {
  let parsedPhone = phone
    .replaceAll('(', '')
    .replaceAll(')', '')
    .replaceAll(' ', '')
    .replaceAll('+', '')
    .replaceAll('-', '');
  return parsedPhone;
};
export const isEmail = email => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
};
export const isPassword = password => (password.length < 8 ? false : true);

export const hasOnlyLetter = str => {
  return /^[a-zA-Z]+$/.test(str);
};

export const isVin = str => {
  if (isNumber(str) && (str.length === 17 || str.length === 11)) {
    return true;
  }

  return false;
};
export const capitalizeFirst = str => {
  return str[0].toUpperCase() + str.slice(1, str.length);
};
export const isValidMileage = str => {
  if (!isNumber(str)) {
    return false;
  }

  return parseInt(str) >= 1000 && parseInt(str) <= 99999;
};

export const isZipCode = str => {
  return isNumber(str) && str.length === 5;
};

export const isPhone = (str = '') => {
  return str?.match(/\d/g)?.join('')?.length === 10;
};

export const isValidDay = (str = '', values = {}) => {
  if (!isNumber(str)) {
    return false;
  }
  const month = values?.['mm'];
  let totalDays = 31;
  if (month == '02') {
    totalDays = 29;
  }
  if (month == '04' || month == '06' || month == '09' || month == '11') {
    totalDays = 30;
  }
  const day = parseInt(str);
  return day >= 1 && day <= totalDays;
};

export const isValidMonth = (str = '') => {
  if (!isNumber(str)) {
    return false;
  }
  const month = parseInt(str);
  return month >= 1 && month <= 12;
};

export const isValidYear = str => {
  if (!isNumber(str)) {
    return false;
  }
  return parseInt(str) >= 1900 && parseInt(str) <= 2010;
};

export const validationTypes = {
  email: {
    validationFunction: isEmail,
  },
  password: {
    validationFunction: isPassword,
  },
  number: {
    validationFunction: isNumber,
  },
  vin: {
    validationFunction: isVin,
  },
  annual_mileage: {
    validationFunction: isValidMileage,
  },
  zip: {
    validationFunction: isZipCode,
  },
  phone: {
    validationFunction: isPhone,
  },
  yy: {
    validationFunction: isValidYear,
  },
  dd: {
    validationFunction: isValidDay,
  },
  mm: {
    validationFunction: isValidMonth,
  },
};

export const emailPhonePasswordValidations = {
  email: {
    type: 'email',
    message: messages.EMAIL,
    isMandatory: true,
  },
  password: {
    type: 'password',
    message: messages.PASSWORD,
    isMandatory: true,
  },
  phone: {
    type: 'phone',
    message: messages.PHONE,
    isMandatory: true,
  },
};

const isNumericInput = event => {
  const key = event.keyCode;
  return (
    (key >= 48 && key <= 57) || // Allow number line
    (key >= 96 && key <= 105) // Allow number pad
  );
};

const isModifierKey = event => {
  const key = event.keyCode;
  return (
    event.shiftKey === true ||
    key === 35 ||
    key === 36 || // Allow Shift, Home, End
    key === 8 ||
    key === 9 ||
    key === 13 ||
    key === 46 || // Allow Backspace, Tab, Enter, Delete
    (key > 36 && key < 41) || // Allow left, up, right, down
    // Allow Ctrl/Command + A,C,V,X,Z
    ((event.ctrlKey === true || event.metaKey === true) &&
      (key === 65 || key === 67 || key === 86 || key === 88 || key === 90))
  );
};

export const enforceFormat = event => {
  // Input must be of a valid number format or a modifier key, and not longer than ten digits
  if (!isNumericInput(event) && !isModifierKey(event)) {
    event.preventDefault();
  }
};

export const formatToCurrency = number => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(number);
};
export const dateTimeFormat = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
});
export const returnParsedApiString = apiString =>
  JSON.parse(apiString.replaceAll('=>', ':').replaceAll('nil', 'null'));

export const formatToPhone = event => {
  const target = event.target;
  let key = event.keyCode || event.charCode;

  // Prevent to add space or parenthesis on delete
  if (key == 8 || key == 46) {
    return target.value;
  }

  const input = event.target.value.replace(/\D/g, '').substring(0, 10);
  const zip = input.substring(0, 3);
  const middle = input.substring(3, 6);
  const last = input.substring(6, 10);

  if (input.length > 5) {
    target.value = `(${zip}) ${middle} - ${last}`;
  } else if (input.length > 2) {
    target.value = `(${zip}) ${middle}`;
  } else if (input.length > 0) {
    target.value = `(${zip}`;
  }

  return target.value;
};

export const formatToZip = event => {
  const target = event.target;

  if (target.value > 5) {
    target.value = target?.value?.slice(0, 5);
  }

  return target.value;
};
export const getValueForInputTypeDate = date => {
  let day = date.getDate().toString();
  let month = (date.getMonth() + 1).toString();
  let year = date.getFullYear();
  day = day.length == 1 ? `0${day}` : day;
  month = month.length == 1 ? `0${month}` : month;
  return `${year}-${month}-${day}`;
};
