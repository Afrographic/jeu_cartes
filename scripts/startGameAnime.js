let computersCards = $$("#computer .carte");
let playerCards = $$("#player .carte");

var lastCardElement = $$("#banques .carte")[
  $$("#banques .carte").length - 1
].getBoundingClientRect();

let startCoords = {
  x: lastCardElement.left,
  y: lastCardElement.top,
};
let InitialPositions = [];

for (var j = 0; j < 4; j++) {
  setInitialPosition(computersCards[j]);
  setInitialPosition(playerCards[j]);
}

// function setInitialPosition(card) {
//   card.style.position = "fixed";
//   card.style.zIndex = "10";
//   card.style.top = "505px";
//   card.style.left = "100px";
// }

function setInitialPosition(card) {
  card.setAttribute("src", "cartes_images/back.png");
  let positionOBJ = card.getBoundingClientRect();
  let iniCoords = {
    x: positionOBJ.left,
    y: positionOBJ.top,
  };

  InitialPositions.push(iniCoords);

  card.style.position = "fixed";
  card.style.zIndex = "10";
  card.style.top = startCoords.y + "px";
  card.style.left = startCoords.x + "px";
}

function animCards() {
  let i = 0;
  var id = setInterval(function () {
    if (i == 4) {
      clearInterval(id);

      // Opeeing the user cards
      for (let k = 0; k < 4; k++) {
        let numCard = playerCards[k].getAttribute("card_id");
        playerCards[k].setAttribute("src", `cartes_images/${numCard}.png`);
      }
    } else {
      console.log(getPosition(computersCards[i]));

      moveCards({
        card: computersCards[i],
        endPos: { x: 400 + (i + 1) * 140, y: -500 },
      });

      moveCards({
        card: playerCards[i],
        endPos: { x: 400 + (i + 1) * 140, y: 20 },
      });

      i++;
    }
  }, 100);
}

// function moveCards({ card, startPos, endPos }) {
//   card.style.transform = `translate(${startPos.x}px, ${startPos.y}px)`;
// }

function moveCards({ card, endPos }) {
  card.style.transform = `translate(${endPos.x}px, ${endPos.y}px)`;
}

function getPosition(_el) {
  var target = _el,
    target_width = target.offsetWidth,
    target_height = target.offsetHeight,
    target_left = target.offsetLeft,
    target_top = target.offsetTop,
    gleft = 0,
    gtop = 0,
    rect = {};

  var moonwalk = function (_parent) {
    if (!!_parent) {
      gleft += _parent.offsetLeft;
      gtop += _parent.offsetTop;
      moonwalk(_parent.offsetParent);
    } else {
      return (rect = {
        top: target.offsetTop + gtop,
        left: target.offsetLeft + gleft,
        bottom: target.offsetTop + gtop + target_height,
        right: target.offsetLeft + gleft + target_width,
      });
    }
  };
  moonwalk(target.offsetParent);
  return rect;
}
