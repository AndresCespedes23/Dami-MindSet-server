window.onload = function () {
  const url = "http://localhost:4000/api/positions/";
  const createButton = document.getElementById("create");
  createButton.addEventListener("click", showCreateModal);
  let flag = true;
  let i = 0;
  fetch(url)
    .then((res) => {
      if (res.status === 200) return res.json();
      throw new Error(`HTTP ${res.status}`);
    })
    .then((data) => {
      positionTable(data);
    })
    .catch((error) => {
      console.log(error);
      // window.location.reload();
    });

    // LIST

  function positionTable(positions) {
    const table = document.getElementById("table-list");
    let i = 0;
    positions.forEach(position => {
      let itemList = document.createElement("tr");
      itemList.innerHTML = `<td class="position-id" >${i+1}</td>
        <td id="idClient">${position.idClient}</td>
        <td id="idProfiles">${position.idProfiles}</td>
        <td id="name">${position.name}</td>
        <td id="description">${position.description}</td>
        <td id="status">${position.status}</td>
        <td id="address">${position.address}</td>
        <td id="city">${position.city}</td>
        <td id="postalCode">${position.postalCode}</td>
        <td><button class="edit" class="button-list"><img src="img/Icon-edit.png" alt="Edit"></button></td>
        <td><button class="remove" class="button-list"><img src="img/Icon-remove.png" alt="Remove"/></button></td>`
      table.appendChild(itemList);
      itemList.querySelector(".position-id").addEventListener("click", function() {
        showId(position);
      });
      let editButton = document.querySelectorAll(".edit");
      editButton[i].addEventListener("click", function() {
        showUpdateModal(position);
      });
      let removeButton = document.querySelectorAll(".remove");
        removeButton[i].addEventListener("click", function() {
          showRemoveModal(position);
          console.log(i);
        });
      i++;
    });
  };

  // GET ID

  function showId(positions) {
    emptyModal();
    let modal = document.getElementById("background-modal");
    modal.classList.remove("hidden");
    const showIdDiv = document.getElementById("showId");
    const updateConfirm = document.querySelectorAll(".update-button");
    updateConfirm[0].style.display = "none";
    const createConfirm = document.querySelectorAll(".create-button");
    createConfirm[0].style.display = "none";
    const removeConfirm = document.querySelectorAll(".remove-button");
    removeConfirm[0].style.display = "none";
    const cancelButton = document.querySelectorAll(".cancel-button");
    cancelButton[0].addEventListener("click", closeModal);
    if (positions) {
      let itemList = document.createElement("p");
      itemList.innerHTML = `id: ${positions._id}<br>
      idClient: ${positions.idClient}<br>
      idProfiles: ${positions.idProfiles}<br>
      name: ${positions.name}<br>
      description: ${positions.description}<br>
      status: ${positions.status}<br>
      address: ${positions.address}<br>
      city: ${positions.city}<br>
      postalCode: ${positions.postalCode}<br>`;
      showIdDiv.appendChild(itemList);
    }
  }

  // UPDATE

  function showUpdateModal(position) {
    emptyModal();
    let modal = document.getElementById("background-modal");
    modal.classList.remove("hidden");
    const form = document.getElementById("form");
    const updateConfirm = document.querySelectorAll(".update-button");
    updateConfirm[0].style.display = "block";
    updateConfirm[0].addEventListener("click", function() {
      confirmUpdate(position);
    });
    const createConfirm = document.querySelectorAll(".create-button");
    createConfirm[0].style.display = "none";
    const removeConfirm = document.querySelectorAll(".remove-button");
    removeConfirm[0].style.display = "none";
    const cancelButton = document.querySelectorAll(".cancel-button");
    cancelButton[0].addEventListener("click", closeModal);
    let createForm = document.createElement("fieldset");
    createForm.innerHTML = "";
    let updateForm = document.createElement("fieldset");
    updateForm.innerHTML = `<h2>Update Position</h2>
    <label for="idClient">idClient</label>
    <input type="text" id="idClientInput" name="idClient" value=${position.idClient} />
    <span id="error1" class="Error-msg"></span>
    <label for="idProfiles">idProfiles</label>
    <input type="text" id="idProfilesInput" name="idProfiles" value=${position.idProfiles} />
    <span id="error2" class="Error-msg"></span>
    <label for="name">Name</label>
    <input type="text" id="nameInput" name="name" value=${position.name} />
    <span id="error3" class="Error-msg"></span>
    <label for="description">Description</label>
    <input type="text" id="descriptionInput" name="description" value=${position.description} />
    <span id="error4" class="Error-msg"></span>
    <label for="status">Status</label>
    <input type="text" id="statusInput" name="status" value=${position.status} />
    <span id="error5" class="Error-msg"></span>
    <label for="address">Address</label>
    <input type="text" id="addressInput" name="address" value=${position.address} />
    <span id="error6" class="Error-msg"></span>
    <label for="city">City</label>
    <input type="text" id="cityInput" name="city" value=${position.city} />
    <span id="error7" class="Error-msg"></span>
    <label for="postalCode">postalCode</label>
    <input type="text" id="postalCodeInput" name="postalCode" value=${position.postalCode} />
    <span id="error8" class="Error-msg"></span>`
    form.appendChild(updateForm);
    if (updateForm) {
      validations();
    }
  };

  function validations() {
    let error1 = document.getElementById("error1");
    let error2 = document.getElementById("error2");
    let error3 = document.getElementById("error3");
    let error4 = document.getElementById("error4");
    let error5 = document.getElementById("error5");
    let error6 = document.getElementById("error6");
    let error7 = document.getElementById("error7");
    let error8 = document.getElementById("error8");
    let idClient  = document.getElementById("idClientInput");
    if (idClient) {
      idClient.addEventListener("blur", function() {
        if (idClient.value.length <= 0) {
          error1.innerHTML = "idClient have an error";
        } else error1.innerHTML = "";
      })
    }
    let idProfile = document.getElementById("idProfileInput");
    if (idProfile) {
      idProfile.addEventListener("blur", function() {
        if (idProfile.value.length <= 0) {
          error2.innerHTML = "idProfile have an error";
        } else error2.innerHTML = "";
      })
    }
    let name = document.getElementById("nameInput");
    if (name) {
      name.addEventListener("blur", function() {
        if (name.value.length <= 0 || name.value.length > 50 || name.value.search(/[0-9]/) !== -1) {
          error3.innerHTML = "Name must have equal or less than 50 characters and must not have numbers";
        } else error3.innerHTML = "";
      })
    }
    let description = document.getElementById("descriptionInput");
    if (description) {
      description.addEventListener("blur", function() {
        if (description.value.length <= 0 || description.value.length > 5000) {
          error4.innerHTML = "Description must have equal or less than 5000 characters";
        } else error4.innerHTML = "";
      })
    }
    let status = document.getElementById("statusInput");
    if (status) {
      status.addEventListener("blur", function() {
        if (status.value.length <= 0 || status.value !== "DONE" && status.value !== "PENDING") {
          error5.innerHTML = "Status must be DONE or PENDING";
        } else error5.innerHTML = "";
      })
    }
    let address = document.getElementById("addressInput");
    if (address) {
      address.addEventListener("blur", function() {
        if (address.value.length <= 0 || address.value.length < 5 || address.value.length > 50
          || address.value.search(/[a-z]/i) < 0
          || address.value.search(/[0-9]/) < 0
          || address.value.indexOf(" ") === -1) {
            error6.innerHTML = "Address must be between 5 and 50 characters & must have letters,"
            + " numbers and at least 1 space";
        } else error6.innerHTML = "";
      })
    }
    let city = document.getElementById("cityInput");
    if (city) {
      city.addEventListener("blur", function() {
        if (city.value.length <= 0 || city.value.length < 3 || city.value.length > 50) {
          error7.innerHTML = "City must have between 3 and 50 characters";
        } else error7.innerHTML = "";
      })
    }
    let postalCode = document.getElementById("postalCodeInput");
    if (postalCode) {
      postalCode.addEventListener("blur", function() {
        if (postalCode.value.length <= 0 || postalCode.value.length < 4 || postalCode.value.length > 8) {
          error8.innetHTML = "Postal Code must have between 4 and 8 characters";
        } else error8.innerHTML = "";
      })
    }
  }

  function confirmUpdate(position) {
    flag = false;
    if (!flag) {
      let updatePosition = {
        idClient: document.querySelector('input[id="idClient"]').value,
        idProfiles: document.querySelector('input[id="idProfiles"]').value,
        name: document.querySelector('input[id="name"]').value,
        description: document.querySelector('input[id="description"]').value,
        status: document.querySelector('input[id="status"]').value,
        address: document.querySelector('input[id="address"]').value,
        city: document.querySelector('input[id="city"]').value,
        postalCode: document.querySelector('input[id="postalCode"]').value
      }
      const url = `http://localhost:4000/api/positions/${position._id}`;
      fetch(url, {
        method: "PUT",
        body: JSON.stringify(updatePosition),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 200) return res.json();
          throw new Error(JSON.stringify(res.json()));
        })
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          return error;
        });
  }
  }

  // REMOVE

  function showRemoveModal(position) {
    emptyModal();
    let modal = document.getElementById("background-modal");
    modal.classList.remove("hidden");
    const removeModal = document.getElementById("remove-div");
    removeModal.innerHTML = `<h2>Remove Position</h2>
    <p>Are you sure ?</p>`;
    const updateConfirm = document.querySelectorAll(".update-button");
    updateConfirm[0].style.display = "none";
    const createConfirm = document.querySelectorAll(".create-button");
    createConfirm[0].style.display = "none";
    const removeConfirm = document.getElementsByClassName("remove-button");
    removeConfirm[0].style.display = "block";
    removeConfirm[0].addEventListener("click", function() {
      confirmRemove(position);
    });
    const cancelButton = document.querySelectorAll(".cancel-button");
    cancelButton[0].addEventListener("click", closeModal);
  }

  function confirmRemove(position) {
    flag = false;
    if (!flag) {
      let url = `http://localhost:4000/api/positions/${position._id}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        throw new Error(`HTTP ${res.status}`);
      })
      .then(() => {
        closeModal();
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
      flag = true;
    }
  }

  // CREATE

  function showCreateModal() {
    emptyModal();
    let modal = document.getElementById("background-modal");
    modal.classList.remove("hidden");
    const form = document.getElementById("form");
    const updateConfirm = document.querySelectorAll(".update-button");
    updateConfirm[0].style.display = "none";
    const createConfirm = document.querySelectorAll(".create-button");
    createConfirm[0].style.display = "block";
    const removeConfirm = document.querySelectorAll(".remove-button");
    removeConfirm[0].style.display = "none";
    const cancelButton = document.querySelectorAll(".cancel-button");
    cancelButton[0].addEventListener("click", closeModal);
    let createForm = document.createElement("fieldset");
    createForm.innerHTML = `<h2>Create Position</h2>
    <label for="idClient">idClient</label>
    <input type="text" id="idClientInput" name="idClient"/>
    <span id="error1" class="Error-msg"></span>
    <label for="idProfile">idProfile</label>
    <input type="text" id="idProfileInput" name="idProfile"/>
    <span id="error2" class="Error-msg"></span>
    <label for="name">Name</label>
    <input type="text" id="nameInput" name="name"/>
    <span id="error3" class="Error-msg"></span>
    <label for="description">Description</label>
    <input type="text" id="descriptionInput" name="description"/>
    <span id="error4" class="Error-msg"></span>
    <label for="status">Status</label>
    <input type="text" id="statusInput" name="status"/>
    <span id="error5" class="Error-msg"></span>
    <label for="address">Address</label>
    <input type="text" id="addressInput" name="address"/>
    <span id="error6" class="Error-msg"></span>
    <label for="city">City</label>
    <input type="text" id="cityInput" name="city"/>
    <span id="error7" class="Error-msg"></span>
    <label for="postalCode">postalCode</label>
    <input type="text" id="postalCodeInput" name="postalCode" />
    <span id="error8" class="Error-msg"></span>`
    form.appendChild(createForm);
    let error1 = document.getElementById("error1");
    let error2 = document.getElementById("error2");
    let error3 = document.getElementById("error3");
    let error4 = document.getElementById("error4");
    let error5 = document.getElementById("error5");
    let error6 = document.getElementById("error6");
    let error7 = document.getElementById("error7");
    let error8 = document.getElementById("error8");
    let idClient  = document.getElementById("idClientInput");
    idClient.addEventListener("blur", function() {
      if (idClient.value.length <= 0) {
        error1.innerHTML = "idClient have an error";
      } else error1.innerHTML = "";
    })
    let idProfile = document.getElementById("idProfileInput");
    idProfile.addEventListener("blur", function() {
      if (idProfile.value.length <= 0) {
        error2.innerHTML = "idProfile have an error";
      } else error2.innerHTML = "";
    })
    let name = document.getElementById("nameInput");
    name.addEventListener("blur", function() {
      if (name.value.length <= 0 || name.value.length > 50 || name.value.search(/[0-9]/) !== -1) {
        error3.innerHTML = "Name must have equal or less than 50 characters and must not have numbers";
      } else error3.innerHTML = "";
    })
    let description = document.getElementById("descriptionInput");
    description.addEventListener("blur", function() {
      if (description.value.length <= 0 || description.value.length > 5000) {
        error4.innerHTML = "Description must have equal or less than 5000 characters";
      } else error4.innerHTML = "";
    })
    let status = document.getElementById("statusInput");
    status.addEventListener("blur", function() {
      if (status.value.length <= 0 || status.value !== "DONE" && status.value !== "PENDING") {
        error5.innerHTML = "Status must be DONE or PENDING";
      } else error5.innerHTML = "";
    })
    let address = document.getElementById("addressInput");
    address.addEventListener("blur", function() {
      if (address.value.length <= 0 || address.value.length < 5 || address.value.length > 50
        || address.value.search(/[a-z]/i) < 0
        || address.value.search(/[0-9]/) < 0
        || address.value.indexOf(" ") === -1) {
          error6.innerHTML = "Address must be between 5 and 50 characters & must have letters,"
          + " numbers and at least 1 space";
      } else error6.innerHTML = "";
    })
    let city = document.getElementById("cityInput");
    city.addEventListener("blur", function() {
      if (city.value.length <= 0 || city.value.length < 3 || city.value.length > 50) {
        error7.innerHTML = "City must have between 3 and 50 characters";
      } else error7.innerHTML = "";
    })
    let postalCode = document.getElementById("postalCodeInput");
    postalCode.addEventListener("blur", function() {
      if (postalCode.value.length <= 0 || postalCode.value.length < 4 || postalCode.value.length > 8) {
        error8.innetHTML = "Postal Code must have between 4 and 8 characters";
      } else error8.innerHTML = "";
    })
    createConfirm[0].addEventListener("click", sendCreate);
  }

  function sendCreate() {
    let createPosition = {
      idClient : document.querySelector('input[id="idClient"]').value,
      idProfile : [document.getElementById("idProfile").value],
      name: document.querySelector('input[id="name"]').value,
      description: document.querySelector('input[id="description"]').value,
      status: document.querySelector('input[id="status"]').value,
      address: document.querySelector('input[id="address"]').value,
      city: document.querySelector('input[id="city"]').value,
      postalCode: document.querySelector('input[id="postalCode"]').value
    }
    const url = "http://localhost:4000/api/positions";
      fetch(url, {
        method: "POST",
        body: JSON.stringify(createPosition),
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
          window.location.reload();
        })
        .catch((error) => {
          return error;
        });
  }

  // EMPTY MODAL & CLOSE MODAL-

  function emptyModal() {
    let form = document.getElementById("form");
    form.innerHTML = "";
    let showId = document.getElementById("showId");
    showId.innerHTML = "";
    const removeModal = document.getElementById("remove-div");
    removeModal.innerHTML = "";
  }

  function closeModal() {
    let hideModal = document.getElementById("background-modal");
    hideModal.classList.add("hidden");
  };
}