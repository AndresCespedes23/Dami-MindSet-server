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
  }

  function openUpdateModal(interview) {
    modal.classList.remove("hidden");
    form.classList.remove("hidden");
    confirmUpdateButton.classList.remove("hidden");
    modalTitle.innerHTML = "Update Interview";
    description.innerHTML = "Please complete the form to update this interview"
    selectCandidate();
    selectClient();
    selectPosition();
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
      <li>Positino: ${interview.idPosition}</li>
      <li>Data and time: ${interview.dateTime}</li>
      <li>Status: ${interview.status}</li>
    </ul>`;
  }

  //----- Retrieve data from Candidates, Clients & Positions -----//

  function selectCandidate() {
    const url = "http://localhost:4000/api/candidates";
    fetch(url)
      .then((res) => {
        if (res.status === 200) return res.json();
        throw new Error(`HTTP ${res.status}`);
      })
      .then((data) => {
        createSelectCandidate(data);
      })
      .catch((error) => {
        return error;
      });
  }

  function selectClient() {
    const url = "http://localhost:4000/api/clients";
    fetch(url)
      .then((res) => {
        if (res.status === 200) return res.json();
        throw new Error(`HTTP ${res.status}`);
      })
      .then((data) => {
        createSelectClient(data);
      })
      .catch((error) => {
        return error;
      });
  }

  function selectPosition() {
    const url = "http://localhost:4000/api/positions";
    fetch(url)
      .then((res) => {
        if (res.status === 200) return res.json();
        throw new Error(`HTTP ${res.status}`);
      })
      .then((data) => {
        createSelectPosition(data);
      })
      .catch((error) => {
        return error;
      });
  }

  //----- Create selects in form -----//

  function createSelectCandidate(collection) {
    const select = document.getElementById("idCandidate");
    collection.forEach((doc) => {
      const option = document.createElement("option");
      option.value = doc._id;
      option.innerHTML = doc.name;
      select.appendChild(option);
    })
  }

  function createSelectClient(collection) {
    const select = document.getElementById("idClient");
    collection.forEach((doc) => {
      const option = document.createElement("option");
      option.value = doc._id;
      option.innerHTML = doc.name;
      select.appendChild(option);
    })
  }

  function createSelectPosition(collection) {
    const select = document.getElementById("idPosition");
    collection.forEach((doc) => {
      const option = document.createElement("option");
      option.value = doc._id;
      option.innerHTML = doc.name;
      select.appendChild(option);
    })
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

  function createList(interviews) {
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
      .then(() => {
        closeModal();
        requestInterviews();
      })
      .catch((error) => {
        return error;
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
      .then(() => {
        closeModal();
        requestInterviews();
      })
      .catch((error) => {
        return error;
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
      .then(() => {
        closeModal();
        requestInterviews();
      })
      .catch((error) => {
        return error;
      });
  }
}
