// pages/api/getPhotosByLocation.js

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  try {
    const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;
    const { location } = req.query;

    // Make a request to the Unsplash API to search for photos based on the location
    const response = await fetch(`https://api.unsplash.com/photos/random?query=${location}&client_id=${unsplashAccessKey}`);
    const data = await response.json();
    
    // Extract the URL and description of the random photo
    const imageUrl = data.urls.regular;
    const description = data.description;

    // Return the URL and description of the random photo
    res.status(200).json({ imageUrl, description });
  } catch (error) {
    console.error('Failed to fetch photos by location:', error);
    res.status(500).json({ error: 'Failed to fetch photos by location' });
  }
};
