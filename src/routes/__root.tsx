import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Toaster } from "@/components/ui/toaster"


export const Route = createRootRoute({
    component: () => (
        <>
            <div className="p-2 flex gap-2">
                <Link to="/" className="[&.active]:font-bold">
                    Home
                </Link>{' '}
                <Link to="/about" className="[&.active]:font-bold">
                    About
                </Link>
                <Link to="/login" className="[&.active]:font-bold">
                    Login
                </Link>
                <Link to="/register" className="[&.active]:font-bold">
                    Register
                </Link>
            </div>
            <hr />
            <Outlet />
            <Toaster />
            <TanStackRouterDevtools />
        </>
    ),
})