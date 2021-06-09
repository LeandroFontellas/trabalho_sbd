import express from 'express';
import cors from 'cors';
import { routes } from './app';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(8080, () => {
  // eslint-disable-next-line no-console
  console.log('Server started at port 8080');
});
