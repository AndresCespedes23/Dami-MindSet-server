const getAge = (dateString) => {
  birthDate = new Date(dateString);
  var today = new Date();
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

const formatDate = (date) => {
  const array = date.split("-");
  return `${array[0]}-${array[1]}-${array[2].substring(0,2)}`;
}

const updateForm = (candidate) => {
  const birthDate = formatDate(candidate.dateOfBirth);
  const form = document.getElementById("form");
  form.innerHTML =
  `
  <fieldset>
  <label for="name">Name</label>
  <input
  type="text"
  id="name"
  name="name"
  value="${candidate.name}"
  />
  <span id="Error1" class="Error-msg">Error</span>
  </fieldset>
  <fieldset>
  <label for="email">Email</label>
  <input
  type="text"
  id="email"
  name="email"
  value="${candidate.email}"
  />
  <span id="Error2" class="Error-msg">Error</span>
  </fieldset>
  <fieldset>
  <label for="username">Username</label>
  <input
  type="text"
  id="username"
  name="username"
  value="${candidate.username}"
  />
  <span id="Error3" class="Error-msg">Error</span>
  </fieldset>
  <fieldset>
  <label for="password">Password</label>
  <input
  type="password"
  id="password"
  name="password"
  value="${candidate.password}"
  />
  <span id="Error4" class="Error-msg">Error</span>
  </fieldset>
  <fieldset>
  <label for="gender">Gender</label>
  <input type="text" id="gender" name="gender" value="${candidate.gender}" />
  <span id="Error5" class="Error-msg">Error</span>
  </fieldset>
  <fieldset>
  <label for="address">Address</label>
  <input type="text" id="address" name="address" value="${candidate.address}" />
  <span id="Error6" class="Error-msg">Error</span>
  </fieldset>
  <fieldset>
  <label for="phoneNumber">Phone Number</label>
  <input type="tel" id="phoneNumber" name="phoneNumber" value="${candidate.phoneNumber}" />
  <span id="Error7" class="Error-msg">Error</span>
  </fieldset>
  <fieldset>
  <label for="dateOfBirth">Birth Date</label>
  <input
  type="date"
  id="dateOfBirth"
  name="dateOfBirth"
  value="${birthDate}" />
  <span id="Error8" class="Error-msg">Error</span>
  </fieldset>
  <fieldset>
  <label for="zipCode">Zipcode</label>
  <input type="text" id="zipCode" name="zipCode" value="${candidate.zipCode}" />
  <span id="Error9" class="Error-msg">Error</span>
  </fieldset>
  <fieldset>
  <label for="city">City</label>
  <input type="text" id="city" name="city" value="${candidate.city}" />
  <span id="Error10" class="Error-msg">Error</span>
  </fieldset>
  <fieldset>
  <label for="state">State</label>
  <input type="text" id="state" name="state" value="${candidate.state}" />
  <span id="Error11" class="Error-msg">Error</span>
  </fieldset>
  <fieldset>
  <label for="country">Country</label>
  <input type="text" id="country" name="country" value="${candidate.country}" />
  <span id="Error12" class="Error-msg">Error</span>
  </fieldset>
  <fieldset>
  <label for="dni">DNI</label>
  <input type="text" id="dni" name="dni" value="${candidate.dni}" />
  <span id="Error24" class="Error-msg">Error</span>
  </fieldset>
  <fieldset>
    <label for="timeRange">Time Range</label>
    <label for="7"><input type="checkbox" id="7" name="timeRange" value="7" />7</label>
    <label for="8"><input type="checkbox" id="8" name="timeRange" value="8" />8</label>
    <label for="9"><input type="checkbox" id="9" name="timeRange" value="9" />9</label>
    <label for="10"><input type="checkbox" id="10" name="timeRange" value="10" />10</label>
    <label for="11"><input type="checkbox" id="11" name="timeRange" value="11" />11</label>
    <label for="12"><input type="checkbox" id="12" name="timeRange" value="12" />12</label>
    <label for="13"><input type="checkbox" id="13" name="timeRange" value="13" />13</label>
    <label for="14"><input type="checkbox" id="14" name="timeRange" value="14" />14</label>
    <label for="15"><input type="checkbox" id="15" name="timeRange" value="15" />15</label>
    <label for="16"><input type="checkbox" id="16" name="timeRange" value="16" />16</label>
    <label for="17"><input type="checkbox" id="17" name="timeRange" value="17" />17</label>
    <label for="18"><input type="checkbox" id="18" name="timeRange" value="18" />18</label>
    <label for="19"><input type="checkbox" id="19" name="timeRange" value="19" />19</label>
  </fieldset>
  `;
  return form;
}

function openFormModal() {
  modal.classList.toggle("show");
  formModal.classList.toggle("show");
}

function wipeTable() {
  const table = document.getElementById("resource-table");
  table.innerHTML = `<tr id="table-headers">
  <th>id</th>
  <th>Name</th>
  <th>Age</th>
  <th>Address</th>
  <th>Status</th>
  <th>Profiles</th>
  <th>See applications</th>
  <th>See Profile</th>
  <th></th>
  <th></th>
  </tr>`
}

function showProfile() {
  //function content
}

function showApplications() {
  //function content
}

function updateCallback(candidate) {
  //load candidate info on form
  const form = updateForm(candidate);
  openFormModal();
  //retrieve edited form data
  //make PUT request
}

function editCandidate(candidate) {
  readCandidates();
}

function showConfirmModal(candidate) {
  modal.classList.toggle("show");
  confirmModal.classList.toggle("show");
  confirmModal.querySelector("#yes").onclick = function(){
    modal.classList.toggle("show");
    confirmModal.classList.toggle("show");
    wipeTable();
    removeCandidate(candidate);
  };
}

function removeCandidate(candidate) {
  let url = `http://localhost:4000/api/candidates/${candidate._id}`;
  fetch(url, {
    method: "DELETE",
  })
  .then((res) => {
    if (res.status === 200) return res.json();
    throw new Error(`HTTP ${res.status}`);
  })
  .then(() => {
    readCandidates();
  })
  .catch((error) => {
    console.log(error);
  });
}

function readCandidates() {
  let url = "http://localhost:4000/api/candidates";
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

function createList(candidates) {
  const table = document.getElementById("resource-table");
  candidates.forEach((candidate) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${candidate._id}</td>
    <td>${candidate.name}</td>
    <td>${getAge(candidate.dateOfBirth)}</td>
    <td>${candidate.address}</td>
    <td>${candidate.status}</td>
    <td>${candidate.profiles.join(",")}</td>
    <td><img src="img/Icon-visible.png" alt="Show" class="show-applications" /></td>
    <td><img src="img/Icon-visible.png" alt="Show" class="show-profile" /></td>
    <td><img src="img/Icon-edit.png" alt="Edit" class="update" /></td>
    <td><img src="img/Icon-remove.png" alt="Remove" class="remove" /></td>`;
    table.appendChild(row);
    row.querySelector(".show-profile").addEventListener("click", () => showProfile(candidate));
    row.querySelector(".show-applications").addEventListener("click", () => showApplications(candidate));
    row.querySelector(".update").addEventListener("click", () => updateCallback(candidate));
    row.querySelector(".remove").addEventListener("click", () => showConfirmModal(candidate));
  })
}

readCandidates();

const modal = document.getElementById("background-modal");
const confirmModal = document.getElementById("confirm-modal");
const formModal = document.getElementById("create-modal");
formModal.querySelector("#cancel-button").addEventListener("click", () => {
  modal.classList.toggle("show")
  formModal.classList.toggle("show");
});
confirmModal.querySelector("#no").addEventListener("click", () => {
  modal.classList.toggle("show")
  confirmModal.classList.toggle("show");
});