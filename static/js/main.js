(function (w) {

  $(".button-collapse").sideNav();
  $('.parallax').parallax();
  $(".dropdown-button").dropdown({hover: false});

  const anchors = document.querySelectorAll('a');
  anchors.forEach(a => {
    if (location.pathname === a.getAttribute('href')) {
      a
        .classList
        .add('active');
    }
  });

})(window);