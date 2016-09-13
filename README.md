# Denali Knex

An awesome addon built on the Denali framework.

## Usage

```sh
npm install knownasilya/denali-knex
```

Update your `config/environment.js`:

```js
let config = {
  // some things before...
  ormAdapter: 'knex',
  knex: {
    client: 'pg',
    connection: {
      host: 'myhost',
      user: 'myuser',
      password: 'mypass',
      database: 'mydb'
    }
  }
}
```

And install the appropriate client module
based on the value set for `knex.client`, see
the [knex docs](http://knexjs.org/#Installation-node).


## Developing

1. Clone the repo down
2. `npm install`
3. `denali server`
4. Hit [localhost:3000](http://localhost:3000)


## Tests

```sh
$ denali test
```
