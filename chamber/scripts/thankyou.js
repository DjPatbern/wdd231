const params = new URLSearchParams(window.location.search);
document.getElementById('first_name').textContent = params.get('first_name') || 'N/A';
document.getElementById('last_name').textContent = params.get('last_name') || 'N/A';
document.getElementById('email').textContent = params.get('email') || 'N/A';
document.getElementById('mobile').textContent = params.get('mobile') || 'N/A';
document.getElementById('organization').textContent = params.get('organization') || 'N/A';
document.getElementById('timestamp').textContent = params.get('timestamp') || 'N/A';