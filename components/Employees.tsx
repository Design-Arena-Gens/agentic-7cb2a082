'use client'

import { useState } from 'react'
import { Plus, UserCog, Award } from 'lucide-react'

interface Employee {
  id: string
  name: string
  role: string
  phone: string
  email: string
  hireDate: string
  salary: number
  performance: number
  completedOrders: number
  specialties: string[]
  status: 'Activo' | 'Inactivo'
}

export function Employees() {
  const [employees] = useState<Employee[]>([
    {
      id: '1',
      name: 'Carlos Técnico Rodríguez',
      role: 'Técnico Senior',
      phone: '+52 555-9999-001',
      email: 'carlos.tecnico@repaircell.com',
      hireDate: '2022-01-15',
      salary: 15000,
      performance: 95,
      completedOrders: 450,
      specialties: ['iPhone', 'Samsung', 'Pantallas'],
      status: 'Activo'
    }
  ])

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Empleados</h1>
          <p className="text-gray-600 mt-1">Gestión de personal</p>
        </div>
        <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
          <Plus size={20} />
          Nuevo Empleado
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((emp) => (
          <div key={emp.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <UserCog className="text-primary-600" size={32} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{emp.name}</h3>
                <p className="text-sm text-gray-600">{emp.role}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Rendimiento</span>
                <span className="font-semibold text-gray-900">{emp.performance}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${emp.performance}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-600">Órdenes</p>
                <p className="text-xl font-bold text-gray-900">{emp.completedOrders}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Especialidades</p>
                <p className="text-sm font-medium text-gray-900">{emp.specialties.length}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
