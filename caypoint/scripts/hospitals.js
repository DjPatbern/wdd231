import {displayHospitalDetails} from "./hospital-details.js";

document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://api.reliancehmo.com/v3/providers';
    const hospitalsTable = document.querySelector('#hospitalsTable tbody');
    const searchInput = document.getElementById('search');
    const loading = document.getElementById('loading');
    const pageInfo = document.getElementById('pageInfo');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
  
    let hospitals = [];
    let currentPage = 1;
    const itemsPerPage = 10;
  
    const typeFilter = document.createElement('select');
    typeFilter.id = 'typeFilter';
    typeFilter.innerHTML = `<option value="">All Types</option>`;
    searchInput.insertAdjacentElement('beforebegin', typeFilter);
    
    typeFilter.addEventListener('change', () => {
        filterAndDisplayHospitals();
    });
    
    searchInput.addEventListener('input', () => {
        currentPage = 1;
        filterAndDisplayHospitals();
    });
    
    function filterAndDisplayHospitals() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedType = typeFilter.value;
    
        const filteredHospitals = hospitals.filter(hospital => {
            const matchesSearch = hospital.name.toLowerCase().includes(searchTerm) ||
                                  hospital.state.name.toLowerCase().includes(searchTerm) ||
                                  hospital.type.name.toLowerCase().includes(searchTerm);
            const matchesType = selectedType === "" || hospital.type.name === selectedType;
            return matchesSearch && matchesType;
        });
    
        displayHospitals(filteredHospitals, currentPage);
    }
    
    async function fetchHospitals() {
        try {
            loading.style.display = 'block';
            const response = await fetch(apiUrl);
            const data = await response.json();
            hospitals = data.data;
    
            const uniqueTypes = [...new Set(hospitals.map(h => h.type.name))].sort();
            uniqueTypes.forEach(typeName => {
                const option = document.createElement('option');
                option.value = typeName;
                option.textContent = typeName;
                typeFilter.appendChild(option);
            });
    
            filterAndDisplayHospitals(); 
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
    
        document.querySelectorAll('.view-btn').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                displayHospitalDetails(id);
            });
        });
        
    
        updatePagination(page, Math.ceil(hospitals.length / itemsPerPage));
    }
    
  
    function updatePagination(page, totalPages) {
        pageInfo.textContent = `Page ${page} of ${totalPages}`;
        prevPageBtn.disabled = page <= 1;
        nextPageBtn.disabled = page >= totalPages;
    }
  
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


    
    
  });