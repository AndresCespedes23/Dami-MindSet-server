window.onload = function() {

  requestInterviews();

  const modal = document.getElementById("background-modal");
  const form = document.getElementById("form");
  const createButton = document.getElementById("create-button");
  const confirmCreateButton = document.getElementById("confirm-create-button");
  const confirmUpdateButton = document.getElementById("confirm-update-button");
  const confirmRemoveButton = document.getElementById("confirm-remove-button");
  const cancelButton = document.getElementById("cancel-button");
  const modalTitle = document.getElementById("modal-title");

  createButton.addEventListener("click", openCreateModal);
  cancelButton.addEventListener("click", closeModal);
  confirmCreateButton.addEventListener("click", requestCreateInterview);

  function closeModal() {
    modal.classList.add("hidden");
    form.classList.add("hidden");
    confirmCreateButton.classList.add("hidden");
    confirmUpdateButton.classList.add("hidden");
    confirmRemoveButton.classList.add("hidden");
  }

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

  //----- CREATE -----//

  function openCreateModal() {
    modal.classList.remove("hidden");
    form.classList.remove("hidden");
    confirmCreateButton.classList.remove("hidden");
    modalTitle.innerHTML = "Create Interview";
    selectCandidate();
    selectClient();
    selectPosition();
  }

  function requestCreateInterview() {
    let interview = {
      idCandidate: document.getElementById("idCandidate").value,
      idClient: document.getElementById("idClient").value,
      idPosition: document.getElementById("idPosition").value,
      dateTime: document.getElementById("dateTime").value,
      status: document.getElementById("status").value
    }
    const url = "http://localhost:4000/api/interviews";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(interview),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 201) return res.json();
        throw new Error(JSON.stringify(res.json()));
      })
      .then(() => {
        modal.classList.add("hidden");
        form.classList.add("hidden");
        confirmCreateButton.classList.add("hidden");
        requestInterviews();
      })
      .catch((error) => {
        return error;
      });
    }

  //----- READ -----//

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

  function createList(interviews) {
    const table = document.getElementById("table-list");
    interviews.forEach((interview) => {
      let itemList = document.createElement("tr");
      itemList.innerHTML = `<td>${interview._id}</td>
        <td>${interview.idCandidate}</td>
        <td>${interview.idClient}</td>
        <td>${interview.idPosition}</td>
        <td>${interview.dateTime}</td>
        <td>${interview.status}</td>
        <td><button class="update" class="button-list"><img src="img/Icon-edit.png" alt="Edit"></button></td>
        <td><button class="remove" class="button-list"><img src="img/Icon-remove.png" alt="Remove"/></button>
        </td>`
      table.appendChild(itemList);
      itemList.querySelector(".remove").addEventListener("click", function() {
        openRemoveModal(interview);
      });
      itemList.querySelector(".update").addEventListener("click", function() {
        openUpdateModal(interview);
      });
    })
  }

  //----- UPDATE -----//

  function openUpdateModal(interview) {
    modal.classList.remove("hidden");
    form.classList.remove("hidden");
    confirmUpdateButton.classList.remove("hidden");
    modalTitle.innerHTML = "Update Interview";
    selectCandidate();
    selectClient();
    selectPosition();
    confirmUpdateButton.onclick = function() {
      requestUpdateInterview(interview);
    }
  }

  //----- DELETE -----//

  function openRemoveModal(interview) {
    modal.classList.remove("hidden");
    form.classList.add("hidden");
    confirmRemoveButton.classList.remove("hidden");
    modalTitle.innerHTML = "Remove Interview";
    confirmRemoveButton.onclick = function() {
      requestRemoveInterview(interview);
    }
  }

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
        modal.classList.add("hidden");
        form.classList.add("hidden");
        confirmRemoveButton.classList.add("hidden");
        requestInterviews();
      })
      .catch((error) => {
        return error;
      });
  }
}
