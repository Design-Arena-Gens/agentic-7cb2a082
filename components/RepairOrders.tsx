'use client'

import { useState } from 'react'
import { Plus, Search, Filter, Download, Eye, Edit, Trash2, Printer, CheckCircle, Clock, AlertTriangle } from 'lucide-react'

interface RepairOrder {
  id: string
  clientName: string
  clientPhone: string
  clientEmail: string
  deviceBrand: string
  deviceModel: string
  imei: string
  password: string
  issue: string
  diagnosis: string
  estimatedCost: number
  actualCost: number
  parts: { name: string, quantity: number, cost: number }[]
  status: 'Recibido' | 'Diagnóstico' | 'Esperando piezas' | 'En reparación' | 'Control calidad' | 'Completado' | 'Entregado' | 'Cancelado'
  priority: 'Baja' | 'Media' | 'Alta' | 'Urgente'
  receivedDate: string
  promisedDate: string
  completedDate?: string
  deliveredDate?: string
  assignedTo: string
  notes: string
  attachments: string[]
  warrantyDays: number
  paymentStatus: 'Pendiente' | 'Anticipo' | 'Pagado'
  advancePayment: number
}

export function RepairOrders() {
  const [orders, setOrders] = useState<RepairOrder[]>([
    {
      id: 'ORD-001',
      clientName: 'Juan Pérez González',
      clientPhone: '+52 555-1234-567',
      clientEmail: 'juan.perez@email.com',
      deviceBrand: 'Apple',
      deviceModel: 'iPhone 13 Pro Max',
      imei: '123456789012345',
      password: '1234',
      issue: 'Pantalla rota, táctil no responde',
      diagnosis: 'Reemplazo de pantalla OLED, verificación de digitalizador',
      estimatedCost: 4500,
      actualCost: 4200,
      parts: [
        { name: 'Pantalla OLED iPhone 13 Pro Max', quantity: 1, cost: 3800 },
        { name: 'Adhesivo pantalla', quantity: 1, cost: 150 }
      ],
      status: 'En reparación',
      priority: 'Alta',
      receivedDate: '2024-01-15T10:30:00',
      promisedDate: '2024-01-17T18:00:00',
      assignedTo: 'Carlos Técnico',
      notes: 'Cliente requiere urgente. Verificar Face ID después de reparación.',
      attachments: [],
      warrantyDays: 90,
      paymentStatus: 'Anticipo',
      advancePayment: 2000
    }
  ])

  const [showNewOrderModal, setShowNewOrderModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<RepairOrder | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const [newOrder, setNewOrder] = useState<Partial<RepairOrder>>({
    status: 'Recibido',
    priority: 'Media',
    warrantyDays: 90,
    paymentStatus: 'Pendiente',
    advancePayment: 0,
    parts: []
  })

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Recibido': 'bg-gray-100 text-gray-800',
      'Diagnóstico': 'bg-yellow-100 text-yellow-800',
      'Esperando piezas': 'bg-orange-100 text-orange-800',
      'En reparación': 'bg-blue-100 text-blue-800',
      'Control calidad': 'bg-purple-100 text-purple-800',
      'Completado': 'bg-green-100 text-green-800',
      'Entregado': 'bg-teal-100 text-teal-800',
      'Cancelado': 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      'Baja': 'bg-green-100 text-green-800',
      'Media': 'bg-yellow-100 text-yellow-800',
      'Alta': 'bg-orange-100 text-orange-800',
      'Urgente': 'bg-red-100 text-red-800'
    }
    return colors[priority] || 'bg-gray-100 text-gray-800'
  }

  const createNewOrder = () => {
    const order: RepairOrder = {
      ...newOrder as RepairOrder,
      id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
      receivedDate: new Date().toISOString()
    }
    setOrders([...orders, order])
    setShowNewOrderModal(false)
    setNewOrder({
      status: 'Recibido',
      priority: 'Media',
      warrantyDays: 90,
      paymentStatus: 'Pendiente',
      advancePayment: 0,
      parts: []
    })
  }

  const printWorkOrder = (order: RepairOrder) => {
    const printWindow = window.open('', '', 'width=800,height=600')
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Orden de Trabajo - ${order.id}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
              .section { margin-bottom: 20px; }
              .section h3 { background: #f0f0f0; padding: 5px; }
              table { width: 100%; border-collapse: collapse; }
              td { padding: 5px; border-bottom: 1px solid #ddd; }
              .label { font-weight: bold; width: 150px; }
              .signature { margin-top: 50px; border-top: 1px solid #000; width: 200px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>ORDEN DE REPARACIÓN</h1>
              <p>${order.id}</p>
            </div>
            <div class="section">
              <h3>Información del Cliente</h3>
              <table>
                <tr><td class="label">Nombre:</td><td>${order.clientName}</td></tr>
                <tr><td class="label">Teléfono:</td><td>${order.clientPhone}</td></tr>
                <tr><td class="label">Email:</td><td>${order.clientEmail || 'N/A'}</td></tr>
              </table>
            </div>
            <div class="section">
              <h3>Información del Equipo</h3>
              <table>
                <tr><td class="label">Marca:</td><td>${order.deviceBrand}</td></tr>
                <tr><td class="label">Modelo:</td><td>${order.deviceModel}</td></tr>
                <tr><td class="label">IMEI:</td><td>${order.imei}</td></tr>
                <tr><td class="label">Contraseña:</td><td>${order.password || 'N/A'}</td></tr>
              </table>
            </div>
            <div class="section">
              <h3>Detalles de Reparación</h3>
              <table>
                <tr><td class="label">Problema:</td><td>${order.issue}</td></tr>
                <tr><td class="label">Diagnóstico:</td><td>${order.diagnosis || 'Pendiente'}</td></tr>
                <tr><td class="label">Costo Estimado:</td><td>$${order.estimatedCost}</td></tr>
                <tr><td class="label">Fecha Recibido:</td><td>${new Date(order.receivedDate).toLocaleString()}</td></tr>
                <tr><td class="label">Fecha Promesa:</td><td>${new Date(order.promisedDate).toLocaleString()}</td></tr>
                <tr><td class="label">Garantía:</td><td>${order.warrantyDays} días</td></tr>
              </table>
            </div>
            <div class="section">
              <h3>Notas Importantes</h3>
              <p>${order.notes || 'Sin notas adicionales'}</p>
            </div>
            <div style="margin-top: 60px;">
              <div style="float: left; width: 45%;">
                <div class="signature">Firma del Cliente</div>
              </div>
              <div style="float: right; width: 45%;">
                <div class="signature">Firma del Técnico</div>
              </div>
            </div>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.deviceModel.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Órdenes de Reparación</h1>
          <p className="text-gray-600 mt-1">Gestión completa del ciclo de reparación</p>
        </div>
        <button
          onClick={() => setShowNewOrderModal(true)}
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          <Plus size={20} />
          Nueva Orden
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por orden, cliente o dispositivo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">Todos los estados</option>
            <option value="Recibido">Recibido</option>
            <option value="Diagnóstico">Diagnóstico</option>
            <option value="Esperando piezas">Esperando piezas</option>
            <option value="En reparación">En reparación</option>
            <option value="Control calidad">Control calidad</option>
            <option value="Completado">Completado</option>
            <option value="Entregado">Entregado</option>
          </select>
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download size={20} />
            Exportar
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dispositivo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Problema</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prioridad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Costo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.clientName}</div>
                    <div className="text-sm text-gray-500">{order.clientPhone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.deviceBrand}</div>
                    <div className="text-sm text-gray-500">{order.deviceModel}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">{order.issue}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(order.priority)}`}>
                      {order.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${order.estimatedCost.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Ver detalles"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => printWorkOrder(order)}
                        className="text-green-600 hover:text-green-900"
                        title="Imprimir"
                      >
                        <Printer size={18} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900" title="Editar">
                        <Edit size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Order Modal */}
      {showNewOrderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold">Nueva Orden de Reparación</h2>
            </div>
            <div className="p-6 space-y-6">
              {/* Client Info */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Información del Cliente</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nombre completo *"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    onChange={(e) => setNewOrder({...newOrder, clientName: e.target.value})}
                  />
                  <input
                    type="tel"
                    placeholder="Teléfono *"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    onChange={(e) => setNewOrder({...newOrder, clientPhone: e.target.value})}
                  />
                  <input
                    type="email"
                    placeholder="Email (opcional)"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    onChange={(e) => setNewOrder({...newOrder, clientEmail: e.target.value})}
                  />
                </div>
              </div>

              {/* Device Info */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Información del Equipo</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Marca *"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    onChange={(e) => setNewOrder({...newOrder, deviceBrand: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="Modelo *"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    onChange={(e) => setNewOrder({...newOrder, deviceModel: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="IMEI"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    onChange={(e) => setNewOrder({...newOrder, imei: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="Contraseña/PIN"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    onChange={(e) => setNewOrder({...newOrder, password: e.target.value})}
                  />
                </div>
              </div>

              {/* Repair Info */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Detalles de Reparación</h3>
                <div className="space-y-4">
                  <textarea
                    placeholder="Problema reportado *"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    onChange={(e) => setNewOrder({...newOrder, issue: e.target.value})}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <select
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      onChange={(e) => setNewOrder({...newOrder, priority: e.target.value as any})}
                    >
                      <option value="Baja">Prioridad Baja</option>
                      <option value="Media" selected>Prioridad Media</option>
                      <option value="Alta">Prioridad Alta</option>
                      <option value="Urgente">Urgente</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Costo estimado *"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      onChange={(e) => setNewOrder({...newOrder, estimatedCost: parseFloat(e.target.value)})}
                    />
                    <input
                      type="datetime-local"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      onChange={(e) => setNewOrder({...newOrder, promisedDate: e.target.value})}
                    />
                  </div>
                  <textarea
                    placeholder="Notas adicionales"
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    onChange={(e) => setNewOrder({...newOrder, notes: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-4">
              <button
                onClick={() => setShowNewOrderModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={createNewOrder}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Crear Orden
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Orden {selectedOrder.id}</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Cliente</h3>
                  <p>{selectedOrder.clientName}</p>
                  <p className="text-sm text-gray-600">{selectedOrder.clientPhone}</p>
                  <p className="text-sm text-gray-600">{selectedOrder.clientEmail}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Dispositivo</h3>
                  <p>{selectedOrder.deviceBrand} {selectedOrder.deviceModel}</p>
                  <p className="text-sm text-gray-600">IMEI: {selectedOrder.imei}</p>
                  <p className="text-sm text-gray-600">Contraseña: {selectedOrder.password}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Problema</h3>
                <p>{selectedOrder.issue}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Diagnóstico</h3>
                <p>{selectedOrder.diagnosis}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Estado</h3>
                  <span className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Prioridad</h3>
                  <span className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${getPriorityColor(selectedOrder.priority)}`}>
                    {selectedOrder.priority}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
