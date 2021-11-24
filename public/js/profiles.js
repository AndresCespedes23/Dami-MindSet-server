//URL
const url = `${window.location.origin}/api/profiles`;
//catch the table's body and results
const container = document.querySelector("tbody");
let results = "";

//Create button
const createProfile = document.getElementById("create-button")

//catching the modal
const profileModal = document.getElementById("background-modal");

//catching the delete's modal
const deleteModal = document.getElementById("delete-modal");
const cancelDelete = document.getElementById("close-delete");
const confirmDelete = document.getElementById("confirm-delete");

//the modal's form
const formModal = document.querySelector("form");
const closeModal = document.getElementById("closeModal")

//the modal's elements
const profileName = document.getElementById("nameProfile");
const profileDescription = document.getElementById("descriptionProfile");
const h2 = document.getElementById("change-text");
let option = ""
h2.innerText = ""

//hide Modals
profileModal.classList.add("hide")
deleteModal.classList.add("hide")

// CREATE Function
createProfile.addEventListener("click", () => {
    profileModal.classList.remove("hide");
    h2.innerText = "CREATE PROFILE"
    option = "create"
  })

//function to READ all the profiles in the DB
function showData(profiles) {
    profiles.forEach(profile => {
        results += `
        <tr>
          <td>${profile._id}</td>
          <td>${profile.name}</td>
          <td>${profile.description}</td>
          <td><button class="editButton"><img src="img/Icon-edit.png" alt="EditProfile" /></button></td>
          <td><button class="deleteButton"><img src="img/Icon-remove.png" alt="Remove"/></button></td>
        </tr>
      `;
    });
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



//Function on
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
      if (e.target.closest(selector)) {
        return handler(e);
      }
    })
  };

// CREATE and UPDATE functions
//Function On to fill the modal
 on(document, 'click', '.editButton', e => {
    const profilesLane = e.target.parentNode.parentNode.parentNode
    const profilesName = profilesLane.children[1].innerHTML
    const profilesDescription = profilesLane.children[2].innerHTML
    profileName.value = profilesName
    profileDescription.value = profilesDescription
    h2.innerText = "EDIT PROFILE"
    option = "edit"
    profileModal.classList.remove("hide");
  });
 //get Ids of the profiles to update
 let profileId = on(document, 'click', '.editButton', e => {
    const profilesLane = e.target.parentNode.parentNode.parentNode
    profileId = profilesLane.children[0].innerHTML
  });

  formModal.addEventListener("submit", (e) => {
    e.preventDefault()
    if (option == "create") {                    ///CREATE FUNCTION
        fetch(url, {
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify({
                name:profileName.value,
                description:profileDescription.value,
            })
        })
        .then((res) => {
            if (res.status === 200)
            return res.json();
          })
        .then( res => location.reload())
        return profileModal.classList.add("hide");
    }
    if (option == "edit") {                       ///UPDATE FUNCTION
        fetch(url+profileId, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
              name:profileName.value,
              description:profileDescription.value,
            })
        })
        .then((res) => {
          if (res.status === 200)
          return res.json();
        })
        .then( res => location.reload())
        } return profileModal.classList.add("hide");
    });
//Cancel changes on the modal
closeModal.addEventListener("click", closeFModal)
function closeFModal (e){
  e.preventDefault();
  profileModal.classList.add("hide");
};

//click outside the modal also close it
window.onclick = function(outside) {
if (outside.target == profileModal) {
  profileModal.classList.add("hide");
};
};

// function ON to DELETE profiles
on(document, 'click', '.deleteButton', e => {
    const profileLane = e.target.parentNode.parentNode.parentNode
    idProfile = profileLane.firstElementChild.innerHTML
    deleteModal.classList.remove("hide")
});

confirmDelete.addEventListener("click", deleteP)
      function deleteP (e){
          e.preventDefault()
          fetch(url+idProfile, {
            method: "DELETE",
        })
        .then((res) => {
        if (res.status === 200)
        return res.json();
      })
    .then( () => location.reload())
    .catch((err) => {
        console.log(err);
      })
    };

//Cancel changes on the modal
cancelDelete.addEventListener("click", closeDelete)
function closeDelete (e){
  e.preventDefault();
  deleteModal.classList.add("hide");
};

//click outside the modal also close it
window.onclick = function(outside) {
if (outside.target == deleteModal) {
  deleteModal.classList.add("hide");
};
};
