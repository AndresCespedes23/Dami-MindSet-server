//get all the elements by the ID
const profName = document.getElementById("nameProfile");
const descriptProfile = document.getElementById("descriptionProfile");
const confirmB = document.getElementById("confirm-button");
confirmB.classList.remove("hide");

//get all the errors
const nameError = document.getElementById("error1");
const descriptionError = document.getElementById("error2");
nameError.innerText = "";
descriptionError.innerText = "";

//Validations for the profile's name
profName.addEventListener("focus", namefocus);
function namefocus(e) {
  e.preventDefault();
  nameError.innerText = "";
};
profName.addEventListener("blur", nameBlur);
function nameBlur(e) {
  e.preventDefault();
  const onlyTxt = (/[a-zA-Z0-9 ]$/);
  let n = profName.value;
  if (n.length < 6 || n.length > 30) {
  confirmB.classList.add("hide");
  return nameError.innerText = "The name must be longer than 6 characters but less than 30";
  } if (!onlyTxt.test(n)) {
  confirmB.classList.add("hide");
  return nameError.innerText = "no special characters allowed";
  } confirmB.classList.remove("hide");
  return nameError.innerText = "✓";
};

//validation for description
descriptProfile.addEventListener("focus", descriptfocus);
function descriptfocus(e) {
  e.preventDefault();
  descriptionError.innerText = "";
};

descriptProfile.addEventListener("blur", descriptBlur);
function descriptBlur(e) {
  e.preventDefault();
  const onlyTxt = (/[a-zA-Z ]$/);
  let n = descriptProfile.value;
  if (n.length < 6 || n.length > 30) {
  confirmB.classList.add("hide");
  return descriptionError.innerText = "The description must be longer than 6 characters but less than 30";
  } if (!onlyTxt.test(n)) {
  confirmB.classList.add("hide");
  return descriptionError.innerText = "only text allowed";
  } confirmB.classList.remove("hide");
  return descriptionError.innerText = "✓";
};