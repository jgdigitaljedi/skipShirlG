# Skip & Shirley G

This is a memorial site for my grandparents. When my grandfather passed a couple of years ago, I threw up [skipg.me](https://skipg.me) as quickly as I could. The idea was to have a site for everyone to upload photos of my grandfather so we could all have them and to enjoy the photos in the slideshow and gallery. I was about to take the site down as the activity seemed to die off when my grandmother was told she has a short time left. I was asked by my family to breathe new life into the site so we could continue to share and enjoy photos of my grandparents.

## Plans

- have authentication system using Auth0.
  - have "X photos uploaded since your last visit" when you login
  - have uploader name
  - control who can upload photos (I won't let accounts be created until I approve the account. It'll be a sign up and alert the admin situation before anyone can upload)
- use Cloudinary for photos like I have been
- make the whole site look nicer than the last version. I was in a huge rush last time and just threw something up. I can take more time now.
- make it a PWA like last time since everyone seemed to enjoy the idea of having it as an app on their phone.

### Nice to haves

- comment system for the photos
- allow users to tag photos which would allow everyone to search a word or name in the gallery and filter photos accordingly

## Technology

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

- [React](https://reactjs.org/)
- [Primereact](https://primefaces.org/)
- [Auth0](https://auth0.com/)
- [Cloudinary](https://cloudinary.com/)
- [NodeJS](https://nodejs.org/)
- [ExpressJS](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode. Server runs at port 4000.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. The server will also reload when changes are made.<br />
You will also see any lint errors in the console.

Also, you can run `npm run start:client` to run the client side code only and `npm run start:server` to run the server side code only.

### `npm run build`

Builds the app for production to the `build` and `serverBuild` folders.<br />

It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.

The server app is transpiled to JS.

Also, you can run `npm run build:client` to just build the client side app and `npm run build:server` to just transpile the server side code.
