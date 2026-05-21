import Sidebar from '@/components/Sidebar'
import Tranfer from '@/components/Transfer';

export default function TransactPage() {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#0A0A0B'}}>
            <Sidebar />
            <Transfer />
        </div>
    )
}