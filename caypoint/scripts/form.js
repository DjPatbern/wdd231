document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const hospital = document.getElementById('hospital').value;
    let feedbackCount = localStorage.getItem('feedbackCount') || 0;
    feedbackCount++;
    localStorage.setItem('feedbackCount', feedbackCount);

    localStorage.setItem('feedbackFirstName', firstName);
    localStorage.setItem('feedbackLastName', lastName);
    localStorage.setItem('feedbackHospital', hospital);

    window.location.href = 'confirmation.html';
  });