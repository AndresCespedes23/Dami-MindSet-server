window.onload = function() {

  requestInterviews();

  //----- Variables -----//

  const modal = document.getElementById("background-modal");
  const form = document.getElementById("form");
  const createButton = document.getElementById("create-button");
  const confirmCreateButton = document.getElementById("confirm-create-button");
  const confirmUpdateButton = document.getElementById("confirm-update-button");
  const confirmRemoveButton = document.getElementById("confirm-remove-button");
  const cancelButton = document.getElementById("cancel-button");
  const modalTitle = document.getElementById("modal-title");
  const description = document.getElementById("modal-description");

  //----- Event Listeners -----//

  createButton.addEventListener("click", openCreateModal);
  cancelButton.addEventListener("click", closeModal);
  confirmCreateButton.addEventListener("click", requestCreateInterview);

  //----- Modals -----//

  function closeModal() {
    modal.classList.add("hidden");
    form.classList.add("hidden");
    confirmCreateButton.classList.add("hidden");
    confirmUpdateButton.classList.add("hidden");
    confirmRemoveButton.classList.add("hidden");
    description.innerHTML = "";
    clearSelects();
    requestInterviews();
  }

  function openCreateModal() {
    modal.classList.remove("hidden");
    form.classList.remove("hidden");
    confirmCreateButton.classList.remove("hidden");
    modalTitle.innerHTML = "Create Interview";
    description.innerHTML = "Please fill out the form to create a new interview"
    selectCandidate();
    selectClient();
    selectPosition();
    createSelectStatus();
  }

  function openUpdateModal(interview) {
    modal.classList.remove("hidden");
    form.classList.remove("hidden");
    confirmUpdateButton.classList.remove("hidden");
    modalTitle.innerHTML = "Update Interview";
    description.innerHTML = "Please complete the form to update this interview"
    selectCandidate(interview.idCandidate);
    selectClient(interview.idClient);
    selectPosition(interview.idPosition);
    saveDateTime(interview.dateTime);
    createSelectStatus(interview.status);
    confirmUpdateButton.onclick = function() {
      requestUpdateInterview(interview);
    }
  }

  function openRemoveModal(interview) {
    modal.classList.remove("hidden");
    form.classList.add("hidden");
    confirmRemoveButton.classList.remove("hidden");
    modalTitle.innerHTML = "Remove Interview";
    description.innerHTML = "Are you sure you want to remove this interview?"
    confirmRemoveButton.onclick = function() {
      requestRemoveInterview(interview);
    }
  }

  function infoModal(interview) {
    modal.classList.remove("hidden");
    form.classList.add("hidden");
    confirmCreateButton.classList.add("hidden");
    confirmUpdateButton.classList.add("hidden");
    confirmRemoveButton.classList.add("hidden");
    modalTitle.innerHTML = "Interview Information";
    description.innerHTML =
    `<ul>
      <li>Candidate: ${interview.idCandidate}</li>
      <li>Client: ${interview.idClient}</li>
      <li>Position: ${interview.idPosition}</li>
      <li>Data and time: ${interview.dateTime}</li>
      <li>Status: ${interview.status}</li>
    </ul>`;
  }

  function successModal(interview) {
    modal.classList.remove("hidden");
    form.classList.add("hidden");
    confirmCreateButton.classList.add("hidden");
    confirmUpdateButton.classList.add("hidden");
    confirmRemoveButton.classList.add("hidden");
    modalTitle.innerHTML = "Successful Request!";
    description.innerHTML =
    `<ul>
      <li>Candidate: ${interview.idCandidate}</li>
      <li>Client: ${interview.idClient}</li>
      <li>Position: ${interview.idPosition}</li>
      <li>Data and time: ${interview.dateTime}</li>
      <li>Status: ${interview.status}</li>
    </ul>`;
  }

  function errorModal(error) {
    modal.classList.remove("hidden");
    form.classList.add("hidden");
    confirmCreateButton.classList.add("hidden");
    confirmUpdateButton.classList.add("hidden");
    confirmRemoveButton.classList.add("hidden");
    modalTitle.innerHTML = "Failed Request!";
    description.innerHTML = `${error}`;
  }

  //----- Retrieve data from Candidates, Clients & Positions -----//

  function selectCandidate(id) {
    const url = "http://localhost:4000/api/candidates";
    fetch(url)
      .then((res) => {
        if (res.status === 200) return res.json();
        throw new Error(`HTTP ${res.status}`);
      })
      .then((data) => {
        createSelectCandidate(data, id);
      })
      .catch((error) => {
        return error;
      });
  }

  function selectClient(id) {
    const url = "http://localhost:4000/api/clients";
    fetch(url)
      .then((res) => {
        if (res.status === 200) return res.json();
        throw new Error(`HTTP ${res.status}`);
      })
      .then((data) => {
        createSelectClient(data, id);
      })
      .catch((error) => {
        return error;
      });
  }

  function selectPosition(id) {
    const url = "http://localhost:4000/api/positions";
    fetch(url)
      .then((res) => {
        if (res.status === 200) return res.json();
        throw new Error(`HTTP ${res.status}`);
      })
      .then((data) => {
        createSelectPosition(data, id);
      })
      .catch((error) => {
        return error;
      });
  }

  //----- Create selects in form -----//

  function createSelectCandidate(collection, id) {
    const select = document.getElementById("idCandidate");
    select.innerHTML = `<option value="" selected disabled hidden>Select a Candidate</option>`
    collection.forEach((doc) => {
      const option = document.createElement("option");
      option.value = doc._id;
      option.innerHTML = doc.name;
      if (id === doc._id) option.setAttribute("selected","selected");
      select.appendChild(option);
    })
  }

  function createSelectClient(collection, id) {
    const select = document.getElementById("idClient");
    select.innerHTML = `<option value="" selected disabled hidden>Select a Client</option>`
    collection.forEach((doc) => {
      const option = document.createElement("option");
      option.value = doc._id;
      option.innerHTML = doc.name;
      if (id === doc._id) option.setAttribute("selected","selected");
      select.appendChild(option);
    })
  }

  function createSelectPosition(collection, id) {
    const select = document.getElementById("idPosition");
    select.innerHTML = `<option value="" selected disabled hidden>Select a Postion</option>`
    collection.forEach((doc) => {
      const option = document.createElement("option");
      option.value = doc._id;
      option.innerHTML = doc.name;
      if (id === doc._id) option.setAttribute("selected","selected");
      select.appendChild(option);
    })
  }

  function saveDateTime(date) {
    const input = document.getElementById("dateTime");
    const dateTime = date.substring(0,date.length-8);
    input.value = dateTime;
  }

  function createSelectStatus(status) {
    const select = document.getElementById("status");
    select.innerHTML = `<option value="" selected disabled hidden>Select a Status</option>`
    const donde = document.createElement("option");
    donde.innerHTML = "DONE";
    const pending = document.createElement("option");
    pending.innerHTML = "PENDING";
    if (status === "DONE") {
      donde.setAttribute("selected","selected");
    } else {
      pending.setAttribute("selected","selected");
    }
    select.appendChild(donde);
    select.appendChild(pending);
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

  //----- Create rows with data retrieved from Interviews into table -----//

  async function createList(interviews) {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";
    interviews.forEach(async (interview) => {
      let candidate = await getName(interview.idCandidate,"candidates");
      let client = await getName(interview.idClient,"clients");
      let position = await getName(interview.idPosition,"positions");
      let itemList = document.createElement("tr");
      itemList.innerHTML = `<td class="interview" >${interview._id}</td>
        <td>${candidate}</td>
        <td>${client}</td>
        <td>${position}</td>
        <td>${interview.dateTime}</td>
        <td>${interview.status}</td>
        <td><button class="update" class="button-list"><img src="img/Icon-edit.png" alt="Edit"></button></td>
        <td><button class="remove" class="button-list"><img src="img/Icon-remove.png" alt="Remove"/></button>
        </td>`
      tableBody.appendChild(itemList);
      itemList.querySelector(".interview").addEventListener("click", function() {
        infoModal(interview);
      });
      itemList.querySelector(".remove").addEventListener("click", function() {
        openRemoveModal(interview);
      });
      itemList.querySelector(".update").addEventListener("click", function() {
        openUpdateModal(interview);
      });
    })
  }

  //----- Clear select form -----//

  function clearSelects() {
    const selectFormCandidate = document.getElementById("idCandidate");
    const selectFormClient = document.getElementById("idClient");
    const selectFormPosition = document.getElementById("idPosition");
    const selectFormStatus = document.getElementById("status");
    selectFormCandidate.innerHTML = "";
    selectFormClient.innerHTML = "";
    selectFormPosition.innerHTML = "";
    selectFormStatus.innerHTML = "";
  }

  //----- Create -----//

  function requestCreateInterview() {
    let createInterview = {
      idCandidate: document.getElementById("idCandidate").value,
      idClient: document.getElementById("idClient").value,
      idPosition: document.getElementById("idPosition").value,
      dateTime: document.getElementById("dateTime").value,
      status: document.getElementById("status").value
    }
    const url = "http://localhost:4000/api/interviews";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(createInterview),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 201) return res.json();
        throw new Error(JSON.stringify(res.json()));
      })
      .then((data) => {
        successModal(data);
        requestInterviews();
      })
      .catch((error) => {
        errorModal(error);
      });
    }

  //----- Read all -----//

  function requestInterviews() {
    const url = "http://localhost:4000/api/interviews/";
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

  //----- Update -----//

  function requestUpdateInterview(interview) {
    let updateInterview = {
      idCandidate: document.getElementById("idCandidate").value,
      idClient: document.getElementById("idClient").value,
      idPosition: document.getElementById("idPosition").value,
      dateTime: document.getElementById("dateTime").value,
      status: document.getElementById("status").value
    }
    const url = `http://localhost:4000/api/interviews/${interview._id}`;
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(updateInterview),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        throw new Error(JSON.stringify(res.json()));
      })
      .then((data) => {
        successModal(data);
        requestInterviews();
      })
      .catch((error) => {
        errorModal(error);
      });
    }

  //----- Delete -----//

  function requestRemoveInterview(interview) {
    const url = `http://localhost:4000/api/interviews/${interview._id}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        throw new Error(JSON.stringify(res.json()));
      })
      .then((data) => {
        successModal(data);
        requestInterviews();
      })
      .catch((error) => {
        errorModal(error);
      });
  }
}
