function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function init_(arr) {
  return shuffleArray(arr);
}
function binarySearch(sortedArray, key) {
  let start = 0;
  let end = sortedArray.length - 1;

  while (start <= end) {
    let middle = Math.floor((start + end) / 2);

    if (sortedArray[middle] === key) {
      // found the key
      return middle;
    } else if (sortedArray[middle] < key) {
      // continue searching to the right
      start = middle + 1;
    } else {
      // search searching to the left
      end = middle - 1;
    }
  }
  // key wasn't found
  return -1;
}

let cardCorrespondance_brut = [];
for (let j = 1; j <= 48; j++) {
  let extraCoress = [];
  if (j >= 5) {
    for (let l = 1; l <= j; l++) {
      if ((j - l) % 4 == 0) {
        extraCoress.push(l);
      }
    }
  }

  cardCorrespondance_brut.push(
    [
      j + 4,
      j + 4 * 2,
      j + 4 * 3,
      j + 4 * 4,
      j + 4 * 5,
      j + 4 * 6,
      j + 4 * 7,
      j + 4 * 8,
      j + 4 * 9,
      j + 4 * 10,
      j + 4 * 11,
    ].concat(extraCoress)
  );

  extraCoress = [];
}
// removing combinaisons that are out of range!
let cardCorrespondance = [];
cardCorrespondance_brut.forEach(function (cores_array) {
  let temp_corres = [];
  cores_array.forEach(function (coress_item) {
    if (coress_item <= 48) {
      temp_corres.push(coress_item);
    }
  });
  cardCorrespondance.push(temp_corres);
  temp_corres = [];
});

// Correspondance entre les chiffres

let initial = 0;
for (var g = 0; g <= 11; g++) {
  cardCorrespondance[initial].push(
    initial + 1,
    initial + 2,
    initial + 3,
    initial + 4,
    49,
    5,
    6,
    7,
    8,
    50,
    51,
    52
  );

  cardCorrespondance[initial + 1].push(
    initial + 1,
    initial + 2,
    initial + 3,
    initial + 4,
    49,
    5,
    6,
    7,
    8,
    50,
    51,
    52
  );

  cardCorrespondance[initial + 2].push(
    initial + 1,
    initial + 2,
    initial + 3,
    initial + 4,
    49,
    5,
    6,
    7,
    8,
    50,
    51,
    52
  );

  cardCorrespondance[initial + 3].push(
    initial + 1,
    initial + 2,
    initial + 3,
    initial + 4,
    49,
    5,
    6,
    7,
    8,
    50,
    51,
    52
  );

  // Ajout correspondances joker noir aux cartes
  if ((initial + 1) % 4 == 1 || (initial + 1) % 4 == 0) {
    cardCorrespondance[initial].push(53);
  }
  if ((initial + 2) % 4 == 1 || (initial + 2) % 4 == 0) {
    cardCorrespondance[initial + 1].push(53);
  }
  if ((initial + 3) % 4 == 1 || (initial + 3) % 4 == 0) {
    cardCorrespondance[initial + 2].push(53);
  }
  if ((initial + 4) % 4 == 1 || (initial + 4) % 4 == 0) {
    cardCorrespondance[initial + 3].push(53);
  }

  // Ajout correspondances joker rouge aux cartes
  if ((initial + 1) % 4 == 2 || (initial + 1) % 4 == 3) {
    cardCorrespondance[initial].push(54);
  }
  if ((initial + 2) % 4 == 2 || (initial + 2) % 4 == 3) {
    cardCorrespondance[initial + 1].push(54);
  }
  if ((initial + 3) % 4 == 2 || (initial + 3) % 4 == 3) {
    cardCorrespondance[initial + 2].push(54);
  }
  if ((initial + 4) % 4 == 2 || (initial + 4) % 4 == 3) {
    cardCorrespondance[initial + 3].push(54);
  }
  initial += 4;
}

