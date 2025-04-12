document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://api.reliancehmo.com/v3/providers';
    const hospitalsTable = document.querySelector('#hospitalsTable tbody');
    const searchInput = document.getElementById('search');
    const loading = document.getElementById('loading');
    const pagination = document.getElementById('pagination');
    const pageInfo = document.getElementById('pageInfo');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
  
    let hospitals = [];
    let currentPage = 1;
    const itemsPerPage = 10;
  
    async function fetchHospitals() {
        try {
            loading.style.display = 'block';
    
            const response = await fetch(apiUrl);
            const data = await response.json();
    
            hospitals = data.data;
            displayHospitals(hospitals, currentPage);
        } catch (error) {
            console.error('Error fetching hospitals:', error);
        } finally {
            loading.style.display = 'none';
        }
    }
    
  
    function displayHospitals(hospitals, page) {
        const start = (page - 1) * itemsPerPage;
        const end = page * itemsPerPage;
        const paginatedHospitals = hospitals.slice(start, end);
    
        hospitalsTable.innerHTML = paginatedHospitals.map((hospital, index) => `
            <tr>
                <td>${start + index + 1}</td>
                <td>${hospital.name}</td>
                <td>${hospital.state.name}</td>
                <td>${hospital.type.name}</td>
                <td><button class="view-btn" data-id="${hospital.id}">View</button></td>
            </tr>
        `).join('');
    
        // Add click events
        document.querySelectorAll('.view-btn').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                displayHospitalDetails(id);
            });
        });
        
    
        updatePagination(page, Math.ceil(hospitals.length / itemsPerPage));
    }
    
  
    // Update pagination controls
    function updatePagination(page, totalPages) {
        pageInfo.textContent = `Page ${page} of ${totalPages}`;
        prevPageBtn.disabled = page <= 1;
        nextPageBtn.disabled = page >= totalPages;
    }
  
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredHospitals = hospitals.filter(hospital =>
            hospital.name.toLowerCase().includes(searchTerm) ||
            hospital.state.name.toLowerCase().includes(searchTerm) ||
            hospital.type.name.toLowerCase().includes(searchTerm)
        );
        currentPage = 1;
        displayHospitals(filteredHospitals, currentPage);
    });
  
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayHospitals(hospitals, currentPage);
        }
    });
  
    nextPageBtn.addEventListener('click', () => {
        if (currentPage < Math.ceil(hospitals.length / itemsPerPage)) {
            currentPage++;
            displayHospitals(hospitals, currentPage);
        }
    });
  
    fetchHospitals();

    const hospitalDetails = document.getElementById("hospital-details");

    async function displayHospitalDetails(id) {
        try {
            hospitalDetails.innerHTML = `<div class="modal-content"><p>Loading...</p></div>`;
            hospitalDetails.showModal();
    
            const response = await fetch(`${apiUrl}/${id}`);
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
    
    
  });