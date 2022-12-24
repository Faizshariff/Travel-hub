import React from 'react'
import {  Box, Rating, Typography  } from "@mui/material";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TagIcon from '@mui/icons-material/Tag';
import LanguageIcon from '@mui/icons-material/Language';
import Image from 'next/image';

export default function Details( carddetails : any ,  ) {

  const img = [`Restaurents`,`TRAVEL`,`hotels`,`Food`, `FOOD` , `RESTAURENT`,`HOTEL`,`hotel`,`travel`,`restaurent`,`monuments`] ;
  const i = Math.floor(Math.random() * 12);

    return (
        <>
        <div className='details-mob sm:details-tab lg:details-pc w-full top-0 fixed backdrop-blur-3xl p-8  bg-white'  > 
     {carddetails && 
     <>
     <h1 className='pt-10 sm:pt-12 lg:pt-0 pb-4 sm:pb-1 lg:pb-2  pl-24 sm:pl-64 lg:pl-4 w-full lg:w-10/12 text-xl font-medium'>
     {carddetails.carddetails.name}
     </h1>
     <br/>
     <Image className='h-56 w-96 pb-4 sm:pb-2 lg:pb-6 ml-0 sm:ml-44 lg:ml-0'  src={carddetails.carddetails.photo ? carddetails.carddetails.photo.images.large.url : `https://source.unsplash.com/random/?${img[i]}/`}  alt="" width={400} height={50}  priority />
     <Box display="flex " justifyContent="space-between" sx={{
        marginY : {
          xs: 3,
          sm: 3,
          md: 2,
          lg: 2,
          xl: 2,
        }, marginX : {
            xs: 1,
            sm: 6,
            md: 1,
            lg: 1,
            xl: 1,
          },
     }}>
     <Rating sx={{ fontSize:{ lg:'1.1rem' } }} name="read-only" value={Number(carddetails.carddetails.rating)} readOnly />
     <Typography  sx={{ fontSize :{lg:'2vh' }  , }} component="legend">{carddetails.carddetails.num_reviews}Review{carddetails.carddetails.num_reviews > 1 && 's'}</Typography>
   </Box>
   <Box display="flex " justifyContent="space-between" sx={{
          marginY : {
            xs: 3,
            sm: 3,
            md: 2,
            lg: 2,
            xl: 2,
          }, marginX : {
            xs: 1,
            sm: 6,
            md: 1,
            lg: 1,
            xl: 1,
          }
     }}>
          <Typography sx={{ fontSize :{lg:'2vh' }  , }}  component="legend">Pricing</Typography>
          <Typography sx={{ fontSize :{lg:'2vh' }  , }}  gutterBottom variant="subtitle1">
            {carddetails.carddetails.price_level}
          </Typography>
        </Box>
        <Box display="flex " justifyContent="space-between" sx={{
       marginY : {
        xs: 3,
        sm: 3,
        md: 2,
        lg: 2,
        xl: 2,
      }, marginX : {
            xs: 1,
            sm: 6,
            md: 1,
            lg: 1,
            xl: 1,
          }
     }}>
        <LocalPhoneIcon sx={{
            fontSize: '1.7rem',
            color: 'text.disabled',
            cursor: 'pointer',
            '&:hover': {
                color: 'text.primary'
            }
        }}/>
          <Typography sx={{ fontSize :{lg:'2vh' }  , }} gutterBottom variant="subtitle1">
            {carddetails.carddetails.phone}
          </Typography>
        </Box>
        <Box display="flex " justifyContent="space-between" sx={{
          marginY : {
            xs: 3,
            sm: 3,
            md: 2,
            lg: 2,
            xl: 2,
          }, marginX : {
            xs: 1,
            sm: 6,
            md: 1,
            lg: 1,
            xl: 1,
          }
     }} >
        <LocationOnIcon sx={{
            fontSize: '1.7rem',
            color: 'text.disabled',
            cursor: 'pointer',
            '&:hover': {
                color: 'text.primary'
            }
        }}/>
          <Typography sx={{ fontSize :{lg:'2vh' }  , }} gutterBottom variant="subtitle1" style={{
            paddingLeft : '5vw',
            textAlign:'right'
          }}>
            {carddetails.carddetails.address}
          </Typography>
        </Box>
        <Box display="flex " justifyContent="space-between" sx={{
        marginY : {
          xs: 3,
          sm: 3,
          md: 2,
          lg: 2,
          xl: 2,
        }, marginX : {
            xs: 1,
            sm: 6,
            md: 1,
            lg: 1,
            xl: 1,
          }
     }} >
        <TagIcon sx={{
            fontSize: '1.7rem',
            color: 'text.disabled',
            cursor: 'pointer',
            '&:hover': {
                color: 'text.primary'
            }
        }}/>
          <Typography sx={{ fontSize :{lg:'2vh' }  , }} gutterBottom variant="subtitle1" style={{
            paddingLeft : '5vw'
          }}>
           Ranked #{ carddetails.carddetails.ranking_position} 
          </Typography>
        </Box>
        <Box display="flex " justifyContent="space-between" sx={{
        marginY : {
            xs: 3,
            sm: 3,
            md: 2,
            lg: 2,
            xl: 2,
          }, marginX : {
            xs: 1,
            sm: 6,
            md: 1,
            lg: 1,
            xl: 1,
          }
     }} >
        <LanguageIcon sx={{
            fontSize: '1.7rem',
            color: 'text.disabled',
            cursor: 'pointer',
            '&:hover': {
                color: 'text.primary'
            }
        }}/>
          <Typography sx={{ fontSize :{lg:'2vh' }  , }} gutterBottom variant="subtitle1" style={{
            paddingLeft : '5vw'
          }}>
            <a href={carddetails.carddetails.web_url}  target="_blank"  rel="noopener noreferrer" >VISIT LINK</a> 
          </Typography>
        </Box>
     </>
     }
        </div>
        </>
    )
}



