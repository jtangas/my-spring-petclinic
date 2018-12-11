### REQUIREMENTS

In order to run this application you will need the following:

- node.js
- npm
- yarn
- nodemon
- mongodb

```sh
$: mongo
$: use my-spring-petclinic
$: db.createUser({user:"spring",pwd:"petclinic",roles:[{role:"readWrite",db:"my-spring-petclinic"}]});
$: exit();
```

### Installation

Navigate into the cloned directory

```sh
$: cd /path/to/my-spring-petclinic
$: yarn install
$: yarn run seed:db // ctrl+c to exit when done
$: yarn run start:dev
```

Then finally navigate to the application in your browser by visiting [http://localhost:5000](http://localhost:5000)

#### Demo Username/password
```sh
username: admin@example.com
password: demo
```
