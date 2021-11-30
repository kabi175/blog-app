import { session } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function CreatePost() {
	const [title, setTitle] = useState<string>('');
	const [data, setData] = useState<string>('');
	const router = useRouter();
	const handleSubmit = async () => {
		try {
			await fetch('/api/post', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({ title, data }),
			});
		} catch (err) {
			console.log(err);
		}
		router.push('/profile');
	};
	return (
		<div className='w-screen h-screen flex flex-col justify-center items-center'>
			<div className='w-screen h-20' />
			<div className='w-1/2 h-full flex flex-col gap-4'>
				<div className='flex flex-row items-center gap-5'>
					<input
						className='flex-grow border-b-2 focus:outline-none focus:border-b-4 focus:border-blue-400  font-bold text-3xl'
						onChange={(e) => setTitle(e.target.value)}
						type='text'
						placeholder='Title'
					/>
					<button
						className='bg-blue-400 text-white font-bold px-3 py-2 rounded'
						onClick={() => handleSubmit()}
					>
						Save
					</button>
				</div>
				<textarea
					className='w-full h-full focus:outline-none border-8 border-black p-4 text-xl'
					onChange={(e) => setData(e.target.value)}
					placeholder='Blog Content'
				/>
			</div>
		</div>
	);
}
