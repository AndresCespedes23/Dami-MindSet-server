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
  console.log(table);
  candidates.forEach((candidate) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${candidate._id}</td>
    <td>${candidate.name}</td>
    <td>${getAge(candidate.dateOfBirth)}</td>
    <td>${candidate.address}</td>
    <td>${candidate.status}</td>
    <td>${candidate.profiles.join(",")}</td>
    <td><img src="img/Icon-visible.png" alt="Show" /></td>
    <td><img src="img/Icon-visible.png" alt="Show" /></td>
    <td><img src="img/Icon-visible.png" alt="Show" /></td>
    <td><img src="img/Icon-edit.png" alt="Edit" /></td>
    <td><img src="img/Icon-remove.png" alt="Remove" /></td>`;
    table.appendChild(row);
  })
}

readCandidates();