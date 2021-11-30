import { route } from 'next/dist/server/router';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function PostCard({
	id,
	username,
	topic,
	user,
	deletePost,
}: {
	id: string;
	username: string;
	topic: string;
	user?: boolean;
	deletePost?: (id: string) => void;
}) {
	const router = useRouter();
	return (
		<div
			className='bg-white border-4 border-black w-9/12 h-max p-3 m-3'
			onClick={() => router.push(`/post/${id}`)}
		>
			<div className='flex gap-3  items-center'>
				<Image
					className='rounded-full'
					width={50}
					height={50}
					alt='profile'
					src={`https://avatars.dicebear.com/api/initials/${username}.svg`}
				/>
				<div>
					<p className='font-bold text-2xl'>{username}</p>
					<p className='text-gray-600 text-sm'> Nov 20 </p>
				</div>
			</div>
			<div className='pl-12'>
				<p className='font-bold text-3xl'>{topic}</p>
				{user && (
					<div className='pt-3 flex gap-3'>
						<button
							className='bg-gray-300 p-2 rounded-lg'
							onClick={() => router.push(`/post/${id}`)}
						>
							Edit
						</button>
						<button
							className='bg-gray-300 p-2 rounded-lg'
							onClick={async () => {
								await fetch(`/api/post/${id}`, {
									headers: {
										'content-type': 'application/json',
									},
									method: 'DELETE',
								});
								deletePost && deletePost(id);
							}}
						>
							Delete
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
