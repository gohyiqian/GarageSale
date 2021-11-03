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

## Authorisation & Authentication:
- JWT Tokens

## Other packages or libraries used:
- dotenv
- mongoose
- nodemon

## Mongoose Schemas:
- User: { username, email, password, profilePicture, coverPicture, followers, followings, isAdmin, timestamp}
- Conversations: {members(which is array of users), timestamp}
- Messages: {conversationId, sender, text, timestamp}
- Posts: { userId, desc, img, likes, timestamp}

## Styled using:
- Material UI
- Styled-components

## Credits:
Lama Dev
