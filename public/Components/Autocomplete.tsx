import { Grid } from '@mui/material';
import React from 'react'
import '../../pages'



export interface Props {
    suggestion :data;
    Searchlocation : Function;
    key : number;
   }

   type data = {
 display_name : string;
 place_id :any;
   }

  
export const Autocomplete =  (   { suggestion  } : any , Searchlocation : Function  )  => {

const handle = () => {
  console.log(suggestion.lat , suggestion.lon);
  Searchlocation();
}

    return (
      <button onClick={handle}>
      <Grid  className='zindex text-xs p-4 ml-6 mb-1 w-80vw-auto sm:w-70vw-auto lg:w-40vw-auto text-left'  >
      <h1 >{suggestion.display_name}</h1>
    </Grid>
    </button>
    )
}



