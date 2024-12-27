import Navbar from '@/components/Navbar'
import ReimbursementForm from '@/components/Reimbursement-form';
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { createContext, useState } from 'react'

export const Route = createFileRoute('/_protected')({
  component: RouteComponent,
})

export const ShowFormContext = createContext(false);


function RouteComponent() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Navbar showForm={showForm} setShowForm={setShowForm} />
      <ShowFormContext.Provider value={showForm}>
        <Outlet />
      </ShowFormContext.Provider>
      <ReimbursementForm showForm={showForm} setShowForm={setShowForm} />
    </>
  )
}
