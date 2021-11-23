window.onload = function() {

  requestApplications();

  //----- Variables -----//

  const modal = document.getElementById("background-modal");
  const form = document.getElementById("form");
  const title = document.getElementById("modal-title");
  const description = document.getElementById("modal-description");
  const createButton = document.getElementById("create-button");
  const confirmCreateButton = document.getElementById("confirm-create-button");
  const confirmRemoveButton = document.getElementById("confirm-remove-button");
  const cancelButton = document.getElementById("cancel-button");

}

//----- Event Listeners -----//

createButton.addEventListener("click", openCreateModal);
cancelButton.addEventListener("click", closeModal);

//----- Modals -----//

function closeModal() {
  modal.classList.add("hidden");
  form.classList.add("hidden");
  confirmCreateButton.classList.add("hidden");
  confirmRemoveButton.classList.add("hidden");
  description.innerHTML = "";
}

function openCreateModal() {
  modal.classList.remove("hidden");
  form.classList.remove("hidden");
  confirmCreateButton.classList.remove("hidden");
  modalTitle.innerHTML = "Create Application";
  description.innerHTML = "Please fill out the form to create a new application"
}

function openRemoveModal() {
  modal.classList.remove("hidden");
  form.classList.add("hidden");
  confirmRemoveButton.classList.remove("hidden");
  modalTitle.innerHTML = "Remove Interview";
  description.innerHTML = "Are you sure you want to remove this application?"
}

//----- Retrieve names from Candidates, Clients & Positions -----//

async function getName(id, resource) {
  try {
    const res = await fetch(`http://localhost:4000/api/${resource}/${id}`);
    if (res.status === 200) {
      const data = await res.json();
      return data.name;
    }
    throw new Error(`HTTP ${res.status}`);
  } catch (err) {
    console.log(err);
  }
}

//----- Create rows with data retrieved from Applications into table -----//

async function createList(applications) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";
  applications.forEach(async (application) => {
    let position = await getName(application.idPosition,"positions");
    let candidate = await getName(application.idCandidate,"candidates");
    //let interview = await getName(application.idInterview,"interviews");
    let itemList = document.createElement("tr");
    itemList.innerHTML = `<td class="application" >${application._id}</td>
      <td>${position}</td>
      <td>${candidate}</td>
      <td>${application.idInterview}</td>
      <td>${application.dateTime}</td>
      <td>${application.status}</td>
      <td>${application.result}</td>
      <td><button class="remove" class="button-list"><img src="img/Icon-remove.png" alt="Remove"/></button>
      </td>`
    tableBody.appendChild(itemList);
    itemList.querySelector(".application").addEventListener("click", function() {
      infoModal(application);
    });
    itemList.querySelector(".remove").addEventListener("click", function() {
      openRemoveModal(application);
    });
  })
}

//----- Read all -----//

function requestApplications() {
  const url = "http://localhost:4000/api/applications/";
  fetch(url)
    .then((res) => {
      if (res.status === 200) return res.json();
      throw new Error(`HTTP ${res.status}`);
    })
    .then((data) => {
      createList(data);
    })
    .catch((error) => {
      return error;
    });
}