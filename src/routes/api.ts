import express from 'express';
import { CommunityController } from '../controller/CommunityController';
import { FriendshipController } from "../controller/FriendshipController";

export const api = express.Router();
// Get community by ID
api.get('/:id', CommunityController.findById);

// Get communities by tag
api.get('/tags/:tagId', CommunityController.findAllByTag);

// Create a new community
api.post('/', CommunityController.create);

// Update an existing community
api.put('/:id', CommunityController.update);

// Delete a community
api.delete('/:id', CommunityController.delete);

api.post("/follow", FriendshipController.addFriend);

// Route untuk unfollow (removeFriend)
api.post("/unfollow", FriendshipController.removeFriend);

// Route untuk mendapatkan teman
api.get("/:userId/friends", FriendshipController.getFriends);

