import Sidebar from '@/components/Sidebar'
import HistoriqueTransactions from '@/components/HistoriqueTransactions';

export default function TransactionPage() {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#0A0A0B'}}>
            <Sidebar />
            <HistoriqueTransactions />
        </div>
    )
}