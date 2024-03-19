import { useState, useEffect } from 'react';

const ProductGallery = () => {
  const [photoData, setPhotoData] = useState(null);
  const [locationQuery, setLocationQuery] = useState('');

  useEffect(() => {
    fetchPhotosByLocation(); // Fetch photos on component mount
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const fetchPhotosByLocation = async () => {
    try {
      const response = await fetch(`/api/getPhotosByLocation?location=${encodeURIComponent(locationQuery)}`);
      const data = await response.json();
      setPhotoData(data);
    } catch (error) {
      console.error('Failed to fetch photos by location:', error);
    }
  };

  const handleSwipeRight = () => {
    fetchPhotosByLocation(); // Fetch photos when swiped right
  };

  const handleLocationInputChange = (event) => {
    setLocationQuery(event.target.value);
  };

  const handleSearch = () => {
    fetchPhotosByLocation(); // Fetch photos when search button clicked
  };

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <div>
        <input type="text" value={locationQuery} onChange={handleLocationInputChange} placeholder="Enter location" />
        <button onClick={handleSearch}>Search</button>
      </div>
      <button onClick={fetchPhotosByLocation}>Fetch Photos</button>
      {photoData && (
        <div>
          <img src={photoData.imageUrl} alt="Photo" />
          <p>{photoData.description}</p>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
