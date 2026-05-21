'use client'
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation'
import { Home, Send, ArrowLeftRight, Users, Shield, Settings, LogOut, User } from 'lucide-react'
import '../styles/Sidebar.css'

export default function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className='sidebar'>

            <Image src={maPhoto} alt="Description de la photo" placeholder="blur"/>
            <nav className='nav'>
                <p className='nav-title'>MAIN NAVIGATION</p>
                <Link href="/home" className={`nav-item ${pathname === '/home' ? 'active' : ''}`}>
                    <Home size={18} /> Home
                </Link>
                <Link href="/transfert" className={`nav-item ${pathname.startsWith('/transfert') ? 'active' : ''}`}>
                    <Send size={18} /> Transfer
                </Link>
                <Link href="/transactions" className={`nav-item ${pathname === '/transactions' ? 'active' : ''}`}>
                    <ArrowLeftRight size={18} /> Transactions
                </Link>
                <Link href="#" className="nav-item">
                    <Users size={18} /> Contacts
                </Link>

                <p className="nav-title">MANAGEMENT</p>
                <Link href="/exchange-rates" className={`nav-item ${pathname === '/exchange-rates' ? 'active' : ''}`}>
                    <Shield size={18} /> Exchange Rates
                </Link>
                <Link href="/dashboard" className={`nav-item ${pathname === '/admin' ? 'active' : ''}`}>
                    <Settings size={18} /> Admin Panels
                </Link>
            </nav>

            <div className='sidebar-footer'>
                <Link href="/profil" className={`nav-item ${pathname === '/profil' ? 'active' : ''}`}>
                    <User size={18} /> Mon Profil
                </Link>
                <div className='sidebar-logout'>
                    <button className='nav-item logout-btn'>
                        <LogOut size={18} /> Log Out
                    </button>
                </div>
            </div>
        </aside>
    )
}