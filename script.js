const messageEl = document.getElementById("message");

const randomNumber = getRandomNumber();

function getRandomNumber() {
  return Math.floor(Math.random()*100) + 1;
}

console.log(randomNumber);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

let recognition = new window.SpeechRecognition();

recognition.start();

recognition.addEventListener("result", onSpeak);
recognition.addEventListener("end", () => {
  recognition.start()
});

function onSpeak() {
  let spokenText = event.results[0][0].transcript;
  writeMessage(spokenText);
  checkNumber(spokenText);
  console.log("speech detected")
}

function writeMessage(msg) {
  messageEl.innerHTML = `
  <p>
    You Said
  </p>
  <span class="box">${msg}</span>
  `
}

function checkNumber(checkMsg) {
  const number = Number(checkMsg);
  if (Number.isNaN(number)) {
    messageEl.innerHTML = messageEl.innerHTML + `
    <div>That Is Not A Valid Number</div>`;
    return ;
  }

  if (number > 100 || number < 1) {
    messageEl.innerHTML = messageEl.innerHTML + `
    <div>Number Must Be Between 1 - 100</div>`;
    return ;
  }

  if (randomNumber === number) {
    document.body.innerHTML = `
      <h2>Congrats You Have Guessed The Number <br><br>
        It Was ${randomNumber}</h2>
      <button class="playAgain" id="playAgain">Play Again</button>
    `
  }
  else if (number > randomNumber) {
    messageEl.innerHTML = messageEl.innerHTML + `
    <div>GO LOWER</div>`;
  }
  else {
    messageEl.innerHTML = messageEl.innerHTML + `
    <div>GO HIGHER</div>`;
  }
}

document.body.addEventListener("click", (e) => {
  if (e.target.id == "playAgain") {
    location.reload();
  }
})
