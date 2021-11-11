const sdk = require("api")("@opensea/v1.0#8j6fksradfoi");

sdk["retrieving-orders"]({
  bundled: "false",
  include_bundled: "false",
  include_invalid: "false",
  limit: "20",
  offset: "0",
  order_by: "created_date",
  order_direction: "desc",
})
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

console.log(sdk);
