  // get all the elements by the ID
  const nameAdmin = document.getElementById("adminName");
  const eMail = document.getElementById("e-mail");
  const adminsUserName = document.getElementById("username");
  const adminPassWord = document.getElementById("password");
  const confirmB = document.getElementById("confirm-button");
  confirmB.classList.remove("hide");
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

  //validations for the admin's name
  nameAdmin.addEventListener("focus", namefocus);
    function namefocus(e) {
      e.preventDefault();
      nameError.innerText = "";
    };

  nameAdmin.addEventListener("blur", adminBlur);
    function adminBlur(e) {
      e.preventDefault();
      const onlyTxt = (/[a-zA-Z]$/);
      let n = nameAdmin.value;
      if (n.length < 6 || n.indexOf(" ") <= 0 || n.indexOf(" ") == n.length -1) {
      confirmB.classList.add("hide");
      return nameError.innerText = "The name must be longer than 6 characters & have at least one space between name and surname";
      } if (!onlyTxt.test(n)) {
      confirmB.classList.add("hide");
      return nameError.innerText = "Only text allowed";
      } confirmB.classList.remove("hide");
      return nameError.innerText = "✓";
    };

  //validations for admin's e-mail
  eMail.addEventListener("focus", mailFocus);
    function mailFocus(e) {
      e.preventDefault();
      eMailError.innerText = "";
    };

  eMail.addEventListener("blur", mailBlur);
    function mailBlur(e) {
      e.preventDefault();
      let eV = eMail.value;
      let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
      if (!emailFormat.test(eV)) {
      confirmB.classList.add("hide");
      return eMailError.innerText = "Invalid E-Mail Format";
      } confirmB.classList.remove("hide");
      return eMailError.innerText = "✓";
    };

  //Validation for admin's username
  adminsUserName.addEventListener("focus", userFocus);
    function userFocus(e) {
      e.preventDefault();
      adminsNameError.innerText = "";
    };

  adminsUserName.addEventListener("blur", userBlur);
    function userBlur(e) {
      e.preventDefault();
      if (adminsUserName.value.length < 2 || adminsUserName.value.length > 20) {
      confirmB.classList.add("hide");
      return adminsNameError.innerText = "The UserName must be longer than 2 characters but less than 20";
      } confirmB.classList.remove("hide");
      return adminsNameError.innerText = "✓";
    };

  // Validations for admin's password
  adminPassWord.addEventListener("focus", passWFocus);
    function passWFocus(e) {
      e.preventDefault();
      adminPassWordError.innerText = "";
    };

  adminPassWord.addEventListener("blur", passWBLur);
    function passWBLur(e) {
      e.preventDefault();
      let passValue = adminPassWord.value;
      let passWFormat = /^[a-z0-9]{8,18}$/;
      if (!passWFormat.test(passValue)) {
      confirmB.classList.add("hide");
      return adminPassWordError.innerText = "The password only accepts letters or numbers and also must have a lenght of 8 characters";
      } confirmB.classList.remove("hide");
      return adminPassWordError.innerText = "✓";
    };

