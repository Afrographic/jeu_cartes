function popper(htmlElement, message) {
  let div = document.createElement('div');
  // htmlElement.style.position = 'relative';
  div.className = 'popper_msg';
  div.innerHTML = message;
  htmlElement.appendChild(div);
  htmlElement.onmouseover = function () {
    div.classList.add('popper_msg_active');
  };
  htmlElement.onmouseout = function () {
    div.classList.remove('popper_msg_active');
  };
}

popper($('#arachide'), 'Arachide ou trefle');
popper($('#Coeur'), 'Coeur');
popper($('#Biscuit'), 'Biscuit');
popper($('#Macabo'), 'Macabo noir ou Pique');
popper($('.prono_container'), 'Cliquez pour recommencer la partie');
