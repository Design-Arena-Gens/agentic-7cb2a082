'use client'

import { useState } from 'react'
import { Plus, Search, AlertTriangle, TrendingDown, Package, Edit, Trash2 } from 'lucide-react'

interface InventoryItem {
  id: string
  sku: string
  name: string
  category: string
  brand: string
  model: string
  quantity: number
  minStock: number
  maxStock: number
  location: string
  supplier: string
  costPrice: number
  salePrice: number
  lastRestockDate: string
  expiryDate?: string
}

export function Inventory() {
  const [items, setItems] = useState<InventoryItem[]>([
    {
      id: '1',
      sku: 'SCR-IP13PM-001',
      name: 'Pantalla OLED',
      category: 'Pantallas',
      brand: 'Apple',
      model: 'iPhone 13 Pro Max',
      quantity: 5,
      minStock: 3,
      maxStock: 15,
      location: 'Estante A1',
      supplier: 'TechParts México',
      costPrice: 3800,
      salePrice: 5500,
      lastRestockDate: '2024-01-10'
    },
    {
      id: '2',
      sku: 'BAT-IP12-002',
      name: 'Batería Original',
      category: 'Baterías',
      brand: 'Apple',
      model: 'iPhone 12',
      quantity: 12,
      minStock: 5,
      maxStock: 20,
      location: 'Estante B2',
      supplier: 'PowerCell Supplies',
      costPrice: 450,
      salePrice: 850,
      lastRestockDate: '2024-01-15'
    },
    {
      id: '3',
      sku: 'SCR-SAM-S21-003',
      name: 'Pantalla AMOLED',
      category: 'Pantallas',
      brand: 'Samsung',
      model: 'Galaxy S21',
      quantity: 2,
      minStock: 3,
      maxStock: 10,
      location: 'Estante A2',
      supplier: 'TechParts México',
      costPrice: 2800,
      salePrice: 4200,
      lastRestockDate: '2024-01-05'
    }
  ])

  const [showAddModal, setShowAddModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')

  const categories = ['Pantallas', 'Baterías', 'Cámaras', 'Botones', 'Conectores', 'Herramientas', 'Adhesivos', 'Otros']

  const lowStockItems = items.filter(item => item.quantity <= item.minStock)
  const outOfStockItems = items.filter(item => item.quantity === 0)

  const filteredItems = items.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.model.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventario</h1>
          <p className="text-gray-600 mt-1">Gestión de piezas y suministros</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          <Plus size={20} />
          Agregar Producto
        </button>
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {lowStockItems.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-yellow-600" size={24} />
              <div>
                <p className="font-semibold text-yellow-900">Stock Bajo</p>
                <p className="text-sm text-yellow-700">{lowStockItems.length} productos por debajo del mínimo</p>
              </div>
            </div>
          </div>
        )}
        {outOfStockItems.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <TrendingDown className="text-red-600" size={24} />
              <div>
                <p className="font-semibold text-red-900">Sin Stock</p>
                <p className="text-sm text-red-700">{outOfStockItems.length} productos agotados</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por nombre, SKU, marca o modelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">Todas las categorías</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ubicación</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Proveedor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio Costo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio Venta</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.sku}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.brand} {item.model}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Package
                        size={16}
                        className={
                          item.quantity === 0 ? 'text-red-500' :
                          item.quantity <= item.minStock ? 'text-yellow-500' :
                          'text-green-500'
                        }
                      />
                      <span className={`font-medium ${
                        item.quantity === 0 ? 'text-red-600' :
                        item.quantity <= item.minStock ? 'text-yellow-600' :
                        'text-gray-900'
                      }`}>
                        {item.quantity} / {item.maxStock}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">Min: {item.minStock}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.supplier}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.costPrice.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${item.salePrice.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-900" title="Editar">
                        <Edit size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-900" title="Eliminar">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats Footer */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Total Productos</p>
          <p className="text-2xl font-bold text-gray-900">{items.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Valor Total Inventario</p>
          <p className="text-2xl font-bold text-gray-900">
            ${items.reduce((sum, item) => sum + (item.quantity * item.costPrice), 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Stock Bajo</p>
          <p className="text-2xl font-bold text-yellow-600">{lowStockItems.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Sin Stock</p>
          <p className="text-2xl font-bold text-red-600">{outOfStockItems.length}</p>
        </div>
      </div>
    </div>
  )
}
