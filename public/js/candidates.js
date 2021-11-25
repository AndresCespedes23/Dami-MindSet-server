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

const checkCheckbox = (array, value) => {
  return array.includes(value)? "checked":""
}

const parseEducation = (candidate) => {
  let string = "";
  candidate.education.forEach(element => {
    string += `
    <div class="fieldset-container">
      <fieldset>
        <label for="level">Level</label>
        <input type="text" id="level" name="level" value="${element.level}"/>
        <span id="Error14" class="Error-msg">Error</span>
      </fieldset>
      <fieldset>
        <label for="institution">Institution</label>
        <input type="text" id="institution" name="institution" value="${element.institution}"/>
        <span id="Error15" class="Error-msg">Error</span>
      </fieldset>
      <fieldset>
        <label for="title">Title</label>
        <input type="text" name="title" value="${element.title}"/>
        <span id="Error16" class="Error-msg">Error</span>
      </fieldset>
      <fieldset>
        <label for="startDate">Starting Date</label>
        <input type="date" name="startDate" value="${formatDate(element.startDate)}"/>
        <span id="Error17" class="Error-msg">Error</span>
      </fieldset>
      <fieldset>
        <label for="finishDate">Finishing Date</label>
        <input type="date" name="finishDate" value="${formatDate(element.finishDate)}"/>
        <span id="Error18" class="Error-msg">Error</span>
      </fieldset>
      <fieldset>
        <label for="inProgress">
        <input type="checkbox" name="inProgress" value="inProgress" ${element.inProgress? "checked":""}/>Not Finished
        </label>
      </fieldset>
      <button type="button" class="remove-education"><img src="img/Icon-remove.png"></button>
    </div>
  `
  });
  return string;
}

const parseWorkExperience = (candidate) => {
  let string = "";
  candidate.workExperience.forEach(element => {
    string += `
    <div class="fieldset-container">
      <fieldset>
        <label for="company">Company</label>
        <input type="text" id="company" name="company" value="${element.company}"/>
        <span id="Error19" class="Error-msg">Error</span>
      </fieldset>
      <fieldset>
        <label for="role">Role</label>
        <input type="text" id="role" name="role" value="${element.role}"/>
        <span id="Error20" class="Error-msg">Error</span>
      </fieldset>
      <fieldset>
        <label for="startDate">Starting Date</label>
        <input type="date" id="startDate" name="startDate" value="${formatDate(element.startDate)}"/>
        <span id="Error22" class="Error-msg">Error</span>
      </fieldset>
      <fieldset>
        <label for="finishDate">Finishing Date</label>
        <input type="date" id="finishDate" name="finishDate" value="${formatDate(element.finishDate)}"/>
        <span id="Error23" class="Error-msg">Error</span>
      </fieldset>
      <fieldset>
        <label for="inProgress">
        <input type="checkbox" id="inProgress" name="inProgress" value="inProgress" ${element.currently? "checked":""}/>Current Work
        </label>
      </fieldset>
      <button type="button" class="remove-work-experience"><img src="img/Icon-remove.png"></button>
    </div>
  `
  });
  return string;
}

function addEducation() {
  const fieldsetContainer = document.getElementById("education-fieldset");
  const addBtn = document.getElementById("add-education");
  const div = document.createElement("div");
  div.classList.add("fieldset-container");
  div.innerHTML =
  `
  <fieldset>
    <label for="level">Level</label>
    <input type="text" id="level" name="level"/>
    <span id="Error14" class="Error-msg">Error</span>
  </fieldset>
  <fieldset>
    <label for="institution">Institution</label>
    <input type="text" id="institution" name="institution"/>
    <span id="Error15" class="Error-msg">Error</span>
  </fieldset>
  <fieldset>
    <label for="title">Title</label>
    <input type="text" name="title"/>
    <span id="Error16" class="Error-msg">Error</span>
  </fieldset>
  <fieldset>
    <label for="startDate">Starting Date</label>
    <input type="date" name="startDate"/>
    <span id="Error17" class="Error-msg">Error</span>
  </fieldset>
  <fieldset>
    <label for="finishDate">Finishing Date</label>
    <input type="date" name="finishDate"/>
    <span id="Error18" class="Error-msg">Error</span>
  </fieldset>
  <fieldset>
    <label for="inProgress">
    <input type="checkbox" name="inProgress" value="inProgress"}/>Not Finished
    </label>
  </fieldset>
  <button type="button" class="remove-education"><img src="img/Icon-remove.png"></button>
  `;
  fieldsetContainer.insertBefore(div,addBtn);
  div.querySelector(".remove-education").addEventListener("click", removeEducation)
}

