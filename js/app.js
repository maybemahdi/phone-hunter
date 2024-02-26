document.getElementById("buy-now").addEventListener("click", function (e) {
    e.preventDefault();
    let href = this.getAttribute("href");
    document.querySelector(href).scrollIntoView({
      behavior: "smooth",
    });
  });