// UI Changing
function resetBanque() {
  let imgs_banques = $$('.banque img');
  let posX = 0;
  let posY = 0;
  imgs_banques.forEach(function (img_banque_item) {
    img_banque_item.style.cssText = `
      top:${posX}px;
      left:${posY}px;   
    `;
    posX += 0.5;
    posY += 0.5;
  });
}
resetBanque();

let card_to_play;
let card_accepted = false;

// Iplementing the draggable functionnality
// Droppable area
$('#center_game').addEventListener('dragover', dragover);
$('#center_game').addEventListener('dragenter', dragenter);
$('#center_game').addEventListener('dragleave', dragleave);
$('#center_game').addEventListener('drop', drop);

// Draagable events
function dragover(e) {
  e.preventDefault();
  // console.log(this);
}
function dragenter() {}
function dragleave() {}

function drop(e) {
  e.preventDefault();
  console.log(card_to_play);
}

function drag_carte() {
  let a = Array.from($$('.player_side .carte'));
  let b = Array.from($$('#extra_cards_container .carte'));
  let player_cards = a.concat(b);
  player_cards.forEach(function (playerCard) {
    playerCard.addEventListener('dragstart', dragStart);
    playerCard.addEventListener('dragend', dragEnd);
  });
}
drag_carte();
// drag functions
function dragStart() {
  card_to_play = this;
  this.style.opacity = 0;
  this.style.transform = 'translateY(-8px)';
  console.log(this);
}

function dragEnd() {
  this.style.opacity = 1;
  let carteAjouer = parseInt(this.getAttribute('card_id'));
  let c_carteDansLeJeu = cardCorrespondance[carte_depart - 1];
  console.log(c_carteDansLeJeu);

  if (c_carteDansLeJeu.indexOf(carteAjouer) !== -1) {
    // On ajoute les cartes au cas ou il s'agit d'un pic
    if (
      carteAjouer == 25 ||
      carteAjouer == 26 ||
      carteAjouer == 27 ||
      carteAjouer == 28
    ) {
      cartesJouers[0].push(cartes[0], cartes[1]);
      cartes.splice(0, 2);
      console.log('PC ramasse deux cartes');
    }
    if (carteAjouer == 53 || carteAjouer == 54) {
      cartesJouers[0].push(cartes[0], cartes[1], cartes[2], cartes[3]);
      cartes.splice(0, 4);
      console.log('PC ramasse quatres cartes');
    }
    if (
      carteAjouer != 5 &&
      carteAjouer != 6 &&
      carteAjouer != 7 &&
      carteAjouer != 8
    ) {
      // On ajoute la carte a la banque
      cartes.push(carte_depart);
      // On boxe les cartes
      cartes = init_(cartes);
      // On remplace la carte principale dans le jeu
      carte_depart = carteAjouer;
    } else {
      // Il a jouer un 2 transparent
      // On ajoute le transparent a la banque
      cartes.push(carteAjouer);
      // On boxe les cartes
      cartes = init_(cartes);
    }
    // On retire la carte jouer
    console.log('old length' + cartesJouers[1].length);
    cartesJouers[1].splice(cartesJouers[1].indexOf(carte_depart), 1);
    console.log('new length' + cartesJouers[1].length);

    this.parentNode.removeChild(this);

    $('#center_game').innerHTML = '';
    $('#center_game').appendChild(this);

    initUI();
    resetBanque();
    drag_carte();
    $('.cartes_banques img:last-child').onclick = piocher;
  } else {
    this.style.transform = 'translateY(0px)';
  }
  // console.log(this);
}
