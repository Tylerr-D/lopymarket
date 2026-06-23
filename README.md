# Lopymarket

so basically this is a prediction market app. it pulls real market data from polymarket and lets you trade on it with fake coins.

## how it works

you open the app, you see all the markets on the home page. click one, see the yes/no prices, put in how many shares you want and buy or sell. your whole trade history and how much you made or lost is in the portfolio page.

## pages

home - all the markets, search bar, prices come from polymarket and update on their own

market page - click any market and you see everything. current prices, a preview of what your trade would cost and what you'd make if you're right, then just buy or sell

portfolio - all your trades and your current profit/loss

## stack

react, node/express, mongodb, polymarket gamma api

## to run it

backend
```
node server.js
```

frontend
```
npm run dev
```

you need a .env file in the frontend folder
```
VITE_API_URL=your_backend_url
```
