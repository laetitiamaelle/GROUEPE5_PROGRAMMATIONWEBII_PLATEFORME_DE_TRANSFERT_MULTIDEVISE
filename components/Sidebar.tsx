'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
    Home,
    Send,
    ArrowLeftRight,
    Users,
    Shield,
    Settings,
    LogOut
} from 'lucide-react'

import '../styles/Sidebar.css'

export default function Sidebar() {

    const pathname = usePathname()

    return (
        <aside className='sidebar'>

            <div className='logo'>
                <img
                    src="/logo.jpeg"
                    alt="Cashflow"
                    className='logo-img'
                />
            </div>

            <nav className='nav'>

                <p className='nav-title'>
                    MAIN NAVIGATION
                </p>

                <Link
                    href="/home"
                    className={`nav-item ${pathname === '/home' ? 'active' : ''}`}
                >
                    <Home size={18} />
                    Home
                </Link>

                <Link
                    href="/transfer"
                    className={`nav-item ${pathname === '/transfer' ? 'active' : ''}`}
                >
                    <Send size={18} />
                    Transfer
                </Link>

                <Link
                    href="/transactions"
                    className={`nav-item ${pathname === '/transactions' ? 'active' : ''}`}
                >
                    <ArrowLeftRight size={18} />
                    Transactions
                </Link>

                <Link
                    href="#"
                    className="nav-item"
                >
                    <Users size={18} />
                    Contacts
                </Link>

                <p className='nav-title'>
                    MANAGEMENT
                </p>

                <Link
                    href="/exchange-rates"
                    className={`nav-item ${pathname === '/exchange-rates' ? 'active' : ''}`}
                >
                    <Shield size={18} />
                    Exchange Rates
                </Link>

                <Link
                    href="/admin"
                    className={`nav-item ${pathname === '/admin' ? 'active' : ''}`}
                >
                    <Settings size={18} />
                    Admin Panels
                </Link>

            </nav>

            <div className='logout'>

                <button className='nav-item'>
                    <LogOut size={18} />
                    Log Out
                </button>

            </div>

        </aside>
    )
}