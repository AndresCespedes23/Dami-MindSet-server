window.onload = function () {
// function sendServer() {
  var url = "http://localhost:4000/api/clients/61929b6bb95f17d609395ad1";

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


    function createList(client){
      const table =  document.getElementById("table-list")
      let itemList = document.createElement('tr');
      itemList.innerHTML = `<td>${client._id}</td><td>${client.name}</td><td>${client.email}</td><td>${client.phoneNumber}</td><td>${client.cuit}</td><td>${client.address}</td><td>${client.activity}</td><td><img src="img/Icon-edit.png" alt="Edit" /></td>
      <td><a href="http://localhost:4000/api/clients/${client._id}"><img src="img/Icon-remove.png" alt="Remove"/></a></td>`
      table.appendChild(itemList);

    }

}

