const inputcity=document.querySelector(".input");
const input=document.querySelector(".inputcity");
const button=document.querySelector(".submit");
const card=document.querySelector(".info")
const apikey="b36e06c43f77dd52e42dee7df09fc273";
inputcity.addEventListener("submit", async event=>
{
    event.preventDefault();
    const city=input.value;
    if(city)
    {
        try{
            const data=await getweather(city);
            displayweather(data);
        }
        catch(error){
            console.error(error);
            errormessage(error);
        }
        
    }
    else{
        errormessage("ENTER A VALID CITY NAME");
    }

}
)

function displayweather(data)
{
 console.log(data);
 const {name:city, main:{temp,humidity}, weather:[{id,description}]}=data;
 card.textContent="";
 card.style.display="flex";

 const citydisplay=document.createElement("h1");
 const tempdisplay=document.createElement("p");
 const humiditydisplay=document.createElement("p");
 const descdisplay=document.createElement("p");
 const weatheremoji=document.createElement("p");

 citydisplay.textContent=city;
 tempdisplay.textContent=`${(temp-273.15).toFixed(1)}°C`;
 humiditydisplay.textContent=`Humidity:-${humidity}%`;
 descdisplay.textContent=description;
 descdisplay.classList.add("desc");
 weatheremoji.classList.add("weather");
 weatheremoji.textContent=getweatheremoji(id);
 card.appendChild(citydisplay);
 card.appendChild(tempdisplay);
 card.appendChild(humiditydisplay);
 card.appendChild(descdisplay);
 card.appendChild(weatheremoji);
}
async function getweather(city)
{
    const apiurrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const data = await fetch(apiurrl);
    console.log(data);
    if(!data.ok)
    {
        throw new error("FAILED TO FETCH THE DATA");
    }
    else
    {
        return await data.json();
    }
}
function getweatheremoji(id)
{
    switch(true){
        case id>=200 && id<300:
            return "⛈️";
        case id>=300 && id<400:
            return "🌧️";
        case id>=500 && id<600:
            return "🌧️";
        case id>=600 && id<700:
            return "❄️";
        case id>=700 && id<800:
            return "💨";
        case id===800:
            return "☀️";
        case id>=801 && id<810:
            return "☁️";
        default:
            return "❓";
    }
}
function errormessage(mssg)
{
    const error=document.createElement("p");
    error.textContent=mssg;
    card.textContent="";
    card.style.display="flex";
    card.appendChild(error);
}