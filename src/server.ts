import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
//Routes
import indexRoutes from './routes/indexRoutes';
import PostRoutes from './routes/PostsRoutes';
import UserRoutes from './routes/userRoutes';

class Server{

    public app :express.Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        const MONGO_URI = 'mongodb://localhost/restapits'
        mongoose.connect(MONGO_URI || process.env.MONGODB_URI, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true
        })
        .then(db => console.log('DB connected'));

        //Settings
        this.app.set('port', process.env.PORT || 4000);
        //Middlewares
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended:false }))
        this.app.use(helmet());
        this.app.use(compression());//modulo para reducir el peso de las rspuestas
        this.app.use(cors());
    }

    routes(){
        this.app.use(indexRoutes);
        this.app.use('/api/posts', PostRoutes);
        this.app.use('/api/users', UserRoutes);
    }

    start(){
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server on port`, this.app.get('port'));
        })
    }

}

//obj que tiene l=todas las propiedades y metodos declarados en la clase
const server = new Server();
server.start();