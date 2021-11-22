var fieldNames = ["psychologist", "candidate", "date", "status", "result"];
var fields = [];
var form = document.getElementById("subscribe-form");
var submitResult = document.querySelector(".submit-result");

for (let i = 0; i < fieldNames.length; i++) {
  fields.push(document.getElementById(fieldNames[i]));
  fields[i].addEventListener("blur", validate);
}

form.addEventListener("submit", submitForm);

function validate(e) {
  let validationResult;
  switch (e.target.id) {
    case "psychologist":
      validationResult = validateName(e.target.value);
      break;
    case "candidate":
      validationResult = validateEmail(e.target.value);
      break;
    case "date":
      validationResult = validatePassword(e.target.value);
      break;
    case "status":
      validationResult = validateRepeatPassword(e.target.value);
      break;
    case "result":
      validationResult = validateAge(e.target.value);
      break;
    default:
      break;
  }
  if (validationResult[0]) {
    e.target.nextElementSibling.innerHTML = validationResult[1];
    e.target.classList.toggle("error");
    e.target.addEventListener("focus", correcting);
  }
}

function correcting(e) {
  e.target.nextElementSibling.innerHTML = "";
  e.target.classList.toggle("error");
  e.target.removeEventListener("focus", correcting);
}

function submitForm(e) {
  e.preventDefault();
  let errors = document.querySelectorAll(".error");
  if (errors.length === 0) {
    let url = baseUrl + "?";
    for (let i = 0; i < fields.length; i++) {
      if (i != 0) url += "&";
      url += `${fieldNames[i]}=${fields[i].value}`;
    }
    sendRequest(url);
  } else {
    let msg = "";
    let title =
      '<h2 class="unsuccessful">There are still errors in the form!</h2>';
    for (let i = 0; i < errors.length; i++) {
      msg += `<li>${errors[i].nextElementSibling.innerHTML}</li>`;
    }
    let msgContent = title + "<ul>" + msg + "</ul>";
    insertMsg(msgContent);
  }
}

function sendRequest(url) {
  fetch(url)
    .then(function (res) {
      if (res.status === 200) return res.json();
      else throw Error(res.status);
    })
    .then(function (res) {
      successfulRequest(res);
    })
    .catch(function (err) {
      unsuccessfulRequest(err);
    });
}

function successfulRequest(data) {
  let title =
    '<h2 class="successful">The form was submitted successfully!</h2>';
  let msg = "";
  for (let i = 0; i < fields.length; i++) {
    msg += `<li><span class="bold">${fields[i].getAttribute("name")}:</span> ${
      data[fieldNames[i]]
    }</li>`;
    localStorage.setItem(fieldNames[i], data[fieldNames[i]]);
  }
  let msgContent = title + "<ul>" + msg + "</ul>";
  insertMsg(msgContent);
}

function unsuccessfulRequest(data) {
  let title =
    '<h2 class="unsuccessful">There was a problem when submitting the form!</h2>';
  let msg = "<p>" + data + "</p>";

  let msgContent = title + msg;
  insertMsg(msgContent);
}

function insertMsg(msgContent) {
  let close =
    '<div><span class="material-icons modal-close-btn">close</span></div>';
  submitResult.firstElementChild.innerHTML = close + msgContent;
  submitResult.classList.toggle("hidden");

  window.addEventListener("click", closeModal);
}

function closeModal(e) {
  let modal = document.querySelector(".submit-result");
  let closeBtn = document.querySelector(".modal-close-btn");
  if (e.target === modal || e.target === closeBtn) {
    submitResult.classList.toggle("hidden");
    submitResult.firstElementChild.innerHTML = "";

    window.removeEventListener("click", closeModal);
  }
}

data = {
  idCandidate: "",
  idPsychologist: "",
  dateTime: "",
  status: "",
  result: "",
};

<option value="" selected disabled hidden>
  Select a{" "}
</option>;