// Ajout des correspondances des J-Commandes
for (let i = 0; i < 4; i++) {
  let corress = [];
  for (let j = 1; j <= 52; j++) {
    if (j != 25 && j != 26 && j != 27 && j != 28) {
      corress.push(j);
    }
  }
  cardCorrespondance.push(corress);
  corress = [];
}
// Ajout des correspodances des cartes JokerNoir JoketRouge
let coreJN = [25, 26, 27, 28];
let coreJR = [25, 26, 27, 28];
for (let i = 1; i <= 2; i++) {
  for (let k = 1; k <= 54; k++) {
    if (k % 4 == 1 || k % 4 == 0) {
      coreJN.push(k);
    } else {
      coreJR.push(k);
    }
  }
}
cardCorrespondance.push(coreJN);
cardCorrespondance.push(coreJR);
console.log('Correspondances entre les cartes');
console.log(cardCorrespondance);

let cartes = [];
let nombreJoueurs = 2;
const nombre_de_cartes = 4;
let cartesJouers = [];
// On boxe les cartes
for (var k = 1; k <= 54; k++) {
  cartes.push(k);
}
cartes = init_(cartes);

// Determination de la carte de depart
let carte_depart = cartes[0];

// on retire la carte de depart sur les cartes initiales
cartes.splice(0, 1);

// On partage les cartes

let copyArray = cartes;
for (let i = 0; i < nombreJoueurs; i++) {
  cartesJouers.push([
    cartes[cartes.indexOf(cartes[i])],
    cartes[cartes.indexOf(cartes[i + nombreJoueurs])],
    cartes[cartes.indexOf(cartes[i + 2 * nombreJoueurs])],
    cartes[cartes.indexOf(cartes[i + 3 * nombreJoueurs])],
  ]);
}
cartes.splice(0, 8);

let extraPlayerCards = 0;
let extraComputerCards = 0;

function initUI() {
  $('#extra_cards_container').innerHTML = '';
  let loopLimit = cartesJouers[1].length;
  let compuCardsLimit = cartesJouers[0].length;

  if (loopLimit >= 8) {
    loopLimit = 7;

    extraPlayerCards = cartesJouers[1].length - 7;
    $('#player_extra_cards').classList.add('showExtraCard_active');
    $('#player_extra_cards').innerHTML = `+ ${extraPlayerCards}`;

    for (let i = 0; i < extraPlayerCards; i++) {
      $('#extra_cards_container').innerHTML += `
    <img src="cartes_images/${
      cartesJouers[1][i + 7]
    }.png" alt="" class="carte" card_id=${cartesJouers[1][i + 7]}/>
    `;
    }
  } else {
    extraPlayerCards = 0;
    $('#player_extra_cards').innerHTML = '';
    $('#player_extra_cards').classList.remove('showExtraCard_active');
  }

  if (compuCardsLimit >= 8) {
    compuCardsLimit = 7;

    extraComputerCards = cartesJouers[0].length - 7;
    $('#computer_extra_cards').classList.add('showExtraCard_active');
    $('#computer_extra_cards').innerHTML = `+ ${extraComputerCards}`;
  } else {
    extraComputerCards = 0;
    $('#computer_extra_cards').innerHTML = '';
    $('#computer_extra_cards').classList.remove('showExtraCard_active');
  }

  $('#player').innerHTML = '';
  for (let i = 0; i < loopLimit; i++) {
    $('#player').innerHTML += `
    <img
    src="cartes_images/${cartesJouers[1][i]}.png"
    alt=""
    class="carte"
    draggable="true"
    card_id=${cartesJouers[1][i]}
    />
    `;
  }

  // Reset computer cards
  $('#computer').innerHTML = '';
  for (let i = 0; i < compuCardsLimit; i++) {
    $('#computer').innerHTML += `
    <img
    src="cartes_images/${cartesJouers[0][i]}.png"
    alt=""
    class="carte"
    draggable="true"
    card_id=${cartesJouers[0][i]}
    />
    `;
  }

  function addActiveToExtraCardsContainer() {
    $('.extraCardContainer').classList.contains('extraCardContainer_active')
      ? $('.extraCardContainer').classList.remove('extraCardContainer_active')
      : $('.extraCardContainer').classList.add('extraCardContainer_active');
  }

  $('#player_extra_cards').onmouseover = addActiveToExtraCardsContainer;

  $('#player_extra_cards').onclick = addActiveToExtraCardsContainer;
  $('.extraCardContainer').onmouseout = addActiveToExtraCardsContainer;
  $('.extraCardContainer').onclick = addActiveToExtraCardsContainer;

  $('.players_pannel').onclick = addActiveToExtraCardsContainer;

  // Reset banque
  $('#banques').innerHTML = '';
  for (let i = 0; i < cartes.length; i++) {
    $('#banques').innerHTML += `
    <img
    src="cartes_images/back.png"
    alt=""
    class="carte"
    card_id=${cartes[i]}
    />
    `;
  }

  // Reset carte de depart
  $('#center_game').innerHTML = ` <img
  src="cartes_images/${carte_depart}.png"
  alt=""
  class="carte"
  card_id=${carte_depart}
  />`;
}

