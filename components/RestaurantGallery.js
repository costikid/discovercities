import { useState } from 'react';

const RestaurantGallery = () => {
  const [place, setPlace] = useState(null);
  const [locationQuery, setLocationQuery] = useState('');

  const fetchRandomPlaceByLocation = async () => {
    try {
      const response = await fetch(`/api/getRandomPlacesByLocation?location=${encodeURIComponent(locationQuery)}`);
      const data = await response.json();
      // Select a random place from the fetched places
      const randomIndex = Math.floor(Math.random() * data.places.length);
      const randomPlace = data.places[randomIndex];
      setPlace(randomPlace);
    } catch (error) {
      console.error('Failed to fetch places by location:', error);
    }
  };

  const handleSearch = () => {
    fetchRandomPlaceByLocation();
  };

  const handleFetchRandomPlace = () => {
    fetchRandomPlaceByLocation();
  };

  return (
    <div>
      <input type="text" value={locationQuery} onChange={(e) => setLocationQuery(e.target.value)} placeholder="Enter location" />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleFetchRandomPlace}>Fetch Random Place</button>
      {place && (
        <div>
          <h3>{place.name}</h3>
          <p>Alias: {place.alias}</p>
          {/* Add more fields as needed */}
        </div>
      )}
    </div>
  );
};

export default RestaurantGallery;
