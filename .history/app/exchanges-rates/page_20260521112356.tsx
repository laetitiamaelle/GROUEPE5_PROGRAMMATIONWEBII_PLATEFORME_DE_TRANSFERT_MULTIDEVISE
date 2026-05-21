import Sidebar from '@/components/Sidebar'
import ExchangesRates from '@/components/ExchangesRates';

export default function TransactionPage() {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#0A0A0B'}}>
            <Sidebar />
            <ExchangeRates />
        </div>
    )
}