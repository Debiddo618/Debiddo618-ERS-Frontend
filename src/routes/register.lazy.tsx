import RegisterForm from '@/components/register-form'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <RegisterForm />
  )
}
