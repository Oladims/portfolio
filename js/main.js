// Make sure sw are supported
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('../sw_cached_pages.js')
//       .then(reg => console.log('Service Worker: Registered (Pages)'))
//       .catch(err => console.log(`Service Worker: Error: ${err}`));
//   });
// }

$(function() {
  const d = new Date();
  const hours = d.getHours();
  const night = hours >= 19 || hours <= 7; // between 7pm and 7am
  const body = document.querySelector("body");
  const toggle = document.getElementById("toggle");
  const input = document.getElementById("switch");
  const title = document.querySelectorAll(".section__title");
  const content = document.querySelectorAll(".section__content");
  const hand = document.querySelector(".emoji.wave-hand");
  let options = {};

  if (night) {
    input.checked = true;
    body.classList.add("night");
  }

  toggle.addEventListener("click", function() {
    const isChecked = input.checked;
    isChecked ? body.classList.remove("night") : body.classList.add("night");
  });

  const introHeight = document.querySelector(".intro").offsetHeight;
  const topButton = document.getElementById("top-button");
  const images = document.querySelectorAll(".images");
  const $topButton = $("#top-button");

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > introHeight) {
        $topButton.fadeIn();
      } else {
        $topButton.fadeOut();
      }
    },
    false
  );

  topButton.addEventListener("click", function() {
    $("html, body").animate({ scrollTop: 0 }, 500);
  });

  const waveOnLoad = () => {
    hand.classList.add("wave");
    setTimeout(() => {
      hand.classList.remove("wave");
    }, 2000);
  };

  setTimeout(function() {
    waveOnLoad();
  }, 2000);

  hand.addEventListener("mouseover", function() {
    hand.classList.add("wave");
  });

  hand.addEventListener("mouseout", function() {
    hand.classList.remove("wave");
  });

  const changeColor = () => {
    const textcolors = ["#5cd1f3", "#835cf3", "#8d38e4", "#f35c5c", "#b1f35c"];
    let textcolor = textcolors[Math.floor(Math.random() * textcolors.length)];
    $("#tip").css({ color: `${textcolor}` });
  };

  const animatecolor = () => {
    setInterval(changeColor, 3000);
  };
  $(document).ready(animatecolor);

  confetti.start();

  const handleIntersectTitle = (entries, observer) =>
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        confetti.stop();
        entry.target.classList.add("fadeInLeft");
        observer.unobserve(entry.target);
      } else {
      }
    });

  const handleIntersectContent = (entries, observer) =>
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        confetti.stop();
        entry.target.classList.add("fadeInRight");
        observer.unobserve(entry.target);
      } else {
      }
    });

  const handleIntersectImg = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;
        // console.log(entry.target);
        observer.unobserve(entry.target);
      } else {
      }
    });
  };

  observeImg = new IntersectionObserver(handleIntersectImg, options);

  observeTitle = new IntersectionObserver(handleIntersectTitle, options);

  observeContent = new IntersectionObserver(handleIntersectContent, options);

  images.forEach(image => {
  observeImg.observe(image);
  });
  title.forEach(tit => {
    observeTitle.observe(tit);
  });
  content.forEach(con => {
    observeContent.observe(con);
  });
});
