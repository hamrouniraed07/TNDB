import express from 'express';
import mongoose from 'mongoose';
import config from './config/config';
import bodyParser from 'body-parser'
import ApiRoutes from './routes';
import cors from "cors"

mongoose.Promise = global.Promise;
mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	console.log("connected to db");
}).catch(e => {
	console.log("failed to connect :", e);
});


const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use('/api', ApiRoutes);
app.use('/static', express.static('static'));

const server = app.listen(config.PORT, () => {
	console.log(`Server ready on port ${config.PORT}`);
});
