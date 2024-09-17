import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { Grid } from '@mui/material';
import { useMap } from 'react-map-gl';
import React, { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

export interface Props {
  result: string;
  Setresult: any;
  handleChanges: Function;
  suggester: any;
  handleClick: Function;
  Setempty: any;
  empty: any;
  autoaddress: string | null;
}

 const Search = ({
  result,
  Setresult,
  handleChanges,
  suggester,
  handleClick,
  Setempty,
  empty,
  autoaddress
}: Props) => {
  const { myMapA }: any = useMap();

  const [inputValue, setInputValue] = useState(result);

  // Debounce the handleChanges function
  const debouncedHandleChanges = useCallback(debounce((value: string) => {
    handleChanges(value);
  }, 500), [handleChanges]);

  // Handle input change
  const onInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    Setempty(false);
    debouncedHandleChanges(value);
  }, [debouncedHandleChanges, Setempty]);

  // Handle clear input
  const handleClearInput = () => {
    setInputValue('');
    Setempty(true);
    Setresult('');
  };

  // Handle search location
  const Searchlocation = (lat: any, lon: any) => {
    let latitude = lat;
    let longitude = lon;
    myMapA.flyTo({ center: [longitude, latitude] });
    handleClick(latitude, longitude);
  };

  useEffect(() => {
    setInputValue(result);
  }, [result]);

  return (
    <>
      <div id='input-div' className="absolute pt-2 lg:pt-2 pb-2 left-5p sm:left-15p lg:left-50p top-5vh font-20px h-70vh sm:h-65vh lg:h-80vh scrollbar-hide overflow-y-scroll">
        <div className='top-0 sticky'>
          <input
            value={inputValue}
            onChange={onInputChange}
            className="leading-loose sm:leading-6 xl:leading-10 w-80vw sm:w-70vw lg:w-40vw"
            id='input-cont'
            type="text"
            placeholder='WHERE TO?'
          />

          <button onClick={handleClearInput} className='bg-slate-300 rounded-md lg:p-1.5 relative right-4 sm:top-5px lg:top-1.5px'>
            {empty ? <SearchIcon sx={{ color: 'gray' }} /> : <CancelIcon sx={{ color: 'gray' }} />}
          </button>
        </div>
        {!empty &&
          <div className='flex flex-col'>
            {suggester?.map((suggestion: any, i: number) => (
              <button key={i} onClick={() => {
                Searchlocation(suggestion.lat, suggestion.lon);
                Setempty(true);
              }}>
                <Grid className='zindex text-xs p-4 ml-6 mb-1 w-80vw-auto sm:w-70vw-auto lg:w-40vw-auto text-left'>
                  <h1>{suggestion.display_name}</h1>
                </Grid>
              </button>
            ))}
          </div>
        }
      </div>
    </>
  );
};


export default Search
