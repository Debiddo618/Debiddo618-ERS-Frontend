import { getUser, User } from '@/lib/authUtils';
import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react';

export const Route = createLazyFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, [])

  return (
    <>
      <h3>Welcome To the dashboard! {user?.sub}</h3>

    </>
  )
}
