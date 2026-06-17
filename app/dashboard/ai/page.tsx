'use client'

import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, TrendingUp, BarChart3 } from 'lucide-react'
import { useState } from 'react'

export default function AIToolsPage() {
  const [question, setQuestion] = useState('')

  const tools = [
    {
      icon: BarChart3,
      title: 'Scenario Builder',
      description: 'Drag-drop interface to build growth scenarios',
      status: 'Ready to use',
      action: 'Launch Builder',
    },
    {
      icon: TrendingUp,
      title: 'Financial Simulator',
      description: 'Real-time P&L impact analysis',
      status: 'Ready to use',
      action: 'Open Simulator',
    },
    {
      icon: Sparkles,
      title: 'AI Insights',
      description: 'Smart recommendations for your business',
      status: 'Coming soon',
      action: 'Learn More',
    },
  ]

  return (
    <div className="p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">AI Tools</h1>
        <p className="text-gray-600">Leverage artificial intelligence to make smarter business decisions</p>
      </motion.div>

      {/* AI Chat */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg border border-gray-200 p-6 mb-8"
      >
        <h2 className="text-xl font-bold text-[#0F172A] mb-4">Ask AI Anything</h2>
        <div className="space-y-4">
          <div className="bg-[#FAFAFA] rounded-lg p-4 min-h-64 max-h-96 overflow-y-auto mb-4 border border-gray-200">
            <div className="space-y-4">
              <div className="flex justify-start">
                <div className="max-w-xs px-4 py-2 rounded-lg bg-gray-200 text-[#0F172A] text-sm">
                  What are my growth opportunities?
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-xs px-4 py-2 rounded-lg bg-[#2563EB] text-white text-sm">
                  <p className="mb-2">Based on your financials, here are the top 3 opportunities:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Market expansion: +35% potential revenue</li>
                    <li>• Product optimization: +15% margins</li>
                    <li>• Team efficiency: +20% capacity</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about your business, financials, strategy..."
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#2563EB] transition-colors"
            />
            <button className="px-6 py-3 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors flex items-center gap-2 font-medium">
              <Sparkles size={18} />
              Send
            </button>
          </div>
        </div>
      </motion.div>

      {/* Tools Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-bold text-[#0F172A] mb-6">Available Tools</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {tools.map((tool, idx) => {
            const Icon = tool.icon
            return (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:border-[#2563EB] transition-all"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon size={24} className="text-[#2563EB]" />
                </div>
                <h3 className="font-bold text-[#0F172A] text-lg mb-2">{tool.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      tool.status === 'Ready to use'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {tool.status}
                  </span>
                  <button className="text-[#2563EB] hover:text-[#1D4ED8] transition-colors flex items-center gap-1 text-sm font-medium">
                    {tool.action}
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Quick Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6"
      >
        <p className="text-sm text-blue-700">
          <span className="font-semibold">💡 Tip:</span> Try asking the AI questions like "What if I
          increase prices by 10%?" or "How should I allocate my marketing budget?"
        </p>
      </motion.div>
    </div>
  )
}
