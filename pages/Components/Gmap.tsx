import Image from 'next/image';
import React, { useEffect, useState, useMemo } from 'react';
import { Map, Marker, Source, Layer } from 'react-map-gl';
import userIcon from '../../public/Components/user.png';
import destinationIcon from '../../public/Components/destination.png';
import 'mapbox-gl/dist/mapbox-gl.css';
import { getdirections } from '../../pages/api/indexapi';
import { CircularProgress } from '@mui/material';
import { FeatureCollection, Feature, LineString } from 'geojson';

export interface Place {
  name: string;
  longitude: number;
  latitude: number;
}

export interface LocationProps {
  status: boolean;
  userlat: number;
  userlong: number;
  places: Place[];
  Setmobile: (value: boolean) => void;
}

export interface DirectionsResponse {
  routes?: {
    legs?: {
      steps?: {
        maneuver: {
          location: number[];
        };
      }[];
    }[];
  }[];
}

const Gmap: React.FC<LocationProps> = ({ userlat, userlong, status, places = [], Setmobile }) => {
  const [destlat, setDestLat] = useState<number | null>(userlat);
  const [destlong, setDestLong] = useState<number | null>(userlong);
  const [locationiq, setLocationIq] = useState<DirectionsResponse | null>(null);
  const [location, setLocation] = useState<FeatureCollection<LineString, {}> | null>(null);
  const [mapState, setMapState] = useState(true);

  useEffect(() => {
    if (destlat != null && destlong != null) {
      handleClick3();
    }
  }, [destlat, destlong, ]);

  useEffect(() => {
    if (locationiq?.routes?.[0]?.legs?.[0]?.steps) {
      const coordinates: [number, number][] = locationiq.routes[0].legs[0].steps
        .map((step) => step.maneuver.location)
        .filter((loc): loc is [number, number] => loc !== undefined);

      const geojson: FeatureCollection<LineString, {}> = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: coordinates,
            },
            properties: {}, // Empty properties object
          },
        ],
      };

      setLocation(geojson);
    }
  }, [locationiq]);

  const markerElements = useMemo(() => {
    return places.map((place, i) => (
      <Marker
        key={i}
        longitude={place.longitude}
        latitude={place.latitude}
        anchor="center"
      >
        <button
          onClick={() => {
            setDestLong(place.longitude);
            setDestLat(place.latitude);
            handleClickScroll(i);
            handleClickScroll2(i);
          }}
        >
          <h1 className="text-red-600 p-2 bg-white w-24 rounded-md">{place.name}</h1>
          <Image className="h-10 w-10" src={destinationIcon} alt={place.name} priority />
        </button>
      </Marker>
    ));
  }, [places]);

  const handleClick3 = async () => {
    if (userlat && userlong && destlat && destlong) {
      try {
        const dataset = await getdirections(userlat, userlong, destlat, destlong);
        setLocationIq(dataset);
      } catch (error) {
        console.error('Error fetching directions:', error);
      }
    }
  };

  const handleClickScroll = (i: number) => {
    const element = document.getElementById(`section${i}`);
    if (element) {
      Setmobile(true);
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 2000);
    }
  };

  const handleClickScroll2 = (i: number) => {
    const element2 = document.getElementById(`sectionpc${i}`);
    if (element2) {
      element2.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const layerStyle : any = {
    id: 'route',
    type: 'line',
    source: 'route',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-width': 10,
      'line-color': '#007cbf',
    },
  };

  return (
    <>
      {status ? (
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
              mapState
                ? 'mapbox://styles/mapbox/streets-v12'
                : 'mapbox://styles/mapbox/navigation-night-v1'
            }
          >
            <Marker
              style={{ position: 'fixed' }}
              key={`${userlong}, ${userlat}`}
              longitude={userlong}
              latitude={userlat}
              anchor="bottom"
              onClick={() => {
                setMapState(!mapState);
              }}
            >
              <Image className="h-20 w-20" src={userIcon} alt="user" priority />
            </Marker>
            {location && (
              <Source id="my-data" type="geojson" data={location}>
                <Layer {...layerStyle} />
              </Source>
            )}
            {markerElements}
          </Map>
        </>
      ) : (
        <CircularProgress className="left-40p absolute top-15p" color="inherit" />
      )}
    </>
  );
};

export default Gmap;
