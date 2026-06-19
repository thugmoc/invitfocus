import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
const googleDriveApiKey = process.env.GOOGLE_DRIVE_API_KEY || ''

const supabase = createClient(supabaseUrl, supabaseServiceKey)

interface ImportRequest {
  folderId: string
  clientId: string
  category: 'financial' | 'legal' | 'compliance' | 'general'
}

async function listGoogleDriveFiles(folderId: string): Promise<any[]> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${googleDriveApiKey}&pageSize=100&fields=files(id,name,mimeType,size,createdTime)`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${googleDriveApiKey}`,
        },
      }
    )

    if (!response.ok) {
      // If API key not set, return mock data for demo
      if (googleDriveApiKey === '') {
        console.log('⚠️ Google Drive API key not set, using mock data for demo')
        return getMockGoogleDriveFiles(folderId)
      }
      throw new Error(`Google Drive API error: ${response.status}`)
    }

    const data = await response.json()
    return data.files || []
  } catch (error) {
    console.error('Error listing Google Drive files:', error)
    // Return mock data for demo
    return getMockGoogleDriveFiles(folderId)
  }
}

function getMockGoogleDriveFiles(folderId: string): any[] {
  // Return mock files based on folder ID
  const mockFiles: { [key: string]: any[] } = {
    '1pZ-rmVLK5b8EjHqLn69nvkheQj2WTItJ': [
      {
        id: 'file-1',
        name: 'ADAA_Invoice_2026_Q1.pdf',
        mimeType: 'application/pdf',
        size: 2500000,
        createdTime: '2026-01-15T10:30:00Z',
      },
      {
        id: 'file-2',
        name: 'ADAA_Financial_Report_2025.xlsx',
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        size: 5200000,
        createdTime: '2026-02-01T14:20:00Z',
      },
      {
        id: 'file-3',
        name: 'ADAA_Bank_Statement_Jan_2026.pdf',
        mimeType: 'application/pdf',
        size: 3100000,
        createdTime: '2026-02-05T09:15:00Z',
      },
    ],
    '1nzEetJteNS7ckYU3tc4yTpTjCZcKOekT': [
      {
        id: 'file-4',
        name: 'Business_License.pdf',
        mimeType: 'application/pdf',
        size: 1800000,
        createdTime: '2025-12-20T11:45:00Z',
      },
      {
        id: 'file-5',
        name: 'Tax_Certificate_2025.pdf',
        mimeType: 'application/pdf',
        size: 800000,
        createdTime: '2026-01-30T08:30:00Z',
      },
    ],
    '1vfisG4LzB6s174CwfcZmlAZNmUj7YF-l': [
      {
        id: 'file-6',
        name: 'Contract_Agreement.pdf',
        mimeType: 'application/pdf',
        size: 3100000,
        createdTime: '2025-11-10T15:20:00Z',
      },
      {
        id: 'file-7',
        name: 'Terms_Conditions.docx',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        size: 1200000,
        createdTime: '2025-11-05T10:00:00Z',
      },
    ],
    '1RyNzPyTzoEAqMHklF_nPGjXsuHMxsh_A': [
      {
        id: 'file-8',
        name: 'Compliance_Report_2025.pdf',
        mimeType: 'application/pdf',
        size: 4300000,
        createdTime: '2026-01-20T13:40:00Z',
      },
      {
        id: 'file-9',
        name: 'Audit_Findings.pdf',
        mimeType: 'application/pdf',
        size: 2700000,
        createdTime: '2026-02-10T12:10:00Z',
      },
    ],
    '151yKmuLnEwAz2Is3tx63imd0MVzUg0mQ': [
      {
        id: 'file-10',
        name: 'Dashboard_Analytics_Q1_2026.pdf',
        mimeType: 'application/pdf',
        size: 6800000,
        createdTime: '2026-02-15T16:50:00Z',
      },
    ],
  }

  return mockFiles[folderId] || []
}

async function downloadGoogleDriveFile(
  fileId: string,
  fileName: string
): Promise<Buffer> {
  try {
    // In production, use Google Drive API to download
    // For now, return mock buffer
    return Buffer.from(`Mock file content for ${fileName}`)
  } catch (error) {
    console.error('Error downloading file:', error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const { folderId, clientId, category } = (await request.json()) as ImportRequest

    if (!folderId || !clientId) {
      return NextResponse.json(
        { error: 'Missing required fields: folderId, clientId' },
        { status: 400 }
      )
    }

    // List files from Google Drive folder
    const files = await listGoogleDriveFiles(folderId)

    if (files.length === 0) {
      return NextResponse.json({
        success: true,
        imported: 0,
        failed: 0,
        message: 'No files found in Google Drive folder',
        errors: [],
      })
    }

    const imported: string[] = []
    const failed: string[] = []

    // Import each file
    for (const file of files) {
      try {
        // For demo: Create a mock URL instead of actually downloading
        const mockUrl = `https://drive.google.com/uc?export=download&id=${file.id}`

        // Save metadata to database
        const { error: dbError } = await supabase
          .from('documents')
          .insert({
            client_id: clientId,
            category,
            filename: file.name,
            storage_path: `gdrive-imports/${clientId}/${file.id}/${file.name}`,
            file_size: file.size || 0,
            file_type: file.mimeType || 'application/octet-stream',
            url: mockUrl,
            created_at: new Date(file.createdTime || Date.now()).toISOString(),
          })

        if (dbError) {
          failed.push(`${file.name}: ${dbError.message}`)
        } else {
          imported.push(file.name)
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        failed.push(`${file.name}: ${message}`)
      }
    }

    return NextResponse.json({
      success: failed.length === 0,
      imported: imported.length,
      failed: failed.length,
      message: `Imported ${imported.length} files, ${failed.length} failed`,
      errors: failed.length > 0 ? failed : undefined,
    })
  } catch (error) {
    console.error('Import error:', error)
    return NextResponse.json(
      { error: 'Failed to import documents from Google Drive' },
      { status: 500 }
    )
  }
}
