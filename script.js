let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

// COLORS with WhatsApp links
const colors = [
  { name: "Red", link: "https://wa.me/2349012345678?text=Hey+Red+Team!" },
  { name: "Blue", link: "https://wa.me/2349012345679?text=Hey+Blue+Team!" },
  { name: "Green", link: "https://wa.me/2349012345680?text=Hey+Green+Team!" },
  { name: "Yellow", link: "https://wa.me/2349012345681?text=Hey+Yellow+Team!" }
];

// On load, check if user already exists
window.onload = () => {
  const existing = localStorage.getItem("sportcolour_user");
  if (existing) {
    const user = JSON.parse(existing);
    document.querySelector(".card").innerHTML = `
      <section class="slide active">
        <h2>Hi ${user.fullname}, you already got your colour 🎨</h2>
        <p>Your colour is <strong>${user.color}</strong></p>
        <a href="${getLink(user.color)}" target="_blank">Join WhatsApp Group</a>
        <p class="thank-you">Thanks for playing Sport Colour!</p>
        <button onclick="resetApp()">Start Over</button>
      </section>
    `;
  }
};

function nextSlide() {
  if (currentSlide < slides.length - 1) {
    slides[currentSlide].classList.remove("active");
    currentSlide++;
    slides[currentSlide].classList.add("active");
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    slides[currentSlide].classList.remove("active");
    currentSlide--;
    slides[currentSlide].classList.add("active");
  }
}

function getLink(colorName) {
  const match = colors.find(c => c.name === colorName);
  return match ? match.link : "#";
}

function lockColor() {
  const name = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const display = document.getElementById("color-display");

  if (!name || !email) {
    alert("Please enter your full name and email!");
    return;
  }

  let count = 0;
  const shuffle = setInterval(() => {
    const index = Math.floor(Math.random() * colors.length);
    display.innerText = colors[index].name;
    count++;

    if (count >= 20) {
      clearInterval(shuffle);

      const finalIndex = Math.floor(Math.random() * colors.length);
      const picked = colors[finalIndex];

      document.getElementById("final-message").innerText = `Hey ${name}, your colour is ${picked.name} 💫`;
      document.getElementById("whatsapp-link").href = picked.link;

      localStorage.setItem("sportcolour_user", JSON.stringify({
        fullname: name,
        email: email,
        color: picked.name
      }));

      nextSlide();
    }
  }, 100);
}

