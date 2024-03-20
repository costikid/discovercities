import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CombinedGallery = () => {
  const [data, setData] = useState(null);
  const [locationQuery, setLocationQuery] = useState('');
  const [searchedLocation, setSearchedLocation] = useState('');

  const fetchDataByLocation = async () => {
    try {
      // Fetch data based on location
      const eventData = await fetch(`/api/getEventsByLocation?city=${encodeURIComponent(locationQuery)}`);
      const event = await eventData.json();

      const photoData = await fetch(`/api/getPhotosByLocation?location=${encodeURIComponent(locationQuery)}`);
      const photo = await photoData.json();

      const placeData = await fetch(`/api/getRandomPlacesByLocation?location=${encodeURIComponent(locationQuery)}`);
      const place = await placeData.json();

      // Randomly select one of the data types
      const types = ['event', 'photo', 'place'];
      const randomType = types[Math.floor(Math.random() * types.length)];

      // Set data based on the selected type
      switch (randomType) {
        case 'event':
          setData({ type: 'event', content: event.events[Math.floor(Math.random() * event.events.length)] });
          break;
        case 'photo':
          setData({ type: 'photo', content: photo });
          break;
        case 'place':
          setData({ type: 'place', content: place.places[Math.floor(Math.random() * place.places.length)] });
          break;
        default:
          setData(null);
          break;
      }
    } catch (error) {
      console.error('Failed to fetch data by location:', error);
    }
  };

  const handleSearch = async () => {
    if (locationQuery.trim() === '') {
      alert('Please enter a location first.');
      return;
    }
  
    await fetchDataByLocation();
    setSearchedLocation(locationQuery);
  };

  const handleFetchRandomData = async () => {
    if (locationQuery) {
      await fetchDataByLocation();
    } else {
      alert('Please enter a location first.');
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <input type="text" value={locationQuery} onChange={(e) => setLocationQuery(e.target.value)} className="form-control mb-2" placeholder="Enter location" />
        </div>
        <div className="col">
          <button onClick={handleSearch} className="btn btn-primary mb-2">Search</button>
          <button onClick={handleFetchRandomData} className="btn btn-secondary mb-2">Next</button>
        </div>
      </div>

      {searchedLocation && (
        <p className="mt-3">Searched location: {searchedLocation}</p>
      )}

      <div className="content-container" style={{ maxHeight: '400px', overflow: 'auto' }}>
        {data && (
          <>
            {/* Display data based on its type */}
            {data.type === 'event' && (
              <div className="event-container">
                <h2>Event</h2>
                <h3>{data.content.name}</h3>
                <p>{data.content.date}</p>
                {data.content.images && data.content.images.length > 0 && (
                  <img className="event-image img-fluid" src={data.content.images[0].url} alt={data.content.name} />
                )}
              </div>
            )}

            {data.type === 'photo' && (
              <div className="photo-container">
                <h2>Photo</h2>
                <img className="photo-image img-fluid" src={data.content.imageUrl} alt="Photo" />
                <p>{data.content.description}</p>
              </div>
            )}

            {data.type === 'place' && (
              <div className="place-container">
                <h2>Place</h2>
                <h3>{data.content.name}</h3>
                <p>Alias: {data.content.alias}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CombinedGallery;