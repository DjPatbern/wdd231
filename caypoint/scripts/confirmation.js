document.addEventListener('DOMContentLoaded', () => {
    const feedbackCount = localStorage.getItem("feedbackCount") || 0;
    const firstName = localStorage.getItem("feedbackFirstName");
    const lastName = localStorage.getItem("feedbackLastName");

    document.getElementById("feedback-count").textContent = feedbackCount;

    document.getElementById("feedbackMessage").textContent =
      `Thank you, ${firstName} ${lastName}, for your valuable feedback.`;
  });