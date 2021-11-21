const url = "http://localhost:4000/api/admins/";

//catch the table's body and results
const container = document.querySelector("tbody");
let results = "";

//catching the modal
const adminModal = document.getElementById("background-modal");

//the modal's form
const formModal = document.querySelector("form");
const closeModal = document.getElementById("closeModal")

//the modal's elements
const adminName = document.getElementById("adminName");
const EMail = document.getElementById("e-mail");
const userName = document.getElementById("username");
const passWord = document.getElementById("password");
const superAdmin = document.getElementById("superadmin");
let save = "";

//function to show all the admins in the db
const showData = (admins) => {
  admins.forEach(admin => {
    results +=`
      <tr>
        <td>${admin.name}</td>
        <td>${admin.email}</td>
        <td>${admin.username}</td>
        <td>${admin.password}</td>
        <td>${admin.isSuperAdmin}</td>
        <td><button class="editButton"><img src="img/Icon-edit.png" alt="EditAdmin"/></button></td>
      </tr>
    `;
  })
  container.innerHTML = results;
}



//show Admins

  fetch(url)
    .then((res) => {
      if (res.status === 200)
        return res.json();
        throw new Error(`HTTP ${res.status}`);
    })
    .then((adminData) => {
       showData(adminData);
    })
    .catch((err) => {
      console.log(err);
    });


//Function to UPDATE an admin
const on = (element, event, selector, handler) => {
  element.addEventListener(event, e => {
    if (e.target.closest(selector)) {
      return handler(e);
    }
  })
};
on(document, 'click', '.editButton', e => {
  const adminsLane = e.target.parentNode.parentNode.parentNode
  const adminsName = adminsLane.children[0].innerHTML
  const adminsEmail = adminsLane.children[1].innerHTML
  const adminsUsername = adminsLane.children[2].innerHTML
  const adminsPassword = adminsLane.children[3].innerHTML
  const adminsIsSuperAdmin = adminsLane.children[4].innerHTML
  adminName.value = adminsName
  EMail.value = adminsEmail
  userName.value = adminsUsername
  passWord.value = adminsPassword
  superAdmin.value = adminsIsSuperAdmin
  save = "Edit"
  adminModal.classList.remove("hide");
  console.log(adminsName)
} )
//Sumbmit changes
formModal.addEventListener("submit", (e) => {
  e.preventDefault(e)
    fetch(url+adminName, {
      method: "PUT",
      headers: {
          "Content-Type":"application/json"
      },
      body: JSON.stringify({
        name:adminName.value,
        email:EMail.value,
        username:userName.value,
        password:passWord.value,
        isSuperAdmin:superAdmin.value,
      })
    })
    .then((res) => {
        if (res.status === 200)
          return res.json();
      })
      .then(Response => location.reload())
      .catch((err) => {
        console.log(err);
      });
      adminModal.classList.add("hide");
})

//Cancel changes
closeModal.addEventListener("click", closeFModal)
function closeFModal (e){
    e.preventDefault();
    adminModal.classList.add("hide");
}
//click outside the modal also close it
window.onclick = function(outside){
    if (outside.target == adminModal){
        adminModal.classList.add("hide");
    }
}
adminModal.classList.add("hide")