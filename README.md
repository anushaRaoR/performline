
Task -
Build a small, standalone web app using the language/framework of your choice that, given an API token, will display a list of data from the PerformLine API.

Details -
An API Token with access to the Zephyr Company will be given, which has several Brands associated with it.

Each Brand is setup to contain scores and observations for Web pages that are further associated with a Campaign.

The app should be able to:

-Toggle between brands avaialble to the Zephyr Company.

-Display a paginated list of all web pages for that Brand by Id showing the values of Score, Url and LastScored date.

-Filter the list by Campaign or show all.

Steps :

Run `npm install` inside the directory “performline”.

Run `npm start` to start the react app.

The "proxy-Performline" repository has a node service which communicates with performline api since browsers block API responses without CORS header in development.

Run `npm install` inside the directory “proxy” 

After the dependencies are installed, run `node index.js` to start the node service.

The react app started should be able to load the data from the service.

