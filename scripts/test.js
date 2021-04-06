function moveJCommandeEndAndStopFront(carte_pc) {
  let J_commandesArray = [];
  let CarresSansJ = [];
  let StopArray = [];
  carte_pc.forEach(function (card_item) {
    if (
      card_item == 52 ||
      card_item == 50 ||
      card_item == 51 ||
      card_item == 49
    ) {
      J_commandesArray.push(card_item);
    } else if (
      card_item == 1 ||
      card_item == 2 ||
      card_item == 3 ||
      card_item == 4
    ) {
      StopArray.push(card_item);
    } else {
      CarresSansJ.push(card_item);
    }
  });

  carte_pc = StopArray.concat(CarresSansJ.concat(J_commandesArray));

  console.log(StopArray);
  console.log(CarresSansJ);
  console.log(J_commandesArray);
  console.log(carte_pc);
  return carte_pc;
}

moveJCommandeEndAndStopFront([7, 3, 11, 18]);
