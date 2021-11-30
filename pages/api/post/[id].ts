import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import connectDB from '../../../middleware/mongodb';
import { Post } from '../../../model/post';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getSession({ req });

	if (req.method === 'DELETE') {
		if (!session) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}
		const post = await Post.findOneAndDelete({ _id: req.query.id });
		res.status(200).json(post);
	} else if (req.method === 'GET') {
		const post = await Post.findOne({ _id: req.query.id });
		res.status(200).json(post);
	}
}

export default connectDB(handler);
