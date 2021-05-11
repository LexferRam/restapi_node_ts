import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
    name: { type:String, required: true },
    email: { type:String, required: true, unique:true},
    password: { type:String, required: true },
    username: { type:String,required:true},
    createdAt: { type: Date , default: Date.now },
    posts:[{
        type: Schema.Types.ObjectId,//guarda el id de las publicaciones
        ref: 'Post'//hace referencia al modelo Post
    }]
});

export default model('User', UserSchema);

