import Navbar from '@/components/Navbar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Navbar />
      <Outlet/>
    </>
  )
}
