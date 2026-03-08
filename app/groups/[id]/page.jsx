// app/groups/[id]/page.jsx
import { redirect } from 'next/navigation';

export default async function GroupRedirect({ params }) {
    const { id } = await params;
    redirect(`/groups/${id}/chat`);
}