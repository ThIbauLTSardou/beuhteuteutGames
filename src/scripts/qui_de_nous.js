import { afficherjoueurQuiDeNous } from './insertionHTML.js';
import { initJeuQuestions } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const joueurs = JSON.parse(sessionStorage.getItem("selection")) || [];

    const listeDiv = document.getElementById('liste');
    if (!listeDiv) return console.error("Élément #liste introuvable");

    const container = afficherjoueurQuiDeNous(joueurs);
    listeDiv.innerHTML = container;

    // Important : attendre que le DOM soit mis à jour
    setTimeout(() => {
        initJeuQuestions(); // On appelle après insertion du HTML
    }, 50);
});
