'use client'
import { Search, Clock, Bell } from 'lucide-react'
import '../styles/HistoriqueTransactions.css'

export default function HistoriqueTransactions() {

  return (
    <div className="main">
      <header className="topbar">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder="Search transactions or contacts..." className="search" />
        </div>
        <div className="topbar-right">
          <button className="icon-btn"><Clock size={20} /></button>
          <button className="icon-btn"><Bell size={20} /></button>
          <div className="user">
            <div className="user-info">
              <span className="user-name">Alex Rivera</span>
              <span className="user-role">Personal Account</span>
            </div>
            <img src="https://i.pravatar.cc/40" alt="avatar" className="user-avatar" />
          </div>
        </div>
      </header>
    </div>
  )
}