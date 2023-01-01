let inputValue='';
let searchInput=document.querySelector('#searchInput')
let cityName;
let comingdays=document.querySelectorAll('.day')
let upHighTemp=document.querySelectorAll('.hightemp')
let upLowTemp=document.querySelectorAll('.lowtemp')
let upWind=document.querySelectorAll('.wind')
let forecast=document.querySelector('.forecast')
let locationcity=document.getElementById('locationcity')
//prevent form reload
search.addEventListener('click',(e)=>{
  e.preventDefault();
})
//default city//kathmandu
inputValue='Kathmandu'
fetchingApi();
//fetching data from api
function fetchingApi(){
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c39215649emsh8f7259a19dd7062p1b2403jsn07fccd011422',
		'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
	}
};
fetch(`https://yahoo-weather5.p.rapidapi.com/weather?location=${inputValue}&format=json&u=f`, options)
.then((response)=>{
  return response.json()
}).then((val)=>{
  console.log(val)
  city.innerHTML=val.location.city;
  temp.innerHTML=Math.floor(((val.current_observation.condition.temperature)-32)*(5/9));
  weatherCondition.innerHTML=val.current_observation.condition.text;
  pressure.innerHTML=val.current_observation.atmosphere.pressure;
  wind.innerHTML=val.current_observation.wind.chill;
  sunrise.innerHTML=val.current_observation.astronomy.sunrise;
  sunset.innerHTML=val.current_observation.astronomy.sunset;
  locationcity.innerHTML=val.location.city+",";
  country.innerHTML=val.location.country;
  latitude.innerHTML=val.location.lat;
  longitude.innerHTML=val.location.long;
  for(let i=0;i<7;i++){
    comingdays[i].innerHTML=val.forecasts[i].day;
    upHighTemp[i].innerHTML=Math.floor((val.forecasts[i].high-32)*(5/9));
    upLowTemp[i].innerHTML=Math.floor((val.forecasts[i].low-32)*(5/9));
    upWind[i].innerHTML=val.forecasts[i].text;
  }
})
}
//getting and setting  user input
search.addEventListener('click',()=>{
  inputValue=searchInput.value;
  fetchingApi()
})

//animation on forecast view
let currentScroll=0;
let scrollamount=160;
let maxscroll;
let hscroll=document.querySelector('.container')
let scont=document.getElementById('scont')
function scoll(val){
  maxscroll=-scont.offsetWidth+hscroll.offsetWidth;
  currentScroll+=(val*scrollamount)
  if (currentScroll>0){
    currentScroll=0;
    prevBtn.style.display='none';    
    nextBtn.style.display='initial'
  }
  if(currentScroll<maxscroll){
    console.log(maxscroll)
    currentScroll=maxscroll;
    nextBtn.style.display='none';
  }
  if(currentScroll!==0){
    prevBtn.style.display='initial'  
  }
  scont.style.left=currentScroll+'px'
}
