import Sidebar from '@/components/Sidebar'
import ExchangeRates from '@/components/ExchangeRates'

export default function ExchangeRatesPage() {
    return (
        <div
            style={{
                display: 'flex',
                minHeight: '100vh',
                background: '#0A0A0B'
            }}
        >
            <Sidebar />
            <ExchangeRates />
        </div>
    )
}