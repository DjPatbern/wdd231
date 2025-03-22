document.addEventListener("DOMContentLoaded", async () => {
  const businessCards = document.getElementById("business-cards");

  async function fetchBusiness() {
    try {
      const response = await fetch("data/members.json");
      const business = await response.json();
      const filteredBusiness = business.filter(
        (bus) => bus.membership === 2 || bus.membership === 3
      );
      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
      }
      const shuffledBusiness = shuffleArray(filteredBusiness);
      const selectedBusinesses = shuffledBusiness.slice(0, 3);
      displayBusiness(selectedBusinesses);
    } catch (error) {
      console.error("Error fetching member data:", error);
    }
  }

  function displayBusiness(business) {
    businessCards.innerHTML = `
          <div class="business-listings">
           ${business
             .map(
               (bus, index) => `
                      <div class="business-card">
          <img src="images/${bus.image}" alt="${bus.name}" />
          <p class="business-name">${bus.name}</p>
          <p>Address: <span>${bus.address}</span></p>
          <p>Phone: <a href="tel:${bus.phone}">${bus.phone}</a></p>
          <p>
            URL:
            <a href="${bus.website}" target="_blank">${bus.website}</a>
          </p>
          <p>Membership Level: <span>${
            bus.membership === 2 ? "Silver" : "Gold"
          }</span></p>
        </div>
                  `
             )
             .join("")}
       
        
       
      </div>
             
          `;
  }

  fetchBusiness();
});
