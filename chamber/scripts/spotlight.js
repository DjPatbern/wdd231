document.addEventListener("DOMContentLoaded", async () => {
  const businessCards = document.getElementById("business-cards");

  async function fetchBusiness() {
    try {
      const response = await fetch("data/members.json");
      const business = await response.json();
      const filteredBusiness = business.filter(
        (bus) => bus.membership === 2 || bus.membership === 3
      );
      displayBusiness(filteredBusiness);
    } catch (error) {
      console.error("Error fetching member data:", error);
    }
  }

  function displayBusiness(business) {
    businessCards.innerHTML = `
          <div class="business-listings">
           ${business
             .slice(0, 3)
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
