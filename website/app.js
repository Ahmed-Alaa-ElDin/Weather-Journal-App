/* Global Variables */
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const content = document.getElementById("content");
const generate = document.getElementById("generate");
const key = "a19923acf9e1a9244887871b778c2886";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

generate.addEventListener("click",getWeather);

function getWeather(e) {
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  let myURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=`

  getWeatherData(myURL,key)

  .then(data => {
      postData('/data', {temperature: data.main.temp, date: newDate, feelings: feelings});
      updateUI('/info');
  })
};

const getWeatherData = async (url,key) => {
    const res  = await fetch(url + key + "&units=metric");
    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch(error) {
        console.error('ERROR', error);
    };
};

// Async POST
const postData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.error('ERROR', error);
    };
};

const updateUI = async(url='') => {
    const req = await fetch(url);
    try {
        const allData = await req.json();
        date.innerHTML = allData[0].date;
        temp.innerHTML = Math.ceil(allData[0].temperature) + "<sup>o</sup>C";
        content.innerHTML = allData[0].feelings;
    } catch(error) {
        console.error('ERROR', error);
    };
};
