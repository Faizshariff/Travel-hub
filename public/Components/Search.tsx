import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { Grid } from '@mui/material';
import { useMap} from 'react-map-gl';
import React from 'react'
import '../styles.css'

export interface Props {
  result: string ;
    Setresult:any;
    handleChanges : Function;
    suggester : any;
    handleClick : Function;
    Setempty : any;
    empty : any
    autoaddress : string | null ;
  };




  

export const Search = ( {   result ,  handleChanges , suggester , handleClick  , Setempty , empty , autoaddress } :Props) => {


  const { myMapA } : any = useMap()  ;




  const Searchlocation = (lat : any , lon : any) => {
    let latitude = lat;
    let longitude = lon;
    myMapA.flyTo({center: [longitude, latitude ]});
    handleClick( latitude , longitude);
  }
 
  
    return (
     
        <>
          <div id='input-div' className="absolute  pt-2  lg:pt-2 pb-2 left-5p sm:left-15p lg:left-50p top-5vh font-20px h-70vh sm:h-65vh lg:h-80vh  scrollbar-hide overflow-y-scroll" >
            <div className='top-0 sticky '>
             <input value={result}  onChange={e =>handleChanges(e.target.value)} className="leading-loose sm:leading-6 xl:leading-10  w-80vw sm:w-70vw lg:w-40vw " id='input-cont'   type="text" placeholder='WHERE TO?' />

             <button onClick={()=> { Setempty(true) , autoaddress='' }} className='bg-slate-300 rounded-md  lg:p-1.5  relative right-4 sm:top-5px lg:top-1.5px' >
               { empty ?  <SearchIcon sx={{
                    color:'gray',
                }} />  : <CancelIcon sx={{ color : 'gray'}} />  }
                </button>
                </div>
                { empty ? null : 
                <div className='flex flex-col '>
                {suggester?.map((  suggestion : any , i : number   ) => (
                   <button key={i} onClick={()=> { Searchlocation(suggestion.lat , suggestion.lon)}}>
                   <Grid  className='zindex text-xs p-4 ml-6 mb-1 w-80vw-auto sm:w-70vw-auto lg:w-40vw-auto text-left'  >
                   <h1 >{suggestion.display_name}</h1>
                 </Grid>
                 </button>
          )) }
          </div>
          }
            </div>  
        </>
    )
}
