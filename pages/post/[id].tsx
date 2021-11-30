import { session, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Post() {
	const router = useRouter();
	const { id } = router.query;

	const [session, status] = useSession();
	const [title, setTitle] = useState<string>('');
	const [data, setData] = useState<string>('');
	const [author, setAuthor] = useState<string>('');

	const handleSubmit = async () => {
		try {
			await fetch('/api/post', {
				method: 'PUT',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({ id, title, data }),
			});
		} catch (err) {
			console.log(err);
		} finally {
			router.push('/');
		}
	};
	useEffect(() => {
		fetch(`/api/post/${id}`)
			.then((res) => res.json())
			.then(({ title, data, email, username }) => {
				setTitle(title);
				setData(data);
				setAuthor(username);
			});
	}, [id]);
	return (
		<div className='w-screen h-screen flex flex-col justify-center items-center'>
			<div className='w-screen h-20' />
			<div className='w-1/2 h-full flex flex-col gap-4'>
				<div className='flex flex-row items-center gap-5'>
					<input
						className='flex-grow border-b-2 focus:outline-none focus:border-b-4 focus:border-blue-400  font-bold text-3xl'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						type='text'
						placeholder='Title'
						disabled={session?.user?.name !== author}
					/>
					{session?.user?.name === author && (
						<button
							className='bg-blue-400 text-white font-bold px-3 py-2 rounded'
							onClick={() => handleSubmit()}
						>
							Update
						</button>
					)}
				</div>
				<textarea
					className='w-full h-full focus:outline-none border-8 border-black p-4 text-xl'
					value={data}
					onChange={(e) => setData(e.target.value)}
					placeholder='Blog Content'
					disabled={session?.user?.name !== author}
				/>
			</div>
		</div>
	);
}
