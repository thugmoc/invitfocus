import { NextResponse, NextRequest } from 'next/server'

// Simple PDF export - generates basic HTML-based report
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data } = body

    let htmlContent = ''
    let filename = 'export.pdf'

    switch (type) {
      case 'trial_balance':
        htmlContent = generateTrialBalance(data)
        filename = `trial-balance-${Date.now()}.pdf`
        break
      case 'balance_sheet':
        htmlContent = generateBalanceSheet(data)
        filename = `balance-sheet-${Date.now()}.pdf`
        break
      case 'income_statement':
        htmlContent = generateIncomeStatement(data)
        filename = `income-statement-${Date.now()}.pdf`
        break
      case 'invoice':
        htmlContent = generateInvoice(data)
        filename = `invoice-${data.invoice_number || Date.now()}.pdf`
        break
      default:
        return NextResponse.json(
          { error: 'Unknown export type' },
          { status: 400 }
        )
    }

    // For now, return HTML content that can be printed to PDF
    // In production, use a library like puppeteer or pdfkit
    const html = wrapHtml(htmlContent)

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}.html"`,
      },
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    )
  }
}

function generateTrialBalance(data: any) {
  return `
    <h2>Trial Balance</h2>
    <p>Generated: ${new Date().toLocaleDateString()}</p>
    <table border="1" style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th>Account</th>
          <th style="text-align: right;">Debit</th>
          <th style="text-align: right;">Credit</th>
        </tr>
      </thead>
      <tbody>
        ${data.accounts?.map((account: any) => `
          <tr>
            <td>${account.name}</td>
            <td style="text-align: right;">${account.debit || 0}</td>
            <td style="text-align: right;">${account.credit || 0}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `
}

function generateBalanceSheet(data: any) {
  return `
    <h2>Balance Sheet (Bilan)</h2>
    <p>Date: ${data.date || new Date().toLocaleDateString()}</p>
    <h3>Assets</h3>
    <table border="1" style="width: 100%; border-collapse: collapse;">
      <tr><td>Total Assets</td><td style="text-align: right;">${data.total_assets || 0}</td></tr>
    </table>
    <h3>Liabilities & Equity</h3>
    <table border="1" style="width: 100%; border-collapse: collapse;">
      <tr><td>Total Liabilities</td><td style="text-align: right;">${data.total_liabilities || 0}</td></tr>
      <tr><td>Total Equity</td><td style="text-align: right;">${data.total_equity || 0}</td></tr>
    </table>
  `
}

function generateIncomeStatement(data: any) {
  return `
    <h2>Income Statement</h2>
    <p>Period: ${data.period || new Date().toLocaleDateString()}</p>
    <table border="1" style="width: 100%; border-collapse: collapse;">
      <tr><td><strong>Revenue</strong></td><td style="text-align: right;"><strong>${data.revenue || 0}</strong></td></tr>
      <tr><td>Cost of Goods Sold</td><td style="text-align: right;">${data.cogs || 0}</td></tr>
      <tr><td><strong>Gross Profit</strong></td><td style="text-align: right;"><strong>${(data.revenue || 0) - (data.cogs || 0)}</strong></td></tr>
      <tr><td>Operating Expenses</td><td style="text-align: right;">${data.operating_expenses || 0}</td></tr>
      <tr><td><strong>Net Income</strong></td><td style="text-align: right;"><strong>${data.net_income || 0}</strong></td></tr>
    </table>
  `
}

function generateInvoice(data: any) {
  return `
    <h2>Invoice #${data.invoice_number}</h2>
    <p><strong>Date:</strong> ${data.date}</p>
    <p><strong>Due Date:</strong> ${data.due_date}</p>
    <p><strong>Customer:</strong> ${data.customer}</p>
    <table border="1" style="width: 100%; border-collapse: collapse; margin-top: 20px;">
      <thead>
        <tr>
          <th>Description</th>
          <th style="text-align: right;">Qty</th>
          <th style="text-align: right;">Unit Price</th>
          <th style="text-align: right;">Tax %</th>
          <th style="text-align: right;">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${data.items?.map((item: any) => `
          <tr>
            <td>${item.description}</td>
            <td style="text-align: right;">${item.quantity}</td>
            <td style="text-align: right;">$${item.unit_price}</td>
            <td style="text-align: right;">${item.tax_percent}%</td>
            <td style="text-align: right;">$${(item.quantity * item.unit_price * (1 + item.tax_percent / 100)).toFixed(2)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <p style="margin-top: 20px;"><strong>Total: $${data.total?.toFixed(2) || 0}</strong></p>
  `
}

function wrapHtml(content: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            color: #333;
          }
          h2 { color: #0F172A; }
          h3 { color: #1E40AF; margin-top: 20px; }
          table { margin-top: 10px; }
          th { background-color: #f0f0f0; padding: 8px; text-align: left; }
          td { padding: 8px; }
          @media print { body { margin: 0; } }
        </style>
      </head>
      <body>
        ${content}
        <p style="margin-top: 40px; font-size: 12px; color: #999;">
          Generated by InvitFocus on ${new Date().toLocaleString()}
        </p>
      </body>
    </html>
  `
}
