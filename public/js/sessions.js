const table = document.querySelector("table");

var baseUrl = "http://localhost:4000/api/";

window.onload = () => listSessions();

/******************** LIST SESSIONS ********************/
function listSessions() {
  fetch(baseUrl + "sessions")
    .then((res) => {
      if (res.status === 200) return res.json();
      throw new Error(`HTTP ${res.status}`);
    })
    .then((data) => {
      displaySessions(data);
    })
    .catch((err) => {
      displayError(err);
    });
}

async function displaySessions(sessions) {
  let sessionsList = "";
  for (let i = 0; i < Math.min(sessions.length, 2); i++) {
    const candidateName = await getName(sessions[i].idCandidate, "candidates/");
    sessionsList += `<td>${candidateName}</td>`;
    const psychologistName = await getName(
      sessions[i].idPsychologist,
      "psychologists/"
    );
    sessionsList += `<td>${psychologistName}</td>`;
    const date = `${sessions[i].dateTime.substr(0, 10)} ${sessions[
      i
    ].dateTime.substr(11, 5)}`;
    sessionsList += `<td>${date}</td>`;
    sessionsList += `<td>${sessions[i].status}</td>`;
    let result = sessions[i].result;
    if (!result) result = "-";
    sessionsList += `<td>${result}</td>`;
    sessionsList += `<td><button><img src="img/Icon-edit.png" alt="Edit"/></button></td>`;
    sessionsList += `<td><button><img src="img/Icon-remove.png" alt="Remove"/></button></td>`;
    sessionsList = `<tr>${sessionsList}</tr>`;
  }
  table.innerHTML += sessionsList;
}

async function getName(id, resource) {
  try {
    const res = await fetch(baseUrl + resource + id);
    if (res.status === 200) {
      const data = await res.json();
      return capitalize(data.name);
    }
    throw new Error(`HTTP ${res.status}`);
  } catch (err) {
    displayError(err);
  }
}

function displayError(err) {
  console.log(err);
}

function capitalize(str) {
  const words = str.split(" ");
  words.forEach((word, i) => {
    words[i] = word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase();
  });
  return words.join(" ");
}
