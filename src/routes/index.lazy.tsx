import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <div className="p-2">
            <h3>Welcome Home!</h3>
            <h1 className="text-3xl font-bold underline bg-red-500">Hello world!</h1>
        </div>
    )
}