function removeEducation() {
  this.parentNode.remove();
}

function addWorkExperience() {
  const fieldsetContainer = document.getElementById("work-experience-fieldset");
  const addBtn = document.getElementById("add-work-experience");
  const div = document.createElement("div");
  div.classList.add("fieldset-container");
  div.innerHTML =
  `
  <fieldset>
    <label for="company">Company</label>
    <input type="text" id="company" name="company"/>
    <span id="Error19" class="Error-msg">Error</span>
  </fieldset>
  <fieldset>
    <label for="role">Role</label>
    <input type="text" id="role" name="role"/>
    <span id="Error20" class="Error-msg">Error</span>
  </fieldset>
  <fieldset>
    <label for="startDate">Starting Date</label>
    <input type="date" id="startDate" name="startDate"/>
    <span id="Error22" class="Error-msg">Error</span>
  </fieldset>
  <fieldset>
    <label for="finishDate">Finishing Date</label>
    <input type="date" id="finishDate" name="finishDate"/>
    <span id="Error23" class="Error-msg">Error</span>
  </fieldset>
  <fieldset>
    <label for="inProgress">
    <input type="checkbox" id="inProgress" name="inProgress" value="inProgress"}/>Current Work
    </label>
  </fieldset>
  <button type="button" class="remove-work-experience"><img src="img/Icon-remove.png"></button>
  `;
  fieldsetContainer.insertBefore(div,addBtn);
  div.querySelector(".remove-work-experience").addEventListener("click", removeWorkExperience)
}

function removeWorkExperience() {
  this.parentNode.remove();
}

