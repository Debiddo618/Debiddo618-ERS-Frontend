import { createLazyFileRoute, Link } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <div className="p-2 flex gap-2">
            <h1>Would You Like to login or Register?</h1>
            <Link to="/login" className="[&.active]:font-bold">
                Login
            </Link>
            <Link to="/register" className="[&.active]:font-bold">
                Register
            </Link>
            
        </div>
    )
} 