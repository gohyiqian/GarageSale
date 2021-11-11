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
- Stripe API (Payment CheckOut)
- Unsplash API (For querying Photos)
- Socket io (Live Chat)

## Styled using (ordered in degree of usage) :

- Styled-components
- CSS Flexbox
- Material UI (for Icons)
- TailWind CSS (some classNames)

## Authorisation & Authentication:

- JWT Tokens
- Cookier-Parser
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

- [x] Add Navbar and Footer
- [x] Layout using CSS Flexbox with styled-components
- [x] Display all Categories on HomePage
- [x] Display 8 Products on HomePage
- [x] Add Caurosel
- [x] Fix the login credentials
- [x] store JWTs inside an httpOnly cookie (avoid XSS attack)
- [ ] Add to Cart Features
- [ ] Delete From Cart Features
- [ ] Add Stripe CheckOut
- [ ] Add Order Success Page
- [ ] Add Admin Dashboard to see Sales Data
- [ ] Add Create Shop
- [ ] Add Follow Favorite Product
- [ ] Add Follow Favorite Shop
- [ ] Add Chat icon fixed on Bottom right
- [ ] Add Chat with socket.io features

## Pending Bonus:

- [ ] Metamask Login Options for user to remain anonymous
- [ ] Login via Google Options/ Passport JS
- [ ] Email notification upon Registering
- [ ] WhatsApp or Telegram notification upon Order Completion
- [ ] Add product/shop location and user location
- [ ] Map distance to show Product Delivery time upon Order Completion