initUI();

function piocher() {
  $('.extraCardContainer').classList.add('extraCardContainer_active');
  cartesJouers[1].push(cartes[0]);
  cartes.splice(0, 1);

  render();
  $('.cartes_banques img:last-child').onclick = piocher;
}

$('.cartes_banques img:last-child').onclick = piocher;

let id = setInterval(computerPlay, 2000);
function computerPlay() {
  if (cartesJouers[0].length == 0 || cartesJouers[1].length == 0) {
    clearInterval(id);
    alert('Jeu over');
  }
  let cardCoress = cardCorrespondance[carte_depart - 1];
  let DontHaveCard = true;

  let i = 0;
  while (DontHaveCard) {
    if (cardCoress.indexOf(cartesJouers[0][i]) != -1) {
      // On ajoute les cartes au cas ou il s'agit d'un pic
      if (
        cartesJouers[0][i] == 25 ||
        cartesJouers[0][i] == 26 ||
        cartesJouers[0][i] == 27 ||
        cartesJouers[0][i] == 28
      ) {
        cartesJouers[1].push(cartes[0], cartes[1]);
        cartes.splice(0, 2);
        console.log('Afrographics ramasse deux cartes');
      }
      if (cartesJouers[0][i] == 53 || cartesJouers[0][i] == 54) {
        cartesJouers[1].push(cartes[0], cartes[1], cartes[2], cartes[3]);
        cartes.splice(0, 4);
        console.log('Afrographics ramasse quatres cartes');
      }
      // The computer found the card
      DontHaveCard = false;

      if (
        cartesJouers[0][i] != 5 &&
        cartesJouers[0][i] != 6 &&
        cartesJouers[0][i] != 7 &&
        cartesJouers[0][i] != 8
      ) {
        cartes.push(carte_depart);
        cartes = init_(cartes);
        carte_depart = cartesJouers[0][i];
      } else {
        // Il a jouer un 2 transparent
        // On ajoute le transparent a la banque
        cartes.push(cartesJouers[0][i]);
        // On boxe les cartes
        cartes = init_(cartes);
      }

      cartesJouers[0].splice(cartesJouers[0].indexOf(cartesJouers[0][i]), 1);
      render();
      $('.cartes_banques img:last-child').onclick = piocher;
      return cartesJouers[0][i];
    } else {
      if (i == cartesJouers[0].length - 1) {
        // The computer don't have the card
        cartesJouers[0].push(cartes[0]);
        cartes.splice(0, 1);
        render();
        $('.cartes_banques img:last-child').onclick = piocher;
        DontHaveCard = false;
        return false;
      } else {
        // We continue the search
        i++;
      }
    }
  }
}

function render() {
  initUI();
  resetBanque();
  drag_carte();
}
