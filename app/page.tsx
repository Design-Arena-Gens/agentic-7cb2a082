'use client'

import { useState } from 'react'
import { Dashboard } from '@/components/Dashboard'
import { RepairOrders } from '@/components/RepairOrders'
import { Inventory } from '@/components/Inventory'
import { Clients } from '@/components/Clients'
import { Employees } from '@/components/Employees'
import { Reports } from '@/components/Reports'
import { Settings } from '@/components/Settings'
import {
  LayoutDashboard,
  Wrench,
  Package,
  Users,
  UserCog,
  FileText,
  Settings as SettingsIcon,
  Menu,
  X
} from 'lucide-react'

type View = 'dashboard' | 'orders' | 'inventory' | 'clients' | 'employees' | 'reports' | 'settings'

export default function Home() {
  const [currentView, setCurrentView] = useState<View>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const menuItems = [
    { id: 'dashboard' as View, label: 'Panel Principal', icon: LayoutDashboard },
    { id: 'orders' as View, label: 'Órdenes de Reparación', icon: Wrench },
    { id: 'inventory' as View, label: 'Inventario', icon: Package },
    { id: 'clients' as View, label: 'Clientes', icon: Users },
    { id: 'employees' as View, label: 'Empleados', icon: UserCog },
    { id: 'reports' as View, label: 'Reportes', icon: FileText },
    { id: 'settings' as View, label: 'Configuración', icon: SettingsIcon },
  ]

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />
      case 'orders':
        return <RepairOrders />
      case 'inventory':
        return <Inventory />
      case 'clients':
        return <Clients />
      case 'employees':
        return <Employees />
      case 'reports':
        return <Reports />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-primary-800 text-white transition-all duration-300 flex flex-col`}>
        <div className="p-4 flex items-center justify-between border-b border-primary-700">
          {sidebarOpen && <h1 className="text-xl font-bold">RepairCell Pro</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-primary-700 rounded"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-3 p-3 mb-2 rounded transition-colors ${
                  currentView === item.id
                    ? 'bg-primary-600'
                    : 'hover:bg-primary-700'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-primary-700">
          {sidebarOpen && (
            <div className="text-xs text-primary-200">
              <p>© 2024 RepairCell Pro</p>
              <p>Sistema de Gestión Integral</p>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {renderView()}
      </main>
    </div>
  )
}
