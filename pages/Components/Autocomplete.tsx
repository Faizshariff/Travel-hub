import { Grid } from '@mui/material';
import React from 'react';

export interface Props {
  suggestion: Data;
  Searchlocation: () => void;
}

type Data = {
  display_name: string;
  place_id: any;
  lat?: number;
  lon?: number;
};

const Autocomplete: React.FC<Props> = ({ suggestion, Searchlocation }) => {
  const handle = () => {
    // Ensure lat/lon exists before logging
    console.log(suggestion.lat ?? 'No lat', suggestion.lon ?? 'No lon');
    Searchlocation();
  };

  return (
    <button onClick={handle}>
      <Grid className='zindex text-xs p-4 ml-6 mb-1 w-80vw-auto sm:w-70vw-auto lg:w-40vw-auto text-left'>
        <h1>{suggestion?.display_name || 'No display name available'}</h1>
      </Grid>
    </button>
  );
};

export default Autocomplete;
