const backgroundModal = document.getElementById("background-modal");

// const updateModal = document.getElementById("update-modal");
// const confirmUpdateButton = document.getElementById("confirm-update-button");
// confirmUpdateButton.addEventListener("click", reqUpdateClient);

//createButton.disabled = true; //disable the button until the page is completely loaded.
readPsy();

// CREATE *******************************************************
const dataForm = document.querySelectorAll("#create-form input");

const name = document.getElementById("name");
const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");
const phoneNumber = document.getElementById("phoneNumber");
const enrollmentNumber = document.getElementById("enrollmentNumber");
const status = document.getElementById("status");
const timeRange = document.getElementById("timeRange");
const dayRange = document.getElementById("dayRange");

const createButton = document.getElementById("create-button");
const createModal = document.getElementById("create-modal");
const cancelCreateButton = document.getElementById("cancel-create-button");
const createConfirmButton = document.getElementById("create-confirm-button");

createButton.addEventListener("click", openCreateModal);
cancelCreateButton.addEventListener("click", cancelCreate);
createConfirmButton.addEventListener("click", reqCreate);

function openCreateModal() {
  backgroundModal.classList.toggle("hide", false);
  createModal.classList.toggle("hide", false);
  createConfirmButton.classList.toggle("hide", false);
}
function cancelCreate() {
  backgroundModal.classList.toggle("hide", true);
  createModal.classList.toggle("hide", true);
  createConfirmButton.classList.toggle("hide", true);
}

function reqCreate(e) {
  e.preventDefault()
  if (!name.value) return res.status(400).json({ msg: "Name is missing" });
  if (!email.value) return res.status(400).json({ msg: "Email is missing" });
  if (!username.value) return res.status(400).json({ msg: "Username is missing" });
  if (!password.value) return res.status(400).json({ msg: "Password is missing" });
  if (!phoneNumber.value) return res.status(400).json({ msg: "PhoneNumber is missing" });
  if (!enrollmentNumber.value) return res.status(400).json({ msg: "EnrollmentNumber is missing" });
  if (!status.value) return res.status(400).json({ msg: "Status is missing" });
  if (!timeRange.value) return res.status(400).json({ msg: "TimeRange is missing" });
  if (!dayRange.value) return res.status(400).json({ msg: "DayRange is missing" });

  const dataForm = document.querySelectorAll("#create-form input");
  let dataBody = {
    name: dataForm[0].value,
    email: dataForm[1].value,
    username: dataForm[2].value,
    password: dataForm[3].value,
    phoneNumber: dataForm[4].value,
    enrollmentNumber: dataForm[5].value,
    status: dataForm[6].value,
    timeRange: dataForm[7].value,
    dayRange: dataForm[8].value,
  };
  const url = "http://localhost:4000/api/psychologists/";
  fetch(url, {
    method: "POST",
    body: JSON.stringify(dataBody),
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((res) => {
    if (res.status === 201) return res.json();
    throw new Error(`HTTP ${res.status}`);
  })
  .then((data) => {
    createModal.classList.toggle("hide", true);
    location.reload(); //CAMBIAR POR createList cuando pueda hacerlo
  })
  .catch((error) => {
    console.log(error);
  });
}

// READ PSYS **************************************************************
function readPsy() {
  const url = "http://localhost:4000/api/psychologists/";
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
function createList(psys) {
  const table = document.getElementById("table-list");
  let i = 0;
  psys.forEach((psy) => {
    const itemList = document.createElement("tr");
    itemList.id = "item-" + i;
    itemList.innerHTML = `<td>${psy._id}</td>
      <td>${psy.name}</td>
      <td>${psy.email}</td>
      <td>${psy.username}</td>
      <td>${psy.password}</td>
      <td>${psy.phoneNumber}</td>
      <td>${psy.enrollmentNumber}</td>
      <td>${psy.status}</td>
      <td>${psy.timeRange}</td>
      <td>${psy.dayRange}</td>
      <td><button class="button-list" onclick="openUpdateModal(${i})"><img src="img/Icon-edit.png" alt="Edit"></button></td>
      <td><button class="button-list" onclick="deletePsychologist(${i})"><img src="img/Icon-remove.png" alt="Remove"/></button>
      </td>`;
    table.appendChild(itemList);
    i++;
  });
  createButton.disabled = false;
}

// UPDATE CLIENTS********************************************************
function openUpdateModal(index) {
  updateModal.classList.toggle("hide", false);

  const dataForm = document.querySelectorAll("#update-form input");
  let contentItem = document.getElementById(`item-${index}`).firstChild;
  for (let i = 0; i < dataForm.length; i++) {
    dataForm[i].value = contentItem.innerText;
    contentItem = contentItem.nextElementSibling;
  }
}

function reqUpdateClient(e) {
  e.preventDefault();

  //validate all again
  // validateName();
  // validateEmail();
  // validatePhoneNumber();
  // validateCuit();
  // validateAddress();
  // validateActivity();

  const dataForm = document.querySelectorAll("#update-form input");
  let dataBody = {
    name: dataForm[1].value,
    email: dataForm[2].value,
    phoneNumber: dataForm[3].value,
    cuit: dataForm[4].value,
    address: dataForm[5].value,
    activity: dataForm[6].value,
  };
  const idPsy = dataForm[0].value; //this field is hidden in the modalUpdate
  const url = "http://localhost:4000/api/psychologists/" + idPsy;
  fetch(url, {
    method: "PUT",
    body: JSON.stringify(dataBody),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status === 200) return res.json();
      throw new Error(`HTTP ${res.status}`);
    })
    .then((data) => {
      updateModal.classList.toggle("hide", true);
      // location.reload();  //CAMBIAR POR createList cuando pueda hacerlo
    })
    .catch((error) => {
      console.log(error);
    });
}

// DELETE CLIENTS***************************************************
function deleteClient(index) {
  const itemToDelete = document.getElementById(`item-${index}`);
  const idPsy = itemToDelete.firstElementChild.innerText;

  const url = "http://localhost:4000/api/psychologists/" + idPsy;
  fetch(url, {
    method: "DELETE",
  })
  .then((res) => {
    if (res.status === 200) return res.json();
    throw new Error(`HTTP ${res.status}`);
  })
  .then(() => {
    location.reload(); //CAMBIAR POR createList cuando pueda hacerlo
  })
  .catch((error) => {
    console.log(error);
  });
}