const startButton = document.getElementById('startButton');
const qrReader = document.getElementById('qr-reader');
const output = document.getElementById('output');
const letterDisplay = document.getElementById('letter');
const imageDisplay = document.getElementById('image');
const audioPlayer = document.getElementById('audioPlayer');

// Woordenlijst met links naar audio en afbeelding
const woordenlijst = {
  "A": { woord: "Aap", audio: "audio/aap.mp3", image: "images/aap.jpg" },
  "B": { woord: "Boer", audio: "audio/boer.mp3", image: "images/boer.jpg" },
  // Voeg andere letters toe
};

startButton.addEventListener('click', () => {
  qrReader.style.display = 'block';
  html5QrcodeScanner();
});

function html5QrcodeScanner() {
  const html5QrCode = new Html5Qrcode("qr-reader");
  html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: { width: 250, height: 250 } },
    qrCodeMessage => {
      const letter = qrCodeMessage;
      if (woordenlijst[letter]) {
        // Verberg QR-scanner en toon resultaat
        qrReader.style.display = 'none';
        showOutput(letter);
        html5QrCode.stop();
      }
    },
    errorMessage => {
      console.log("QR-scan fout:", errorMessage);
    }
  ).catch(err => console.log("QR-camera fout:", err));
}

function showOutput(letter) {
  const { woord, audio, image } = woordenlijst[letter];
  letterDisplay.textContent = `${letter} - ${woord}`;
  imageDisplay.src = image;
  audioPlayer.src = audio;
  audioPlayer.play();
  output.style.display = 'block';
}
