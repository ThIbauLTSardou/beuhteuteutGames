export function initJeuQuestions() {
    const container = document.getElementById("question");
    const tozElement = document.getElementById('toz');
    const joueurs = document.querySelectorAll(".joueur");

    if (!container || !tozElement || joueurs.length === 0) {
        console.error("Éléments nécessaires introuvables");
        return;
    }

    let questionsRestantes = [];
    let compteurQuestions = 0;
    const LIMITE = 40;

    fetch('qui-de-nous/src/assets/questions.json')
        .then(res => res.json())
        .then(data => {
            questionsRestantes = [...data.questions];

            let valeur = Math.floor(Math.random() * 10) + 1;
            tozElement.innerHTML = `${valeur} toz`;

            // Affiche une première question
            if (questionsRestantes.length > 0) {
                const index = Math.floor(Math.random() * questionsRestantes.length);
                container.textContent = questionsRestantes[index];
                questionsRestantes.splice(index, 1);
            }

            joueurs.forEach(joueur => {
                const eventHandler = () => {
                    if (compteurQuestions >= LIMITE || questionsRestantes.length === 0) {
                        container.textContent = "Fin du jeu.";
                        disableTousLesJoueurs(joueurs);
                        return;
                    }

                    const index = Math.floor(Math.random() * questionsRestantes.length);
                    const question = questionsRestantes[index];

                    ajouterScore(joueur.id, valeur, question);
                    container.textContent = question;
                    questionsRestantes.splice(index, 1);
                    compteurQuestions++;

                    valeur = Math.floor(Math.random() * 10) + 1;
                    tozElement.innerHTML = `${valeur} toz`;
                };

                // Ajoute à la fois click et touchstart pour couvrir mobile
                joueur.addEventListener("click", eventHandler);
                joueur.addEventListener("touchstart", eventHandler);
            });
        })
        .catch(err => {
            console.error("Erreur de chargement des questions :", err);
            container.textContent = "Erreur de chargement.";
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
