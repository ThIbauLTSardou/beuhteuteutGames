export function afficherjoueur(tab) {
    let container = "";

    for (let i = 0; i < tab.length; i++) {
        container += `
        <div class="container">
            <div>
                <p class="score">${tab[i].score}</p>
                <img src="../media/joueurs/${tab[i].name}.jpg" alt="">
                <p class="name">${tab[i].name}</p>
            </div>
            <button class="plus" id="${tab[i].name}">+</button>
        </div>
        `;
    }

    return container;
}


export function afficherjoueurQuiDeNous(tab){
    let container = ""

    for (let i = 0; i < tab.length; i++){
        container += 
            `
            <div class="joueur" id="${tab[i]}">
                <img src="../media/joueurs/${tab[i]}.jpg" alt="">
                <p>${tab[i]}</p>
            </div>
            `
    }

    return container
    
}