const startButton = document.getElementById('startButton');
const qrReader = document.getElementById('qr-reader');
const output = document.getElementById('output');
const letterDisplay = document.getElementById('letter');
const imageDisplay = document.getElementById('image');
const audioPlayer = document.getElementById('audioPlayer');

const startButton = document.getElementById('startButton');

startButton.addEventListener('click', () => {
  alert("Button clicked!"); // This should show an alert when clicked
});

function html5QrcodeScanner() {
  const html5QrCode = new Html5Qrcode("qr-reader");
  html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: { width: 250, height: 250 } },
    qrCodeMessage => {
      console.log("QR code scanned:", qrCodeMessage); // Controleer de inhoud van de QR-code
      const letter = qrCodeMessage;
      if (woordenlijst[letter]) {
        qrReader.style.display = 'none';
        showOutput(letter);
        html5QrCode.stop();
      } else {
        console.error("Letter not found in woordenlijst:", letter);
      }
    },
    errorMessage => {
      console.error("QR scanning error:", errorMessage); // Log scanfouten
    }
  ).catch(err => console.error("QR code scanner failed to start:", err));
}

function showOutput(letter) {
  const { woord, audio, image } = woordenlijst[letter];
  letterDisplay.textContent = `${letter} - ${woord}`;
  imageDisplay.src = image;
  audioPlayer.src = audio;
  audioPlayer.play();
  output.style.display = 'block';
}
