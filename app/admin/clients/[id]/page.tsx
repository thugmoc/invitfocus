'use client'

import { useEffect, useState } from 'react'
import { supabase, getClient, getClientReports } from '@/lib/supabase'
import { StageEditor } from '@/components/admin/StageEditor'
import { motion } from 'framer-motion'
import { Download, Calendar, Users, DollarSign, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface ClientDetail {
  id: number
  company_name: string
  contact_name: string
  contact_email: string
  sector: string
  employee_count: number
  annual_revenue: number
  current_stage: number
  started_at: string
  created_at: string
}

interface Report {
  id: number
  report_type: string
  report_name: string
  report_url: string | null
  generated_at: string
}

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const [client, setClient] = useState<ClientDetail | null>(null)
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadClientData() {
      try {
        const clientId = parseInt(params.id)

        // Load client
        const clientData = await getClient(clientId)
        setClient(clientData)

        // Load reports
        const reportsData = await getClientReports(clientId)
        setReports(reportsData)
      } catch (error) {
        console.error('Error loading client:', error)
      } finally {
        setLoading(false)
      }
    }

    loadClientData()
  }, [params.id])

  const handleStageChange = (newStage: number) => {
    if (client) {
      setClient({ ...client, current_stage: newStage })
    }
  }

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    )
  }

  if (!client) {
    return (
      <div className="p-6 lg:p-8">
        <Link href="/admin/clients" className="flex items-center gap-2 text-[#2563EB] hover:underline mb-8">
          <ArrowLeft size={18} />
          Back to Clients
        </Link>
        <div className="text-center py-12">
          <p className="text-gray-500">Client not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header with Back Button */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <Link href="/admin/clients" className="flex items-center gap-2 text-[#2563EB] hover:underline mb-4">
          <ArrowLeft size={18} />
          Back to Clients
        </Link>
        <h1 className="text-3xl font-bold text-[#0F172A]">{client.company_name}</h1>
        <p className="text-gray-600">{client.sector} • {client.employee_count} employees</p>
      </motion.div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Stage Editor (spans 2 cols on desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <StageEditor clientId={client.id} currentStage={client.current_stage} onStageChange={handleStageChange} />
        </motion.div>

        {/* Quick Stats Sidebar */}
        <div className="space-y-4">
          {/* Revenue Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 font-semibold">Annual Revenue</p>
              <DollarSign size={20} className="text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-[#0F172A]">${(client.annual_revenue / 1000).toFixed(0)}K</p>
          </motion.div>

          {/* Employees Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 font-semibold">Employees</p>
              <Users size={20} className="text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-[#0F172A]">{client.employee_count}</p>
          </motion.div>

          {/* Start Date Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 font-semibold">Started</p>
              <Calendar size={20} className="text-green-600" />
            </div>
            <p className="text-lg font-bold text-[#0F172A]">{client.started_at}</p>
          </motion.div>
        </div>
      </div>

      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg border border-gray-200 p-6 mb-8"
      >
        <h2 className="text-lg font-bold text-[#0F172A] mb-4">Contact Information</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 font-semibold mb-1">Contact Name</p>
            <p className="text-lg font-semibold text-[#0F172A]">{client.contact_name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 font-semibold mb-1">Email</p>
            <a href={`mailto:${client.contact_email}`} className="text-lg font-semibold text-[#2563EB] hover:underline">
              {client.contact_email}
            </a>
          </div>
        </div>
      </motion.div>

      {/* Reports Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        <h2 className="text-lg font-bold text-[#0F172A] mb-6">Generated Reports ({reports.length})</h2>

        {reports.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No reports generated yet. Reach stage 5+ to generate reports.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reports.map((report, idx) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.05 }}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:shadow-md transition-all"
              >
                <div className="flex-1">
                  <p className="font-semibold text-[#0F172A]">{report.report_name}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-600">
                    <span className="bg-white px-2 py-1 rounded font-semibold text-blue-700">
                      {report.report_type.charAt(0).toUpperCase() + report.report_type.slice(1)}
                    </span>
                    <span>Generated: {new Date(report.generated_at).toLocaleDateString()}</span>
                  </div>
                </div>

                {report.report_url ? (
                  <a
                    href={report.report_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#2563EB] text-white rounded-lg text-sm font-semibold hover:bg-[#1D4ED8] transition-colors flex items-center gap-2"
                  >
                    <Download size={16} />
                    Download
                  </a>
                ) : (
                  <span className="px-4 py-2 bg-gray-200 text-gray-500 rounded-lg text-sm font-semibold">
                    No file
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
