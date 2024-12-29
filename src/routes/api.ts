import express from 'express';
import { PostController } from '../controller/PostController';
import { CommunityController } from '../controller/CommunityController';
import { UserController } from '../controller/UserController';

export const api = express.Router();

api.post('/post', PostController.createPost)
api.post('/user', UserController.register)
api.post('/community', CommunityController.createCommunity)