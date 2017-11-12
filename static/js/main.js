(function(w) {
  const anchors = document.querySelectorAll("a");
  const textareas = document.querySelectorAll("textarea[required]");
  const flashes = document.querySelectorAll(".flash");
  const flRem = document.querySelectorAll(".flash--remover");
  const remFlash = f => {
    f.classList.add("flipOutY");
  };

  textareas.forEach(el => {
    el.addEventListener("blur", function(e) {
      console.log(e.target);
      if (e.target.value.length === 0) {
        e.target.classList.add("invalid");
        e.target.classList.remove("valid");
      } else {
        e.target.classList.remove("invalid");
        e.target.classList.add("valid");
      }
    });
  });

  $(".button-collapse").sideNav();
  $(".parallax").parallax();
  $(".dropdown-button").dropdown({ hover: false });

  flRem.forEach(e =>
    e.addEventListener("click", function() {
      remFlash(this.parentElement);
    })
  );

  flashes.forEach((f, i) => {
    setTimeout(() => {
      remFlash(f);
    }, 3500 + 750 * i);
  });

  anchors.forEach(a => {
    if (location.pathname === a.getAttribute("href")) {
      a.classList.add("active");
    }
  });
})(window);
