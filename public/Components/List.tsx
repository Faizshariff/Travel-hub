import React, {  useState  , useEffect } from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import {  Box, CircularProgress, Grid, Rating, Typography  } from "@mui/material";
import Image from 'next/image'
import CloseIcon from '@mui/icons-material/Close';
import icon1 from './icon-1.png'
import icon3 from './icon-3.png'
import Details from './Details';


type Props = {
    isLoading: boolean;
    places:any;
    display:boolean;
    weather: any;
    wload : boolean;
    Setdisplay : any;
    Settype : any ;
  };





function List  ({isLoading , places , display , weather , wload , Setdisplay , Settype }:Props)  {


  const [open,Setopen] = useState(false);
  const [details , Setdetails] = useState(false);
  const [carddetails , Setcarddetails] = useState<any | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [timeoutId, setTimeoutId] = useState<any | null>(null);


  const handleClick = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    setIsDisabled(true);
    const newTimeoutId = setTimeout(() => {
      setIsDisabled(false);
    }, 3000);
    setTimeoutId(newTimeoutId);
  };


  const img = [`Restaurents`,`TRAVEL`,`hotels`,`Food`, `FOOD` , `RESTAURENT`,`HOTEL`,`hotel`,`travel`,`restaurent`,`monuments` ,`restaurant`,
  `cafeteria`,`food`,`dining`,`catering`,`delicious`,`dish`,`meal`,`cuisine`,`tasty`,`attraction`,`tourism`,`travel`,`vacation`, `sightseeing`, `monument`, `heritage`, `history`, `culture`, `sculpture`, `architecture`] ;

    return (
     
        <>

         <div  className=' responsive-show zindex lg:responsive-hide test-div'>     
         <div className=" absolute left-0 list-mob-div" id={`${ open ? "mobbar-show" : "mobbar-hide" }`}  >
         <div  className="zindex2">
         <button  disabled={isDisabled} onClick={ () => { Setopen(!open); handleClick() }} id="mob-list-button" className="left-45vw md:left-50vw"  > { open ?  <NavigateNextIcon className="svg_icons2" /> : <ArrowLeftIcon className="svg_icons2" /> }</button>
         <div className="mob-categories left-6vw sm:left-10vw ">
          <h6 className="pb-6 sm:pb-4 heading">CATEGORIES</h6>
        <Grid container  spacing={{ xs:1 , sm:6 }}>
        <Grid item xs={4} sx={{
          paddingRight:{
             xs:'25vw',
             sm:'0vw',
        },
        }} >
          <button onClick={()=> { Setdisplay(true); Settype('restaurants') ;  } }>
          <Image src={icon1} className="icon-img relative left-6"  alt={"restaurent"} ></Image>
          <p className="cat-txt" >RESTAURENTS</p>
          </button>
        </Grid>
        <Grid item xs={4} sx={{
          position:'relative',
          right:{
            xs:'0%',
            sm:'0%'
          },
          left:{
            xs:'10%',
            sm:'12%'
          },
          justifyContent: 'center',
          alignItems:'center'
        }}>
        <button onClick={()=>  { Setdisplay(true); Settype('attractions'); }}>
          <Image  src={icon3} className="icon-img relative left-6" alt={"attractions"} ></Image>
          <p className="cat-txt" > ATTRACTIONS</p>
          </button>
        </Grid>
        </Grid>
        </div>
  </div>
        <div className="zindex scrollbar-hide overflow-scroll  absolute left-0 list-mob-styles">
        { display  ?  
        <>
            {isLoading ? <CircularProgress className='left-40p absolute top-15p' color="inherit" /> :  places?.map((   place  : any, i : number ) => {
                const x = Math.floor(Math.random() * img.length);
              return(
              <button   key={place.location_id} onClick={()=> { Setdetails(true) ; Setcarddetails(place);    } }>
        <Grid id={`section${i}`} className='ml-8 sm:ml-24  p-b-5vh'>
        <Image  className='h-48 sm:h-96 w-80vw-card lg:w-4/5 ' src={place.photo ? place.photo.images.large.url : `https://source.unsplash.com/random/?${img[x]}/`}  alt="" width={400} height={50}  priority />
         <h1 className='mt-6 font-semibold mb-4'>{place.name}</h1> 
         <Box display="flex " justifyContent="space-between" my={2}>
          <Rating name="read-only" value={Number(place.rating)} readOnly />
          <Typography sx={{
            marginRight :{
              xs:'5vw',
              sm: '1vw',              
          }
          }}  component="legend">{place.num_reviews}Review{place.num_reviews > 1 && 's'}</Typography>
        </Box>
        <Box display="flex " justifyContent="space-between">
          <Typography component="legend">Pricing</Typography>
          <Typography sx={{
            marginRight :{
              xs:'5vw',
              sm: '1vw',              
          }
          }} gutterBottom variant="subtitle1">
            {place.price_level}
          </Typography>
        </Box>
     </Grid>
     </button>

     )})}

{ details ?
<>
  <Details  carddetails={carddetails}   />
  <button className='mob-modal-close sm:tab-modal-close' onClick={()=> {Setdetails(false)}} ><CloseIcon /></button>
  </>
     : null
}
         </>          
        
        : 
        <Grid className='text-center justify-center'>
        { wload ? <CircularProgress className='left-40p absolute top-15p' color="inherit" /> : 
        
        <Grid className='pt-8'>

<h1 className='text-xl' >{weather.location.name},{weather.location.region}</h1> 
       <h3 className='text-lg' >{weather.location.country}</h3>
       <div className='block ml-auto mr-auto w-30p relative'>
       <Image className='block ml-auto mr-auto w-300p relative' width={150} height={150} src={`https:${weather.current.condition.icon}`} alt=''/>
       </div>
       <h1 className='text-2xl pb-4 pt-4  font-semibold'>{weather.current.temp_c}°C</h1>
       <h1>{weather.current.condition.text}</h1>
        
         </Grid>}
</Grid>
       

}
  
     </div>
     </div>
      </div>



      <div className='responsive-hide lg:responsive-show'>  
      <div className="absolute left-0  backdrop-blur-lg list-div" id={`${ open ? "pcbar-hide" : "pcbar-show" }`}  >
        <div className="pl-6 pt-4">
          <h2 className="pb-4">CATEGORIES</h2>
          <Grid container  spacing={0}>
        <Grid item xs={4} sx={{
         
        }} >
          <button onClick={()=>  { Setdisplay(true); Settype('restaurants') ;  } }>
          <Image src={icon1} className="icon-img"  alt={"restaurent"} ></Image>
          <p className="cat-txt " >RESTAURENTS</p>
          </button>
        </Grid>
        <Grid item xs={4} sx={{
         marginLeft : 2,
        }} >
          <button onClick={()=> { Setdisplay(true); Settype('attractions');  }}>
          <Image src={icon3} className="icon-img"  alt={"restaurent"} ></Image>
          <p className="cat-txt " > ATTRACTIONS</p>
          </button>
        </Grid>
        </Grid>
          </div>
          <button  disabled={isDisabled} onClick={ () =>  { Setopen(!open) ; handleClick() } } id="pc-list-button" > { open ?  <NavigateNextIcon className="svg_icons" /> : <ArrowLeftIcon className="svg_icons" /> }</button>
        <div className="zindex scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-zinc-100 absolute left-0 list-styles">
      <div className="overflow-auto " >

        { display ?
        <>
            { isLoading ? <CircularProgress className='left-40p absolute top-15p' color="inherit" /> : places?.map((   place  : any, i : number ) => {
                const x = Math.floor(Math.random() * img.length);
              return (
 <button   key={place.location_id} onClick={()=> { Setdetails(true) ; Setcarddetails(place) ;  }}>
     <Grid  id={`sectionpc${i}`}  className='ml-4 p-b-10vh'  >
     <Image  className='h-40 w-72 ' src={place.photo ? place.photo.images.large.url : `https://source.unsplash.com/random/?${img[x]}/`}  alt=""  width={400} height={50}  priority/>
         <h1 className='mt-6 font-semibold mb-4'>{place.name}</h1> 
         <Box display="flex " justifyContent="space-between" my={2}>
          <Rating name="read-only" value={Number(place.rating)} readOnly />
          <Typography sx={{
            marginRight :{
              lg:'1vw'            
          },
          fontSize:{
            lg:'1.1vw'
          }
          }}  component="legend">{place.num_reviews}Review{place.num_reviews > 1 && 's'}</Typography>
        </Box>
        <Box display="flex " justifyContent="space-between">
          <Typography 
          sx={{
            marginRight :{
              lg:'1vw'            
          },
          fontSize:{
            lg:'1.1vw'
          }
          }} component="legend">Pricing</Typography>
          <Typography 
          sx={{
            marginRight :{
              lg:'1.5vw'            
          },
          fontSize:{
            lg:'1.1vw'
          }
          }} gutterBottom variant="subtitle1">
            {place.price_level}
          </Typography>
        </Box>
     </Grid>
     </button>
     )})}

{ details ?
<>
<Details  carddetails={carddetails}  />
<button className='pc-modal-close' onClick={()=> {Setdetails(false)}} ><CloseIcon /></button>
</>
     : null
}

</>

     : 
     <Grid className='text-center justify-center'>
     { wload ?   <CircularProgress className='left-40p absolute top-15p' color="inherit" /> : 
     
     <Grid className='pt-8'>

<h1 className='text-xl' >{weather.location.name},{weather.location.region}</h1> 
    <h3 className='text-lg' >{weather.location.country}</h3>
    <div className='block ml-auto mr-auto w-30p relative'>
    <Image className='block ml-auto mr-auto w-300p ' width={150} height={150} src={`https:${weather.current.condition.icon}`}   alt='as' />
    </div>
    <h1 className='text-2xl pb-4 pt-4  font-semibold'>{weather.current.temp_c}°C</h1>
    <h1>{weather.current.condition.text}</h1>
     
      </Grid>}
</Grid>

    }

     </div>
     </div>
     </div>
      </div>

      </>
      
 
      )

 

  
}

export default List