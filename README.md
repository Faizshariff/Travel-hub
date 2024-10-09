![BANNER](https://github.com/user-attachments/assets/bd775bda-7953-42bb-af5f-a66c22468243)
<!--
Hi! This is an easter egg.
Congratulations you're the one!
-->

<!-- # 👀 Hi stranger! 👋🏻 -->

# 🗺️ Travel Hub

This web application is a modern feature-rich GMaps clone built with Next.js, aimed at providing users with weather conditions, nearby restaurants, and attractions based on their current or searched location. It also includes features like dark mode and autocomplete suggestions for places. Directions to selected restaurants or attractions are also rendered, with links to TripAdvisor pages.

- 📍 Geolocation-based weather display
- 🍽️ Search for nearby restaurants and attractions
- 🔍 Autocomplete search suggestions
- 🗺️ Directions rendering
- 🌓 Dark mode support
- 📱 Responsive design



# Tech stack:

- **Framework**: Next.js with TypeScript
- **Map Rendering**: Mapbox GL, react-map-gl
- **Styling**: Material-UI , Tailwind CSS
- **APIs**:  
  - Mapbox API : displaying interactive maps and rendering location data on the map
  - Geolocation API : Native JavaScript API used to get the user's current geographical location.
  - Travel Advisor API (RapidAPI) : Provides details on nearby restaurants and attractions based on the user's or searched location.
  - Weather-api (RapidAPI) : Fetches and displays the weather condition of the user's current location.
  - LocationIQ : Used for autocomplete suggestions while searching and for retrieving directions between the user and the target location.
- **Libraries and packages**:
  - react-map-gl for integrating Mapbox with React.
  - axios for making API requests.
  - lodash, framer-motion and more for additional functionality.


## 📁 Project Structure

```
├── pages/
│   ├── api/
│   │   └── indexapi.js                        # API route for server-side data fetching
│   ├── Components/                            # Reusable components for the app
│   │   ├── Autocomplete.tsx
│   │   ├── Details.tsx
│   │   ├── Gmap.tsx
│   │   ├── List.tsx
│   │   └── Search.tsx
│   ├── _app.tsx                                # Home page (root)
│   └── index.tsx                               # Main app entry
├── public/Components                           # Public assets (images, icons, etc.)
├── styles/
├── .env.local                                  # Environment variables
├── next.config.js
├── package.json
└── tsconfig.json
```
---

# HLD of application

![design2](https://github.com/user-attachments/assets/fb3263b3-4161-4eb5-a04d-0e763394a63c)


---

# Module Explanations

### `pages/api`
- **indexapi.js**: Handles server-side data fetching. All API calls made from the application are defined here, ensuring centralized management of data interactions.

### `pages/Components`
- **Autocomplete.tsx**: Autocomplete component that manages the autocomplete functionality for the search bar.
- **Details.tsx**: Subpage for each individual restaurent or attraction card
- **Gmap.tsx**: Main component for integrating and displaying the MapBox map.
- **List.tsx**: Manages the rendering of lists of places such as restaurants or attractions & weather based on user's location or search results.
- **Search.tsx**: Search bar component that Implements the search functionality, handling user input

### `pages/_index.tsx`
This is the main entry point of application or parent component 


## Key Fixes & Improvements

### ⭐ Debouncing API Calls in Search
To optimize the search functionality and prevent exceeding the API request limits, I implemented **debouncing** in the `Search.tsx` component. Previously, continuous API calls were made as the user typed in the search bar, resulting in 429 errors (api call rate limit exceeded). With debouncing, the API call is now delayed by 500ms, ensuring more efficient handling of user input and reducing excessive API requests.

### ⭐ Custom Directions Rendering in Mapbox
During the time of developement of this project Mapbox didnt come with native directions feature. To resolve this, I utilized the **Location IQ API** to fetch route data and then manually map the directions on the map using Mapbox's **Layer** functionality. The start and end locations are passed to the API, and the response is used to draw the route on the map, providing a seamless directions experience.



### <h1>Installation</h1>

1. Clone the repository or Download the code and open Travelhub Folder with any code editor
   ```sh
   git clone https://github.com/Faizshariff/Travel-hub.git
   ```

2. Install dependencies
   ```sh
   npm install
   ```

3. Set up environment variables
   Create a `.env.local` file if it doesnt exist in the root directory and add:
   ```
   NEXT_PUBLIC_REACT_APP_MAPBOX_API_KEY_SECURE=your_mapbox_token
   NEXT_PUBLIC_REACT_APP_RAPIDAPI_API_KEY_SECURE=your_traveladvisor_rapidapi_key
   NEXT_PUBLIC_REACT_APP_LOCATIONIQ_API_KEY_SECURE=your_locationiq_token
   NEXT_PUBLIC_REACT_APP_WEATHER_API_KEY=your_weather-api.com_key
   ```

4. Start the development server
   ```sh
   npm run dev
   ```

5. Open `http://localhost:3000` in your browser


* * *

<p align="center">Made with ❤️ and ☕</p>
