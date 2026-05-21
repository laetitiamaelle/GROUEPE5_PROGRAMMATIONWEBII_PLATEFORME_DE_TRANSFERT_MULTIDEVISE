import { Suspense } from 'react'
import Sidebar from '@/components/Sidebar'
import ConfirmationTransfert from '@/components/ConfirmationTransfert'

export default function ConfirmationPage() {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#0A0A0B' }}>
            <Sidebar />
            <Suspense fallback={<div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280' }}>Chargement...</div>}>
                <ConfirmationTransfert />
            </Suspense>
        </div>
    )
}
