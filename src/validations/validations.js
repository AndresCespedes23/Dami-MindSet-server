/* eslint-disable consistent-return */
const validDate = (value, field, format) => {
  const validLongFormat = /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;
  const validMediumFormat = /^\d{4}\/(0[1-9]|1[0-2])$/;
  const validShortFormat = /^\d{4}$/;
  let error = false;
  let errorMsg;
  switch (format) {
    case "long":
      if (!validLongFormat.test(value)) {
        error = true;
        errorMsg = `${field} should have a valid format (YYYY/MM/DD)!`;
      }
      break;
    case "medium":
      if (!validMediumFormat.test(value)) {
        error = true;
        errorMsg = `${field} should have a valid format (YYYY/MM)!`;
      }
      break;
    case "short":
      if (!validShortFormat.test(value)) {
        error = true;
        errorMsg = `${field} should have a valid format! (YYYY)`;
      }
      break;
    default:
      break;
  }
  return { error, errorMsg };
};

const timeRange = (value) => {
  let error = false;
  let errorMsg;
  if (value.length !== 2) {
    error = true;
    errorMsg = "Time Range must have only two values!";
  } else if (typeof value[0] !== "number" || typeof value[1] !== "number") {
    error = true;
    errorMsg = "Time Range values must be numbers!";
  } else if (value[0] > value[1]) {
    error = true;
    errorMsg = "Time Range must be a valid range!";
  }
  return { error, errorMsg };
};

const validateString = (
  string,
  fieldName,
  minLength,
  format,
  space = false,
) => {
  const validFormatOnlyLetters = /^([A-Za-z]+( [A-Za-z]+)*)$/;
  const validFormatBothOptional = /^([A-Za-z0-9]+( [A-Za-z0-9]+)?)$/;
  const validFormatBothStrict = /^(?=.*\d)(?=.*[a-zA-Z])(([a-zA-Z0-9]+\s?)+)$/;

  let error = false;
  let errorMsg;

  if (string.length < minLength) {
    error = true;
    errorMsg = `${fieldName} must be at least ${minLength} digits long!`;
  } else if (space && !string.includes(" ")) {
    error = true;
    errorMsg = `${fieldName} must contain a blank space!`;
  } else if (string[string.length - 1] === " ") {
    error = true;
    errorMsg = `${fieldName} can't end with a space!`;
  } else {
    switch (format) {
      case "onlyLetters":
        if (!validFormatOnlyLetters.test(string)) {
          error = true;
          errorMsg = `${fieldName} can only contain letters!`;
        }
        break;
      case "bothOptional":
        if (!validFormatBothOptional.test(string)) {
          error = true;
          errorMsg = `${fieldName} can only contain letters and numbers!`;
        }
        break;
      case "bothStrict":
        if (!validFormatBothStrict.test(string)) {
          error = true;
          errorMsg = `${fieldName} must contain letters and numbers!`;
        }
        break;
      default:
        break;
    }
  }
  return { error, errorMsg };
};

const validatePositiveNumber = (
  number,
  fieldName,
  minLength = 0,
  maxLength = Infinity,
) => {
  const validFormat = /^([0-9]+)$/;
  let error = false;
  let errorMsg;
  if (number < 0) {
    error = true;
    errorMsg = `${fieldName} must be a positive number!`;
  } else if (!validFormat.test(number)) {
    error = true;
    errorMsg = `${fieldName} can only contain numbers!`;
  } else if (number.toString().length < minLength) {
    error = true;
    errorMsg = `${fieldName} must be at least ${minLength} digits long!`;
  } else if (number.toString().length > maxLength) {
    error = true;
    errorMsg = `${fieldName} must be at most ${maxLength} digits long!`;
  }
  return { error, errorMsg };
};

const name = (value) => {
  let error = false;
  let errorMsg;
  const stringValidationResult = validateString(
    value,
    "Name",
    6,
    "onlyLetters",
    true,
  );
  if (stringValidationResult.error) {
    error = true;
    errorMsg = stringValidationResult.errorMsg;
  }
  return { error, errorMsg };
};

const email = (value) => {
  // eslint-disable-next-line no-useless-escape
  const validFormat = /^([\w.\-+/!%]{1,64}|"[\w. ]{1,62}")@[0-9a-zA-Z\-]+(\.[a-zA-Z]+)*$/;
  let error = false;
  let errorMsg;
  if (value.length < 5) {
    error = true;
    errorMsg = "The email must be at least 5 characters long!";
  } else if (!value.includes("@")) {
    error = true;
    errorMsg = "The email must include @!";
  } else if (!validFormat.test(value)) {
    error = true;
    errorMsg = "The email should have a valid format!";
  }
  return { error, errorMsg };
};

const username = (value) => {
  const validFormat = /^([A-Za-z0-9])+$/;
  let error = false;
  let errorMsg;
  if (value.length < 5) {
    error = true;
    errorMsg = "Username must be at least 5 characters long!";
  } else if (!validFormat.test(value)) {
    error = true;
    errorMsg = "Username should have a valid format!";
  }
  return { error, errorMsg };
};

