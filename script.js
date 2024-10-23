const main_url="https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";

let bt=document.querySelector("#btn");
let locat=document.querySelector("#loc");
let temp=document.querySelector(".tmp");
let des=document.querySelector(".description");
let humidity=document.querySelector("#humiditisDegree");
let wind=document.querySelector("#wspeedkm");
let img=document.querySelector(".weather-image");
let lnf=document.querySelector(".location-not-found");
let weather=document.querySelector(".weather-body");
let weather_temp=document.querySelector(".weather-temp");
let date=document.querySelector(".dt");
let check =document.querySelector("#logocheck");
let pop=document.querySelector(".pop-up1");

const past_data="https://history.openweathermap.org/data/2.5/history/city?q={city name},{country code}&type=hour&start={start}&end={end}&appid={API key}";

async function  checkWeather(city){

    const API_key="6ae63a96238761312af288cbf9243f49";
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`;
    const past_data_url=`https://history.openweathermap.org/data/2.5/history/city?lat={lat}&lon={lon}&type=hour&start={start}&end={end}&appid=${API_key}`;

    const weather_data=await fetch(`${url}`);
    let  data= await weather_data.json();
    console.log(data);

    if(data.cod===`404`){
        img.src="images/404.png";
        lnf.style.display="flex";
        weather.style.display="none";
        weather_temp.style.display="none";
        // alert('error');
        return 
    }
   
    lnf.style.display="none";
    weather.style.display="flex";
    weather_temp.style.display="flex";

  

    const cel_temp=Math.round(data.main.temp-273.15);
    temp.innerHTML=`${cel_temp}°C`;
    const f_temp = Math.round((cel_temp * 9/5) + 32);
    des.innerHTML=`${data.weather[0].description}`;
    humidity.innerHTML=`${data.main.humidity} %`;
    wind.innerHTML=`${data.wind.speed}Km/H`;


      
check.addEventListener("change",()=>{
      console.log(check);
    // if(check.checked){
    //    document.body.classList.remove("dark-mode");
    // }
    // else{
    //    document.body.classList.add("dark-mode");

    // }
    if(check.checked){
       temp.innerHTML=`${f_temp}°F`;
    }
    else{
        temp.innerHTML=`${cel_temp}°C`;
    }
})

   
    if(data.weather[0].main=="Clouds"){
        img.src="images/cloud.png";
    }
    else if(data.weather[0].main=="Clear"){
        img.src="images/clear.png";
    }
    else if (data.weather[0].main=="Rain"){
        img.src="images/rain.png";

    }else if(data.weather[0].main=="Mist"){
        img.src="images/mist.png";
    }
    else if(data.weather[0].main=="Snow"){
        img.src="images/snow.png";
    }


   
}

bt.addEventListener("click",()=>{
    // pop.classList.remove("pop-up2");


   if(locat.value==""){
       pop.classList.remove("pop-up2");
       return;
   }
   else{
       pop.classList.add("pop-up2");
   }
   checkWeather(locat.value);

});

let currentDate=new Date();
// console.log(myDate.toString());
// const formattedDateTime = currentDate.toLocaleString('en-US');
// console.log(formattedDateTime);
const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' ,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
};

const formattedDateTime = currentDate.toLocaleDateString('en-US', options);
// setInterval(updateDateTime, 1000);
date.innerHTML=formattedDateTime;

