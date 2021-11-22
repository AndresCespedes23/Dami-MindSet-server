//URL
const url = "http://localhost:4000/api/profiles/";

//catch the table's body and results
const container = document.querySelector("tbody");
let results = "";

//catching the modal
const adminModal = document.getElementById("background-modal");

//the modal's form
const formModal = document.querySelector("form");
const closeModal = document.getElementById("closeModal")

//the modal's elements
const profileName = document.getElementById("nameProfile");
const profileDescription = document.getElementById("descriptionProfile");

//function to show all the profiles in the DB
const showData = (profiles) => {
    profiles.forEach(profile => {
      results +=`
        <tr>
          <td>${profile._id}</td>
          <td>${profile.name}</td>
          <td>${profile.description}</td>
          <td><button id="edit-button"><img src="img/Icon-edit.png" alt="EditProfile" /></button></td>
          <td><button id="delete-button"><img src="img/Icon-remove.png" alt="Remove"/></button></td>
        </tr>
      `;
    })
    container.innerHTML = results;
  }

//show all the profiles
  fetch(url)
  .then((res) => {
    if (res.status === 200)
      return res.json();
      throw new Error(`HTTP ${res.status}`);
  })
  .then((profileData) => {
     showData(profileData);
  })
  .catch((err) => {
    console.log(err);
  });
