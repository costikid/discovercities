1 Fork the repo then clone it. 
2 npm install or yarn install in the command line will get you these dependencies 
  "axios": "^1.6.8",
    "isomorphic-fetch": "^3.0.0",
    "next": "14.1.3",
    "react": "^18",
    "react-dom": "^18",
    "yelp-fusion": "^3.0.0"

3 Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4 Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

5 Set up a .env.local in your root folder and get these keys 
UNSPLASH_ACCESS_KEY=
TICKETMASTER_API_KEY=
YELP_API_KEY=
You will need to sign up for those APIs 

https://docs.developer.yelp.com/docs/fusion-intro

https://unsplash.com/developers

https://developer.ticketmaster.com/

By the way, remember the free versions of these APIs have daily limits. 
