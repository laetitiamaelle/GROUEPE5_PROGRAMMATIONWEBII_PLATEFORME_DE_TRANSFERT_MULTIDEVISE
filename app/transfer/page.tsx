import Sidebar from '@/components/Sidebar'
import TransferPage from '@/components/TransferPage'

export default function Transfer() {
    return (
        <div
            style={{
                display: 'flex',
                minHeight: '100vh',
                background: '#0A0A0B'
            }}
        >
            <Sidebar />
            <TransferPage />
        </div>
    )
}