const password = (value) => {
  const validFormat = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;
  const includeNumber = /([0-9])+/;
  const includeLetter = /([A-Za-z])+/;
  let error = false;
  let errorMsg;
  if (value.length < 8) {
    error = true;
    errorMsg = "The password must be at least 8 characters long!";
  } else if (!includeLetter.test(value)) {
    error = true;
    errorMsg = "The password must contain at least a letter!";
  } else if (!includeNumber.test(value)) {
    error = true;
    errorMsg = "The password must contain at least a number!";
  } else if (!validFormat.test(value)) {
    error = true;
    errorMsg = "The password can only contain numbers and letters!";
  }
  return { error, errorMsg };
};

const age = (value) => {
  let error = false;
  let errorMsg;
  const positiveNumberResult = validatePositiveNumber(value, "Age", 1, 3);
  if (positiveNumberResult.error) {
    error = true;
    errorMsg = positiveNumberResult.errorMsg;
  } else if (value < 18) {
    error = true;
    errorMsg = "You must be over 18 to subscribe!";
  } else if (value > 120) {
    error = true;
    errorMsg = "Enter a valid age!";
  }
  return { error, errorMsg };
};

const phoneNumber = (value) => {
  let error = false;
  let errorMsg;
  const positiveNumberResult = validatePositiveNumber(value, "Phone number", 7);
  if (positiveNumberResult.error) {
    error = true;
    errorMsg = positiveNumberResult.errorMsg;
  }
  return { error, errorMsg };
};

const dni = (value) => {
  let error = false;
  let errorMsg;
  const positiveNumberResult = validatePositiveNumber(value, "ID", 7, 8);
  if (positiveNumberResult.error) {
    error = true;
    errorMsg = positiveNumberResult.errorMsg;
  }
  return { error, errorMsg };
};

const address = (value) => {
  let error = false;
  let errorMsg;
  const stringValidationResult = validateString(
    value,
    "Address",
    5,
    "bothStrict",
    true,
  );
  if (stringValidationResult.error) {
    error = true;
    errorMsg = stringValidationResult.errorMsg;
  }
  return { error, errorMsg };
};

const validateWord = (value, field) => {
  let error = false;
  let errorMsg;
  const stringValidationResult = validateString(value, field, 3, "onlyLetters");
  if (stringValidationResult.error) {
    error = true;
    errorMsg = stringValidationResult.errorMsg;
  }
  return { error, errorMsg };
};

const validateBoolean = (value, field) => {
  let error = false;
  let errorMsg;
  if (typeof value !== "boolean") {
    error = true;
    errorMsg = `${field} must be a boolean!`;
  }
  return { error, errorMsg };
};

const validateOption = (value, options, field) => {
  let error = false;
  let errorMsg;
  if (!options.includes(value)) {
    error = true;
    errorMsg = `${field} must be one of the following: ${options}`;
  }
  return { error, errorMsg };
};

const validateText = (value, field, minLength) => {
  let error = false;
  let errorMsg;
  const stringValidationResult = validateString(
    value,
    field,
    minLength,
    "bothOptional",
  );
  if (stringValidationResult.error) {
    error = true;
    errorMsg = stringValidationResult.errorMsg;
  }
  return { error, errorMsg };
};

const validateShortText = (value, field) => validateText(value, field, 3);
const validateLongText = (value, field) => validateText(value, field, 10);

const city = (value) => validateWord(value, "City");
const state = (value) => validateWord(value, "State");
const country = (value) => validateWord(value, "Country");
const nationality = (value) => validateWord(value, "Nationality");
const institution = (value) => validateWord(value, "Institution");
const title = (value) => validateWord(value, "Title");
const company = (value) => validateWord(value, "Company");
const role = (value) => validateWord(value, "Role");
const driversLicense = (value) => validateBoolean(value, "Drivers License");
const inProgress = (value) => validateBoolean(value, "inProgress");
const currently = (value) => validateBoolean(value, "Currently");
const gender = (value) => validateOption(value, ["male", "female", "other"], "Gender");
const status = (value) => validateOption(
  value,
  ["active", "inactive", "pending interview", "disabled"],
  "Status",
);
const maritalStatus = (value) => validateOption(
  value,
  ["single", "married", "divorced", "widowed"],
  "Marital status",
);
const level = (value) => validateOption(
  value,
  ["primary", "secondary", "tertiary", "university", "course"],
  "Level",
);
const zipCode = (value) => validateShortText(value, "Zip code");
const description = (value) => validateLongText(value, "Description");
const accomplishments = (value) => validateLongText(value, "Accomplishments");
const dateOfBirth = (value) => validDate(value, "Date of birth", "long");
const startDate = (value) => validDate(value, "Start date", "medium");
const finishDate = (value) => validDate(value, "Finish date", "medium");

module.exports = {
  name,
  email,
  username,
  password,
  age,
  phoneNumber,
  dni,
  address,
  zipCode,
  city,
  state,
  country,
  nationality,
  institution,
  title,
  company,
  role,
  driversLicense,
  inProgress,
  currently,
  gender,
  status,
  maritalStatus,
  level,
  description,
  accomplishments,
  timeRange,
  validDate,
  dateOfBirth,
  startDate,
  finishDate,
};
