"use client"; // Required to use client-side components

import { UserButton, useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/signin'); // Redirect to sign-in if not authenticated
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Image className='rounded-full' src={user?.imageUrl} width={80} height={80} alt='Image'/>
      <h1 className="p-6 text-white text-3xl">Welcome, {user?.fullName}</h1>
      <Link href="/main" className="bg-gray-600 hover:bg-gray-800 text-gray-300 font-bold py-2 px-4 rounded-full">
        Go to
      </Link>
    </div>
  );
}
