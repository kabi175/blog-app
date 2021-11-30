import { NextApiRequest, NextApiResponse } from 'next';
import { Post } from '../../model/post';
import { getSession } from 'next-auth/client';
import connectDB from '../../middleware/mongodb';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getSession({ req });
	if (req.method === 'GET') {
		if (!session) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}
		const posts = await Post.find({ username: session.user?.name });
		res.json(posts);
	}
}

export default connectDB(handler);
