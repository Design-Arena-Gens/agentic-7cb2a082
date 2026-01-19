'use client'

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Download, Calendar, TrendingUp } from 'lucide-react'

export function Reports() {
  const monthlyData = [
    { month: 'Ene', revenue: 85000, orders: 120, profit: 35000 },
    { month: 'Feb', revenue: 92000, orders: 135, profit: 38000 },
    { month: 'Mar', revenue: 105000, orders: 150, profit: 45000 },
    { month: 'Abr', revenue: 98000, orders: 142, profit: 42000 },
    { month: 'May', revenue: 115000, orders: 165, profit: 52000 },
    { month: 'Jun', revenue: 125000, orders: 178, profit: 58000 },
  ]

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reportes y Análisis</h1>
          <p className="text-gray-600 mt-1">Métricas y estadísticas del negocio</p>
        </div>
        <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
          <Download size={20} />
          Exportar Reporte
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Ingresos Mensuales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} name="Ingresos" />
              <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} name="Utilidad" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Órdenes por Mes</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#3b82f6" name="Órdenes" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="text-green-600" size={24} />
            <h3 className="text-sm font-medium text-gray-600">Crecimiento Mensual</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">+18%</p>
          <p className="text-sm text-gray-600 mt-1">vs mes anterior</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="text-blue-600" size={24} />
            <h3 className="text-sm font-medium text-gray-600">Promedio Diario</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">$4,200</p>
          <p className="text-sm text-gray-600 mt-1">ingresos</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Ticket Promedio</h3>
          <p className="text-3xl font-bold text-gray-900">$685</p>
          <p className="text-sm text-gray-600 mt-1">por reparación</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Tasa de Conversión</h3>
          <p className="text-3xl font-bold text-gray-900">87%</p>
          <p className="text-sm text-gray-600 mt-1">cotizaciones aceptadas</p>
        </div>
      </div>
    </div>
  )
}
