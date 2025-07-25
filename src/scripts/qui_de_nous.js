import { afficherjoueurQuiDeNous } from './insertionHTML.js';
import { initJeuQuestions } from './api.js';


document.addEventListener('DOMContentLoaded', () => {

    
    
    const joueurs = JSON.parse(sessionStorage.getItem("selection")) || [];
    console.log(joueurs);


    let container = afficherjoueurQuiDeNous(joueurs)
    document.getElementById('liste').innerHTML = container

    
    initJeuQuestions()

});
