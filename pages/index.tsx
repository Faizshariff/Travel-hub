import Head from 'next/head'
import { Search } from '../public/Components/Search'
import React, { useEffect, useState } from 'react'
import {  Getplaces,  getweather } from './api/indexapi'
import { List } from '../public/Components/List'
import { Gmap } from '../public/Components/Gmap'
import axios from 'axios'


 // AUTO COMPLETE FETCH REQUEST

 let autoaddress = '';

 const Autocomplete = async ( ) => {
  const url = encodeURIComponent(autoaddress);
  const autourl =`https://us1.locationiq.com/v1/search?key=${process.env.NEXT_PUBLIC_REACT_APP_LOCATIONIQ_API_KEY_SECURE}&q=${url}&format=json`; 
  if (autoaddress.length == 0) {
    return null;
  }
  else{
  try{
    const { data : data } = await axios.get(autourl);
    return data;
  }
  catch(e){
    return null
  }
}
}





export default function Home() {


  // ALL STATES IN THE PROGRAM


// states to display travel advisor data
const [places,Setplaces] = useState([]);
const [isLoading,SetisLoading] = useState(true);
const [display, Setdisplay] = useState(false);
const [type,Settype] = useState('');


// states to display suggestions or autocomplete
const [result,Setresult] = useState('');
const [suggester,Setsuggester] = useState([]);


// states to display weather
const [weather,Setweather] = useState([]);
const [wload,Setwload] = useState(true);

// states of users current location
const [userlat,Setuserlat] = useState<any | null>(null);
const [userlong,Setuserlong] = useState<any | null>(null);
const [status, Setstatus] = useState(false);

// states of serach location
const [lat,Setlat] = useState<any | null>(null);
const [long,Setlong] = useState<any | null>(null);

//States of auto complete
const [empty,Setempty] = useState (true);




  


// useEffect to GET Current location
const getUserCoordinates = async () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      Setlat(position.coords.latitude);
      Setlong(position.coords.longitude);
      Setuserlat(position.coords.latitude);
      Setuserlong(position.coords.longitude);
      Setstatus(true)
    },
  )}

  useEffect(() => {
    getUserCoordinates()
    } , [])
      

 
  
/*

 if (isGeolocationAvailable && isGeolocationEnabled && coords) {
        Setlat(coords.latitude);
        Setlong(coords.longitude);
        Setuserlat(coords.latitude);
        Setuserlong(coords.longitude);
        Setstatus(true);
      }
      else{
        return
      }

*/


  // AUTO COMPLETE ONCLICK FUNCTION
function handleClick( lattitude : any , longitude : any ) {
  Setlat(lattitude);
  Setlong(longitude);
 }



// useEffect to call rapid api travel advisor api function
useEffect(() => {

  if (!type) {
    return;
  }
  else {
  SetisLoading(true)
  Getplaces(type , lat , long).then((  { data }  : any )  => {
    Setplaces(data.filter((place : any) => place.num_reviews > 0))
    SetisLoading(false)
  })

}
}, [type , lat , long])






// useEffect to call auto complete api
  useEffect(()=> {
    Autocomplete().then(( data ) : any => {
        Setsuggester(data);
    })
    }, [result])




// AUTO COMPLETE ONCHANGE FUNCTION
function handleChanges(result: any) {
  Setresult(result);
  autoaddress = result;
  Setempty(false)
 }




 // useEffect to call weather api function
useEffect(()=>{
  getweather(lat , long).then((   data    : any ) => {
    Setweather(data)
    Setwload(false)
  })
},[lat , long])




  return (
    <>
      <Head>
        <title>TRAVEL HUB</title>
      </Head>
      <main  >
      <div style={{ height: '100vh', width: '100vw' }} className="flex flex-col lg:flex-row-reverse" >
        <Search  autoaddress={autoaddress} empty={empty} Setempty={Setempty} result={result} suggester={ suggester  } handleChanges={handleChanges}  handleClick={handleClick}  Setresult={Setresult} />
        <Gmap places={places} userlat={userlat} userlong={userlong} status={status} />
     <List wload={wload} Settype={Settype} Setdisplay={Setdisplay} display={display} weather={weather} isLoading={isLoading} places={places}  />
      </div>
      </main>  
        </>
  );
}
