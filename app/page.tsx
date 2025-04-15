import { redirect } from 'next/navigation'

export default function Home() {
  // Redirect langsung ke halaman login
  redirect('/login');
  
  // Ini tidak akan pernah dirender karena redirect di atas
  return null;
} 