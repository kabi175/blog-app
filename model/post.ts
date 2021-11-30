import mongoose, { Schema, model } from 'mongoose';

const PostSchema = new Schema({
	username: String,
	email: String,
	title: String,
	data: String,
	createdAt: Date,
});

export interface IPost {
	_id: string;
	title: string;
	data: string;
	username: string;
}

export const Post = mongoose.models.Post || model('Post', PostSchema);
