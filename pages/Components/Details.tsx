import React from 'react';
import { Box, Rating, Typography } from "@mui/material";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TagIcon from '@mui/icons-material/Tag';
import LanguageIcon from '@mui/icons-material/Language';
import Image from 'next/image';

interface Props {
  carddetails: {
    name?: string;
    photo?: {
      images: {
        large: {
          url: string;
        };
      };
    };
    rating?: number;
    num_reviews?: number;
    price_level?: string;
    phone?: string;
    address?: string;
    ranking_position?: number;
    web_url?: string;
  };
}

const Details: React.FC<Props> = ({ carddetails }) => {
  return (
    <div className="details-mob sm:details-tab lg:details-pc w-full top-0 fixed backdrop-blur-3xl p-8 bg-white">
      {carddetails && (
        <>
          <h1 className="pt-10 sm:pt-12 lg:pt-0 pb-4 sm:pb-1 lg:pb-2 pl-20 sm:pl-60 lg:pl-4 w-full lg:w-10/12 text-xl font-medium">
            {carddetails.name || 'No name available'}
          </h1>
          <br />
          <Image
            className="h-56 w-96 pb-6 sm:pb-4 lg:pb-8 ml-0 sm:ml-44 lg:ml-0"
            src={
              carddetails.photo?.images?.large?.url ||
              'https://fierytrippers.com/wp-content/uploads/2019/08/Top-25-Tourist-Places-In-Delhi.webp'
            }
            alt={carddetails.name || 'Tourist Place'}
            width={400}
            height={250}
            priority
          />
          <Box className="overflow-auto scrollbar-hide details-scroll">
            <Box
              display="flex"
              justifyContent="space-between"
              sx={{
                marginY: { xs: 3, sm: 3, md: 2, lg: 2, xl: 2 },
                marginX: { xs: 1, sm: 6, md: 1, lg: 1, xl: 1 },
              }}
            >
              <Rating
                sx={{ fontSize: { lg: '1.1rem' } }}
                name="read-only"
                value={Number(carddetails.rating) || 0}
                readOnly
              />
              <Typography sx={{ fontSize: { lg: '2vh' } }} component="legend">
  {carddetails.num_reviews ?? 0} Review{carddetails.num_reviews && carddetails.num_reviews > 1 ? 's' : ''}
</Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              sx={{
                marginY: { xs: 3, sm: 3, md: 2, lg: 2, xl: 2 },
                marginX: { xs: 1, sm: 6, md: 1, lg: 1, xl: 1 },
              }}
            >
              <Typography sx={{ fontSize: { lg: '2vh' } }} component="legend">
                Pricing
              </Typography>
              <Typography sx={{ fontSize: { lg: '2vh' } }} gutterBottom variant="subtitle1">
                {carddetails.price_level || 'No pricing info'}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              sx={{
                marginY: { xs: 3, sm: 3, md: 2, lg: 2, xl: 2 },
                marginX: { xs: 1, sm: 6, md: 1, lg: 1, xl: 1 },
              }}
            >
              <LocalPhoneIcon
                sx={{
                  fontSize: '1.7rem',
                  color: 'text.disabled',
                  cursor: 'pointer',
                  '&:hover': {
                    color: 'text.primary',
                  },
                }}
              />
              <Typography sx={{ fontSize: { lg: '2vh' } }} gutterBottom variant="subtitle1">
                {carddetails.phone || 'No phone available'}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              sx={{
                marginY: { xs: 3, sm: 3, md: 2, lg: 2, xl: 2 },
                marginX: { xs: 1, sm: 6, md: 1, lg: 1, xl: 1 },
              }}
            >
              <LocationOnIcon
                sx={{
                  fontSize: '1.7rem',
                  color: 'text.disabled',
                  cursor: 'pointer',
                  '&:hover': {
                    color: 'text.primary',
                  },
                }}
              />
              <Typography
                sx={{ fontSize: { lg: '2vh' } }}
                gutterBottom
                variant="subtitle1"
                style={{
                  paddingLeft: '5vw',
                  textAlign: 'right',
                }}
              >
                {carddetails.address || 'No address available'}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              sx={{
                marginY: { xs: 3, sm: 3, md: 2, lg: 2, xl: 2 },
                marginX: { xs: 1, sm: 6, md: 1, lg: 1, xl: 1 },
              }}
            >
              <TagIcon
                sx={{
                  fontSize: '1.7rem',
                  color: 'text.disabled',
                  cursor: 'pointer',
                  '&:hover': {
                    color: 'text.primary',
                  },
                }}
              />
              <Typography
                sx={{ fontSize: { lg: '2vh' } }}
                gutterBottom
                variant="subtitle1"
                style={{
                  paddingLeft: '5vw',
                }}
              >
                Ranked #{carddetails.ranking_position || 'N/A'}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              sx={{
                marginY: { xs: 3, sm: 3, md: 2, lg: 2, xl: 2 },
                marginX: { xs: 1, sm: 6, md: 1, lg: 1, xl: 1 },
              }}
            >
              <LanguageIcon
                sx={{
                  fontSize: '1.7rem',
                  color: 'text.disabled',
                  cursor: 'pointer',
                  '&:hover': {
                    color: 'text.primary',
                  },
                }}
              />
              <Typography
                sx={{ fontSize: { lg: '2vh' } }}
                gutterBottom
                variant="subtitle1"
                style={{
                  paddingLeft: '5vw',
                }}
              >
                <a href={carddetails.web_url || '#'} target="_blank" rel="noopener noreferrer">
                  {carddetails.web_url ? 'VISIT LINK' : 'No link available'}
                </a>
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </div>
  );
};

export default Details;
