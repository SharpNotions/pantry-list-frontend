<div align="center">
  <img src="https://github.com/SharpNotions/pantry-list-frontend/blob/master/src/assets/pantry-logo.svg" />
  <h1>Pantry List Frontend</h1>
  <p>A Vue-based UI for the Pantry List app.</p1>
</div>

## Development Setup

1.  Initialize the development services with `./start init`
2.  Start the development server: `./start dev`
3.  Run unit tests: `./start test`

By default, `webpack-dev-server` proxies all API requests to the production server.

If you want to run pantry-list-api locally, change [this line](https://github.com/SharpNotions/pantry-list-frontend/blob/f73df02f6f5a8cc4b0752af1f2e71bb597ae986a/webpack.config.js#L90)
to `localhost:4000`.

To play with `GraphQL`, go to https://pantry-list-api.herokuapp.com/graphiql

# Deploying

Deployments are done using Heroku.

```
heroku container:push web --app=pantry-list-frontend
heroku container:release web --app=pantry-list-frontend
```