const updateForm = (candidate) => {
  const birthDate = formatDate(candidate.dateOfBirth);
  const form = document.getElementById("form");
  document.getElementById("form-header").textContent = "Update Candidate"
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
    <label for="7"><input type="checkbox" id="7" name="timeRange" value="7" ${checkCheckbox(candidate.timeRange, 7)} />7</label>
    <label for="8"><input type="checkbox" id="8" name="timeRange" value="8" ${checkCheckbox(candidate.timeRange, 8)}/>8</label>
    <label for="9"><input type="checkbox" id="9" name="timeRange" value="9" ${checkCheckbox(candidate.timeRange, 9)}/>9</label>
    <label for="10"><input type="checkbox" id="10" name="timeRange" value="10" ${checkCheckbox(candidate.timeRange, 10)}/>10</label>
    <label for="11"><input type="checkbox" id="11" name="timeRange" value="11" ${checkCheckbox(candidate.timeRange, 11)}/>11</label>
    <label for="12"><input type="checkbox" id="12" name="timeRange" value="12" ${checkCheckbox(candidate.timeRange, 12)}/>12</label>
    <label for="13"><input type="checkbox" id="13" name="timeRange" value="13" ${checkCheckbox(candidate.timeRange, 13)}/>13</label>
    <label for="14"><input type="checkbox" id="14" name="timeRange" value="14" ${checkCheckbox(candidate.timeRange, 14)}/>14</label>
    <label for="15"><input type="checkbox" id="15" name="timeRange" value="15" ${checkCheckbox(candidate.timeRange, 15)}/>15</label>
    <label for="16"><input type="checkbox" id="16" name="timeRange" value="16" ${checkCheckbox(candidate.timeRange, 16)}/>16</label>
    <label for="17"><input type="checkbox" id="17" name="timeRange" value="17" ${checkCheckbox(candidate.timeRange, 17)}/>17</label>
    <label for="18"><input type="checkbox" id="18" name="timeRange" value="18" ${checkCheckbox(candidate.timeRange, 18)}/>18</label>
    <label for="19"><input type="checkbox" id="19" name="timeRange" value="19" ${checkCheckbox(candidate.timeRange, 19)}/>19</label>
  </fieldset>
  <fieldset>
    <label for="Profiles">Profiles</label>
    <label for="administrative"><input type="checkbox" id="administrative" name="profiles" value="Administrative" ${checkCheckbox(candidate.profiles, "Administrative")}/>Adminsitrative</label>
    <label for="Industrial Assembly"><input type="checkbox" id="Industrial Assembly" name="profiles" value="Industrial Assembly" ${checkCheckbox(candidate.profiles, "Industrial Assembly")}/>Industrial Assembly</label>
    <label for="Customer Service"><input type="checkbox" id="Customer Service" name="profiles" value="Customer Service" ${checkCheckbox(candidate.profiles, "Customer Service")}/>Customer Service</label>
    <label for="Treasury"><input type="checkbox" id="Treasury" name="profiles" value="Treasury" ${checkCheckbox(candidate.profiles, "Treasury")}/>Treasury</label>
  </fieldset>
  <h3>Education</h3>
  <div id="education-fieldset">
    ${parseEducation(candidate)}
    <button type="button" id="add-education"><img src="img/Icon-add.png"></button>
  </div>
  <h3>Work Experience</h3>
  <div id="work-experience-fieldset">
    ${parseWorkExperience(candidate)}
    <button type="button" id="add-work-experience"><img src="img/Icon-add.png"></button>
  </div>
  `;
  const addEducationBtn = document.getElementById("add-education");
  addEducationBtn.addEventListener("click", addEducation);
  const addWorkExpBtn = document.getElementById("add-work-experience");
  addWorkExpBtn.addEventListener("click", addWorkExperience);
  const removeEducationBtns = document.getElementsByClassName("remove-education");
  Array.from(removeEducationBtns).forEach(button => {
    button.addEventListener("click", removeEducation);
  })
  const removeWorkExpBtns = document.getElementsByClassName("remove-work-experience");
  Array.from(removeWorkExpBtns).forEach(button => {
    button.addEventListener("click", removeWorkExperience);
  })
  return form;
}

const createForm = () => {
  const form = document.getElementById("form");
  document.getElementById("form-header").textContent = "Create Candidate"
  form.innerHTML =
  `
  <fieldset>
    <label for="name">Name</label>
    <input
    type="text"
    id="name"
    name="name"
    />
    <span id="Error1" class="Error-msg">Error</span>
  </fieldset>
  <fieldset>
    <label for="email">Email</label>
    <input
    type="text"
    id="email"
    name="email"
    />
    <span id="Error2" class="Error-msg">Error</span>
  </fieldset>
  <fieldset>
    <label for="username">Username</label>
    <input
    type="text"
    id="username"
    name="username"
    />
    <span id="Error3" class="Error-msg">Error</span>
  </fieldset>
  <fieldset>
    <label for="password">Password</label>
    <input
    type="password"
    id="password"
    name="password"
    />
    <span id="Error4" class="Error-msg">Error</span>
  </fieldset>
  <fieldset>
    <label for="gender">Gender</label>
    <input type="text" id="gender" name="gender" />
    <span id="Error5" class="Error-msg">Error</span>
  </fieldset>
  <fieldset>
    <label for="address">Address</label>
    <input type="text" id="address" name="address" />
    <span id="Error6" class="Error-msg">Error</span>
  </fieldset>
  <fieldset>
    <label for="phoneNumber">Phone Number</label>
    <input type="tel" id="phoneNumber" name="phoneNumber" />
    <span id="Error7" class="Error-msg">Error</span>
  </fieldset>
  <fieldset>
    <label for="dateOfBirth">Birth Date</label>
    <input
    type="date"
    id="dateOfBirth"
    name="dateOfBirth" />
    <span id="Error8" class="Error-msg">Error</span>
  </fieldset>
  <fieldset>
    <label for="zipCode">Zipcode</label>
    <input type="text" id="zipCode" name="zipCode" />
    <span id="Error9" class="Error-msg">Error</span>
  </fieldset>
  <fieldset>
    <label for="city">City</label>
    <input type="text" id="city" name="city" />
    <span id="Error10" class="Error-msg">Error</span>
  </fieldset>
  <fieldset>
    <label for="state">State</label>
    <input type="text" id="state" name="state" />
    <span id="Error11" class="Error-msg">Error</span>
  </fieldset>
  <fieldset>
    <label for="country">Country</label>
    <input type="text" id="country" name="country" />
    <span id="Error12" class="Error-msg">Error</span>
  </fieldset>
  <fieldset>
    <label for="dni">DNI</label>
    <input type="text" id="dni" name="dni" />
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
  <fieldset>
    <label for="Profiles">Profiles</label>
    <label for="administrative"><input type="checkbox" id="administrative" name="profiles" value="Administrative" />Adminsitrative</label>
    <label for="Industrial Assembly"><input type="checkbox" id="Industrial Assembly" name="profiles" value="Industrial Assembly" />Industrial Assembly</label>
    <label for="Customer Service"><input type="checkbox" id="Customer Service" name="profiles" value="Customer Service" />Customer Service</label>
    <label for="Treasury"><input type="checkbox" id="Treasury" name="profiles" value="Treasury" />Treasury</label>
  </fieldset>
  <h3>Education</h3>
  <div id="education-fieldset">
    <button type="button" id="add-education"><img src="img/Icon-add.png"></button>
  </div>
  <h3>Work Experience</h3>
  <div id="work-experience-fieldset">
    <button type="button" id="add-work-experience"><img src="img/Icon-add.png"></button>
  </div>
  `;
  const addEducationBtn = document.getElementById("add-education");
  addEducationBtn.addEventListener("click", addEducation);
  const addWorkExpBtn = document.getElementById("add-work-experience");
  addWorkExpBtn.addEventListener("click", addWorkExperience);
  const removeEducationBtns = document.getElementsByClassName("remove-education");
  Array.from(removeEducationBtns).forEach(button => {
    button.addEventListener("click", removeEducation);
  })
  const removeWorkExpBtns = document.getElementsByClassName("remove-work-experience");
  Array.from(removeWorkExpBtns).forEach(button => {
    button.addEventListener("click", removeWorkExperience);
  })
  return form;
}

function retrieveUpdateFormData() {
  const form = document.getElementById("form");
  const object = {
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
    timeRange: [],
    profiles: [],
    education: [],
    workExperience: [],
  }
  const timeRangeBoxes = form.querySelectorAll("[name=timeRange]");
  timeRangeBoxes.forEach(checkbox => {
    if (checkbox.checked) object.timeRange.push(parseInt(checkbox.value))
  })
  const profilesBoxes = form.querySelectorAll("[name=profiles]");
  profilesBoxes.forEach(checkbox => {
    if (checkbox.checked) object.profiles.push(checkbox.value)
  })
  const educationFieldset = form.querySelector("#education-fieldset");
  educationFieldset.querySelectorAll(".fieldset-container").forEach(fieldset => {
    educationObject = {
      level: fieldset.querySelector("[name=level]").value,
      institution: fieldset.querySelector("[name=institution]").value,
      title: fieldset.querySelector("[name=title]").value,
      startDate: new Date(fieldset.querySelector("[name=startDate]").value),
      finishDate: new Date(fieldset.querySelector("[name=finishDate]").value),
      inProgress: fieldset.querySelector("[name=inProgress]").checked? true:false
    }
    object.education.push(educationObject);
  })
  const workExperienceFieldset = form.querySelector("#work-experience-fieldset");
  workExperienceFieldset.querySelectorAll(".fieldset-container").forEach(fieldset => {
    workExperienceObject = {
      company: fieldset.querySelector("[name=company]").value,
      role: fieldset.querySelector("[name=role]").value,
      startDate: new Date(fieldset.querySelector("[name=startDate]").value),
      finishDate: new Date(fieldset.querySelector("[name=finishDate]").value),
      currently: fieldset.querySelector("[name=inProgress]").checked? true:false
    }
    object.workExperience.push(workExperienceObject);
  })
  return object;
}

function retrieveCreateFormData() {
  const form = document.getElementById("form");
  const object = {
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
    timeRange: [],
    profiles: [],
    education: [],
    workExperience: [],
  }
  const timeRangeBoxes = form.querySelectorAll("[name=timeRange]");
  timeRangeBoxes.forEach(checkbox => {
    if (checkbox.checked) object.timeRange.push(parseInt(checkbox.value))
  })
  const profilesBoxes = form.querySelectorAll("[name=profiles]");
  profilesBoxes.forEach(checkbox => {
    if (checkbox.checked) object.profiles.push(checkbox.value)
  })
  const educationFieldset = form.querySelector("#education-fieldset");
  educationFieldset.querySelectorAll(".fieldset-container").forEach(fieldset => {
    educationObject = {
      level: fieldset.querySelector("[name=level]").value,
      institution: fieldset.querySelector("[name=institution]").value,
      title: fieldset.querySelector("[name=title]").value,
      startDate: new Date(fieldset.querySelector("[name=startDate]").value),
      finishDate: new Date(fieldset.querySelector("[name=finishDate]").value),
      inProgress: fieldset.querySelector("[name=inProgress]").checked? true:false
    }
    object.education.push(educationObject);
  })
  const workExperienceFieldset = form.querySelector("#work-experience-fieldset");
  workExperienceFieldset.querySelectorAll(".fieldset-container").forEach(fieldset => {
    workExperienceObject = {
      company: fieldset.querySelector("[name=company]").value,
      role: fieldset.querySelector("[name=role]").value,
      startDate: new Date(fieldset.querySelector("[name=startDate]").value),
      finishDate: new Date(fieldset.querySelector("[name=finishDate]").value),
      currently: fieldset.querySelector("[name=inProgress]").checked? true:false
    }
    object.workExperience.push(workExperienceObject);
  })
  return object;
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

function updateCallback(candidate) {
  updateForm(candidate);
  openFormModal();
  formModal.querySelector("#confirm-button").onclick = function() {
    const updatedCandidate = retrieveUpdateFormData()
    modal.classList.toggle("show");
    formModal.classList.toggle("show");
    wipeTable();
    updateCandidate(candidate._id, updatedCandidate);
  }
}

function createCallback() {
  createForm();
  openFormModal();
  formModal.querySelector("#confirm-button").onclick = function() {
    const candidate = retrieveCreateFormData()
    modal.classList.toggle("show");
    formModal.classList.toggle("show");
    wipeTable();
    updateCandidate(candidate);
  }
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

function updateCandidate(id, updatedCandidate) {
  let url = `http://localhost:4000/api/candidates/${id}`;
  fetch(url, {
    method: "PUT",
    body: JSON.stringify(updatedCandidate),
    headers: {
      "Content-Type": "application/json",
    },
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
    readCandidates();
  });
}

function createCandidate(candidate) {
  let url = `http://localhost:4000/api/candidates`;
  fetch(url, {
    method: "POST",
    body: JSON.stringify(candidate),
    headers: {
      "Content-Type": "application/json",
    },
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
    readCandidates();
  });
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
    // row.querySelector(".show-profile").addEventListener("click", () => showProfile(candidate));
    // row.querySelector(".show-applications").addEventListener("click", () => showApplications(candidate));
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
formModal.querySelector("#confirm-button").addEventListener("click", retrieveUpdateFormData);
confirmModal.querySelector("#no").addEventListener("click", () => {
  modal.classList.toggle("show")
  confirmModal.classList.toggle("show");
});
const createButton = document.getElementById("create-button");
createButton.addEventListener("click", createCallback);