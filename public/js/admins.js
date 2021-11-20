const url = "http://localhost:4000/api/admins/";

//catch the table's body and results
const container = document.querySelector("tbody");
let results = "";

//catching the modal
const adminModal = document.getElementById("background-modal");

//the modal's form
const formModal = document.querySelector("form");

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
        <td><button class="deleteButton"><img src="img/Icon-remove.png" alt="Remove"/></button></td>
      </tr>`;
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
