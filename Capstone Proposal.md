# Project Title
ANNIE'S JEWLER STORE
## Overview

it's an online jewelry shop of own branded jewelry

### Problem

I have been doing online jewelry retail business for many year. Currently I don't have a independant website for this business.
I used third-party plateform like wix and shopify , they were good but not that easy to do personalization,say if i want to lauch some special marketing program,
it's very difficult to do some function for it.
I also sell on amazon, So develop a website of my own , it will have better chance to interating my sale with my amzazon store in the future 

### User Profile
Almost every adult have chance to buy jewelry, either for themselves or as gift for their friends, lovers, families, classmate etc.
Let users easy find what they like ,show them quality pictures of products and detail information, promote strategy can be implemented in my website too.

### Features

Product category browse
Product search
Product detail viewing and comments
add products to shopping cart
checkout and placing order
user login process
view my order history and profile

## Implementation

### Tech Stack
FRONT END:
Client Framework:React
Styling: SASS
Responsive Desgin

BACK END:
Node.js 
express API server
Knex

database:
MYSQL

### APIs
NEED TO BUILD MY OWN API

### Sitemap
Homepage
Category
Product
Search
ViewCart
Checkout



### Mockups

Provide visuals of your app's screens. You can use tools like Figma or pictures of hand-drawn sketches.

### Data

Describe your data and the relationships between them. You can show this visually using diagrams, or write it out. 
![Database Design](/public/images/db.png)
### Endpoints
--------------------------------------------------------------------
GET /products
returns a list of proudcts which contains limit number of product
contains only information for snapshot productcard
repoonse sample 
[
    {
    "sku": "200901041113"，
    "name":"18K Gold Akoya Pearl earstuds”，
    "main_img":"/images/sku.main.jpg",
    "price":199.99
    "sold":20,
    "discount_price":169.99
    },
]
--------------------------------------------------------------------
GET /proudcts/:sku
returns a detail data object for one product identified by the sku
response sample
{
    "sku": "200901041113"，
    "title":"18K Gold Akoya Pearl earstuds”，    
    "main_img":"/images/sku.main.jpg",
    "other_img":["sku.01.jpg"，"sku.02.jpg"],
    "price":199.99,
    "description":"this product is build with Akoya sea cultured pearl and 18K Gold. The pearl size around 5mm in dirameters."
    "category":["pearl","18kGold"],
    "comments":[
        {
            "id":"1ab6d9f6-da38-456e-9b09-ab0acd9ce818",
            "name":"Jessie",            
            "comment":"this is a very beautiful pearl",
            "timestamp":"1545162149000"
        },
    ],
    "sales":20,
    "stock":5
}
--------------------------------------------------------------------
POST /product/:sku/comment
:sku must be swapped out with the sku of a product as found in proudctlist
Creates a new comment for a specific product
Post body example
{
    "name": "Nigel",
    "comment": "This is a test"
}            
response body example
{
    "name": "Nigel",
    "comment": "This is a test",
    "id": 1ab6d9f6-da38-456e-9b09-ab0acd9ce8184,
    "timestamp": 1531857374673        
}
--------------------------------------------------------------------
POST /orders
Creates a new comment for a specific product
Post body example
{
    "user_id": 1,
    "products": [product_id_1, product_id_2];
}            
response body example
{
    "order_id": order_id
}
--------------------------------------------------------------------
GET /orders/:userId/:orderId
returns one order belongs to userId
reponse sample        
    {
        "id":"1ab6d9f6-da38-456e-9b09-ab0acd9ce818"
        "total":99.99;
        "timestamp":1531857374673,
        "proudct":[
            {
                "sku": 2012020410009,
                "title":"8mm pearl sterling silver pendant",
                "image":"/images/sku.main.jpg",
                "price":99.99,
                "quantity":1
            },
            {
                "sku": 2015091410003,
                "title":"sterling silver earstud",
                "image":"/images/sku.main.jpg",
                "price":19.99,
                "quantity":1
            }
        ]
    }

--------------------------------------------------------------------
GET /orders/:userId
returns a list of all orders belongs to this user identified by userid
reponse sample
[
    {
        "id":"1ab6d9f6-da38-456e-9b09-ab0acd9ce818"
        "total":99.99;
        "timestamp":1545162149000
        "proudct":[
            {
                "sku": 2012020410009,
                "title":"8mm pearl sterling silver pendant",
                "image":"/images/sku.main.jpg",
                "price":99.99,
                "quantity":1
            },
            {
                "sku": 2015091410003,
                "title":"sterling silver earstud",
                "image":"/images/sku.main.jpg",
                "price":19.99,
                "quantity":1
            }
        ]
    }
]

### Auth

Does your project include any login or user profile functionality? If so, describe how authentication/authorization will be implemented.

## Roadmap
client :
sprint-1, build structure, route,header and footer , 2 days
sprint-2, component:product card, product page, product list page, floating cart and cart page, checkout page 4 days
sprint-3, connect with SERVER GET DATA / POST DATA (comment, placing order) 2days
sprint-4,fix bug 2 days

server:
sprint-1, build up database schema and seed data, 3 days
sprint-2, build API Endpoints 4 days
sprint-3, fix bug 2 days

## Nice-to-haves
Payment
My Account
Order History

Admin functions for store managment,for example
add new products
generate new promote code
browse orders, update order status
handle return / refund

