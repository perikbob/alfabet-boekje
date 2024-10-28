const startButton = document.getElementById('startButton');
const lettersButton = document.getElementById('alle-letters');
const letterSelect = document.getElementById('letterSelect');
const qrReader = document.getElementById('qr-reader');
const output = document.getElementById('output');
const letterDisplay = document.getElementById('letter');
const imageDisplay = document.getElementById('image');
const audioPlayer = document.getElementById('audioPlayer');

// Voeg alle letters van het alfabet toe aan de dropdown
function populateDropdown() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Selecteer een letter";
  letterSelect.appendChild(defaultOption);

  for (const letter of alphabet) {
    const option = document.createElement("option");
    option.value = letter;
    option.textContent = letter;
    letterSelect.appendChild(option);
  }
}

populateDropdown();  // Roep de functie aan om de dropdown te vullen

// Event listener voor de Toon Letter-knop
lettersButton.addEventListener('click', () => {
  const selectedLetter = letterSelect.value;
  if (selectedLetter && woordenlijst[selectedLetter]) {
    showOutput(selectedLetter);
  } else {
    alert("Selecteer een geldige letter.");
  }
});


function showOutput(letter) {
  const { woord, audio, image } = woordenlijst[letter];
  
  // Zet de tekst voor de letter en woord
  letterDisplay.textContent = `${letter} van ${woord}`;

  // Controleer of er een afbeelding is, zo ja, toon deze door de 'visible' class toe te voegen; anders verberg het element
  if (image) {
    imageDisplay.src = image;
    imageDisplay.classList.add("visible");  // Voeg 'visible' class toe
  } else {
    imageDisplay.classList.remove("visible");  // Verwijder 'visible' class als er geen afbeelding is
  }

  // Zet audio en speel af
  audioPlayer.src = audio;
  audioPlayer.play();

  // Maak de output container zichtbaar
  output.style.display = 'flex'; // Zorg dat display: flex is voor centrering
}


