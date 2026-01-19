'use client'

import { useState } from 'react'
import { Plus, Search, Mail, Phone, Star } from 'lucide-react'

interface Client {
  id: string
  name: string
  phone: string
  email: string
  address: string
  totalOrders: number
  totalSpent: number
  lastVisit: string
  rating: number
  notes: string
  devices: { brand: string, model: string }[]
}

export function Clients() {
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'Juan Pérez González',
      phone: '+52 555-1234-567',
      email: 'juan.perez@email.com',
      address: 'Av. Principal 123, Col. Centro',
      totalOrders: 8,
      totalSpent: 12500,
      lastVisit: '2024-01-15',
      rating: 5,
      notes: 'Cliente frecuente, prefiere iPhone',
      devices: [
        { brand: 'Apple', model: 'iPhone 13 Pro Max' },
        { brand: 'Apple', model: 'iPhone 11' }
      ]
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-600 mt-1">Base de datos de clientes</p>
        </div>
        <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
          <Plus size={20} />
          Nuevo Cliente
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por nombre, teléfono o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div key={client.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < client.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone size={16} />
                <span>{client.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail size={16} />
                <span>{client.email}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600">Órdenes</p>
                  <p className="text-xl font-bold text-gray-900">{client.totalOrders}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Gastado</p>
                  <p className="text-xl font-bold text-gray-900">${client.totalSpent.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
