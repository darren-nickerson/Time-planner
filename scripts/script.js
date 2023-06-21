// This code checks if a "username" key is present in local storage.
// If not, the user is redirected to the login page.

if (localStorage.getItem("username") === null) {
  window.location.href = "login.html";
}

// This code sets the page to automatically reload every 60 seconds.

setInterval("location.reload(true);", 60000);

// This code retrieves the "username" value from local storage.

const username = localStorage.getItem("username");

// This code updates the HTML of the "greeting" element to display a welcome message with the retrieved username.
const welcomeMessage = document.getElementById("greeting");
welcomeMessage.innerHTML = `<h2><span>Hello,</span> <br> ${username}</h2>`;

// array for textarea ids
const times = [];
// Get all the textareas in the webpage
var textareas = document.getElementsByTagName("textarea");
// Loop through the textareas and get their ids
for (var i = 0; i < textareas.length; i++) {
  var textarea = textareas[i];
  var textareaId = textarea.id;
  times.push(textareaId);
}

// Get the stored textarea values from local storage
const storedTextareaValuesString = localStorage.getItem("timePlanner");

// Parse the stored values from a string to an array
const textareaValues = JSON.parse(storedTextareaValuesString);

// Loop through all the textarea elements and set their values to the corresponding stored values, if available
for (let i = 0; i < times.length; i++) {
  const textarea = document.getElementById(times[i]);
  if (textareaValues) {
    textarea.value = textareaValues[i];
  }
}

// Create a new Date object to get the current time
const now = new Date();

// Get the hours and minutes from the current time
const hours = now.getHours();
const minutes = now.getMinutes();

// Combine the hours and minutes into a string, adding leading zeros if necessary,
let currentTime =
  (hours < 10 ? "0" + hours : hours) +
  "" +
  (minutes < 10 ? "0" + minutes : minutes);
currentTime = +currentTime;

// This function takes in a an textarea id and returns a a formated string example: "time-12-00" and returns "1200"
function formatTime(time) {
  // Split the time string by the dash character "-" into an array of strings.
  let timeArr = time.split("-");

  // Combine the second and third element in the time array to get the formatted time string.
  let formattedTime = timeArr[1] + timeArr[2];

  // Return the formatted time string.
  return formattedTime;
}

// Loop through the array of textarea IDs
for (let i = 0; i < times.length; i++) {
  // Get the current textarea element by ID
  const textarea = document.getElementById(times[i]);

  // Attach event listeners to the current textarea for both 'change' and 'input' events
  textarea.addEventListener("change", getValues);
  textarea.addEventListener("input", getValues);
}

// this function fires with the 'change' events and input events
function getValues() {
  const values = [];

  for (let i = 0; i < times.length; i++) {
    const textarea = document.getElementById(times[i]);

    const value = textarea.value;
    values.push(value);
  }

  localStorage.setItem("timePlanner", JSON.stringify(values));
}

// clear local storage "timePlanner"
function clearTimeSlots() {
  localStorage.removeItem("timePlanner");
  location.reload();
}

// clear all local storage "timePlanner" & username
function deleteAccount() {
  localStorage.clear();
  window.location.href = "login.html";
}

// refreshes the page
function refreshPage() {
  location.reload();
}

// This function sets the CSS class of the textarea elements based on the current time
function setCSS() {
  // Loop through all the textarea elements
  for (let i = 0; i < times.length; i++) {
    const textarea = document.getElementById(times[i]);

    // Get the beginning and end time of the time block associated with the textarea
    let beginningTime = +formatTime(times[i]);
    let endTime = +beginningTime + 14; // Add 14 minutes to the end time
    // If the current time is within the time block, add the "active" class to the textarea
    if (currentTime >= beginningTime && currentTime <= endTime) {
      textarea.classList.add("active");
      
    }
  }
}

function scrollToElement() {
  const element = document.querySelector(".active")
  const offset = 150; // adjust the offset as needed
  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
}

function scrollToElementTop() {
  const element = document.querySelector("body")
  const offset = 150; // adjust the offset as needed
  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
}


// Call the setCSS function every second using setInterval
setInterval(setCSS, 1 * 1000);


