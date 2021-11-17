function sendServer() {
  var url = "https://localhost:4000/";

  fetch(url)
    .then(function respuesta(res) {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error(`HTTP ${res.status}`);
      }
    })
    // .then(function info(data){
    //     for (const property in data){
    //         ulModal.innerHTML+=`<li>${property}: ${data[property]}</li>`;
    //         localStorage.setItem(property, data[property]);  // save the info in localStorage
    //     }
    // })
    .catch(function faiulure(error) {
      console.log(error);
      sendToServer.classList.toggle("hide", true); //hide the buttom send
      titleModal.innerText = "SUBSCRIPTION FAILED";
      ulModal.innerHTML = `<li>${error}</li>`;
    });
}
