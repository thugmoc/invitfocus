import { supabase } from './supabase'

export type ReportType = 'accounting' | 'legal' | 'strategy'

interface UploadOptions {
  clientId: number
  file: File
  reportType: ReportType
  reportName: string
}

export async function uploadReport(options: UploadOptions) {
  const { clientId, file, reportType, reportName } = options

  try {
    // Create unique filename
    const timestamp = Date.now()
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filepath = `clients/${clientId}/${reportType}/${timestamp}_${sanitizedFilename}`

    console.log(`📤 Uploading report to: ${filepath}`)

    // Upload file to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('client-reports')
      .upload(filepath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`)
    }

    console.log('✅ File uploaded:', uploadData.path)

    // Get public URL
    const { data: publicUrl } = supabase.storage
      .from('client-reports')
      .getPublicUrl(filepath)

    console.log('🔗 Public URL:', publicUrl.publicUrl)

    // Save report metadata to database
    const { data: reportData, error: dbError } = await supabase
      .from('client_reports')
      .insert([
        {
          client_id: clientId,
          report_type: reportType,
          report_name: reportName || file.name,
          report_url: publicUrl.publicUrl,
          generated_at: new Date(),
        }
      ])
      .select()

    if (dbError) {
      throw new Error(`Database error: ${dbError.message}`)
    }

    console.log('✅ Report saved to database')

    return {
      id: reportData[0].id,
      url: publicUrl.publicUrl,
      name: reportName || file.name,
      type: reportType,
    }
  } catch (error) {
    console.error('❌ Upload error:', error)
    throw error
  }
}

export async function deleteReport(reportId: number, filePath: string) {
  try {
    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('client-reports')
      .remove([filePath])

    if (storageError) {
      throw new Error(`Storage deletion failed: ${storageError.message}`)
    }

    // Delete from database
    const { error: dbError } = await supabase
      .from('client_reports')
      .delete()
      .eq('id', reportId)

    if (dbError) {
      throw new Error(`Database deletion failed: ${dbError.message}`)
    }

    return true
  } catch (error) {
    console.error('❌ Delete error:', error)
    throw error
  }
}

export async function getPublicReportUrl(clientId: number, reportType: ReportType) {
  const { data } = supabase.storage
    .from('client-reports')
    .getPublicUrl(`clients/${clientId}/${reportType}/`)

  return data.publicUrl
}
