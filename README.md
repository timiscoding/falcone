# Software Engineer - Frontend CHALLENGE

## Dev build

Install deps and run dev server:

`npm i` and `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Run tests:

`npm test`

## Thoughts

I was given the hint to use object oriented programming for this exercise and I researched SOLID principles and [clean architecture sample code](https://github.com/eduardomoroni/react-clean-architecture) and even though I would've like to try doing it that way, I just did it the way I'm used to as I wanted to get a solution out within the week. I'd be interested to discuss what type of solution you were looking for in regards to OO style.

## Deps

Keeping things as simple and minimal as possible:

- React with plain JS
- prop-types
- Create React App for project setup
- wouter for simple 2 page navigation instead of react-router
- use-reducer-async for handling async actions. Went with react contex to store shared state instead of Redux since this was a simple app.
- tailwind for styling. First time using it as I heard its great for quick prototyping. Worked pretty well. App design didn't need any dynamic styling so didn't use CSS-in-JS.

## Tooling

- prettier formatter
- eslint
- jest
- testing-library/react
