const form = document.querySelector(".search form");
const input = document.querySelector(".search input");
const msg = document.querySelector(".search .msg");
const listHours = document.querySelector(".hours");
const cityInfo = document.querySelector(".cityInfo");
const countryName = document.querySelector(".country-name");
const cityName = document.querySelector(".city-name");
const temperature = document.querySelector(".temperature");
const info = document.querySelector(".info");
const button = document.querySelector(".btnSearch");

//Get API key for weather app
const apiKey = "eaa15f089a40a727d64887d6d986c298";


form.addEventListener("submit", e => {
    e.preventDefault();
    let inputVal = input.value;

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${inputVal}&appid=${apiKey}&units=metric`;



fetch(url).then(response => response.json()).then(data => {
    const {city, list} = data;
    const firstIcon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${list[0].weather[0].icon}.svg`;
       let d = new Date();
       const minutes = function () {
           if(d.getMinutes() <= 9){
               return "0" + d.getMinutes();
           }
           return d.getMinutes();
       }

    

    // City description and temp 
    cityName.innerHTML = city.name;
    countryName.innerHTML = city.country;

    const tempInfo = document.createElement("div");
    tempInfo.classList.add("tempInfo");
    tempInfo.innerHTML =`${list[0].main.temp.toFixed()} <sup>°C</sup>
    <figure class="figure">
    <img class="firstIcon" src ="${firstIcon}">
    <figcaption class="firstFig">${list[0].weather[0].description}
    <br><span>humidity: ${list[0].main.humidity}</span><br>
    <span>wind speed: ${list[0].wind.speed}</figcaption>
    </figure> `;
    temperature.appendChild(tempInfo);

    const firstInfo = document.createElement("li");
    firstInfo.classList.add("firstInfo");
    firstInfo.innerHTML = ` <h3>${d.getHours()}:${minutes()}</h3>
    <span>${d.getUTCDate()}/${d.getMonth() + 1}/${d.getFullYear()}</span>
     `;
    info.appendChild(firstInfo);
    info.style.display = "block";
    // Description about temp and weather for every 3 hours
    let size = 11;
    let weatherArray = list.slice(1, size).map((i) =>{

        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${ i.weather[0].icon}.svg`;


        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let d = new Date(i.dt_txt);
        let dayName = days[d.getDay()];
    const weatherLi = document.createElement("li");
    weatherLi.classList.add("allHours");

    weatherLi.innerHTML = `<h3 class="time">
    <span>${dayName}</span>
    <sup>${i.dt_txt.slice(10, 16)}</sup>
    </h2>
    <div class="hourTemp">${i.main.temp.toFixed(1)}<sup>°C</sup></div>
    <figure>
    <img class="firstIcon" src ="${icon}">
    <figcaption class="figCaption">${i.weather[0].description}</figcaption>
    </figure>`;
    listHours.appendChild(weatherLi);


        if(info.childNodes.length >= 2 && temperature.childNodes.length >= 2 ){
        info.removeChild(info.childNodes[0]);
        temperature.removeChild(temperature.childNodes[0]);
        }


        if(listHours.childNodes.length >= 11 ) {
            listHours.removeChild(listHours.firstChild);
        }

    
    });
    
    
}).catch(() => {
    msg.textContent = "Please search for a valid city";
});
    msg.textContent = "";
    form.reset();
    input.focus();
 
});
