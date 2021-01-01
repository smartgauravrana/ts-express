import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import http from 'http';

import routes from './routes';

const app = express();

const port = process.env.PORT || 3000;

const server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieSession({keys: ['s3crwtyy']}));

app.use('/', routes);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});