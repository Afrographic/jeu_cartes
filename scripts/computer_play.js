// let id = setInterval(computerPlay, 2000);
let computerReplay;
let pikOngame = false;
function computerPlay() {
  cartesJouers[0] = moveJCommandeEndAndStopFront(cartesJouers[0]);
  let cardCoress;
  let DontHaveCard = true;
  computerReplay = false;

  if (jCommande_correspondance.length == 0) {
    cardCoress = cardCorrespondance[carte_depart - 1];
  } else {
    cardCoress = jCommande_correspondance;
  }

  let i = 0;
  console.log('Computer fucking cards');
  console.log(cartesJouers[0]);
  while (DontHaveCard) {
    if (cardCoress.indexOf(cartesJouers[0][i]) != -1) {
      // jCommande_correspondance = [];
      if (jCommande_correspondance.length != 0) {
        jCommande_correspondance = [];
      }

      if ($('.pc_commade').style.opacity == '1') {
        $('.pc_commade').style.opacity = '0';
        $('.pc_commade').style.transform = 'translateY(16px)';
      }
      // The computer found the card
      DontHaveCard = false;
      // On ajoute les cartes du jouer au cas ou il s'agit d'un pic
      if (
        cartesJouers[0][i] == 25 ||
        cartesJouers[0][i] == 26 ||
        cartesJouers[0][i] == 27 ||
        cartesJouers[0][i] == 28
      ) {
        carteARamasser += 2;

        if (
          cartesJouers[1].indexOf(25) == -1 &&
          cartesJouers[1].indexOf(26) == -1 &&
          cartesJouers[1].indexOf(27) == -1 &&
          cartesJouers[1].indexOf(28) == -1 &&
          cartesJouers[1].indexOf(53) == -1 &&
          cartesJouers[1].indexOf(54) == -1
        ) {
          for (let i = 0; i < carteARamasser; i++) {
            cartesJouers[1].push(cartes[i]);
          }

          cartes.splice(0, carteARamasser);
          computerReplay = true;
          carteARamasser = 0;
        } else {
          pikOngame = true;
        }
        console.log('Voici les cartes a ramasser maintenant');
        console.log(carteARamasser);
      }
      if (cartesJouers[0][i] == 53 || cartesJouers[0][i] == 54) {
        carteARamasser += 4;
        if (
          cartesJouers[1].indexOf(25) == -1 &&
          cartesJouers[1].indexOf(26) == -1 &&
          cartesJouers[1].indexOf(27) == -1 &&
          cartesJouers[1].indexOf(28) == -1 &&
          cartesJouers[1].indexOf(53) == -1 &&
          cartesJouers[1].indexOf(54) == -1
        ) {
          for (let i = 0; i < carteARamasser; i++) {
            cartesJouers[1].push(cartes[i]);
          }
          cartes.splice(0, carteARamasser);
          computerReplay = true;
          carteARamasser = 0;
        } else {
          pikOngame = true;
        }
        console.log('Voici les cartes a ramasser maintenant');
        console.log(carteARamasser);

        // cartes.splice(0, 4);
        // computerReplay = true;
      }

      if (
        cartesJouers[0][i] == 1 ||
        cartesJouers[0][i] == 2 ||
        cartesJouers[0][i] == 3 ||
        cartesJouers[0][i] == 4
      ) {
        computerReplay = true;
      }

      // Quand l'oridinateur veut commander
      if (
        cartesJouers[0][i] == 49 ||
        cartesJouers[0][i] == 50 ||
        cartesJouers[0][i] == 51 ||
        cartesJouers[0][i] == 52
      ) {
        // L'ordinateur a jouer une J-Commande
        // Faut maintenant qu'il choissisent la bonne carte
        // On cherche le nombre max de carte de meme type qu'il a
        // et on commande sa dans un premier temps on suppose qu'il a des cartes ordinaires
        // sur la main
        let id_card_commader = comanderCarte(cartesJouers[0]);
        let carte_commande = '';
        let image_c = '';

        if (id_card_commader % 4 == 0) {
          carte_commande = 'Macabo noir';
          image_c = 'C_4';
          jCommande_correspondance = cardCorrespondance[3];
          jCommande_correspondance.push(4);
        } else if (id_card_commader % 4 == 1) {
          carte_commande = 'Arachide';
          image_c = 'C_1';
          jCommande_correspondance = cardCorrespondance[0];
          jCommande_correspondance.push(1);
        } else if (id_card_commader % 4 == 2) {
          carte_commande = 'Coeur';
          image_c = 'C_2';

          jCommande_correspondance = cardCorrespondance[1];
          jCommande_correspondance.push(2);
        } else if (id_card_commader % 4 == 3) {
          carte_commande = 'Biscuit';
          image_c = 'C_3';
          jCommande_correspondance = cardCorrespondance[2];
          jCommande_correspondance.push(3);
        }
        jCommande_correspondance.splice(11, 4);

        $('.pc_commade').style.opacity = '1';

        $('.pc_commade').innerHTML = `
              <p>Je commande</p>
              <div class='commande_carte'>
                <div class="pc_image">
                <img
                  src="cartes_images/${image_c}.png"
                  alt=""
                  class="carte"
                  onclick="HideJcommandeCards(2)"
                /></div>
                <div>${carte_commande}</div>
              </div>
              `;
      }

      if (
        cartesJouers[0][i] != 5 &&
        cartesJouers[0][i] != 6 &&
        cartesJouers[0][i] != 7 &&
        cartesJouers[0][i] != 8
      ) {
        if (carteAMettreBanque.length < 25) {
          carteAMettreBanque.push(carte_depart);
        } else {
          cartes = cartes.concat(carteAMettreBanque);
          cartes = init_(cartes);
          carteAMettreBanque = [];

          let lastChild = $('#centerCardCOntainer').lastElementChild;
          $('#centerCardCOntainer').innerHTML = '';
          $('#centerCardCOntainer').appendChild(lastChild);

          transformX = 0;
          $('.centerCardRederer').style.transform = `translateX(-15px)`;
        }
        carte_depart = cartesJouers[0][i];

        $('#centerCardCOntainer').innerHTML += `<img
        src="cartes_images/${cartesJouers[0][i]}.png"
        alt=""
        class="carte"
        />`;

        // On deplace un peu la zone de cartes centrale
        transformX += 15;
        $(
          '.centerCardRederer'
        ).style.transform = `translateX(-${transformX}px)`;
      } else {
        $('#centerCardCOntainer').innerHTML =
          `<img
      src="cartes_images/${cartesJouers[0][i]}.png"
      alt=""
      class="carte"
      />` + $('#centerCardCOntainer').innerHTML;
        // Il a jouer un 2 transparent
        // On ajoute le transparent a la banque

        if (carteAMettreBanque.length < 25) {
          carteAMettreBanque.push(cartesJouers[0][i]);
        } else {
          cartes = cartes.concat(carteAMettreBanque);
          cartes = init_(cartes);
          carteAMettreBanque = [];

          let lastChild = $('#centerCardCOntainer').lastElementChild;
          $('#centerCardCOntainer').innerHTML = '';
          $('#centerCardCOntainer').appendChild(lastChild);

          transformX = 0;
          $('.centerCardRederer').style.transform = `translateX(-15px)`;
        }
      }

      cartesJouers[0].splice(cartesJouers[0].indexOf(cartesJouers[0][i]), 1);
      if (cartesJouers[0].length == 0) {
        $('#loser').style.pointerEvents = 'none';
        setTimeout(function () {
          console.log('Vous avez perdu!');

          gameover(false);
        }, 2500);
      }

      render();
      if (pikOngame) {
        disableCardsActivatePick();
        pikOngame = false;
      }

      $('.cartes_banques img:last-child').onclick = piocher;

      // SI il joue le stop il joue encore
      console.log('Me the PC  play this');
      console.log(cartesJouers[0][i]);
      if (computerReplay == true && cartesJouers[0].length > 0) {
        console.log('Je suis censer rejouer');
        computerPlay();
      }
    } else {
      if (i == cartesJouers[0].length - 1) {
        // The computer don't have the card
        cartesJouers[0].push(cartes[0]);
        cartesJouers[0] = moveJCommandeEndAndStopFront(cartesJouers[0]);
        cartes.splice(0, 1);
        render();

        DontHaveCard = false;
      } else {
        // We continue the search

        i++;
      }
    }
  }
}

