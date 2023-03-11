$(document).ready(function () {
  $(window).scroll(function () {
    // sticky customNavbar on scroll script
    if (this.scrollY > 20) {
      $(".customNavbar").addClass("sticky");
    } else {
      $(".customNavbar").removeClass("sticky");
    }

    // scroll-up button show/hide script
    if (this.scrollY > 500) {
      $(".scroll-up-btn").addClass("show");
    } else {
      $(".scroll-up-btn").removeClass("show");
    }
  });

  // slide-up script
  $(".scroll-up-btn").click(function () {
    $("html").animate({ scrollTop: 0 });
    // removing smooth scroll on slide-up button click
    $("html").css("scrollBehavior", "auto");
  });

  $(".customNavbar .menu li a").click(function () {
    // applying again smooth scroll on menu items click
    $("html").css("scrollBehavior", "smooth");
  });

  // toggle menu/customNavbar script
  $(".menu-btn").click(function () {
    $(".customNavbar .menu").toggleClass("active");
    $(".menu-btn i").toggleClass("active");
  });

  // typing text animation script
  var typed = new Typed(".typing", {
    strings: ["Software Developer", "U.I Designer"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  });

  var typed = new Typed(".typing-2", {
    strings: ["Software Developer", "U.I Designer"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  });
  const card = document.querySelector(".card");
  const see_more = document.querySelector(".see-more");
  const go_back = document.querySelector(".go-back");

  see_more.addEventListener("click", () => card.classList.toggle("flipped"));
  go_back.addEventListener("click", () => card.classList.toggle("flipped"));
  // owl carousel script
  $(".carousel").owlCarousel({
    margin: 20,
    loop: true,
    autoplay: true,
    autoplayTimeOut: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      600: {
        items: 2,
        nav: false,
      },
      1000: {
        items: 3,
        nav: false,
      },
    },
  });
});
