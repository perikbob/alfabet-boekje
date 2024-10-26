const startButton = document.getElementById('startButton');
const qrReader = document.getElementById('qr-reader');
const output = document.getElementById('output');
const letterDisplay = document.getElementById('letter');
const imageDisplay = document.getElementById('image');
const audioPlayer = document.getElementById('audioPlayer');

// Startknop event listener
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
  letterDisplay.textContent = `${letter} van ${woord}`;  // Dynamisch "A van Appel" genereren
  imageDisplay.src = image;
  audioPlayer.src = audio;
  audioPlayer.play();
  output.style.display = 'block';
}
