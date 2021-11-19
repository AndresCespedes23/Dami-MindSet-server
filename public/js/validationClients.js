const names = document.getElementById('name');
const email = document.getElementById('email');
const phoneNumber = document.getElementById('phoneNumber');
const cuit = document.getElementById('cuit');
const address = document.getElementById('address');
const activity = document.getElementById('activity');

const errorName = document.getElementById('ErrorName');
const errorEmail = document.getElementById('ErrorEmail');
const errorPhoneNumber = document.getElementById('ErrorPhoneNumber');
const errorCuit = document.getElementById('ErrorCuit');
const errorAddress = document.getElementById('ErrorAddress');
const errorActivity = document.getElementById('ErrorActivity');

function  validateName(){
  errorName.innerText = "";
  if (!names.value)
    return errorName.innerText = "Name is missing.";
  if (names.value > 50 || names.value < 2)
    return errorName.innerText = "Name cannot be bigger than 50 or smaller than 2.";
};

function  validateEmail(){
  errorEmail.innerText = "";
  if (!email.value)
    return errorEmail.innerText = "Email is missing.";
  if (email.value > 50 || email.value < 2)
    return errorEmail.innerText = "Email cannot be bigger than 50 or smaller than 2.";
};

function  validatePhoneNumber(){
  errorPhoneNumber.innerText = "";
  if (!phoneNumber.value)
    return errorPhoneNumber.innerText = "PhoneNumber is missing.";
  if (phoneNumber.value > 15 || phoneNumber.value < 6)
    return errorEmail.innerText = "PhoneNumber cannot be bigger than 15 or smaller than 6.";
};

function  validateCuit(){
  errorCuit.innerText = "";
  if (!cuit.value)
    return errorCuit.innerText = "Cuit is missing.";
  if (cuit.value > 15 || cuit.value < 6)
    return errorCuit.innerText = "Cuit cannot be bigger than 15 or smaller than 6.";
};

function  validateAddress(){
  errorAddress.innerText = "";
  if (!address.value)
    return errorAddress.innerText = "Address is missing.";
  if (address.value > 100 || address.value < 6)
    return errorAddress.innerText = "Address cannot be bigger than 100 or smaller than 6.";
};

function  validateActivity(){
  errorActivity.innerText = "";
  if (!activity.value)
    return errorActivity.innerText = "Activity is missing.";
  if (activity.value > 30 || activity.value < 3)
    return errorActivity.innerText = "Activity cannot be bigger than 30 or smaller than 3.";
};

module.exports = {
  validateName,
  validateEmail,
  validatePhoneNumber,
  validateCuit,
  validateAddress,
  validateActivity,
};
