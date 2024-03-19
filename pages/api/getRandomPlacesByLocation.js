// pages/api/getYelpPlacesByLocation.js

const yelp = require('yelp-fusion');
require('dotenv').config();

const apiKey = process.env.YELP_API_KEY;

const client = yelp.client(apiKey);

export default async (req, res) => {
  try {
    const { location } = req.query;
    const response = await client.search({
      location,
      sort_by: 'best_match',
      limit: 20
    });
    const places = response.jsonBody.businesses.map(business => ({
      name: business.name,
      alias: business.alias,
      // Add more fields as needed
    }));
    res.status(200).json({ places });
  } catch (error) {
    console.error('Failed to fetch places by location:', error);
    res.status(500).json({ error: 'Failed to fetch places by location' });
  }
};
