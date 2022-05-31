# anime-mobile (anime-app-quasar)

Anime app with quasar and vuejs

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

### The backend configuration using node-express and mysql

# Go to directory

app_backend/
npm i

# Intall lates MYSQL DB and restore using sql dump file locate /app_backend/anime_app.sql

mysql -u root -p anime_app < anime_app.sql

# Run the application backend using

npm run server
