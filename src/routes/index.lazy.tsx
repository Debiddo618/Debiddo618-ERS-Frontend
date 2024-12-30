import LoginForm from '@/components/login-form'
import { createLazyFileRoute} from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <div className="flex justify-center items-center w-full h-screen">
            <LoginForm />
        </div>
    )
} 