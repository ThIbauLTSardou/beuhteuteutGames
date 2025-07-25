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

let joueursSave = [];

try {
    joueursSave = JSON.parse(sessionStorage.getItem("joueursSauvegardés")) 
               || JSON.parse(localStorage.getItem("joueursSauvegardés")) 
               || data.joueurs;
} catch (e) {
    console.warn("Erreur de parsing JSON :", e);
    joueursSave = data.joueurs; // fallback par défaut
}

// Sécurité : si joueursSave est nul ou pas un tableau, on réinitialise
if (!Array.isArray(joueursSave)) {
    joueursSave = data.joueurs;
    localStorage.setItem("joueursSauvegardés", JSON.stringify(data.joueurs));
}

   let listJoueur = afficherjoueur(joueursSave);
document.getElementById('main').innerHTML = listJoueur;



    /****  Podium  ****/
    let premier = 0
    let deuxieme = 0
    let troiseme = 0

    let joueursCopies = [...data];

    
    joueursCopies.sort(function (a, b) {
        return b.score - a.score;
    });

   
    let top3 = [
        joueursCopies[0],
        joueursCopies[1],
        joueursCopies[2]
    ];

    document.getElementById('premier').innerHTML = joueursCopies[0].score
    document.getElementById('deuxieme').innerHTML = joueursCopies[1].score
    document.getElementById('troisieme').innerHTML = joueursCopies[2].score

    const podiumImages = document.querySelectorAll('.tete img');

    podiumImages[0].src = `../media/joueurs/${joueursCopies[1].name}.jpg`; 
    podiumImages[1].src = `../media/joueurs/${joueursCopies[0].name}.jpg`; 
    podiumImages[2].src = `../media/joueurs/${joueursCopies[2].name}.jpg`; 


    const boutons = document.querySelectorAll('.plus');

    boutons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const nom = btn.id;

            // Si le nom est déjà dans la liste, on le retire
            if (selection.includes(nom)) {
                selection = selection.filter(n => n !== nom);
                btn.innerHTML = "+"
                btn.style.borderColor = "#4bc518";
                btn.style.color = "#4bc518";
                btn.parentElement.style.borderColor = "#e2e2e2";

            } else {
                // Sinon, on l’ajoute
                selection.push(nom);

                btn.style.borderColor = "#FF7BAD";
                btn.style.color = "#FF7BAD";
                btn.innerHTML = "-"
                btn.parentElement.style.borderColor = "#FF7BAD";

            }

            console.log(selection)

        });
    });


    document.getElementById('Valider').addEventListener('click', () =>{
       sessionStorage.setItem("selection", JSON.stringify(selection));
       console.log(selection)

       sessionStorage.setItem("data", JSON.stringify(data));
       console.log(data)
    })


})










