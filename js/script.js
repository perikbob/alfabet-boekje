const startButton = document.getElementById('startButton');
const testButton = document.getElementById('testButton');
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

// Event listener voor de QR START-knop
startButton.addEventListener('click', () => {
  console.log("START-knop is geklikt");
  qrReader.style.display = 'block';
  startQRScanner();
});

// Event listener voor de Toon Letter-knop
testButton.addEventListener('click', () => {
  const selectedLetter = letterSelect.value;
  if (selectedLetter && woordenlijst[selectedLetter]) {
    showOutput(selectedLetter);
  } else {
    alert("Selecteer een geldige letter.");
  }
});

// QR-scanner functie
function startQRScanner() {
  const html5QrCode = new Html5Qrcode("qr-reader");
  html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: { width: 250, height: 250 } },
    (decodedText) => {
      console.log("QR code gescand:", decodedText);
      const letter = decodedText.trim().toUpperCase();
      if (woordenlijst[letter]) {
        qrReader.style.display = 'none';
        showOutput(letter);
        html5QrCode.stop();
      } else {
        alert("Deze letter is niet beschikbaar.");
      }
    },
    (errorMessage) => {
      console.error("Fout bij het scannen van QR-code:", errorMessage);
    }
  ).catch((err) => {
    console.error("QR-code scanner kan niet starten:", err);
    alert("Kan QR-code scanner niet starten.");
  });
}

// Functie om output te tonen
function showOutput(letter) {
  const { woord, audio, image } = woordenlijst[letter];
  
  // Zet de tekst voor de letter en woord
  letterDisplay.textContent = `${letter} van ${woord}`;

  // Controleer of er een afbeelding is, zo ja, toon deze; anders verberg het element
  if (image) {
    imageDisplay.src = image;
    imageDisplay.classList.add("visible");
  } else {
    imageDisplay.classList.remove("visible");
  }

  // Zet audio en speel af
  audioPlayer.src = audio;
  audioPlayer.play();

  // Maak de output container zichtbaar door inline-styling toe te voegen
  output.style.display = 'flex'; // Directe inline-styling voor zichtbaarheid
}

