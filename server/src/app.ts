
import express, { Request, Response, NextFunction } from 'express';
import routes from './routes/index'
// import config = ('config');
import { connect } from './utils/db_connect';
import cors from 'cors';
import path from 'path';
import { InsuranceService } from './services/insurances.service';
import { InsuranceEventsService } from './services/insurance-events.service';

declare global {
  namespace Express {
    interface Application {
      insuranceService: InsuranceService;
      insuranceEventsService: InsuranceEventsService
    }
  }
}


const app = express();
const port = 3200;

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.insuranceService = new InsuranceService();
app.insuranceEventsService = new InsuranceEventsService();
// parse application/json
// app.use(bodyParser.json())
app.use(cors())
app.use('/images', express.static(path.join('images')));
app.use(routes);
// app.use(function (err: any, req: Request, res: Response, next: NextFunction) { // Global error handling
//   res.status(500).send(err);
// });


app.listen(port, async () => {
  console.log(`App is running at http://localhost:${port}`);
  if (process.env.NODE_ENV.includes('development') // true
  ) {
    await connect();
  }
});

export default app;
