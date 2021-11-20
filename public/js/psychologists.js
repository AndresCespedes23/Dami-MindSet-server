const backgroundModal = document.getElementById("background-modal");
const modal = document.getElementById("modal");

//createButton.disabled = true; //disable the button until the page is completely loaded.
readPsy();

const dataForm = document.querySelectorAll("#create-form input");

const name = document.getElementById("name");
const nameError = document.getElementById("name-error");
name.addEventListener('focus', nameFocus);
function nameFocus() {nameError.classList.toggle("opacity", true), name.select()};
const email = document.getElementById("email");
const emailError = document.getElementById("email-error");
email.addEventListener('focus', emailFocus);
function emailFocus() {emailError.classList.toggle("opacity", true), email.select()};
const username = document.getElementById("username");
const usernameError = document.getElementById("username-error");
username.addEventListener('focus', usernameFocus);
function usernameFocus() {usernameError.classList.toggle("opacity", true), username.select()};
const password = document.getElementById("password");
const passwordError = document.getElementById("password-error");
password.addEventListener('focus', passwordFocus);
function passwordFocus() {passwordError.classList.toggle("opacity", true), password.select()};
const phoneNumber = document.getElementById("phoneNumber");
const phoneNumberError = document.getElementById("phoneNumber-error");
phoneNumber.addEventListener('focus', phoneNumberFocus);
function phoneNumberFocus() {phoneNumberError.classList.toggle("opacity", true), phoneNumber.select()};
const enrollmentNumber = document.getElementById("enrollmentNumber");
const enrollmentNumberError = document.getElementById("enrollmentNumber-error");
enrollmentNumber.addEventListener('focus', enrollmentNumberFocus);
function enrollmentNumberFocus() {enrollmentNumberError.classList.toggle("opacity", true), enrollmentNumber.select()};
const status = document.getElementById("status");
const statusError = document.getElementById("status-error");
status.addEventListener('focus', statusFocus);
function statusFocus() {statusError.classList.toggle("opacity", true), status.select()};
const timeRange = document.getElementById("timeRange");
const timeRangeError = document.getElementById("timeRange-error");
timeRange.addEventListener('focus', timeRangeFocus);
function timeRangeFocus() {timeRangeError.classList.toggle("opacity", true), timeRange.select()};
const dayRange = document.getElementById("dayRange");
const dayRangeError = document.getElementById("dayRange-error");
dayRange.addEventListener('focus', dayRangeFocus);
function dayRangeFocus() {dayRangeError.classList.toggle("opacity", true), dayRange.select()};

// CREATE *******************************************************

const createButton = document.getElementById("create-button");
const cancelButton = document.getElementById("cancel-button");
const createConfirmButton = document.getElementById("create-confirm-button");

createButton.addEventListener("click", openModal);
cancelButton.addEventListener("click", cancelButtonFunc);
createConfirmButton.addEventListener("click", reqCreate);

function openModal() {
  backgroundModal.classList.toggle("hide", false);
  modal.classList.toggle("hide", false);
  createConfirmButton.classList.toggle("hide", false);
}
function cancelButtonFunc() {
  backgroundModal.classList.toggle("hide", true);
  modal.classList.toggle("hide", true);
  createConfirmButton.classList.toggle("hide", true);
}

function reqCreate(e) {
  e.preventDefault()
  validateMissing()
  validateAll()
  const dataForm = document.querySelectorAll("#create-form input");
  let dataBody = {
    name: dataForm[0].value,
    email: dataForm[1].value,
    username: dataForm[2].value,
    password: dataForm[3].value,
    phoneNumber: dataForm[4].value,
    enrollmentNumber: dataForm[5].value,
    status: dataForm[6].value,
    timeRange: dataForm[7].value,
    dayRange: dataForm[8].value,
  };
  console.log(dataBody)
  const url = "http://localhost:4000/api/psychologists/";
  fetch(url, {
    method: "POST",
    body: JSON.stringify(dataBody),
    headers: {
      "Content-Type": "psychologist/json",
    },
  })
    .then(async (res) => {
      const data = await res.json();
      if (res.status === 201) return data;
      throw new Error(data.msg);
    })
    .then((data) => {
      success(data,"The new psychologist was correctly created:");
    })
    .catch((err) => {
      fail(err);
    });
}

