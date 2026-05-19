import Sidebar from '@/components/Sidebar'
import InitiationTransfert from '@/components/InitiationTransfert'

export default function TransfertPage() {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#0A0A0B' }}>
            <Sidebar />
            <InitiationTransfert />
        </div>
    )
}
