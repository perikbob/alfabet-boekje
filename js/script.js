const startButton = document.getElementById('startButton');
const qrReader = document.getElementById('qr-reader');
const output = document.getElementById('output');
const letterDisplay = document.getElementById('letter');
const imageDisplay = document.getElementById('image');
const audioPlayer = document.getElementById('audioPlayer');

// Event listener voor de QR START-knop
startButton.addEventListener('click', () => {
  console.log("START-knop is geklikt");
  qrReader.style.display = 'block';
  startQRScanner();
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
      // Alleen loggen als de fout een toegangsfout of ander ernstig probleem is
      if (!errorMessage.includes("No barcode or QR code detected") && 
          !errorMessage.includes("No MultiFormat Readers")) {
        console.error("Fout bij het scannen van QR-code:", errorMessage);
      }
    }
  ).catch((err) => {
    console.error("QR-code scanner kan niet starten:", err);
    alert("Kan QR-code scanner niet starten.");
  });
}


// Functie om het Welkomstbericht af te spelen
function playWelcomeMessage() {
  letterDisplay.textContent = "Welkom!";
  imageDisplay.style.display = "none";  // Verberg afbeelding als er geen is

  // Speel het welkom audio af
  audioPlayer.src = "audio/welcome.mp3";
  audioPlayer.play();

  // Maak de output container zichtbaar
  output.style.display = 'block';
}

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


