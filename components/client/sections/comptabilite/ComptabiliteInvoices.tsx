'use client'

import { motion } from 'framer-motion'
import { Plus, Download, Eye, Loader } from 'lucide-react'
import { useState } from 'react'
import { useInvoices } from '@/hooks/useInvoices'
import { usePdfExport } from '@/hooks/usePdfExport'

export default function ComptabiliteInvoices() {
  const [showForm, setShowForm] = useState(false)
  const [invoices, setInvoices] = useState<any[]>([])
  const [formData, setFormData] = useState({
    customer: '',
    date: new Date().toISOString().split('T')[0],
    due_date: new Date().toISOString().split('T')[0],
    items: [{ description: '', quantity: 1, unit_price: 0, tax_percent: 0 }],
    status: 'draft' as 'draft' | 'posted' | 'paid',
  })

  const { saveInvoice, loading: saving } = useInvoices('client-demo')
  const { exportToPdf, loading: exporting } = usePdfExport()

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', quantity: 1, unit_price: 0, tax_percent: 0 }],
    })
  }

  const handleRemoveItem = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    })
  }

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...formData.items]
    newItems[index] = { ...newItems[index], [field]: value }
    setFormData({ ...formData, items: newItems })
  }

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => {
      const subtotal = item.quantity * item.unit_price
      const tax = subtotal * (item.tax_percent / 100)
      return sum + subtotal + tax
    }, 0)
  }

  const handleSaveInvoice = async (asDraft: boolean) => {
    try {
      const invoice = await saveInvoice({
        ...formData,
        status: asDraft ? 'draft' : 'posted',
        total: calculateTotal(),
      })
      setInvoices([invoice, ...invoices])
      setFormData({
        customer: '',
        date: new Date().toISOString().split('T')[0],
        due_date: new Date().toISOString().split('T')[0],
        items: [{ description: '', quantity: 1, unit_price: 0, tax_percent: 0 }],
        status: 'draft',
      })
      setShowForm(false)
    } catch (error) {
      alert('Failed to save invoice')
    }
  }

  const handleExportPdf = async (invoice: any) => {
    try {
      await exportToPdf('invoice', invoice, `invoice-${invoice.invoice_number || Date.now()}.pdf`)
    } catch (error) {
      alert('Failed to export PDF')
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex justify-between items-center"
      >
        <h2 className="text-2xl font-bold text-[#0F172A]">Invoices (Factures)</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          <Plus size={20} />
          New Invoice
        </button>
      </motion.div>

      {/* Invoice Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg border border-gray-200 p-8 mb-8"
        >
          <h3 className="text-lg font-bold text-[#0F172A] mb-6">Create New Invoice</h3>
          
          <div className="grid lg:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">Customer</label>
              <input
                type="text"
                value={formData.customer}
                onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Customer name..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">Invoice Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">Due Date</label>
              <input
                type="date"
                value={formData.due_date}
                onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="draft">Draft</option>
                <option value="posted">Posted</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </div>

          {/* Invoice Lines */}
          <div className="mb-6">
            <h4 className="font-semibold text-[#0F172A] mb-3">Invoice Items</h4>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-2">Description</th>
                  <th className="text-right py-2 px-2">Qty</th>
                  <th className="text-right py-2 px-2">Unit Price</th>
                  <th className="text-right py-2 px-2">Tax %</th>
                  <th className="text-right py-2 px-2">Amount</th>
                  <th className="text-center py-2 px-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.items.map((item, idx) => {
                  const amount = item.quantity * item.unit_price * (1 + item.tax_percent / 100)
                  return (
                    <tr key={idx} className="border-b border-gray-200">
                      <td className="py-2 px-2">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-200 rounded"
                          placeholder="Item description"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(idx, 'quantity', parseFloat(e.target.value))}
                          className="w-full px-2 py-1 border border-gray-200 rounded text-right"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <input
                          type="number"
                          value={item.unit_price}
                          onChange={(e) => handleItemChange(idx, 'unit_price', parseFloat(e.target.value))}
                          className="w-full px-2 py-1 border border-gray-200 rounded text-right"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <input
                          type="number"
                          value={item.tax_percent}
                          onChange={(e) => handleItemChange(idx, 'tax_percent', parseFloat(e.target.value))}
                          className="w-full px-2 py-1 border border-gray-200 rounded text-right"
                        />
                      </td>
                      <td className="py-2 px-2 text-right font-semibold">${amount.toFixed(2)}</td>
                      <td className="py-2 px-2 text-center">
                        <button
                          onClick={() => handleRemoveItem(idx)}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <button
              onClick={handleAddItem}
              className="mt-2 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              + Add Item
            </button>
          </div>

          {/* Total */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-end gap-8 text-sm">
              <div>
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold ml-2">
                  ${formData.items.reduce((sum, item) => sum + item.quantity * item.unit_price, 0).toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Tax:</span>
                <span className="font-semibold ml-2">
                  ${formData.items.reduce((sum, item) => sum + item.quantity * item.unit_price * (item.tax_percent / 100), 0).toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Total:</span>
                <span className="font-bold text-lg ml-2">${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => handleSaveInvoice(true)}
              disabled={saving}
              className="px-6 py-2 bg-gray-100 text-[#0F172A] rounded-lg hover:bg-gray-200 font-medium disabled:opacity-50"
            >
              {saving ? <Loader className="inline animate-spin mr-2" size={18} /> : ''}
              Save Draft
            </button>
            <button
              onClick={() => handleSaveInvoice(false)}
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50"
            >
              {saving ? <Loader className="inline animate-spin mr-2" size={18} /> : ''}
              Post Invoice
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-6 py-2 bg-gray-200 text-[#0F172A] rounded-lg hover:bg-gray-300 font-medium"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Invoices List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        {invoices.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No invoices yet. Create your first invoice to get started.</p>
        ) : (
          <div className="space-y-2">
            {invoices.map((invoice: any, idx: number) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div>
                  <h4 className="font-semibold text-[#0F172A]">
                    Invoice #{invoice.invoice_number}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {invoice.customer} • {invoice.date} • ${invoice.total?.toFixed(2)}
                  </p>
                  <span
                    className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ${
                      invoice.status === 'paid'
                        ? 'bg-green-100 text-green-700'
                        : invoice.status === 'posted'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => handleExportPdf(invoice)}
                    disabled={exporting}
                    className="p-2 text-green-600 hover:bg-green-50 rounded disabled:opacity-50"
                  >
                    <Download size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </>
  )
}
