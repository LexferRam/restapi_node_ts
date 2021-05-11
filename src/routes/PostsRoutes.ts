import {Request, Response, Router} from 'express';
import Post from '../models/Post'
import { clearScreenDown } from 'readline';

class PostRoutes{

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    public async getPosts(req: Request,res: Response): Promise<void>{
       const posts = await Post.find();
       res.send(posts)
    }

    public async createPost(req: Request, res:Response): Promise<void>{
        const {title,url,content,image} = req.body;
        const newPost = new Post({title,url,content,image});
        await newPost.save();
        res.json({data: newPost});
    }
    
    public async getPost(req:Request, res:Response): Promise<void>{
        const post = await Post.findOne({url: req.params.url});
        console.log(post)
        res.json(post)
    }

    public async updatePost(req:Request, res:Response): Promise<void>{
        const {url} = req.params;
        const post = await Post.findOneAndUpdate({url}, req.body, {new:true});
        // el obj {new:true} es para indicar que retorne el obj que esta actualizado
        res.json(post);
    }

    public async deletePost(req:Request, res:Response): Promise<void>{
        const {url} =req.params;
        await Post.findOneAndDelete({url});
        res.json('Deleted');
    }

    routes(){
        this.router.get('/', this.getPosts);
        this.router.get('/:url', this.getPost);
        this.router.post('/', this.createPost);
        this.router.put('/:url',this.updatePost);
        this.router.delete('/:url', this.deletePost);
    }
}

const postRoutes = new PostRoutes();
export default postRoutes.router;