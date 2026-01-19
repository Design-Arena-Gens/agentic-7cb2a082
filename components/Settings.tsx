'use client'

import { Save, Bell, Lock, Printer, DollarSign, FileText } from 'lucide-react'

export function Settings() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
          <p className="text-gray-600 mt-1">Ajustes del sistema</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="text-primary-600" size={24} />
            <h2 className="text-xl font-bold">Información del Negocio</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nombre del negocio"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              defaultValue="RepairCell Pro"
            />
            <input
              type="text"
              placeholder="RFC"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
            <input
              type="text"
              placeholder="Dirección"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 md:col-span-2"
            />
            <input
              type="tel"
              placeholder="Teléfono"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="text-primary-600" size={24} />
            <h2 className="text-xl font-bold">Configuración de Precios</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Margen de ganancia predeterminado (%)
              </label>
              <input
                type="number"
                defaultValue="45"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Garantía predeterminada (días)
              </label>
              <input
                type="number"
                defaultValue="90"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="text-primary-600" size={24} />
            <h2 className="text-xl font-bold">Notificaciones</h2>
          </div>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-primary-600" />
              <span className="text-gray-700">Alertas de stock bajo</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-primary-600" />
              <span className="text-gray-700">Órdenes retrasadas</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-primary-600" />
              <span className="text-gray-700">Nuevos clientes</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700">
            <Save size={20} />
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  )
}
