(function (w) {

  const anchors = document.querySelectorAll('a');
  const flashes = document.querySelectorAll('.flash');
  const flRem = document.querySelectorAll('.flash--remover');
  const remFlash = f => {
    f
      .classList
      .add('flipOutY');
    console.log(flashes.length);
  };

  $(".button-collapse").sideNav();
  $('.parallax').parallax();
  $(".dropdown-button").dropdown({hover: false});

  flRem.forEach(e => e.addEventListener('click', function () {
    remFlash(this.parentElement);
  }));

  flashes.forEach((f, i) => {
    setTimeout(() => {
      remFlash(f);
    }, 7500 + 400 * i);
  });

  anchors.forEach(a => {
    if (location.pathname === a.getAttribute('href')) {
      a
        .classList
        .add('active');
    }
  });

})(window);