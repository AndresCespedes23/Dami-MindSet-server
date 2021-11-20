function  validateName(){
  errorName.innerText = "";
  if (!names.value)
    return errorName.innerText = "Name is missing.";
  if (names.value.length > 50 || names.value.length < 2)
    return errorName.innerText = "Name cannot be bigger than 50 or smaller than 2.";
};

function  validateEmail(){
  errorEmail.innerText = "";
  if (!email.value)
    return errorEmail.innerText = "Email is missing.";
  if (email.value.length > 50 || email.value.length < 6)
    return errorEmail.innerText = "Email cannot be bigger than 50 or smaller than 6.";
  // eslint-disable-next-line no-useless-escape
  const validFormat = /^([\w.\-+/!%]{1,64}|"[\w. ]{1,62}")@[0-9a-zA-Z\-]+(\.[a-zA-Z]+)*$/;
  if (!validFormat.test(email.value))
    return errorEmail.innerText = "The email should have a valid format.";
};

function  validatePhoneNumber(){
  errorPhoneNumber.innerText = "";
  if (!phoneNumber.value)
    return errorPhoneNumber.innerText = "PhoneNumber is missing.";
  if (phoneNumber.value.length > 15 || phoneNumber.value.length < 6)
    return errorPhoneNumber.innerText = "PhoneNumber cannot be bigger than 15 or smaller than 6.";
  // eslint-disable-next-line no-useless-escape
  const validFormat = /^\d+$/;
  if (!validFormat.test(phoneNumber.value))
    return errorPhoneNumber.innerText = "The PhoneNumber should contain only numbers";
};

function  validateCuit(){
  errorCuit.innerText = "";
  if (!cuit.value)
    return errorCuit.innerText = "Cuit is missing.";
  if (cuit.value.length > 15 || cuit.value.length < 6)
    return errorCuit.innerText = "Cuit cannot be bigger than 15 or smaller than 6.";
  const validFormat = /^\d+$/;
  if (!validFormat.test(cuit.value))
    return errorCuit.innerText = "The Cuit should contain only numbers";
};

function  validateAddress(){
  errorAddress.innerText = "";
  if (!address.value)
    return errorAddress.innerText = "Address is missing.";
  if (address.value.length > 100 || address.value.length < 6)
    return errorAddress.innerText = "Address cannot be bigger than 100 or smaller than 6.";
  const validFormat = /^[a-zA-Z0-9\s,.'-]{3,}$/;
  let firstSpace = address.value.indexOf(' ');
  let lastSpace = address.value.lastIndexOf(' ');
  if (firstSpace == -1)
    return errorAddress.innerText = 'Must contain an space.';
  if (lastSpace == address.value.length-1){
    return errorAddress.innerText = 'The space must not be at the end.';
  }
  let arrayAddress = address.value.split('');
  let countLetter = 0;
  let countNumber = 0;
  let countSpace = 0;
  arrayAddress.forEach(char => {
      let ascii = char.charCodeAt();
      if ( (ascii>=65 && ascii<=90)||(ascii>=97 && ascii<=122)){
          countLetter++;
      } else if (char == ' '){
          countSpace++;
      } else if ((parseInt (char) == char)){
          countNumber++;
      }
  });
  if (address.value.length < 5)
      return errorAddress.innerText = 'The length must be more than 5 characters. ';
  if (countLetter==0 || countNumber==0 || countSpace==0)
    return errorAddress.innerText = 'Must contain at least one letter, one number and one space. ';
  if (arrayAddress.length -  countLetter - countNumber - countSpace != 0)
    return errorAddress.innerText = 'Must be made only of letters, numbers and spaces.';
};

function  validateActivity(){
  errorActivity.innerText = "";
  if (!activity.value)
    return errorActivity.innerText = "Activity is missing.";
  if (activity.value.length > 30 || activity.value.length < 3)
    return errorActivity.innerText = "Activity cannot be bigger than 30 or smaller than 3.";
  const validFormat = /^([^0-9]*)$/;
  if (!validFormat.test(activity.value))
    return errorActivity.innerText = "The Activity shouldn't contain numbers";
};

// FUNCTIONS FOCUS ***********************************************************************************************
function focusFunction(e){
  let errorElement = e.target.nextElementSibling;
  errorElement.innerText = "";
};