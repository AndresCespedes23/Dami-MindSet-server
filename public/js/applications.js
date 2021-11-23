window.onload = function() {

  //----- Variables -----//

  const modal = document.getElementById("background-modal");
  const form = document.getElementById("form");
  const title = document.getElementById("modal-title");
  const description = document.getElementById("modal-description");
  const createButton = document.getElementById("create-button");
  const confirmCreateButton = document.getElementById("confirm-create-button");
  const confirmRemoveButton = document.getElementById("confirm-remove-button");
  const cancelButton = document.getElementById("cancel-button");

}

//----- Create rows with data retrieved from Applications into table -----//

async function createList(applications) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";
  applications.forEach(async (application) => {
    let position = await getName(application.idPosition,"positions");
    let candidate = await getName(application.idCandidate,"candidates");
    //let interview = await getName(application.idInterview,"interviews");
    let itemList = document.createElement("tr");
    itemList.innerHTML = `<td class="application" >${application._id}</td>
      <td>${position}</td>
      <td>${candidate}</td>
      <td>${application.idInterview}</td>
      <td>${application.dateTime}</td>
      <td>${application.status}</td>
      <td>${application.result}</td>
      <td><button class="remove" class="button-list"><img src="img/Icon-remove.png" alt="Remove"/></button>
      </td>`
    tableBody.appendChild(itemList);
    itemList.querySelector(".application").addEventListener("click", function() {
      infoModal(application);
    });
    itemList.querySelector(".remove").addEventListener("click", function() {
      openRemoveModal(application);
    });
  })
}