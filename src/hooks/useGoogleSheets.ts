const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwNzSQp_pyHuX4dDJkBWkdPikGEW6SYOPIu3ApGTMfhDfWHaYDnmAoPYligjcyrZFzdXQ/exec'

interface SheetRow {
  [key: string]: string
}

interface SheetResponse {
  values: SheetRow[]
}

export async function fetchSheet(sheetName: string): Promise<SheetRow[]> {
  if (!APPS_SCRIPT_URL) {
    console.log('[Mock Mode] 使用本地資料')
    return []
  }

  try {
    const response = await fetch(
      `${APPS_SCRIPT_URL}?action=get&sheet=${sheetName}`
    )
    const data: SheetResponse = await response.json()
    return data.values || []
  } catch (error) {
    console.error('Fetch sheet error:', error)
    return []
  }
}

export async function updateSheet(
  sheetName: string,
  data: SheetRow[]
): Promise<boolean> {
  if (!APPS_SCRIPT_URL) {
    console.log('[Mock Mode] 資料儲存至本地')
    return true
  }

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'update',
        sheet: sheetName,
        data,
      }),
    })
    return response.ok
  } catch (error) {
    console.error('Update sheet error:', error)
    return false
  }
}

export async function appendRow(
  sheetName: string,
  row: SheetRow
): Promise<boolean> {
  if (!APPS_SCRIPT_URL) {
    console.log('[Mock Mode] 資料儲存至本地')
    return true
  }

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'append',
        sheet: sheetName,
        row,
      }),
    })
    return response.ok
  } catch (error) {
    console.error('Append row error:', error)
    return false
  }
}

export function useGoogleSheets() {
  return {
    fetchSheet,
    updateSheet,
    appendRow,
  }
}