import express from 'express';
import Routes from './routes/index';
import { errorResponse } from 'middlewares/error';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(Routes);
app.use(errorResponse);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}...`);
});

export default app;
