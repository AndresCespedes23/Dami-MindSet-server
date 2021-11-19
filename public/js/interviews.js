window.onload = function() {

  //----- READ -----//

  const url = "http://localhost:4000/api/interviews/";
  fetch(url)
    .then((res) => {
      if (res.status === 200) return res.json();
      throw new Error(`HTTP ${res.status}`);
    })
    .then((data) => {
      createList(data);
    })
    .catch((error) => {
      return error;
    });
}
