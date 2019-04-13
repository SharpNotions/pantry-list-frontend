<div align="center">
  <img src="https://github.com/SharpNotions/pantry-list-frontend/blob/master/src/assets/pantry-logo.svg" />
  <h1>Pantry List Frontend</h1>
  <p>A Vue-based UI for the Pantry List app.</p1>
</div>

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```
webpack-dev-server proxies all api requests to production. 

If you want to run pantry-list-api locally, change [this line](https://github.com/SharpNotions/pantry-list-frontend/blob/f73df02f6f5a8cc4b0752af1f2e71bb597ae986a/webpack.config.js#L90)
 to localhost:400

To play with GraphQL, go to https://pantry-list-api.herokuapp.com/graphiql
# Testing
```bash
npm test
```

# Deploying
Pushes to master will trigger builds + deploys via Drone and Zeit Now (respectively).
