# GarageSale
A full-stack responsive ecommerce web application with the following features:
1. Customised caurosel on homepage
2. Product Filtering function on Product List Page
3. Stripe check out payment capability

Self-practice project to improve my development skills.

## Ecommerce App built with:
- ReactJS
- NodeJS
- ExpressJS
- MongoDB
- Stripe API

## Styled primarily using:
- Material UI
- Styled-components
- CSS Flexbox

## Authorisation & Authentication:
- JWT Tokens
- CryptoJS (used Advanced Encryption Standard (AES) cipher algorithm for encryption)
- Read more at https://cryptojs.gitbook.io/docs/"

## Other packages or libraries used:
- dotenv
- cors
- mongoose
- nodemon

## Mongoose Schemas:
- User: { username, email, password, profilePicture, coverPicture, followers, followings, isAdmin, timestamp}
- Conversations: {members(which is array of users), timestamp}
- Messages: {conversationId, sender, text, timestamp}
- Posts: { userId, desc, img, likes, timestamp}


## Credits:
Lama Dev
