import { useState } from 'react';
import ProductGallery from '../components/ProductGallery';
import RestaurantGallery from '../components/RestaurantGallery';

import EventGallery from '../components/EventGallery'; // Import the new EventGallery component

export default function Home() {
  const [state] = useState(); // Using useState to resolve the warning

  return (
    <div>
      <h1>Welcome Local Experiences</h1>
      <h2>Photos</h2>
      <ProductGallery />
      <h2>Events</h2>
      <EventGallery /> {/* Render the EventGallery component */}
      <h2>Restaurants</h2>
      <RestaurantGallery /> 
      {/* Render the EventGallery component */}
    
    </div>
  );
}
