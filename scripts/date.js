
const yearSpan = document.getElementById("year");
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;

document.getElementById("lastModified").textContent = `Last Update: ${document.lastModified}`;