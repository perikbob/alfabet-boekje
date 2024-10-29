document.addEventListener("DOMContentLoaded", () => {
  const playAudioButton = document.getElementById("playAudioButton");
  const optionsContainer = document.getElementById("options");
  const feedback = document.getElementById("feedback");

  let correctAnswer = "";

  // Functie om een willekeurige letter en afbeelding te selecteren
  function loadQuestion() {
    sequenceContainer.innerHTML = "";
    optionsContainer.innerHTML = "";
    feedback.textContent = "";

    // Kies een willekeurige startpositie voor de reeks
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const startIdx = Math.floor(Math.random() * (alphabet.length - 4));
    const sequence = alphabet.slice(startIdx, startIdx + 4);

    // Kies een willekeurige positie in de reeks om leeg te laten
    const missingIndex = Math.floor(Math.random() * 4);
    correctAnswer = sequence[missingIndex];
    sequence[missingIndex] = "__"; // Markeer de ontbrekende positie met __

    // Toon de reeks letters
    sequence.forEach(letter => {
      const span = document.createElement("span");
      span.classList.add("sequence-item");
      span.textContent = letter;
      sequenceContainer.appendChild(span);
    });

    // Voeg drie opties toe, inclusief het juiste antwoord
    const options = [correctAnswer];
    while (options.length < 3) {
      const randomOption = alphabet[Math.floor(Math.random() * alphabet.length)];
      if (!options.includes(randomOption)) options.push(randomOption);
    }

    // Sorteer de opties willekeurig en voeg ze toe aan de container
    options.sort(() => Math.random() - 0.5);
    options.forEach(option => {
      const button = document.createElement("button");
      button.classList.add("option-button");
      button.textContent = option;
      button.setAttribute("data-option", option); // Voeg het data-option attribuut toe
      button.onclick = () => checkAnswer(option);
      optionsContainer.appendChild(button);
    });
  }


  // Functie om het antwoord te controleren
  function checkAnswer(selectedOption) {
    const selectedButton = optionsContainer.querySelector(`[data-option="${selectedOption}"]`);

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
      selectedButton.classList.add("wrong");
      setTimeout(() => {
        selectedButton.classList.remove("wrong"); // Verwijder animatie na 0.5 seconde
      }, 500);
    }
  }

  // Laad de eerste vraag
  loadQuestion();
});
