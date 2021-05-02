// UI Changing
function resetBanque() {
  let imgs_banques = $$(".banque img");
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

  let PoxX = 0;
  let imgs_milieu = $$(".centerCardRederer img");
  imgs_milieu.forEach(function (imgs_milieu_item) {
    imgs_milieu_item.style.cssText = `
      left:${PoxX}px;
    `;
    PoxX += 30;
  });
}
resetBanque();
let card_to_play;
let card_accepted = false;

// Iplementing the draggable functionnality
// Droppable area
$("#center_game").addEventListener("dragover", dragover);
$("#center_game").addEventListener("dragenter", dragenter);
$("#center_game").addEventListener("dragleave", dragleave);
$("#center_game").addEventListener("drop", drop);

// Draagable events
function dragover(e) {
  e.preventDefault();
  // //console.log(this);
}
function dragenter() {}
function dragleave() {}

function drop(e) {
  e.preventDefault();
  //console.log(card_to_play);
}

function drag_carte() {
  let a = Array.from($$(".player_side .carte"));
  let b = Array.from($$("#extra_cards_container .carte"));
  let player_cards = a.concat(b);
  player_cards.forEach(function (playerCard) {
    playerCard.addEventListener("dragstart", dragStart);
    playerCard.addEventListener("dragend", dragEnd);
    playerCard.addEventListener("click", dragEnd);
  });
}
drag_carte();
// drag functions
function dragStart() {
  card_to_play = this;
  this.style.opacity = 0;
  this.style.transform = "translateY(-8px)";
  //console.log(this);
}

let picker;
function dragEnd() {
  player(this);
}

// Gestion des Jcommandes cardes choiisis

function HideJcommandeCards(card_id) {
  $(".alertBox").classList.remove("alertBox_active");
  $(".overlay").classList.remove("overlay_active");

  card_id = parseInt(card_id);
  jCommande_correspondance = cardCorrespondance[card_id - 1];
  jCommande_correspondance.push(card_id);
  // Onretire les cartes correspondant par numero
  jCommande_correspondance.splice(11, 4);
  computerPlay();

  //console.log(jCommande_correspondance);
  // render();
}
