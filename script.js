let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

// COLORS with WhatsApp links
const colors = [
  { name: "Red", link: "https://chat.whatsapp.com/DvXiIo5qVGz1ez02wPlw8X" },
  { name: "Blue", link: "https://chat.whatsapp.com/H9X6Nkp6oiW4N9pJKBy49t" },
  { name: "Green", link: "https://chat.whatsapp.com/Edl2eq7q2xo47cZdOeVh7r" },
  { name: "Yellow", link: "https://chat.whatsapp.com/Hr3BLzli7AdJCkDnFl3JH0" }
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
        <p class="thank-you">Thank you for participating</p>
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

