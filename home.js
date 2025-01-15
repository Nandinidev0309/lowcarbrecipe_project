const imageList = [
  "https://media.istockphoto.com/id/1178381014/photo/vegetable-cutlets-served-hot-with-coriander-chutney-and-tomato-ketchup.jpg?b=1&s=612x612&w=0&k=20&c=kYxAuvwQcmu2qwSKcCStiz9kLxnafGxWOrBiH1-S5Xs=",
  "https://media.istockphoto.com/id/2088223899/photo/young-woman-enjoys-vegan-salad-at-outdoor-cafe.jpg?b=1&s=612x612&w=0&k=20&c=kCaFcHg1rYHby5NpD6HgXERsiOQf6AHxkbQ4u6RGS6U=",
  "https://media.istockphoto.com/id/1156304531/photo/hands-with-the-phone-close-up-pictures-of-food.jpg?b=1&s=612x612&w=0&k=20&c=RuX5dq95jPDa-FuCi2F6aBjkYpT_fsvBcv5LWn0Hj7I=",
  "https://cdn.pixabay.com/photo/2017/04/05/01/15/food-2203717_640.jpg",
  "https://cdn.pixabay.com/photo/2020/06/11/02/12/food-5284892_640.jpg",
  "https://cdn.pixabay.com/photo/2017/12/02/10/34/food-2992624_640.jpg",
  "https://cdn.pixabay.com/photo/2015/11/30/09/34/salad-1069916_640.jpg",
  "https://cdn.pixabay.com/photo/2019/04/22/16/47/easter-sunday-dinner-4147027_640.jpg",
  "https://cdn.pixabay.com/photo/2019/12/13/02/45/hotdog-4691967_640.jpg",
];

const galleryContainer = document.querySelector(".scrollable-gallery");
galleryContainer.innerHTML = imageList
  .map((src) => `<img src="${src}" alt="Food Item" class="gallery-image" />`)
  .join("");

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    hamburger.setAttribute("aria-expanded", isOpen);
    hamburger.querySelectorAll(".line").forEach((line, index) => {
      if (isOpen) {
        if (index === 0) line.style.transform = "rotate(45deg)";
        if (index === 1) line.style.opacity = "0";
        if (index === 2) line.style.transform = "rotate(-45deg)";
      } else {
        line.style.transform = "none";
        line.style.opacity = "1";
      }
    });
  });

  const links = document.querySelectorAll(".nav-link");
  const currentUrl = window.location.pathname;

  links.forEach((link) => {
    if (link.getAttribute("href") === currentUrl) {
      link.classList.add("isactive");
    }
  });
});
