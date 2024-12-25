import LoginForm from '@/components/login-form'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <LoginForm />
}
