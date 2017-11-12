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

  let corrA = [0, null];
  anchors.forEach(a => {
    const path = location.pathname;
    const href = a.getAttribute("href");
    const length = href.length;
    const startsWith = path.slice(0, length);
    if (startsWith === href && length > corrA[0]) {
      corrA[0] = length;
      corrA[1] = a;
    }
  });
  corrA[1].classList.add("active");
})(window);
