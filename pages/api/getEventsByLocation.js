// pages/api/getEventsByLocation.js

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  try {
    const { city } = req.query;
    const apiKey = process.env.TICKETMASTER_API_KEY;

    // Make a request to the Ticketmaster API to search for events based on the city
    const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&apikey=${apiKey}`);
    const data = await response.json();

    // Extract relevant event data
    const events = data._embedded?.events || [];

    // Extract event images from each event
    const eventsWithImages = events.map(event => ({
      name: event.name,
      date: event.dates.start.localDate,
      images: event.images.map(image => ({
        url: image.url,
       
      })),
    }));

    // Return the events with images
    res.status(200).json({ events: eventsWithImages });
  } catch (error) {
    console.error('Failed to fetch events by location:', error);
    res.status(500).json({ error: 'Failed to fetch events by location' });
  }
};
