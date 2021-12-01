# GarageSale

A full-stack responsive ecommerce web application with the following features:

1. Customised caurosel on Homepage
2. Product Filtering function on ProductCategoryPage
3. Product Sort according to Price on ProductCategoryPage
4. Stripe check out payment capability
5. The Unique Selling Point(USP) of this application is the drag-and-drop features whereby user can drag the desired products directly into the shopping cart instead of button click.

Self-practice project to improve my development skills.

## Ecommerce App built with:

- ReactJS - frontEnd
- React3Fiber - 3D features
- ThreeJS - 3D features
- ReactDnD - Drag&Drop features for cart
- Redux - frontEnd state management
- Django - backend API
- NodeJS - npm package management
- PostsgreSQL - relational database
- Stripe API/ Paypal - Payment CheckOut
- Socket io (Live Chat)
- Amazon S3 - storage of product images
- Heroku - deployment together with gunicorn webserver

## Styled using a mixed of the following:

- Styled-components
- CSS Flexbox
- React-bootstrap
- Material UI (for Icons)
- TailWind CSS (some classNames)

## Authorisation & Authentication:

- JWT Tokens
- Set Local Storage

## Django Models:

- User: { username, email, password, profilePicture, coverPicture, followers, followings, isAdmin, timestamp}
- Conversations: {members(which is array of users), timestamp}
- Messages: {conversationId, sender, text, timestamp}
- Posts: { userId, desc, img, likes, timestamp}

## Pending MVP:

The MVP will have the essential features of an ecommerce applications such as:

1. Browsing Products by categories
2. Filter Products by colors, sizes, gender
3. Sort Products by prices and createdDates
4. Add to Cart Feature
5. Check out Feature
6. USP Features: Able to Drag Products to Cart

### To-do Checklist:

- [x] Add Navbar and Footer
- [x] Design Layout using CSS Flexbox with styled-components/ react-bootstrap
- [x] Display all Categories on HomePage
- [x] Display 8 Products on HomePage
- [x] Add Caurosel on HomePage
- [x] Fix the login credentials
- [x] store JWTs inside an httpOnly cookie (avoid XSS attack)
- [x] Create Redux store, slice and actions
- [x] useSelector and useDispatch to connect components to store
- [x] Add to Cart Features
- [x] Delete From Cart Features
- [x] Store Product Image JPEG on AWS S3
- [ ] Add Product Reviews
- [ ] Add Stripe CheckOut
- [ ] Add Order Success Page
- [ ] Add Admin Dashboard to see Sales Data
- [ ] Add threeJs for some products
- [ ] Add Shop
- [ ] Add Chat with Shop Owner
- [ ] Add Follow Favorite Product
- [ ] Add Follow Favorite Shop
- [ ] Add threeJS features on showProductPage
- [ ] Hide credentials with environ
- [ ] Deployment to Heroku

## Pending Bonus:

- [ ] Metamask Login Options for user to remain anonymous
- [ ] Login via Google OAuth Options/ Passport JS
- [ ] Email notification/verification upon Account registration
- [ ] WhatsApp or Telegram notification upon Order Completion
- [ ] Add product/shop location and user location
- [ ] Map distance to show Product Delivery time upon Order Completion
- [ ] Add Chat icon fixed on Bottom right
- [ ] Add Chat with socket.io features
