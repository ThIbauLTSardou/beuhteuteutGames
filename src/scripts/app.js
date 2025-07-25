import { afficherjoueur } from './insertionHTML.js';

let data = {
    joueurs: [
        { name: "Gaboche", score: 0 },
        { name: "UliceLeDozo", score: 0 },
        { name: "Mentaly_MF", score: 0 },
        { name: "Tybz", score: 0 },
        { name: "Onino", score: 0 },
        { name: "Mat", score: 0 },
        { name: "Tedos", score: 0 },
        { name: "jsp_qui_c", score: 0 }
    ]
};

let selection = [];

document.addEventListener('DOMContentLoaded', () => {
    let joueursSave;

    try {
        joueursSave = JSON.parse(sessionStorage.getItem("joueursSauvegardés")) 
                  || JSON.parse(localStorage.getItem("joueursSauvegardés")) 
                  || data.joueurs;
    } catch (e) {
        console.warn("Erreur de parsing JSON :", e);
        joueursSave = data.joueurs;
    }

    // Sécurité : si joueursSave est nul ou pas un tableau, on réinitialise
    if (!Array.isArray(joueursSave)) {
        joueursSave = data.joueurs;
        localStorage.setItem("joueursSauvegardés", JSON.stringify(data.joueurs));
    }

    // On affiche les joueurs avec leurs scores
    let listJoueur = afficherjoueur(joueursSave);
    document.getElementById('main').innerHTML = listJoueur;

    /**** 🎖️ Podium ****/
    let joueursCopies = [...joueursSave]; // copie des scores en cours

    joueursCopies.sort((a, b) => b.score - a.score);

    const podiumImages = document.querySelectorAll('.tete img');

    document.getElementById('premier').innerHTML = joueursCopies[0].score;
    document.getElementById('deuxieme').innerHTML = joueursCopies[1].score;
    document.getElementById('troisieme').innerHTML = joueursCopies[2].score;

    podiumImages[0].src = `../media/joueurs/${joueursCopies[1].name}.jpg`; 
    podiumImages[1].src = `../media/joueurs/${joueursCopies[0].name}.jpg`; 
    podiumImages[2].src = `../media/joueurs/${joueursCopies[2].name}.jpg`; 

    /**** ➕ Boutons de sélection ****/
    const boutons = document.querySelectorAll('.plus');

    boutons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const nom = btn.id;

            if (selection.includes(nom)) {
                selection = selection.filter(n => n !== nom);
                btn.innerHTML = "+";
                btn.style.borderColor = "#4bc518";
                btn.style.color = "#4bc518";
                btn.parentElement.style.borderColor = "#e2e2e2";
            } else {
                selection.push(nom);
                btn.innerHTML = "-";
                btn.style.borderColor = "#FF7BAD";
                btn.style.color = "#FF7BAD";
                btn.parentElement.style.borderColor = "#FF7BAD";
            }

            console.log("Sélection actuelle :", selection);
        });
    });

    /**** ✅ Bouton de validation ****/
    document.getElementById('Valider').addEventListener('click', () => {
        sessionStorage.setItem("selection", JSON.stringify(selection));
        sessionStorage.setItem("joueursSauvegardés", JSON.stringify(joueursSave));

        console.log("✅ Données sauvegardées :");
        console.log("Selection :", selection);
        console.log("Joueurs :", joueursSave);
    });
});
