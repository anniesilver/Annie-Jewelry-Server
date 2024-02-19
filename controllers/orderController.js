const knex = require('knex')(require('../knexfile'));
require('dotenv').config();
const base = "https://api-m.sandbox.paypal.com";
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET} = process.env;

const orderList = async (_req, res) => {
    try {
      const data = await knex.from('orders')
      .select('id','user_id');            
      res.status(200).json(data);
    } catch(err) {
      res.status(400).send(`Error retrieving Users: ${err}`)
    }
}
const newOrder = async (req, res) => {
  try {
    // use the cart information passed from the front-end to calculate the order amount detals
    const {user_id, cart} = req.body;
    console.log(user_id,cart);
    // const {name,title,channel,duration,image,video,description}=req.body;
    const subTotal=parseFloat(cart.reduce((total, currentItem) => total + (currentItem.qty*currentItem.price), 0)).toFixed(2);
    const tax = parseFloat(subTotal*0.13).toFixed(2);
    const shippingFee = parseFloat(subTotal>100 ? 0 : 10).toFixed(2);
    const orderTotal = parseFloat(subTotal + subTotal*0.13 + shippingFee).toFixed(2);
    const productList= cart.map ( p=>{
      return{
        product_id:p.id,
        qty:p.qty,
        price:p.price
      }
    });    
    
    const { jsonResponse, httpStatusCode } = await createOrder(orderTotal);
    console.log("status from Paypal server",httpStatusCode);
    console.log("response data from Paypal server",jsonResponse);
    // if  paypal order id created successfully, insert order into our order table now.
    if(httpStatusCode === 201){
      const order = {
        user_id :user_id,    
        total:orderTotal,
        shipping_address:JSON.stringify({}),
        discount:0, 
        product_list:JSON.stringify(productList),
        payment_id:jsonResponse.id,
        order_number:0,
        order_time:knex.raw('CURRENT_TIMESTAMP')
      }    
      try {     
        const data = await knex('orders')
        .insert(order); 
      } catch(err) {
        console.error(`Error insert in new order info to db: ${err}`)
        res.status(500).json({ error: "Failed to create annie jewelry store order." });
      }            
    }    
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create paypal order:", error);
    res.status(500).json({ error: "Failed to create paypal order." });
  }
}

const confirmOrder = async (req, res) => {
  try {
    //this order ID is the order ID created from Paypal.
    const { orderID } = req.params;
    console.log("the order id created just now:",orderID);
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
    console.log("status from Paypal server",httpStatusCode);
    console.log("response data from Paypal server",jsonResponse);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to capture order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
}


/**
 * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
 */
const generateAccessToken = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,
    ).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};

/**
 * Create an order to start the transaction.
 */
const createOrder = async (total) => {
  // use the cart information passed from the front-end to calculate the purchase unit details
  console.log(
    "total amount passed from the frontend createOrder() callback:",
    total,
  );

  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;
  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "CAD",
          value: total,
        },
      },
    ],
  };

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

/**
 * Capture payment for the created order to complete the transaction.
 */
const captureOrder = async (orderID) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderID}/capture`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
  });

  return handleResponse(response);
};

async function handleResponse(response) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}



module.exports = {
    orderList,
    newOrder,
    confirmOrder
}