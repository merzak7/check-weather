// Access DOM elements

const cityForm = document.getElementById('city-form');
const cityInput = document.getElementById('city-input');
const submitBtn = document.getElementById('submit-btn');
const resetBtn = document.getElementById('reset-btn');

const responseMsgSection = document.getElementById('success-response');
const descriptionReport = document.getElementById('description');
const timeReport = document.getElementById('time');
const errMsgSection = document.getElementById('err-msg');


resetBtn.disabled = true;
submitBtn.disabled = true;

cityInput.addEventListener('keyup', () => {
  if (cityInput.value.length == 0) {
    submitBtn.disabled = true;
  }
  else {
    submitBtn.disabled = false;
  }
})


// Prepare openweathermap.org request
let apiRequest = new XMLHttpRequest();

apiRequest.onreadystatechange = () => {
  if (apiRequest.readyState === 4) {
    if (apiRequest.status === 404) {
      errMsgSection.textContent = 'City not found, You obviously misspelled the city!. plz reEnter the city name again';
      responseMsgSection.style.display = 'none';
      errMsgSection.style.display = 'block';
      resetBtn.disabled = false;
    }
    else {
      let response = JSON.parse(apiRequest.response);
      descriptionReport.textContent = 'The weather in ' + response.name + ' is " ' + response.weather[0].description + ' ".';
      timeReport.textContent = 'Checked on: ' + convertToDateString(response.dt);
      errMsgSection.style.display = 'none';
      responseMsgSection.style.display = 'block';
      resetBtn.disabled = false;
    }
  }
}


/* 
 Capture and handle form submit event
 Prevent default behaviour, prepare and send API request
*/
cityForm.addEventListener('submit', ($event) => {
  $event.preventDefault();
  const chosenCity = cityInput.value;
  apiRequest.open('GET',
    'https://api.openweathermap.org/data/2.5/weather?q=' + chosenCity + '&APPID=b34fddd3dae4a2eb0ad363b62f98ba1e'
  );
  apiRequest.send();
});


// setting up Reset button

resetBtn.addEventListener('click', evt => {
  evt.preventDefault();
  // cityForm.reset();
  window.location.reload();
})


// setting up footer year dynamically

const yearSpan = document.getElementById('year-holder');
yearSpan.textContent = new Date().getFullYear();


/* setting up Date format */

function convertToDateString(param) {
  return new Date(param * 1000).toLocaleString(
    'en',
    { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
  )
}
