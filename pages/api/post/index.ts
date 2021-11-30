import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import connectDB from '../../../middleware/mongodb';
import { Post } from '../../../model/post';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getSession({ req });

	if (req.method === 'POST') {
		if (!session) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}
		const post = {
			username: session.user?.name,
			email: session.user?.email,
			title: req.body?.title,
			data: req.body?.data,
			createdAt: new Date(),
		};
		Post.create(post);
		return;
	} else if (req.method === 'GET') {
		const posts = await Post.find().limit(10);
		res.status(200).json(posts);
	} else if (req.method === 'PUT') {
		const { id, title, data } = req.body;
		console.log(title, data);
		const post = await Post.findOneAndUpdate(
			{ _id: id },
			{ title: title, data: data }
		);
		res.status(200).json(post);
	}
	console.log(req.method);
	res.send('method not allowed');
}

export default connectDB(handler);
