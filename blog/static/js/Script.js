const slideshow = document.getElementById("slideshow");
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
    const images = slideshow.getElementsByTagName("img");
    let currentIndex = 0;
    
    function updateSlideshow(direction) {
      if (direction === "prev") {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
      } else {
        currentIndex = (currentIndex + 1) % images.length;
      }
    
      images[currentIndex].classList.add("active");
      images[(currentIndex + 1) % images.length].classList.add("next");
      images[(currentIndex - 1 + images.length) % images.length].classList.add("previous");
    
      setTimeout(() => {
        images[(currentIndex + 1) % images.length].classList.remove("next");
        images[(currentIndex - 1 + images.length) % images.length].classList.remove("previous");
    
        for (let i = 0; i < images.length; i++) {
          if (i !== currentIndex) {
            images[i].classList.remove("active");
          }
        }
      }, 1000);
    }
    
    let slideshowInterval = setInterval(() => updateSlideshow("next"), 5000);
    
    slideshow.addEventListener("mouseenter", () => clearInterval(slideshowInterval));
    slideshow.addEventListener("mouseleave", () => slideshowInterval = setInterval(() => updateSlideshow("next"), 5000));
    
    prevButton.addEventListener("click", () => updateSlideshow("prev"));
    nextButton.addEventListener("click", () => updateSlideshow("next"));
    