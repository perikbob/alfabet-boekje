document.addEventListener("DOMContentLoaded", () => {
  const playAudioButton = document.getElementById("playAudioButton");
  const optionsContainer = document.getElementById("options");
  const feedback = document.getElementById("feedback");

  let correctAnswer = "";

  // Functie om een willekeurige letter te kiezen en de opties te laden
  function loadQuestion() {
    optionsContainer.innerHTML = "";
    feedback.textContent = "";

    // Kies een willekeurige letter en stel het correcte antwoord in
    const letters = Object.keys(woordenlijst);
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    const { woord, audio } = woordenlijst[randomLetter];
    correctAnswer = randomLetter;

    // Speel het bijbehorende audiofragment af wanneer op de knop wordt geklikt
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
      // Maak een div-element aan voor de optie
      const optionDiv = document.createElement("div");
      optionDiv.classList.add("letter-option");
      optionDiv.setAttribute("data-option", option); // Voeg data-option toe

      // Voeg de hoofdletter en kleine letter toe aan de optie
      optionDiv.innerHTML = `
        <span class="letter-display">${option.toUpperCase()}</span>
        <span class="small-letter-display">${option.toLowerCase()}</span>
      `;
      optionDiv.onclick = () => checkAnswer(option);
      optionsContainer.appendChild(optionDiv);
    });
  }


  // Functie om het antwoord te controleren
  function checkAnswer(selectedOption) {
    const selectedElement = optionsContainer.querySelector(`[data-option="${selectedOption}"]`);

    if (selectedOption === correctAnswer) {
      feedback.textContent = "Goed gedaan!";
      feedback.style.color = "green";
      selectedElement.classList.add("correct"); // Voeg correct-animatie toe
      
      // Speel alleen correct geluid af
      const correctSound = new Audio("audio/correct.mp3");
      correctSound.play();

      setTimeout(() => {
        selectedElement.classList.remove("correct");
        loadQuestion();
      }, 1000); // Laad de volgende vraag na 1 seconde
    } else {
      feedback.textContent = "Probeer het opnieuw!";
      feedback.style.color = "red";
      selectedElement.classList.add("wrong"); // Voeg fout-animatie toe

      // Verwijder de fout-geluid afspeelcode
      setTimeout(() => {
        selectedElement.classList.remove("wrong");
      }, 500); // Verwijder de animatie na 0.5 seconde
    }
  }



  // Laad de eerste vraag
loadQuestion();
});
