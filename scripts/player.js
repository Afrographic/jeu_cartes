function player(that) {
  that.style.opacity = 1;
  let carteAjouer = parseInt(that.getAttribute('card_id'));
  let c_carteDansLeJeu;
  if (jCommande_correspondance.length == 0) {
    c_carteDansLeJeu = cardCorrespondance[carte_depart - 1];
  } else {
    c_carteDansLeJeu = jCommande_correspondance;
  }
  console.log(c_carteDansLeJeu);
  // SI l'ordinateur joue une J-commade
  if (
    carteAjouer == 49 ||
    carteAjouer == 50 ||
    carteAjouer == 51 ||
    carteAjouer == 52
  ) {
    ShowJcommandeCards();
    console.log('VOus avez jouez une J_Commande');
  }

  if (c_carteDansLeJeu.indexOf(carteAjouer) !== -1) {
    transformX += 15;
    $('.centerCardRederer').style.transform = `translateX(-${transformX}px)`;
    if (jCommande_correspondance.length != 0) {
      jCommande_correspondance = [];
    }
    if ($('.pc_commade').style.opacity == '1') {
      $('.pc_commade').style.opacity = '0';
      $('.pc_commade').style.transform = 'translateY(16px)';
    }
    // Gestion de la J-Commade
    picker = false;
    // On ajoute les cartes au cas ou il s'agit d'un pic
    if (
      carteAjouer == 25 ||
      carteAjouer == 26 ||
      carteAjouer == 27 ||
      carteAjouer == 28
    ) {
      carteARamasser += 2;
      if(cartesJouers[0].indexOf(25)==-1 && cartesJouers[0].indexOf(26)==-1 &&
      cartesJouers[0].indexOf(27)==-1 && cartesJouers[0].indexOf(28)==-1 && 
      cartesJouers[0].indexOf(53)==-1 && cartesJouers[0].indexOf(54)==-1 ){

        for( let i = 0 ; i < carteARamasser ; i++){
          cartesJouers[0].push(cartes[i]);
        }

       
        cartes.splice(0, carteARamasser);
        picker = true;
        carteARamasser = 0;
      }
        
        console.log("Voici les cartes a ramasser maintenant");
        console.log(carteARamasser);

     
      // console.log('PC ramasse deux cartes');
    }
    if (carteAjouer == 53 || carteAjouer == 54) {
      carteARamasser += 4;

      if(cartesJouers[0].indexOf(25)==-1 && cartesJouers[0].indexOf(26)==-1 &&
      cartesJouers[0].indexOf(27)==-1 && cartesJouers[0].indexOf(28)==-1 && 
      cartesJouers[0].indexOf(53)==-1 && cartesJouers[0].indexOf(54)==-1 ){

        for( let i = 0 ; i < carteARamasser ; i++){
          cartesJouers[0].push(cartes[i]);
        }

        // cartesJouers[0].push(cartes[0], cartes[1], cartes[2], cartes[3]);
        cartes.splice(0, carteARamasser);
        picker = true;
        carteARamasser = 0;
      }
       
      console.log("Voici les cartes a ramasser maintenant");
      console.log(carteARamasser);
 
      
      // console.log('PC ramasse quatres cartes');
    }
    // Gestion des 2 transparent
    if (
      carteAjouer != 5 &&
      carteAjouer != 6 &&
      carteAjouer != 7 &&
      carteAjouer != 8
    ) {
      // On ajoute la carte a la banque
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

      $('#centerCardCOntainer').innerHTML += `<img
      src="cartes_images/${carteAjouer}.png"
      alt=""
      class="carte"
      />`;
      // On remplace la carte principale dans le jeu
      carte_depart = carteAjouer;
    } else {
      $('#centerCardCOntainer').innerHTML =
        `<img
      src="cartes_images/${carteAjouer}.png"
      alt=""
      class="carte"
      />` + $('#centerCardCOntainer').innerHTML;
      // Il a jouer un 2 transparent , anisi la carte de depart stays the same
      // On ajoute le transparent a la banque

      if (carteAMettreBanque.length < 25) {
        carteAMettreBanque.push(carteAjouer);
      } else {
        cartes = cartes.concat(carteAMettreBanque);
        cartes = init_(cartes);
        carteAMettreBanque = [];

        transformX = 0;
        $('.centerCardRederer').style.transform = `translateX(-15px)`;

        let lastChild = $('#centerCardCOntainer').lastElementChild;
        $('#centerCardCOntainer').innerHTML = '';
        $('#centerCardCOntainer').appendChild(lastChild);
      }
      // On retire cette carte sur les mains du joeur
    }

    // On retire la carte jouer sur les mains du joeur
    cartesJouers[1].splice(cartesJouers[1].indexOf(carteAjouer), 1);

    // On boxe les cartes
    cartes = init_(cartes);
    that.parentNode.removeChild(that);

    // $('#center_game').innerHTML = '';

    render();
    if (cartesJouers[1].length == 0) {
      setTimeout(function () {
        gameover(true);
      }, 500);
    }
    // l'ordinateur joue quand ils ne s'agit pas d;une Jcommande
    if (
      carteAjouer != 49 &&
      carteAjouer != 50 &&
      carteAjouer != 51 &&
      carteAjouer != 52 &&
      picker == false &&
      carteAjouer != 1 &&
      carteAjouer != 2 &&
      carteAjouer != 3 &&
      carteAjouer != 4 &&
      cartesJouers[1].length != 0
    ) {
      computerPlay();
      picker = false;
    }
  } else {
    that.style.transform = 'translateY(0px)';
  }
  // console.log(that);
}
