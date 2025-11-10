const form = document.getElementById("my-form");
const popup = document.getElementById("thank-you-popup");

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
    popup.style.display = "block"; // show popup
  } else {
    alert("Something went wrong. Please try again.");
  }
});
