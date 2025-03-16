document.addEventListener("DOMContentLoaded", async () => {
  const membersContainer = document.getElementById("members-container");
  const gridViewBtn = document.getElementById("gridViewBtn");
  const listViewBtn = document.getElementById("listViewBtn");

  async function fetchMembers() {
    try {
      const response = await fetch("data/members.json");
      const members = await response.json();
      displayMembers(members);
    } catch (error) {
      console.error("Error fetching member data:", error);
    }
  }

  function displayMembers(members) {
    membersContainer.innerHTML = `
            <div class="members-table">
                ${members
                  .map(
                    (member, index) => `
                    <div class="member-row ${index % 2 === 0 ? "alt-row" : ""}">
                    <img src="images/${member.image}" alt="${member.name}">
                        <div class="member-name">${member.name}</div>
                        <div class="member-address">${member.address}</div>
                        <div class="member-phone">${member.phone}</div>
                        <div class="member-website"><a href="${
                          member.website
                        }" target="_blank">${member.website}</a></div>
                    </div>
                `
                  )
                  .join("")}
            </div>
        `;
  }

  gridViewBtn.addEventListener("click", () => {
    membersContainer.classList.remove("list-view");
    membersContainer.classList.add("grid-view");

    gridViewBtn.classList.add("active");
    listViewBtn.classList.remove("active");
  });

  listViewBtn.addEventListener("click", () => {
    membersContainer.classList.remove("grid-view");
    membersContainer.classList.add("list-view");

    listViewBtn.classList.add("active");
    gridViewBtn.classList.remove("active");
  });

  fetchMembers();
});
