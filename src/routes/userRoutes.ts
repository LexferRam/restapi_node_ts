import {Request, Response, Router} from 'express';
import User from '../models/User'

class UserRoutes{

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    public async getUsers(req: Request,res: Response): Promise<void>{
       const users = await User.find();
       res.send(users)
    }

    public async createUser(req: Request, res:Response): Promise<void>{
        const newUser = new User(req.body);
        await newUser.save();
        res.json({data: newUser});
    }
    
    public async getUser(req:Request, res:Response): Promise<void>{
        const user = await User.findOne({username: req.params.username}).populate('posts', 'title url -_id');
        //se le indica a cual propiedad se va a "poblar", ahora cada vez que a una user haga ref al id de un post, en lugar de solo mostrar 
        //el id del post se mostraran todos los datos del post con los dato del user, el 2do parametro es para idicar con cuales propiedades voy a poblar
        //el "-" quita la propie _id
        res.json(user)
    }

    public async updateUser(req:Request, res:Response): Promise<void>{
        const {username} = req.params;
        const user = await User.findOneAndUpdate({username}, req.body, {new:true});
        // el obj {new:true} es para indicar que retorne el obj que esta actualizado
        res.json(user);
    }

    public async deleteUser(req:Request, res:Response): Promise<void>{
        const {username} =req.params;
        await User.findOneAndDelete({username});
        res.json('Deleted');
    }

    routes(){
        this.router.get('/', this.getUsers);
        this.router.get('/:username', this.getUser);
        this.router.post('/', this.createUser);
        this.router.put('/:username',this.updateUser);
        this.router.delete('/:username', this.deleteUser);
    }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;