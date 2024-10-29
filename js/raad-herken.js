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
      const element = document.createElement("div");
      element.setAttribute("data-option", option);
      element.classList.add("option-image-container");

      // Voeg de afbeelding toe aan de optie-elementen
      const img = document.createElement("img");
      img.src = woordenlijst[option].image;
      img.classList.add("option-image");

      element.appendChild(img);
      element.onclick = () => checkAnswer(option);
      optionsContainer.appendChild(element);
    });
  }

  // Functie om het antwoord te controleren
  function checkAnswer(selectedOption) {
    const selectedElement = optionsContainer.querySelector(`[data-option="${selectedOption}"]`);

    if (selectedOption === correctAnswer) {
      feedback.textContent = "Goed gedaan!";
      feedback.style.color = "green";

      // Speel correct geluid af
      const correctSound = new Audio("audio/correct.mp3");
      correctSound.play();

      setTimeout(loadQuestion, 2000); // Laad de volgende vraag na 2 seconden
    } else {
      feedback.textContent = "Probeer het opnieuw!";
      feedback.style.color = "red";

      // Voeg fout-animatie toe aan het geselecteerde knop-element
      selectedElement.classList.add("wrong");
      setTimeout(() => {
        selectedElement.classList.remove("wrong"); // Verwijder animatie na 0.5 seconde
      }, 500);
    }
  }

  // Laad de eerste vraag
  loadQuestion();
});
