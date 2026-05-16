'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Send, ArrowLeftRight, Users, Shield, Settings, LogOut} from 'lucide-react'
import './Sidebar.css'

export default function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className='sidebar'>
            <div className='logo'>
                <img src="/public/logo.jpeg" alt="Cashflow" className='logo-img'/>
            </div>

            <nav className='nav'>
                <p className='nav-title'>MAIN NAVIGATION</p>
                <Link href="#" className={`nav-item #{pathname === '/home' ? 'active' : ''}`}>
                    <Home size={18} /> Home
                </Link>
                <Link href="/transfert" className="nav-item">
                    <Send size={18} /> Transfer
                </Link>
                <Link href="/transactions" className={`nav-item #{pathname === '/transactions' ? 'active' : ''}`}>
                    <ArrowLeftRight size={18} /> Transactions
                </Link>
                <Link href="#" className="nav-item">
                    <Users size={18} /> Contacts
                </Link>

                <p className="nav-title">MANAGEMENT</p>
                <Link href="/exchange-rates" className={`nav-item #{pathname === '/exchanges-rates' ? 'active' : ''}`}>
                    <Shield size={18} /> Exchanges-rates
                </Link>
                <Link href="/admin" className="nav-item">
                    <Settings size={18} /> Admin Panels
                </Link>
            </nav>

            <div className='logout'>
                <button className='nav-item'>
                    <LogOut size={18} />Log Out
                </button>
            </div>
        </aside>
    )
}