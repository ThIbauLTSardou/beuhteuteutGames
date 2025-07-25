export function initJeuQuestions() {
    const container = document.getElementById("question");
    const tozElement = document.getElementById("toz");
    const joueurs = document.querySelectorAll(".joueur");

    if (!container || !tozElement || joueurs.length === 0) {
        console.error("Éléments nécessaires introuvables");
        return;
    }

    let questionsRestantes = [];
    let compteurQuestions = 0;
    const LIMITE = 40;

    fetch("./assets/questions.json")
        .then((res) => {
            if (!res.ok) throw new Error("Échec du chargement du JSON");
            return res.json();
        })
        .then((data) => {
            if (!Array.isArray(data.questions)) throw new Error("Format de données invalide");
            questionsRestantes = [...data.questions];

            afficherNouvelleQuestion();

            joueurs.forEach((joueur) => {
                const handleClick = (event) => {
                    event.preventDefault();

                    if (compteurQuestions >= LIMITE || questionsRestantes.length === 0) {
                        container.textContent = "Fin du jeu.";
                        disableTousLesJoueurs(joueurs);
                        return;
                    }

                    const question = tirerQuestionAleatoire();
                    const toz = tirerValeurToz();

                    ajouterScore(joueur.id, toz, question);

                    container.textContent = question;
                    tozElement.innerHTML = `${toz} toz`;
                    compteurQuestions++;
                };

                joueur.addEventListener("click", handleClick);
                joueur.addEventListener("touchstart", handleClick, { passive: false });
            });
        })
        .catch((err) => {
            console.error("Erreur de chargement des questions :", err);
            container.textContent = "Erreur de chargement.";
        });

    function tirerValeurToz() {
        return Math.floor(Math.random() * 10) + 1;
    }

    function tirerQuestionAleatoire() {
        const index = Math.floor(Math.random() * questionsRestantes.length);
        const question = questionsRestantes[index];
        questionsRestantes.splice(index, 1);
        return question;
    }

    function afficherNouvelleQuestion() {
        if (questionsRestantes.length > 0) {
            const question = tirerQuestionAleatoire();
            const toz = tirerValeurToz();
            container.textContent = question;
            tozElement.innerHTML = `${toz} toz`;
        }
    }

    function disableTousLesJoueurs(elements) {
        elements.forEach((el) => {
            el.style.pointerEvents = "none";
            el.classList.add("disabled");
        });
    }
}
