import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/client';

export default function NavBar() {
	const [session, _] = useSession();
	return (
		<div className='z-10 w-screen h-14 fixed bg-white border-2 flex justify-center items-center '>
			<div className='w-3/4 h-full flex justify-around items-center'>
				<Link href='/'>
					<a>
						<button className='text-white h-9 bg-black font-bold rounded px-3'>
							Tech
						</button>
					</a>
				</Link>
				<div className='flex items-center gap-5'>
					<Link href='/create'>
						<a>
							<button className='text-white h-9 bg-blue-500 rounded px-3'>
								Create post
							</button>
						</a>
					</Link>
					{session && (
						<Link href='/profile'>
							<a className='text-xl font-bold bg-black px-3 py-1 rounded'>
								<p className='text-white'>
									{session.user?.name}
								</p>
							</a>
						</Link>
					)}
					<div className=''>
						{session ? (
							<Link href={'/api/auth/signout'}>
								<a className='text-xl font-bold'>
									<p>Sign Out</p>
								</a>
							</Link>
						) : (
							<Link href={'/api/auth/signin'}>
								<a className='text-xl font-bold'>
									<p>Sign In</p>
								</a>
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
