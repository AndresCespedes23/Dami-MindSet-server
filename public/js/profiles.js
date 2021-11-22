//URL
const url = "http://localhost:4000/api/profiles/";

//catch the table's body and results
const container = document.querySelector("tbody");
let results = "";

//Create button
const createProfile = document.getElementById("create-button")
//catching the modal
const profileModal = document.getElementById("background-modal");
profileModal.classList.add("hide")

//the modal's form
const formModal = document.querySelector("form");
const closeModal = document.getElementById("closeModal")

//the modal's elements
const profileName = document.getElementById("nameProfile");
const profileDescription = document.getElementById("descriptionProfile");

// CREATE Function
createProfile.addEventListener("click", () => {
    profileModal.classList.remove("hide");
  })

//function to READ all the profiles in the DB
const showData = (profiles) => {
    profiles.forEach(profile => {
      results +=`
        <tr>
          <td>${profile._id}</td>
          <td>${profile.name}</td>
          <td>${profile.description}</td>
          <td><button class="editButton"><img src="img/Icon-edit.png" alt="EditProfile" /></button></td>
          <td><button class="deleteButton"><img src="img/Icon-remove.png" alt="Remove"/></button></td>
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



//Function to UPDATE a Profile
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
      if (e.target.closest(selector)) {
        return handler(e);
      }
    })
  };
  on(document, 'click', '.editButton', e => {
    const profilesLane = e.target.parentNode.parentNode.parentNode
    const profilesName = profilesLane.children[1].innerHTML
    const profilesDescription = profilesLane.children[2].innerHTML
    profileName.value = profilesName
    profileDescription.value = profilesDescription
    profileModal.classList.remove("hide");
  });

  //get Ids of the admins
  let profileId = on(document, 'click', '.editButton', e => {
      const profilesLane = e.target.parentNode.parentNode.parentNode
      profileId = profilesLane.children[0].innerHTML
    });

  //Submit changes
  const submit = (e) => {
    e.preventDefault()
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
    //.then( res => location.reload())
    .catch((err) => {
      console.log(err);
    });
      profileModal.classList.add("hide");
  };
  formModal.addEventListener("submit", submit);

// function to DELETE profiles
on(document, 'click', '.deleteButton', e => {
    const profileLane = e.target.parentNode.parentNode.parentNode
    idProfile = profileLane.firstElementChild.innerHTML
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
      });
    });

  //Cancel changes
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
  profileModal.classList.add("hide");