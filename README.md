# GarageSale

A full-stack responsive ecommerce web application with the following features:

1. Customised caurosel on Homepage
2. Product Filtering function on ProductCategoryPage
3. Product Sort according to Price on ProductCategoryPage
4. Stripe check out payment capability
5. The Unique Selling Point(USP) of this application is the drag-and-drop features whereby user can drag the desired products directly into the shopping cart instead of button click.

Self-practice project to improve my development skills.

## Ecommerce App built with:

- ReactJS
- Redux
- NodeJS
- ExpressJS
- MongoDB/ PostsgreSQL
- Stripe API/ Paypal (Payment CheckOut)
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

The MVP will have the essential features of an ecommerce applications such as:

1. Browsing Products by categories
2. Filter Products by colors, sizes
3. Sort Products by prices and createdDates
4. Add to Cart Feature
5. Check out Feature
6. USP Features: Able to Drag Products to Cart

### To-do Checklist:

- [x] Add Navbar and Footer
- [x] Design Layout using CSS Flexbox with styled-components
- [x] Display all Categories on HomePage
- [x] Display 8 Products on HomePage
- [x] Add Caurosel
- [x] Fix the login credentials
- [x] store JWTs inside an httpOnly cookie (avoid XSS attack)
- [ ] Create Redux store, slice and actions
- [ ] useSelector and useDispatch to connect components to store
- [ ] Add to Cart Features
- [ ] Delete From Cart Features
- [ ] Add Stripe CheckOut
- [ ] Add Order Success Page
- [ ] Add Admin Dashboard to see Sales Data
- [ ] Add Create Shop
- [ ] Add Follow Favorite Product
- [ ] Add Follow Favorite Shop

## Pending Bonus:

- [ ] Metamask Login Options for user to remain anonymous
- [ ] Login via Google OAuth Options/ Passport JS
- [ ] Email notification/verification upon Account registration
- [ ] WhatsApp or Telegram notification upon Order Completion
- [ ] Add product/shop location and user location
- [ ] Map distance to show Product Delivery time upon Order Completion
- [ ] Add Chat icon fixed on Bottom right
- [ ] Add Chat with socket.io features
