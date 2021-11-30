import { useSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import PostCard from '../components/PostCard';
import { IPost } from '../model/post';

export default function Profile() {
	const [session, status] = useSession();

	const [posts, setPosts] = useState<IPost[]>([]);
	const deletePost = (id: string) => {
		setPosts(_.filter(posts, (post: IPost) => post._id !== id));
	};
	useEffect(() => {
		try {
			fetch('/api/posts')
				.then((res) => res.json())
				.then((res) => setPosts(res));
		} catch (err) {
			console.log(err);
		}
	}, []);
	return (
		<div className='w-screen flex flex-col justify-center items-center'>
			<div className='w-full h-14' />
			<div className='w-1/2'>
				<h1 className='text-xl font-bold'>Posts</h1>
				{posts &&
					posts.map(({ username, title, _id }, key) => (
						<PostCard
							key={key}
							id={_id}
							deletePost={deletePost}
							username={username}
							topic={title}
							user={username == session?.user?.name}
						/>
					))}
			</div>
		</div>
	);
}
