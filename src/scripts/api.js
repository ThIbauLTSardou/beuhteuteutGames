export function initJeuQuestions() {
    const container = document.getElementById("question");
    const joueurs = document.querySelectorAll(".joueur");
    let questionsRestantes = [];
    let compteurQuestions = 0;
    const LIMITE = 40;




    fetch('../assets/questions.json')
        .then(res => res.json())
        .then(data => {
            console.log("Questions chargées :", data.questions);
            questionsRestantes = [...data.questions];

            let valeur = Math.floor(Math.random() * 10) + 1;
            let toz = document.getElementById('toz')
            toz.innerHTML = `${valeur} toz`

            if (compteurQuestions == 0) {
                valeur = Math.floor(Math.random() * 10) + 1;
                container.textContent = questionsRestantes[valeur * Math.floor(Math.random() * 3) + 1]
                toz = document.getElementById('toz')
                toz.innerHTML = `${valeur} toz`
            }

            joueurs.forEach(joueur => {
                joueur.addEventListener("click", () => {




                    if (compteurQuestions >= LIMITE) {
                        container.textContent = "Fin du jeu : 40 questions posées.";
                        disableTousLesJoueurs(joueurs);
                        return;
                    }

                    if (questionsRestantes.length === 0) {
                        container.textContent = "Plus de questions disponibles.";
                        disableTousLesJoueurs(joueurs);
                        return;
                    }

                    

                    const index = Math.floor(Math.random() * questionsRestantes.length);
                    const question = questionsRestantes[index];

                    ajouterScore(joueur.id, valeur, question)

                    console.log("Texte à afficher :", question);
                    console.log("Élément container :", container);

                    container.textContent = question;

                    questionsRestantes.splice(index, 1);
                    compteurQuestions++;



                    valeur = Math.floor(Math.random() * 10) + 1;
                    toz = document.getElementById('toz')

                    toz.innerHTML = `${valeur} toz`




                });
            });
        })
        .catch(err => {
            console.error("Erreur de chargement du JSON :", err);
            container.textContent = "Erreur de chargement des questions.";
            disableTousLesJoueurs(joueurs);
        });

    function disableTousLesJoueurs(joueurElements) {
        joueurElements.forEach(j => j.style.pointerEvents = "none");
    }
}


function ajouterScore(joueur, toz, question) {

    let joueursSave = JSON.parse(localStorage.getItem("joueursSauvegardés"));
    if (question === "Tout le monde bois") {

    }
    else {
        for (let i = 0; i < joueursSave.length; i++) {
            if (joueur == joueursSave[i].name) {
                joueursSave[i].score += toz

                break
            }
        }
    }


    localStorage.setItem("joueursSauvegardés", JSON.stringify(joueursSave));

    sessionStorage.setItem("joueursSauvegardés", JSON.stringify(joueursSave));

}