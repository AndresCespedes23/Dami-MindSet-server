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
  if (n.length < 6 || n.length > 20) {
  confirmB.classList.add("hide");
  return nameError.innerText = "The name must be longer than 6 characters but less than 20";
  } if (!onlyTxt.test(n)) {
  confirmB.classList.add("hide");
  return nameError.innerText = "no special characters allowed";
  } confirmB.classList.remove("hide");
  return nameError.innerText = "✓";
};
