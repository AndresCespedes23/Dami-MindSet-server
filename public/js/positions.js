window.onload = function () {
  const url = "http://localhost:4000/api/positions/";
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
    });
}

function positionTable(positions) {
  const table = document.getElementById("table-list");
  positions.forEach(position => {
    let itemList = document.createElement("tr");
    itemList.innerHTML = `<td>${position._id}</td>
      <td>${position.idClient}</td>
      <td>${position.idProfiles}</td>
      <td>${position.name}</td>
      <td>${position.description}</td>
      <td>${position.status}</td>
      <td>${position.address}</td>
      <td>${position.city}</td>
      <td>${position.postalCode}</td>
      <td><button id="edit" class="button-list"><img src="img/Icon-edit.png" alt="Edit"></button></td>
      <td><button id="remove" class="button-list"><img src="img/Icon-remove.png" alt="Remove"/></button></td>`
    table.appendChild(itemList);
    const editButton = document.getElementById("edit");
    editButton.addEventListener("click", showUpdateModal);
    const removeButton = document.getElementById("remove");
    removeButton.addEventListener("click", showRemoveModal);
    const createButton = document.getElementById("create");
    createButton.addEventListener("click", showCreateModal);
  });
};