function disableCardsActivatePick() {
  $('.piocher_center').style.pointerEvents = 'none';
  $('.piocher').style.pointerEvents = 'none';
  $('.banque').style.pointerEvents = 'none';

  let CartesToDisable = [];
  let PlayerPIk = [];
  cartesJouers[1].forEach(function (card_num) {
    if (
      card_num == 25 ||
      card_num == 26 ||
      card_num == 27 ||
      card_num == 28 ||
      card_num == 53 ||
      card_num == 54
    ) {
      PlayerPIk.push(card_num);
    } else {
      CartesToDisable.push(card_num);
    }
  });

  console.log('Les cartes a desactiver');
  console.log(CartesToDisable);
  console.log('Les piques du joeurs');
  console.log(PlayerPIk);

  // console.log('Je teste sa ');
  // let card_nums = 47;
  // console.log($(`[card_id="${card_nums}"]`));

  // Disable others card and enable Power Card
  CartesToDisable.forEach(function (card_num) {
    console.log('Big fucujhjhjjjlllkkkk!!!!');
    console.log($(`[card_id="${card_num}"]`));
    $(`[card_id="${card_num}"]`).style.opacity = '0.4';
    $(`[card_id="${card_num}"]`).style.pointerEvents = 'none';
  });

  PlayerPIk.forEach(function (card_num) {
    console.log('Big fucujhjhjjjlllkkkk!!!!');
    console.log($(`[card_id="${card_num}"]`));
    $(`[card_id="${card_num}"]`).classList.add('blob');
    $(`[card_id="${card_num}"]`).classList.add('yellow');
  });
  // cartesJouers[1].push(cartes[0], cartes[1]);
  // cartes.splice(0, 2);
}
