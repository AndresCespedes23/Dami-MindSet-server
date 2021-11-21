// get all the elements by the ID
const nameAdmin = document.getElementById("adminName");
const eMail = document.getElementById("e-mail");
const adminsName = document.getElementById("username");
const adminPassWord = document.getElementById("password");
const isSuperAdmin = document.getElementById("superadmin");

//get all the errors
const nameError = document.getElementById("Error1");
const eMailError = document.getElementById("Error2");
const adminsNameError = document.getElementById("Error3");
const adminPassWordError = document.getElementById("Error4");
const isSuperAdminError = document.getElementById("Error5");
nameError.innerText = "";
eMailError.innerText = "";
adminsNameError.innerText = "";
adminPassWordError.innerText = "";
isSuperAdminError.innerText = "";

//validations for the admin's name
nameAdmin.addEventListener("focus", namefocus);
function namefocus (e){
  e.preventDefault();
  nameError.innerText = "";
}
nameAdmin.addEventListener("blur", adminBlur);
function adminBlur (e) {
  e.preventDefault();
  const onlyTxt = (/[a-zA-Z]$/);
  var n = nameAdmin.value;
    if (n.length < 6 || n.indexOf(" ") <= 0 || n.indexOf(" ") == n.length -1) {
      return nameError.innerText = "The name must be longer than 6 characters & have at least one space between name and surname";
    } if (!onlyTxt.test(n)) {
      return nameError.innerText = "Only text allowed";
    } return nameError.innerText = "✓";
};

