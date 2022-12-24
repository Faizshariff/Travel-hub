import axios from "axios";


export const Getplaces = async (type , lat , long) => {

  const options = {
    method: 'GET',
    url: `https://travel-advisor.p.rapidapi.com/${type}/list-by-latlng`,
    params: {
      latitude: lat,
      longitude: long,
    },
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_REACT_APP_RAPIDAPI_API_KEY_SECURE,
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    }
  };
  
return await  axios.request(options).then(function (response) {
    return response.data ;
  }).catch(function (error) {
    console.error(error);
  });

    
};



const weatherurl = `https://weatherapi-com.p.rapidapi.com/current.json`;
  

export const getweather = async ( lat , long) => { 
  try{
    const  { data  : data } = await axios.get(weatherurl,{ params: { q :
    `${lat} , ${long}`
    },
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_REACT_APP_WEATHER_API_KEY ,
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }}) 
    return data;

  }
  catch(e){
    console.log(e);

  }

}


export const getdirections = async (userlat   , userlong  , destlat   , destlong) => {
 
  try {
    const res = await axios.get(
      `https://us1.locationiq.com/v1/directions/driving/${userlong},${userlat};${destlong},${destlat}`,
      {
        params: {
          key: process.env.NEXT_PUBLIC_REACT_APP_LOCATIONIQ_API_KEY_SECURE,
          steps: true,
          alternatives: true,
          geometries: 'polyline',
          overview: 'full'
        }
      }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};






