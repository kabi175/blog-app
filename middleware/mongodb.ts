import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

const connectDB =
	(handler: Function) =>
	async (req: NextApiRequest, res: NextApiResponse) => {
		if (mongoose.connections[0].readyState) {
			return handler(req, res);
		}
		await mongoose.connect(
			'mongodb+srv://kabiAdmin:ljGOlMHtOqkJrWrf@cluster0.sbiiz.mongodb.net/db?retryWrites=true&w=majority',
			(err) => console.log(err)
		);
		return handler(req, res);
	};

export default connectDB;
