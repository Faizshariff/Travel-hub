 import Image from 'next/image';
 import React from 'react';
 import  { useEffect, useState } from 'react'
 import { useMemo, useCallback } from 'react';
 import {Map , Marker, Source, Layer } from 'react-map-gl';
 import  user from './user.png'
 import destination from './destination.png'
 import 'mapbox-gl/dist/mapbox-gl.css'; 
 import { getdirections } from '../../pages/api/indexapi';
import {  CircularProgress } from "@mui/material";



 
 
 export interface locationprops {
   status : any ;
   userlat : number;
   userlong : number; 
   places : any
  }
 
 
 
 
   
 
  export const Gmap = ({  userlat , userlong , status , places}  : locationprops ) => {
 
   const [destlat, Setdestlat] = useState<any | null>(null);
   const [destlong ,Setdestlong] = useState<any | null>(null);
   const [locationiq, Setlocationiq] = useState<any | null>([]);
   const [location,Setlocation] = useState<any>(null);
   const [mapState, SetmapState] = useState(true)
 
   useEffect(()=> {
    if(destlat == null ||  destlong == null || userlat == null || userlong == null){
      return ;
    }
    else{
    handleClick3()
    }
   },[destlat , destlong , userlat , userlong])

  

   const markerElements = useMemo(() => {
    return places.map((place: any, i: number) => (
      <Marker 
        key={`${i}`}
        longitude={place.longitude} latitude={place.latitude} 
        anchor="center" 
      >
        <button onClick={() => {
          Setdestlong(place.longitude)
          Setdestlat(place.latitude)
          handleClickScroll(i)
          handleClickScroll2(i)
        }}>
         
            <h1 className='text-red'>{place.num_reviews}Review{place.num_reviews > 1 && 's'}</h1>
          <Image className="h-10 w-10" src={destination} alt="" priority />
        </button>
      </Marker>
    ));
  }, [places, Setdestlat, Setdestlong]);

   const handleClick3 = () => {
    getdirections(userlat , userlong , destlat, destlong)
      .then((dataset) => {
        Setlocationiq(dataset);
        if (locationiq && destlat  && destlong && userlat   && userlong  ) {
          const coordinates : any = locationiq?.routes?.[0]?.legs?.[0]?.steps
            .map((element: any) => element.maneuver.location)
            .filter((notUndefined: any) => notUndefined !== undefined)
          const geojson = {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'LineString',
                  coordinates : coordinates
                }
              }
            ]
          };
  
          Setlocation(geojson);
        }
      })
  }
  

  const handleClickScroll = (i : number) => {
    const element = document.getElementById(`section${i}`);
    if (element ) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handleClickScroll2 = (i : number) => {
    const element2 = document.getElementById(`sectionpc${i}`);
    if (element2 ) {
      element2.scrollIntoView({ behavior: 'smooth' });
    }
  };




 
   const layerStyle : any= {
     id: 'point',
     type: 'line',
     source: 'route',
     layout: {
       'line-join': 'round',
       'line-cap': 'round',
     },
     paint: {
       'line-width': 10,
       'line-color': '#007cbf',
     }
   };
 
 
 
   return(
 <>
 
 {status ? 
  <>
 <Map
 id="myMapA"
 interactive={true} 
     mapboxAccessToken={process.env.NEXT_PUBLIC_REACT_APP_MAPBOX_API_KEY_SECURE}
     initialViewState={{
       longitude: userlong,
       latitude: userlat,
       zoom: 18,
     }}
     mapStyle={  
      mapState ?  "mapbox://styles/mapbox/streets-v12"
      :  "mapbox://styles/mapbox/navigation-night-v1"
    }
   >
      <Marker style={{ position: 'fixed'}}
      key={`${userlong}, ${userlat}`} longitude={userlong} latitude={userlat} anchor="bottom"
      onClick={()=> { SetmapState(!mapState)}} >
         <Image className='h-20 w-20' src={user} alt={'user'} priority />
     </Marker>
     <Source  id="my-data" type="geojson"  data={location}>
       <Layer className="fixed " {...layerStyle} />
     </Source>
     {markerElements}
   </Map>
 </>
 : <CircularProgress className='left-40p absolute top-15p' color="inherit" /> }
 
 </>
   )
 }
