document.addEventListener("DOMContentLoaded", () => {
  const questionContainer = document.getElementById("question");
  const optionsContainer = document.getElementById("options");
  const feedback = document.getElementById("feedback");

  let correctAnswer = "";

  // Functie om een nieuwe vraag te genereren
  function loadQuestion() {
    optionsContainer.innerHTML = "";
    feedback.textContent = "";

    // Kies een willekeurige hoofdletter uit het alfabet
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    correctAnswer = randomLetter.toLowerCase();

    // Toon de hoofdletter als vraag
    questionContainer.textContent = randomLetter;

    // Voeg drie opties toe, inclusief de juiste kleine letter
    const options = [correctAnswer];
    while (options.length < 3) {
      const randomOption = String.fromCharCode(97 + Math.floor(Math.random() * 26)); // Kies een willekeurige kleine letter
      if (!options.includes(randomOption)) options.push(randomOption);
    }

    // Sorteer de opties willekeurig en voeg ze toe aan de container
    options.sort(() => Math.random() - 0.5);
    options.forEach(option => {
      const button = document.createElement("button");
      button.classList.add("option-button");
      button.textContent = option;
      button.setAttribute("data-option", option); // Voeg data-option toe om het te identificeren
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
