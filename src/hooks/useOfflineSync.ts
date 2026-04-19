import { useEffect, useCallback } from 'react'
import { useTripStore } from '../stores/tripStore'
import { addToSyncQueue, getSyncQueue, clearSyncQueue } from '../services/offlineDb'

export function useOfflineSync() {
  const { isOnline, setOnline } = useTripStore()

  useEffect(() => {
    const handleOnline = () => setOnline(true)
    const handleOffline = () => setOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    setOnline(navigator.onLine)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [setOnline])

  const queueSync = useCallback(async (
    type: 'create' | 'update' | 'delete',
    sheet: string,
    data: Record<string, unknown>
  ) => {
    await addToSyncQueue({
      id: `${sheet}-${Date.now()}`,
      type,
      sheet,
      data,
      timestamp: Date.now(),
    })
  }, [])

  const processSyncQueue = useCallback(async () => {
    if (!navigator.onLine) return

    const queue = await getSyncQueue()
    if (queue.length === 0) return

    // TODO: 串接 Google Apps Script 進行實際同步
    console.log('[Sync] Processing queue:', queue.length)

    // 清除已處理的隊列
    await clearSyncQueue()
  }, [])

  useEffect(() => {
    if (isOnline) {
      processSyncQueue()
    }
  }, [isOnline, processSyncQueue])

  return {
    isOnline,
    queueSync,
    processSyncQueue,
  }
}