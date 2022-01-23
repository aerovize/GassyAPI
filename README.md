# GassyAPI

A Expressjs API that fetches current gas prices and helps gig delivery drivers figure out if an order is worth doing based upon
how much they will spend on gas a for a single order.

### Endpoints:

-   GET /all/:zipcode (Example: 43056) -> Fetch All local gas prices with stations listed.
-   GET /prices/:zipcode (Example: 43056) -> Returns the avg gas price
-   POST /calc/ -> Returns the total spent on gas for a order & final profit
