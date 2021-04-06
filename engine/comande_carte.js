function comanderCarte(pc_card) {
  console.log("le pc commande une carte");
  let occurencesCartes = [];
  let CarteACommander;
  pc_card.forEach(function (card_item) {
    let o_c = 0;
    let criteria = card_item %4 ;
    pc_card.forEach(function (card_item_c) {
      if (card_item_c % 4 == criteria) {
        o_c++;
      }
    });
    occurencesCartes.push(o_c);
  });

  console.log(occurencesCartes);
  // let's find the max
  let maxValue = Math.max.apply(null, occurencesCartes);

  // let's find the index of that value
  let NotFound = true;
  let i = 0;
  let max_index;
  while (NotFound) {
    if (occurencesCartes[i] == maxValue) {
      max_index = i;
      NotFound = false;
    } else {
      i++;
    }
  }

  // carte a jouer
  CarteACommander = pc_card[max_index];
  return CarteACommander;
}
