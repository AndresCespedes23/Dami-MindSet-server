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

function editCandidate() {
  //function content
}

function showConfirmModal() {
  candidate = this;
  modal.classList.toggle("show");
  modalContent.classList.toggle("show");
  modalContent.querySelector("#yes").onclick = function(){
    modal.classList.toggle("show");
    modalContent.classList.toggle("show");
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
    <td><img src="img/Icon-visible.png" alt="Show" id="show-applications" /></td>
    <td><img src="img/Icon-visible.png" alt="Show" id="show-profile" /></td>
    <td><img src="img/Icon-edit.png" alt="Edit" id="edit" /></td>
    <td><img src="img/Icon-remove.png" alt="Remove" id="remove" /></td>`;
    table.appendChild(row);
    row.querySelector("#show-profile").addEventListener("click", showProfile.bind(candidate));
    row.querySelector("#show-applications").addEventListener("click", showApplications.bind(candidate));
    row.querySelector("#edit").addEventListener("click", editCandidate.bind(candidate));
    row.querySelector("#remove").addEventListener("click", showConfirmModal.bind(candidate));
  })
}

readCandidates();

const modal = document.getElementById("background-modal");
const modalContent = document.getElementById("confirm-modal");
modalContent.querySelector("#no").addEventListener("click", () => {
  modal.classList.toggle("show")
  modalContent.classList.toggle("show");
});