# NodeJS 9 + Express 4 + TypeScript + Docker

## Installion & Configuration

1. Copy file `.env.dist` to `.env`
2. Run `$ docker-compose build-project`
3. And finally, run one of these to start your app:
  - run your app `.ts` files directly:
    > $ docker-compose up dev
  - run your app `.ts` files directly and nodemon will watch you file changes and reload the app
    > $ docker-compose up dev-watch
  - compile all your app `.ts` files into one app `.js` file and run it. 
    > $ docker-compose up prod

## Other docker-compose commands

 - Access to container shell
    > $ docker-compose run shell
