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

function openEditForm(candidate) {
  console.log(candidate.education)
  const form = createEditModal.querySelector("form");
  modal.classList.toggle("show");
  createEditModal.classList.toggle("show");
  createEditModal.querySelector("#confirm-button").onclick = function(){
    const data = {
      personalInfo: {
        name: form.querySelector("#name").value,
        email: form.querySelector("#email").value,
        username: form.querySelector("#username").value,
        password: form.querySelector("#password").value,
        gender: form.querySelector("#gender").value,
        address: form.querySelector("#address").value,
        phoneNumber: form.querySelector("#phoneNumber").value,
        dateOfBirth: form.querySelector("#dateOfBirth").value,
        zipCode: form.querySelector("#zipCode").value,
        city: form.querySelector("#city").value,
        state: form.querySelector("#state").value,
        country: form.querySelector("#country").value,
        dni: form.querySelector("#dni").value,
        status: form.querySelector("#status").value
      },
      education: [
        {
          level: form.querySelector("#level").value,
          institution: form.querySelector("#institution").value,
          title: form.querySelector("#title").value,
          startDate: form.querySelector("#startDate").value,
          finishDate: form.querySelector("#finishDate").value,
          inProgress: form.querySelector("#inProgress").value,
          _id: candidate.education._id
        }
      ],
      workExperience: [
        {
          company: form.querySelector("#company").value,
          role: form.querySelector("#role").value,
          startDate: form.querySelector("#startDate").value,
          finishDate: form.querySelector("#finishDate").value,
          inProgress: form.querySelector("#inProgress").value,
          _id: candidate.workExperience._id
        }
      ],
    }
    modal.classList.toggle("show");
    createEditModal.classList.toggle("show");
    wipeTable();
    editCandidate(candidate);
  };
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
    <td><img src="img/Icon-edit.png" alt="Edit" class="edit" /></td>
    <td><img src="img/Icon-remove.png" alt="Remove" class="remove" /></td>`;
    table.appendChild(row);
    row.querySelector(".show-profile").addEventListener("click", () => showProfile(candidate));
    row.querySelector(".show-applications").addEventListener("click", () => showApplications(candidate));
    row.querySelector(".edit").addEventListener("click", () => openEditForm(candidate));
    row.querySelector(".remove").addEventListener("click", () => showConfirmModal(candidate));
  })
}

readCandidates();

const modal = document.getElementById("background-modal");
const confirmModal = document.getElementById("confirm-modal");
const createEditModal = document.getElementById("create-modal");
createEditModal.querySelector("#cancel-button").addEventListener("click", () => {
  modal.classList.toggle("show")
  createEditModal.classList.toggle("show");
});
confirmModal.querySelector("#no").addEventListener("click", () => {
  modal.classList.toggle("show")
  confirmModal.classList.toggle("show");
});