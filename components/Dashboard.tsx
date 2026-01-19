'use client'

import { useState, useEffect } from 'react'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Wrench,
  Clock,
  CheckCircle,
  AlertCircle,
  Users
} from 'lucide-react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export function Dashboard() {
  const [stats, setStats] = useState({
    todayRevenue: 4850,
    monthRevenue: 125000,
    activeOrders: 23,
    completedToday: 8,
    pendingOrders: 15,
    delayedOrders: 3,
    lowStockItems: 7,
    todayClients: 12
  })

  const weeklyRevenue = [
    { day: 'Lun', revenue: 12000, orders: 15 },
    { day: 'Mar', revenue: 15000, orders: 18 },
    { day: 'Mié', revenue: 10000, orders: 12 },
    { day: 'Jue', revenue: 18000, orders: 22 },
    { day: 'Vie', revenue: 20000, orders: 25 },
    { day: 'Sáb', revenue: 25000, orders: 30 },
    { day: 'Dom', revenue: 8000, orders: 10 },
  ]

  const repairTypes = [
    { name: 'Pantalla', value: 45, color: '#3b82f6' },
    { name: 'Batería', value: 25, color: '#10b981' },
    { name: 'Software', value: 15, color: '#f59e0b' },
    { name: 'Cámara', value: 10, color: '#ef4444' },
    { name: 'Otros', value: 5, color: '#8b5cf6' },
  ]

  const recentOrders = [
    { id: 'ORD-001', client: 'Juan Pérez', device: 'iPhone 13 Pro', issue: 'Pantalla rota', status: 'En proceso', priority: 'Alta' },
    { id: 'ORD-002', client: 'María García', device: 'Samsung S21', issue: 'Batería', status: 'Esperando piezas', priority: 'Media' },
    { id: 'ORD-003', client: 'Carlos López', device: 'iPhone 12', issue: 'No enciende', status: 'Diagnóstico', priority: 'Alta' },
    { id: 'ORD-004', client: 'Ana Martínez', device: 'Xiaomi Mi 11', issue: 'Cámara', status: 'En proceso', priority: 'Baja' },
    { id: 'ORD-005', client: 'Luis Rodríguez', device: 'iPhone 14', issue: 'Software', status: 'Completado', priority: 'Media' },
  ]

  const StatCard = ({ title, value, icon: Icon, change, trend }: any) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary-100 rounded-lg">
            <Icon className="text-primary-600" size={24} />
          </div>
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span>{change}</span>
          </div>
        )}
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Panel Principal</h1>
          <p className="text-gray-600 mt-1">Resumen de actividad y métricas clave</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Fecha</p>
          <p className="text-lg font-semibold">{new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Ingresos Hoy"
          value={`$${stats.todayRevenue.toLocaleString()}`}
          icon={DollarSign}
          change="+12%"
          trend="up"
        />
        <StatCard
          title="Órdenes Activas"
          value={stats.activeOrders}
          icon={Wrench}
          change="+5"
          trend="up"
        />
        <StatCard
          title="Completadas Hoy"
          value={stats.completedToday}
          icon={CheckCircle}
          change="+3"
          trend="up"
        />
        <StatCard
          title="Clientes Hoy"
          value={stats.todayClients}
          icon={Users}
          change="-2"
          trend="down"
        />
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3">
          <Clock className="text-yellow-600" size={24} />
          <div>
            <p className="font-semibold text-yellow-900">{stats.delayedOrders} Órdenes Retrasadas</p>
            <p className="text-sm text-yellow-700">Requieren atención inmediata</p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="text-red-600" size={24} />
          <div>
            <p className="font-semibold text-red-900">{stats.lowStockItems} Productos Bajo Stock</p>
            <p className="text-sm text-red-700">Realizar pedido pronto</p>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
          <Wrench className="text-blue-600" size={24} />
          <div>
            <p className="font-semibold text-blue-900">{stats.pendingOrders} Órdenes Pendientes</p>
            <p className="text-sm text-blue-700">En proceso normal</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Ingresos Semanales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#3b82f6" name="Ingresos ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Repair Types Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Tipos de Reparación</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={repairTypes}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {repairTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold">Órdenes Recientes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Orden</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dispositivo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Problema</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prioridad</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.client}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.device}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.issue}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'Completado' ? 'bg-green-100 text-green-800' :
                      order.status === 'En proceso' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Diagnóstico' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.priority === 'Alta' ? 'bg-red-100 text-red-800' :
                      order.priority === 'Media' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {order.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
