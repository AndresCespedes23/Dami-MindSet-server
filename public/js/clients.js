window.onload = function () {
  var url = "http://localhost:4000/api/clients/";
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

function createList(clients) {
  const table = document.getElementById("table-list");
  clients.forEach(client => {
    let itemList = document.createElement("tr");
    itemList.innerHTML = `<td>${client._id}</td>
      <td>${client.name}</td>
      <td>${client.email}</td>
      <td>${client.phoneNumber}</td>
      <td>${client.cuit}</td>
      <td>${client.address}</td>
      <td>${client.activity}</td>
      <td><button class="button-list" onclick="updateClient(${client._id})"><img src="img/Icon-edit.png" alt="Edit"></button></td>
      <td><button class="button-list" onclick="deleteClient(${client._id})"><img src="img/Icon-remove.png" alt="Remove"/></button>
      </form></td>`
    table.appendChild(itemList);
  });
};

function deleteClient(idClient){
  console.log('entre')
  const opc = {method: "DELETE"};

  var request = new Request (`http://localhost:4000/api/clients/${idClient}`, opc );
  fetch(request)
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
