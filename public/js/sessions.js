const table = document.querySelector("table");
const createCandidateBtn = document.getElementById("create-btn");
const modal = document.getElementById("background-modal");

var baseUrl = "http://localhost:4000/api/";
let selectedSession = {};

window.onload = () => listSessions();

createCandidateBtn.addEventListener("click", openCreateModal);

/******************** LIST SESSIONS ********************/
function listSessions() {
  fetch(baseUrl + "sessions")
    .then((res) => {
      if (res.status === 200) return res.json();
      throw new Error(`HTTP ${res.status}`);
    })
    .then((data) => {
      getSessionsInfo(data);
    })
    .catch((err) => {
      displayError(err);
    });
}

function getSessionsInfo(sessions) {
  const candidates = [];
  const psychologists = [];
  for (let i = 0; i < Math.min(sessions.length, 20); i++) {
    candidates.push(getName(sessions[i].idCandidate, "candidates/"));
    psychologists.push(getName(sessions[i].idPsychologist, "psychologists/"));
  }
  Promise.all(candidates).then((candidates) => {
    candidates.forEach((candidate, i) => {
      sessions[i].candidate = candidate;
    });
    Promise.all(psychologists).then((psychologists) => {
      psychologists.forEach((psychologist, i) => {
        sessions[i].psychologist = psychologist;
      });
      displaySessions(sessions);
    });
  });
}

async function getName(id, resource) {
  try {
    const res = await fetch(baseUrl + resource + id);
    if (res.status === 200) {
      const data = await res.json();
      return capitalize(data.name);
    }
    throw new Error(`HTTP ${res.status}`);
  } catch (err) {
    displayError(err);
  }
}

async function displaySessions(sessions) {
  let sessionsList = `<tr><th>Candidate</th><th>Psychologist</th>
  <th>Date</th><th>Status</th><th>Result</th><th></th><th></th></tr>`;
  for (let i = 0; i < Math.min(sessions.length, 20); i++) {
    let session = "";
    session += `<td data-id="${sessions[i].idCandidate}">
      ${sessions[i].candidate}</td>`;
    session += `<td data-id="${sessions[i].idPsychologist}">
      ${sessions[i].psychologist}</td>`;
    const date = `${sessions[i].dateTime.substr(0, 10)} ${sessions[
      i
    ].dateTime.substr(11, 5)}`;
    session += `<td data-date="${sessions[i].dateTime.substr(0, 16)}">
      ${date}</td>`;
    session += `<td>${sessions[i].status}</td>`;
    let result = sessions[i].result;
    if (!result) result = "-";
    session += `<td>${result}</td>`;
    session += `<td><button class="edit-btn"><img src="img/Icon-edit.png" alt="Edit"/></button></td>`;
    session += `<td><button class="delete-btn"><img src="img/Icon-remove.png" alt="Remove"/></button></td>`;
    sessionsList += `<tr class="session" data-id="${sessions[i]._id}">${session}</tr>`;
  }
  table.innerHTML = sessionsList;
  const buttons = document.querySelectorAll(".session button");
  buttons.forEach((button) => {
    if (button.classList.contains("edit-btn")) {
      button.addEventListener("click", openEditModal);
    } else {
      button.addEventListener("click", openDeleteModal);
    }
  });
}

/******************** CREATE SESSION ********************/
async function openCreateModal() {
  modal.innerHTML = fillFormModal("create");
  openModal();
  await fillFormNames("candidates", "candidate", "create");
  await fillFormNames("psychologists", "psychologist", "create");
  const form = document.getElementById("modal-form");
  form.addEventListener("submit", createSession);
}

function createSession(e) {
  e.preventDefault();
  const data = getFormData();
  fetch(baseUrl + "sessions", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      const data = await res.json();
      requestSuccessful(data, "created");
    })
    .catch((err) => {
      displayError(err);
    });
}

/******************** UPDATE SESSION ********************/
async function openEditModal(e) {
  const target = getTarget(e);
  selectedSession = getCurrentData(target);
  modal.innerHTML = fillFormModal("update");
  openModal();
  fillSelectedSession();
  await fillFormNames("candidates", "candidate", "update");
  await fillFormNames("psychologists", "psychologist", "update");
  const form = document.getElementById("modal-form");
  form.addEventListener("submit", updateSession);
}

function getCurrentData(tableRow) {
  const session = {};
  session.id = tableRow.getAttribute("data-id");
  const fields = tableRow.children;
  session.idCandidate = fields[0].getAttribute("data-id");
  session.idPsychologist = fields[1].getAttribute("data-id");
  session.dateTime = fields[2].getAttribute("data-date");
  session.status = fields[3].innerHTML;
  session.result = fields[4].innerHTML;
  return session;
}

function fillSelectedSession() {
  const { dateTime, result } = selectedSession;
  document.getElementById("date").value = dateTime;
  document.getElementById("result").value = result;
}

function updateSession(e) {
  e.preventDefault();
  const data = getFormData();
  fetch(baseUrl + "sessions/" + selectedSession.id, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      const data = await res.json();
      requestSuccessful(data, "updated");
    })
    .catch((err) => {
      displayError(err);
    });
}

/******************** DELETE SESSION ********************/
function openDeleteModal(e) {
  fillDeleteModal();
  const target = getTarget(e);
  selectedSession.id = target.getAttribute("data-id");
  selectedSession.target = target;
  const deleteBtn = document.getElementById("delete-btn");
  deleteBtn.addEventListener("click", deleteSession);
}

