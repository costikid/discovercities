// components/EventGallery.js

import { useState } from 'react';
import Image from 'next/image'


const EventGallery = ({ fetchPhotosByLocation }) => {
  const [events, setEvents] = useState([]);
  const [locationQuery, setLocationQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0); // Index of the currently displayed event

  const fetchEventsByLocation = async () => {
    try {
      const response = await fetch(`/api/getEventsByLocation?city=${encodeURIComponent(locationQuery)}`);
      const data = await response.json();
      setEvents(data.events);
      setCurrentIndex(0); // Reset the index when new events are fetched
    } catch (error) {
      console.error('Failed to fetch events by location:', error);
    }
  };

  const handleSearch = () => {
    fetchEventsByLocation();
  };

  const handleFetchPhotos = () => {
    fetchPhotosByLocation(); // Fetch photos using the function from ProductGallery
  };

  const handleFetchNextEvent = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % events.length); // Increment index and loop back to 0 when reaching the end
  };

  return (
    <div>
      <input type="text" value={locationQuery} onChange={(e) => setLocationQuery(e.target.value)} placeholder="Enter city" />
      <button onClick={handleSearch}>Search</button>
      
      
      {events.length > 0 && ( // Only render if events are available
        <div>
          <h2>{events[currentIndex].name}</h2>
          <p>{events[currentIndex].date}</p>
          {/* Render event images */}
          <div>
            {events[currentIndex].images && events[currentIndex].images.length > 0 && (
              <Image src={events[currentIndex].images[0].url} alt={events[currentIndex].name} /> // Show the first image
            )}
          </div>
          {/* Add more event details as needed */}
        </div>
      )}
      <button onClick={handleFetchNextEvent}>Fetch Next Event</button> {/* Button to fetch the next event */}
    </div>
  );
};

export default EventGallery;
