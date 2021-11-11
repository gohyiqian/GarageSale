# GarageSale

A full-stack responsive ecommerce web application with the following features:

1. Customised caurosel on Homepage
2. Product Filtering function on ProductCategoryPage
3. Product Sort according to Price on ProductCategoryPage
4. Stripe check out payment capability

Self-practice project to improve my development skills.

## Ecommerce App built with:

- ReactJS
- NodeJS
- ExpressJS
- MongoDB
- Stripe API
- Socket io

## Styled using (ordered in degree of usage) :

- Styled-components
- CSS Flexbox
- Material UI (for Icons)
- TailWind CSS (some classNames)

## Authorisation & Authentication:

- JWT Tokens
- CryptoJS (used Advanced Encryption Standard (AES) cipher algorithm for encryption)
- Read more at https://cryptojs.gitbook.io/docs/"

## Other packages or libraries used:

- dotenv
- cors
- mongoose
- nodemon
- multer
- express-validator

## Mongoose Schemas:

- User: { username, email, password, profilePicture, coverPicture, followers, followings, isAdmin, timestamp}
- Conversations: {members(which is array of users), timestamp}
- Messages: {conversationId, sender, text, timestamp}
- Posts: { userId, desc, img, likes, timestamp}

## Pending MVP:

- Add Navbar and Footer
- Layout using CSS Flexbox with styled-components
- Display all Categories on HomePage
- Display 8 Products on HomePage
- Add Caurosel
- Fix the login credentials
- store JWTs inside an httpOnly cookie (avoid XSS attack)
- Add to Cart Features
- Delete From Cart Features
- Update stripe from legacy version to new version
- Add Admin Dashboard to Post (Upload Imgs, desc etc)
- Add Create Shop Function
- Add Follow Favorite Product
- Add Follow Favorite Shop
- Add Chat icon fixed on Bottom right
- Add Chat with socket.io features

## Pending Bonus:

- Metamask Login Options
- Login via Google Options
- OpenSea API to convert into an fake NFTs ecommerce instead
