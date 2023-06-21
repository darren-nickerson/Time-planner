const form = document.getElementById("myForm");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // prevent form from submitting

  // Get the username input value
  const username = document.getElementById("username").value;

    // Set the username in session storage
    localStorage.setItem("username", username);

    // Redirect to another page, if desired
    window.location.href = "index.html";
 
});
