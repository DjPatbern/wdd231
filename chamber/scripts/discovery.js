document.addEventListener("DOMContentLoaded", () => {
    const cardsContainer = document.getElementById("discover-cards");
  
    fetch("data/items.json")
      .then(response => response.json())
      .then(data => {
        data.forEach((item, index) => {
          const card = document.createElement("div");
          card.className = "card";
          card.className = `card card${index + 1}`;  
          card.innerHTML = `
            <h2>${item.title}</h2>
            <figure>
              <img src="${item.image}" alt="${item.title}" width="300" height="200" loading="lazy" />
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button>Learn More</button>
          `;
  
          cardsContainer.appendChild(card);
        });
      });
  
    const messageElement = document.getElementById("visitor-message");
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();
  
    if (!lastVisit) {
      messageElement.textContent = "Welcome! Let us know if you have any questions.";
    } else {
      const daysPassed = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));
      if (daysPassed < 1) {
        messageElement.textContent = "Back so soon! Awesome!";
      } else {
        messageElement.textContent = `You last visited ${daysPassed} day${daysPassed > 1 ? "s" : ""} ago.`;
      }
    }
  
    localStorage.setItem("lastVisit", now.toString());
  });
  