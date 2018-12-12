# NodeJS 10 + Express 4 + TypeScript 3 + Docker

  - manageable and simple configuration
  - easy and clean structure of controller / action
  - multi-threads ready 
  - redis ready
  - mysql ready
         
## Installation & Configuration

1. Copy file `.env.dist` to `.env`
2. Run `$ docker-compose install`
3. And finally, run one of these to start your app:
  - run your app `.ts` files directly:
    > $ docker-compose up dev
  - run your app `.ts` files directly and nodemon will watch you file changes and reload the app
    > $ docker-compose up dev-watch
  - install dependencies and compile your app `src/*.ts` files to `dist/src/*.js` files. 
    > $ docker-compose run build-prod
  - run compiled prod app
    > $ docker-compose up prod

## Other docker-compose commands

 - Access to container shell
    > $ docker-compose run shell
 - Run tests
    > $ docker-compose run tests   
    
## Tips

-   In production, don't forget to switch environment variable `NODE_ENV` to `production`. This can have a big impact on performance.

