const hospitalDetails = document.getElementById("hospital-details");

export async function displayHospitalDetails(id) {
    try {
        hospitalDetails.innerHTML = `<div class="modal-content"><p>Loading...</p></div>`;
        hospitalDetails.showModal();

        const response = await fetch(`https://api.reliancehmo.com/v3/providers/${id}`);
        const result = await response.json();
        const hospital = result?.data ?? result;            

        if (!hospital || Object.keys(hospital).length === 0) {
            throw new Error("No hospital data found.");
        }

        hospitalDetails.innerHTML = `
          <div class="modal-content">
            <button id="closeModal">❌</button>
            <h2>${hospital.name || "N/A"}</h2>
            <p><span>Email:</span> ${hospital.email_address || "N/A"}</p>
            <p><span>Website:</span> <a href="${hospital.website_address}" target="_blank">${hospital.website_address || "N/A"}</a></p>
            <p><span>Address:</span> ${hospital.address || "N/A"}</p>
            <p><span>Phone Number:</span> ${hospital.telephone || "N/A"}</p>
            <p><span>Delivery Option:</span> ${hospital.delivery_option || "N/A"}</p>
          </div>
        `;

        document.getElementById("closeModal").addEventListener("click", () => {
            hospitalDetails.close();
        });

        hospitalDetails.addEventListener("click", (event) => {
            if (event.target === hospitalDetails) {
                hospitalDetails.close();
            }
        });

    } catch (error) {
        console.error("Error fetching hospital details:", error);
        hospitalDetails.innerHTML = `
          <div class="modal-content">
            <p style="color: red;">Error loading details. Please try again later.</p>
          </div>
        `;
    }
}