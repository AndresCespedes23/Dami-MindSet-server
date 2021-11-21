const table = document.querySelector("table");
const createCandidateBtn = document.getElementById("create-btn");
const modal = document.getElementById("background-modal");

var baseUrl = "http://localhost:4000/api/";

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
      displaySessions(data);
    })
    .catch((err) => {
      displayError(err);
    });
}

async function displaySessions(sessions) {
  let sessionsList = "";
  for (let i = 0; i < Math.min(sessions.length, 2); i++) {
    const candidateName = await getName(sessions[i].idCandidate, "candidates/");
    sessionsList += `<td>${candidateName}</td>`;
    const psychologistName = await getName(
      sessions[i].idPsychologist,
      "psychologists/"
    );
    sessionsList += `<td>${psychologistName}</td>`;
    const date = `${sessions[i].dateTime.substr(0, 10)} ${sessions[
      i
    ].dateTime.substr(11, 5)}`;
    sessionsList += `<td>${date}</td>`;
    sessionsList += `<td>${sessions[i].status}</td>`;
    let result = sessions[i].result;
    if (!result) result = "-";
    sessionsList += `<td>${result}</td>`;
    sessionsList += `<td><button><img src="img/Icon-edit.png" alt="Edit"/></button></td>`;
    sessionsList += `<td><button><img src="img/Icon-remove.png" alt="Remove"/></button></td>`;
    sessionsList = `<tr>${sessionsList}</tr>`;
  }
  table.innerHTML += sessionsList;
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

function displayError(err) {
  console.log(err);
}

/******************** MODAL ********************/
function openCreateModal(e) {
  modal.innerHTML = fillFormModal();
  openModal();
}

function fillFormModal() {
  const title = `<h2>Create Session</h2>`;
  const description = `<p>Enter the session's information:</p>`;
  let form = "";
  sessionsFormModel.forEach((elem) => {
    const label = `<label for="${elem.id}">${elem.label}</label>`;
    let field;
    if (elem.element === "input") {
      field = `<input id="${elem.id}" type="${elem.type}" name="${elem.name}"
        placeholder="${elem.placeholder}"/>`;
    } else {
      field = `<select id="${elem.id}" name="${elem.name}">${elem.placeholder}
        </select>`;
    }
    const error = `<span class="error">Error</span>`;
    form += `<fieldset>${label}${field}${error}</fieldset>`;
  });
  form = `<form>${form}</form>`;
  const closeBtn = `<button id="close-btn" class="modal-button">Cancel</button>`;
  const confirmBtn = `<button id="confirm-btn" class="modal-button">Confirm</button>`;
  const buttons = `<div>${closeBtn}${confirmBtn}</div>`;
  const modal = `<div class="modal">${title}${description}${form}${buttons}<div>`;
  return modal;
}

function openModal() {
  modal.classList.toggle("hidden");
  const closeBtn = document.getElementById("close-btn");
  closeBtn.addEventListener("click", closeModal);
}

function closeModal(e) {
  modal.classList.toggle("hidden");
  const closeBtn = document.getElementById("close-btn");
  closeBtn.removeEventListener("click", closeModal);
  modal.innerHTML = "";
}

/******************** UTILITIES ********************/
function capitalize(str) {
  const words = str.split(" ");
  words.forEach((word, i) => {
    words[i] = word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase();
  });
  return words.join(" ");
}
