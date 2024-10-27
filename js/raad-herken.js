document.addEventListener("DOMContentLoaded", () => {
  const playAudioButton = document.getElementById("playAudioButton");
  const optionsContainer = document.getElementById("options");
  const feedback = document.getElementById("feedback");

  let correctAnswer = "";

  // Functie om een willekeurige letter en afbeelding te selecteren
  function loadQuestion() {
    optionsContainer.innerHTML = "";
    feedback.textContent = "";

    // Kies een willekeurige letter en stel het correcte antwoord in
    const letters = Object.keys(woordenlijst);
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    const { woord, audio, image } = woordenlijst[randomLetter];
    correctAnswer = randomLetter;

    // Speel het bijbehorende audiofragment af
    playAudioButton.onclick = () => {
      const audioPlayer = new Audio(audio);
      audioPlayer.play();
    };

    // Voeg drie opties toe, inclusief het juiste antwoord
    const options = [randomLetter];
    while (options.length < 3) {
      const randomOption = letters[Math.floor(Math.random() * letters.length)];
      if (!options.includes(randomOption)) options.push(randomOption);
    }

    // Sorteer de opties willekeurig en voeg ze toe aan de container
    options.sort(() => Math.random() - 0.5);
    options.forEach((option) => {
      const img = document.createElement("img");
      img.src = woordenlijst[option].image;
      img.classList.add("option-image");
      img.onclick = () => checkAnswer(option);
      optionsContainer.appendChild(img);
    });
  }

  // Functie om het antwoord te controleren
  function checkAnswer(selectedOption) {
    if (selectedOption === correctAnswer) {
      feedback.textContent = "Goed gedaan!";
      feedback.style.color = "green";
      setTimeout(loadQuestion, 2000);
    } else {
      feedback.textContent = "Probeer het opnieuw!";
      feedback.style.color = "red";
    }
  }

  // Laad de eerste vraag
  loadQuestion();
});
