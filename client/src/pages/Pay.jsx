import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
// import { useNavigate } from "react-router-dom";
const KEY =
  "pk_test_51Hp3eeHgUWO1JwHDR27PL9e5dDkoA0JkpjbEVCDFaO8Xs37f0yCbx2LNzN7M5lnkHY145BL7GFRkn3L46U0dDVE500xIiWOYgt";
const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();
  // const navigate = useNavigate();
  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: 2000,
          }
        );
        console.log(res.data);
        // history.push("/success");
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {stripeToken ? (
        <span>Processing. Please wait...</span>
      ) : (
        <StripeCheckout
          name="Garage Shop"
          image="https://avatars.githubusercontent.com/u/8252901?v=4"
          billingAddress
          shippingAddress
          description="Your total is $30"
          amount={2000} //cents
          token={onToken}
          stripeKey={KEY}
        >
          <button
            style={{
              border: "none",
              width: 120,
              borderRadius: 5,
              padding: "20px",
              backgroundColor: "black",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Pay Now
          </button>
        </StripeCheckout>
      )}
    </div>
  );
};

export default Pay;
