const form = document.getElementById("my-form");
const popup = document.getElementById("thank-you-popup");

function showPopup() {
  popup.classList.add('visible');
  setTimeout(() => {
    popup.classList.remove('visible');
  }, 3000); // Hide after 3 seconds
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  const data = new FormData(form);
  const response = await fetch(form.action, {
    method: form.method,
    body: data,
    headers: { 'Accept': 'application/json' }
  });

  if (response.ok) {
    form.reset();
    showPopup();
  } else {
    alert("Something went wrong. Please try again.");
  }
});
