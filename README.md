```bash
# install packages
$ npm install

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
npm run start:prod
```

## Test
```bash
# unit tests
$ npm run test
```

## Postgres Migrations
```bash
# revert migrations - run down only one last migration
$ npm run migrate-revert

# run up all migrations
$ npm run migrate-run

# fill postgres with test data after migration run up
$ npm run fillpg:testdata
```