// READ PSYS **************************************************************
function readPsy() {
  const url = "http://localhost:4000/api/psychologists/";
  fetch(url)
    .then((res) => {
      if (res.status === 200) return res.json();
      throw new Error(`HTTP ${res.status}`);
    })
    .then((data) => {
      createList(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
function createList(psys) {
  const table = document.getElementById("table-list");
  let i = 0;
  psys.forEach((psy) => {
    const itemList = document.createElement("tr");
    itemList.id = "item-" + i;
    itemList.innerHTML = `<td>${psy._id}</td>
      <td>${psy.name}</td>
      <td>${psy.email}</td>
      <td>${psy.username}</td>
      <td>${psy.password}</td>
      <td>${psy.phoneNumber}</td>
      <td>${psy.enrollmentNumber}</td>
      <td>${psy.status}</td>
      <td>${psy.timeRange}</td>
      <td>${psy.dayRange}</td>
      <td><button class="button-list update-button" onclick="openUpdateModal(${i})"><img src="img/Icon-edit.png" alt="Edit"></button></td>
      <td><button class="button-list delete-button" onclick="deletePsychologist(${i})"><img src="img/Icon-remove.png" alt="Remove"/></button>
      </td>`;
    table.appendChild(itemList);
    i++;
  });
  createButton.disabled = false;
}

// UPDATE Psys********************************************************
const updateButtons = document.querySelectorAll("update-button");
const updateConfirmButton = document.getElementById("update-confirm-button");

updateButtons.forEach(updateButtons.addEventListener("click", openModal));
updateConfirmButton.addEventListener("click", reqUpdate);

function openUpdateModal(index) {
  updateModal.classList.toggle("hide", false);

  const dataForm = document.querySelectorAll("#update-form input");
  let contentItem = document.getElementById(`item-${index}`).firstChild;
  for (let i = 0; i < dataForm.length; i++) {
    dataForm[i].value = contentItem.innerText;
    contentItem = contentItem.nextElementSibling;
  }
}

function reqUpdateClient(e) {
  e.preventDefault();

  //validate all again
  // validateName();
  // validateEmail();
  // validatePhoneNumber();
  // validateCuit();
  // validateAddress();
  // validateActivity();

  const dataForm = document.querySelectorAll("#update-form input");
  let dataBody = {
    name: dataForm[1].value,
    email: dataForm[2].value,
    phoneNumber: dataForm[3].value,
    cuit: dataForm[4].value,
    address: dataForm[5].value,
    activity: dataForm[6].value,
  };
  const idPsy = dataForm[0].value; //this field is hidden in the modalUpdate
  const url = "http://localhost:4000/api/psychologists/" + idPsy;
  fetch(url, {
    method: "PUT",
    body: JSON.stringify(dataBody),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status === 200) return res.json();
      throw new Error(`HTTP ${res.status}`);
    })
    .then((data) => {
      updateModal.classList.toggle("hide", true);
      // location.reload();  //CAMBIAR POR createList cuando pueda hacerlo
    })
    .catch((error) => {
      console.log(error);
    });
}

// DELETE CLIENTS***************************************************
function deleteClient(index) {
  const itemToDelete = document.getElementById(`item-${index}`);
  const idPsy = itemToDelete.firstElementChild.innerText;

  const url = "http://localhost:4000/api/psychologists/" + idPsy;
  fetch(url, {
    method: "DELETE",
  })
  .then((res) => {
    if (res.status === 200) return res.json();
    throw new Error(`HTTP ${res.status}`);
  })
  .then(() => {
    location.reload(); //CAMBIAR POR createList cuando pueda hacerlo
  })
  .catch((error) => {
    console.log(error);
  });
}

/////////////////////////////////////////////////// Validations ***************************
function validateMissing(req, res) {
  if (!name.value) return res.status(400).json({ msg: "Name is missing" });
  if (!email.value) return res.status(400).json({ msg: "Email is missing" });
  if (!username.value) return res.status(400).json({ msg: "Username is missing" });
  if (!password.value) return res.status(400).json({ msg: "Password is missing" });
  if (!phoneNumber.value) return res.status(400).json({ msg: "PhoneNumber is missing" });
  if (!enrollmentNumber.value) return res.status(400).json({ msg: "EnrollmentNumber is missing" });
  if (!status.value) return res.status(400).json({ msg: "Status is missing" });
  if (!timeRange.value) return res.status(400).json({ msg: "TimeRange is missing" });
  if (!dayRange.value) return res.status(400).json({ msg: "DayRange is missing" });
}
function validateAll() {
  if (name.value) {
    if (typeof name.value !== "string") return res.status(400).json({ msg: "Name must be string" });
    if (name.value.length > 30) {
      nameError.classList.toggle("opacity", false);
      nameError.innerText = "Name cannot be larger than 30";
      return res.status(400).json({ msg: "Name cannot be larger than 30" });
    }
  }
  if (email.value) {
    if (typeof email.value !== "string") return res.status(400).json({ msg: "Email must be string" });
    if (email.value.length > 30) {
      emailError.classList.toggle("opacity", false);
      emailError.innerText = "Email cannot be larger than 30";
      return res.status(400).json({ msg: "Email cannot be larger than 30" });
    }
  }
  if (username.value) {
    if (typeof username.value !== "string") return res.status(400).json({ msg: "Username must be string" });
    if (username.value.length > 30) {
      usernameError.classList.toggle("opacity", false);
      usernameError.innerText = "Username cannot be larger than 30";
      return res.status(400).json({ msg: "Username cannot be larger than 30" });
    }
  }
  if (password.value) {
    if (typeof password.value !== "string") return res.status(400).json({ msg: "Password must be string" });
    if (password.value.length > 30) {
      passwordError.classList.toggle("opacity", false);
      passwordError.innerText = "Password cannot be larger than 30";
      return res.status(400).json({ msg: "Password cannot be larger than 30" });
    }
  }
  if (phoneNumber.value) {
    if (typeof phoneNumber.value !== "string") return res.status(400).json({ msg: "PhoneNumber must be string" });
    if (phoneNumber.value.length > 15) {
      phoneNumberError.classList.toggle("opacity", false);
      phoneNumberError.innerText = "Phonenumber cannot be larger than 15";
      return res.status(400).json({ msg: "Phonenumber cannot be larger than 15" });
    }
    if (parseInt(phoneNumber.value, 10) != phoneNumber.value) {
      phoneNumberError.classList.toggle("opacity", false);
      phoneNumberError.innerText = "PhoneNumber must contain only numbers";
      return res.status(400).json({ msg: "PhoneNumber must contain only numbers" });
    }
  }
  if (enrollmentNumber.value) {
    if (typeof enrollmentNumber.value !== "string") return res.status(400).json({ msg: "EnrollmentNumber must be string" });
    if (enrollmentNumber.value.length > 4) {
      enrollmentNumberError.classList.toggle("opacity", false);
      enrollmentNumberError.innerText = "EnrollmentNumber cannot be larger than 4";
      return res.status(400).json({ msg: "EnrollmentNumber cannot be larger than 4" });
    }
    if (parseInt(enrollmentNumber.value, 10) != enrollmentNumber.value) {
      enrollmentNumberError.classList.toggle("opacity", false);
      enrollmentNumberError.innerText = "EnrollmentNumber must contain only numbers";
      return res.status(400).json({ msg: "EnrollmentNumber must contain only numbers" });
    }
  }
  if (status.value && status.value !== ("true" || "false")) {
    statusError.classList.toggle("opacity", false);
    statusError.innerText = "Status must be boolean";
    return res.status(400).json({ msg: "Status must be boolean" });
  }
  if (timeRange.value) {
    if (timeRange.value.length !== 2) {
      timeRangeError.classList.toggle("opacity", false);
      timeRangeError.innerText = "TimeRange accepts only two numbers";
      return res.status(400).json({ msg: "TimeRange accepts only two numbers" });
    }
    // let containChars = false;
    // let isBiggerOrSmaller = false;
    // timeRange.value.forEach((element) => {
    //   if (parseInt(element, 10) != element) {
    //     containChars = true;
    //     return containChars;
    //   }
    //   if (element < 0 || element > 24) {
    //     isBiggerOrSmaller = true;
    //     return isBiggerOrSmaller;
    //   }
    // });
    // if (containChars) {
    // timeRangeError.classList.toggle("opacity", false);
    // timeRangeError.innerText = "TimeRange accepts only numbers";
    // return res.status(400).json({ msg: "TimeRange accepts only numbers" });
    // }
    // if (isBiggerOrSmaller) {
    // timeRangeError.classList.toggle("opacity", false);
    // timeRangeError.innerText = "TimeRange values must be between 0 and 24";
    //   return res
    //     .status(400)
    //     .json({ msg: "TimeRange values must be between 0 and 24" });
    // }
    // if (timeRange.value[0] >= timeRange.value[1]) {
    //   timeRangeError.classList.toggle("opacity", false);
    //   timeRangeError.innerText = "TimeRange first value must be smaller than the second one";
    //   return res.status(400).json({
    //     msg: "TimeRange first value must be smaller than the second one",
    //   });
    // }
  }
  if (dayRange.value) {
    if (dayRange.value.length > 7) {
      dayRangeError.classList.toggle("opacity", false);
      dayRangeError.innerText = "DayRange length cannot be higher than seven";
      return res
        .status(400)
        .json({ msg: "DayRange length cannot be higher than seven" });
    }
    // let containChars = false;
    // let isBiggerOrSmaller = false;
    // let containRepetedElements = false;
    // dayRange.value.forEach((element, index) => {
    //   if (parseInt(element, 10) != element) {
    //     containChars = true;
    //     return containChars;
    //   }
    //   if (element < 1 || element > 7) {
    //     isBiggerOrSmaller = true;
    //     return isBiggerOrSmaller;
    //   }
    //   if (dayRange.value.indexOf(element) !== index) {
    //     containRepetedElements = true;
    //     return containRepetedElements;
    //   }
    // });
    // if (containChars) {
    //   dayRangeError.classList.toggle("opacity", false);
    //   dayRangeError.innerText = "DayRange accepts only numbers";
    //   return res.status(400).json({ msg: "DayRange accepts only numbers" });
    // }
    // if (isBiggerOrSmaller) {
    //   dayRangeError.classList.toggle("opacity", false);
    //   dayRangeError.innerText = "DayRange values must be between 1 and 7";
    //   return res
    //     .status(400)
    //     .json({ msg: "DayRange values must be between 1 and 7" });
    // }
    // if (containRepetedElements) {
    //   dayRangeError.classList.toggle("opacity", false);
    //   dayRangeError.innerText = "DayRange does not allow repeted values";
    //   return res
    //     .status(400)
    //     .json({ msg: "DayRange does not allow repeted values" });
    // }
  }
}