function fillDeleteModal() {
  const title = `<h2>Are you sure you want to delete this session?</h2>`;
  const closeBtn = `<button id="close-btn" class="modal-button">Close</button>`;
  const confirmBtn = `<button id="delete-btn" class="modal-button">Delete</button>`;
  const buttons = `<div>${closeBtn}${confirmBtn}</div>`;
  const modalContent = `<div class="modal">${title}${buttons}<div>`;
  modal.innerHTML = modalContent;
  openModal();
}

function deleteSession() {
  table.firstElementChild.removeChild(selectedSession.target);
  fetch(baseUrl + "sessions/" + selectedSession.id, {
    method: "DELETE",
  })
    .then(async (res) => {
      const data = await res.json();
      requestSuccessful(data, "deleted");
    })
    .catch((err) => {
      displayError(err);
    });
}

/******************** COMMON FUNCTIONS ********************/
function getTarget(e) {
  const target = e.target.tagName === "IMG" ? e.target.parentElement : e.target;
  return target.parentElement.parentElement;
}

function getFormData() {
  const data = {};
  data.idCandidate = document.getElementById("candidate").value;
  data.idPsychologist = document.getElementById("psychologist").value;
  data.dateTime = document.getElementById("date").value;
  data.status = document.getElementById("status").value;
  data.result = document.getElementById("result").value;
  return data;
}

function requestSuccessful(data, operation) {
  const title = `<h2>Session ${operation} successfully!</h2>`;
  let sessionInfo = ``;
  for (let elem in data) {
    if (elem !== "_id" && elem !== "__v")
      sessionInfo += `<li>${elem}: ${data[elem]}</li>`;
  }
  sessionInfo = `<ul>${sessionInfo}</ul>`;
  const closeBtn = `<div><button id="close-btn" class="modal-button">Close</button></div>`;
  const modalContent = `<div class="modal">${title}${sessionInfo}${closeBtn}<div>`;
  modal.innerHTML = modalContent;
  openModal();
}

function displayError(err) {
  const title = `<h2>Ups... there was an error</h2>`;
  const error = `<p>${err}</p>`;
  const closeBtn = `<div><button id="close-btn" class="modal-button">Close</button></div>`;
  const modalContent = `<div class="modal">${title}${error}${closeBtn}<div>`;
  modal.innerHTML = modalContent;
  openModal();
}

/******************** MODAL ********************/
function openModal() {
  modal.classList.toggle("hidden", false);
  const closeBtn = document.getElementById("close-btn");
  closeBtn.addEventListener("click", closeModal);
}

function closeModal(e) {
  modal.classList.toggle("hidden", true);
  modal.innerHTML = "";
  listSessions();
}

function fillFormModal(operation) {
  const title = `<h2>${capitalize(operation)} Session</h2>`;
  const description = `<p>Enter the session's information:</p>`;
  let form = "";
  sessionsFormModel.forEach((elem) => {
    const label = `<label for="${elem.id}">${elem.label}</label>`;
    let field;
    if (elem.element === "input") {
      field = `<input id="${elem.id}" type="${elem.type}" name="${elem.name}"
        placeholder="${elem.placeholder}" ${elem.required}/>`;
    } else if (elem.options) {
      let options = ``;
      elem.options.forEach((option) => {
        if (operation === "update" && option === selectedSession.status) {
          options += `<option value="${option}" selected>${option}</option>`;
        } else {
          options += `<option value="${option}">${option}</option>`;
        }
      });
      field = `<select id="${elem.id}" name="${elem.name}" ${elem.required}>
      ${options}</select>`;
    } else {
      field = `<select id="${elem.id}" name="${elem.name}" ${elem.required}>
      </select>`;
    }
    const error = `<span class="error"></span>`;
    form += `<fieldset>${label}${field}${error}</fieldset>`;
  });
  form = `<form id="modal-form">${form}</form>`;
  const closeBtn = `<button id="close-btn" class="modal-button">Cancel</button>`;
  const confirmBtn = `<button id="confirm-btn" class="modal-button"
    type:"submit" form="modal-form">Confirm</button>`;
  const buttons = `<div>${closeBtn}${confirmBtn}</div>`;
  const modal = `<div class="modal">${title}${description}${form}${buttons}<div>`;
  return modal;
}

async function fillFormNames(resource, elementId, operation) {
  const names = await getNames(resource);
  if (!names) return;
  let namesList = ``;
  let currentValue;
  if (operation === "create") {
    namesList += `<option value="" selected disabled hidden>Select a ${elementId}
      </option>`;
  } else {
    currentValue =
      elementId === "candidate"
        ? selectedSession.idCandidate
        : selectedSession.idPsychologist;
  }
  names.forEach((name) => {
    if (name.id === currentValue) {
      namesList += `<option value="${name.id}" selected>${name.name}</option>`;
    } else {
      namesList += `<option value="${name.id}">${name.name}</option>`;
    }
  });
  const select = document.getElementById(elementId);
  select.innerHTML = namesList;
}

async function getNames(resource) {
  try {
    const res = await fetch(baseUrl + resource);
    if (res.status === 200) {
      const data = await res.json();
      let names = [];
      data.forEach((element) => {
        let name = { id: element._id, name: capitalize(element.name) };
        names.push(name);
      });
      return names;
    }
    throw new Error(`HTTP ${res.status}`);
  } catch (err) {
    displayError(err);
  }
}

/******************** UTILITIES ********************/
function capitalize(str) {
  const words = str.split(" ");
  words.forEach((word, i) => {
    words[i] = word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase();
  });
  return words.join(" ");
}
