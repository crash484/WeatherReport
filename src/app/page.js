"use client";
import Image from "next/image";
import {useState} from 'react';

const api={
  key:"3fc8ebcdaf682fbb37c380d212f393ea",
  base:"https://api.openweathermap.org/data/2.5/"
}
export default function Home() {
  const [colds,setCold]=useState('');
  const [hots,sethot]=useState('');
  
    const cold=["Wow its cold",
                "Better grab a jacket",
                "Lets make hot choclate"];
    const hot=["yikes its hot",
                "Very sunny today",
                "Lets go eat some ice cream"
    ];
  const[query,setQuery]=useState('');
  const[weather,setWeather]=useState('');

  const search= evt =>{
    if(evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then( res => res.json())
      .then(result => {
        setQuery('');
        setWeather(result);
        const randomIndex = Math.floor(Math.random() *3); 
        setCold(cold[randomIndex]);
        sethot(hot[randomIndex]);
      });
    }
  }                                 

  const dateBuilder=()=>{
    let date= String(new window.Date());
    date=date.slice(3,15)
    return date;
  }

  return (
<div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}  >
    <main>
      <div className="search-box block w-full p-[15px] bg-gray-600 bg-opacity-5 
       focus:bg-white focus:bg-opacity-75 
       -mt-[25px]  
       transition ease-linear duration-[400ms]  
       appearance-none bg-none border-none outline-none 
       mb-[75px]">

        <input type="text" className="search-bar
        
        text-black
            block w-full p-[15px] 
          bg-gray-50 bg-opacity-5
           focus:bg-white focus:bg-opacity-75  
           shadow-[0px_5px_0px_rgba(0,0,0,0.2)] 
           transition ease-linear duration-[400ms] 
           appearance-none bg-none border-none outline-none" 
           placeholder="search..." 
           onChange={e =>setQuery(e.target.value)} 
           value={query} 
           onKeyDown={search}></input>
      </div>

    {(typeof weather.main != "undefined") ? (
    <div>
      <div className="location-box
      text-white text-2xl font-medium text-center
      shadow-[3px 3px rgba(50,50,70,0.5)]
      text-white
        text-[20px]	
        font-light	
        italic
        text-center shadow-[2px 2px rgba(50,50,70,0.5)] ">

        <div className="location
        text-white text-2xl font-medium text-center
      shadow-[3px 3px rgba(50,50,70,0.5)]
        ">{weather.name},{weather.sys.country}
        </div>
        <div className="date
        text-white
        text-[20px]	
        font-light	
        italic
        text-center shadow-[2px 2px rgba(50,50,70,0.5)]
        ">{dateBuilder()}</div> 
      </div>

      <div className="flex justify-center items-center">
      <div className="weather-box 
      text-center
      relative inline-block my-[30px] mx-auto bg-[rgba(255,255,255,0.2)] rounded-[16px] p-[15px] px-[25px] text-white text-[102px] font-extrabold shadow-[3px 6px rgba(50,50,70,0.5)] shadow-[3px 6px rgba(0,0,0,0.2)]
      weather text-white text-[48px] font-bold shadow-[3px 3px rgba(50,50,70,0.5)]
              hover:bg-gray-500 hover:bg-opacity-50
        transition duration-300 ease-in-out
      ">
        <div className="temp
        relative inline-block my-[30px] mx-auto bg-[rgba(255,255,255,0.2)] rounded-[16px] p-[15px] px-[25px] text-white text-[102px] font-extrabold shadow-[3px 6px rgba(50,50,70,0.5)] text-center shadow-[3px 6px rgba(0,0,0,0.2)]
        hover:bg-white hover:bg-opacity-50
        transition duration-300 ease-in-out
        ">
          {Math.round(weather.main.temp)}°c
        </div>
        <div className="weather
        weather text-white text-[48px] font-bold shadow-[3px 3px rgba(50,50,70,0.5)]
        ">{weather.weather[0].main}</div>
      </div>
      </div>

      <div className=" text-center italic font-bold text-2xl transition duration-500">
        {(weather.main.temp <16)?  `${colds}`:`${hots}`}
      </div>

    </div>
    ):('')}
    </main>
    </div>
  );
}
