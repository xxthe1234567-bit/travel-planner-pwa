import { openDB, DBSchema, IDBPDatabase } from 'idb'

interface TripDB extends DBSchema {
  syncQueue: {
    key: string
    value: {
      id: string
      type: 'create' | 'update' | 'delete'
      sheet: string
      data: Record<string, unknown>
      timestamp: number
    }
  }
  cache: {
    key: string
    value: {
      sheet: string
      data: unknown[]
      lastSync: number
    }
  }
}

let db: IDBPDatabase<TripDB> | null = null

async function getDB() {
  if (db) return db

  db = await openDB<TripDB>('trip-planner-db', 1, {
    upgrade(db) {
      db.createObjectStore('syncQueue', { keyPath: 'id' })
      db.createObjectStore('cache', { keyPath: 'sheet' })
    },
  })

  return db
}

export async function addToSyncQueue(
  item: TripDB['syncQueue']['value']
) {
  const database = await getDB()
  await database.put('syncQueue', item)
}

export async function getSyncQueue() {
  const database = await getDB()
  return database.getAll('syncQueue')
}

export async function clearSyncQueue() {
  const database = await getDB()
  await database.clear('syncQueue')
}

export async function removeSyncQueueItem(id: string) {
  const database = await getDB()
  await database.delete('syncQueue', id)
}

export async function setCacheData(sheet: string, data: unknown[], lastSync: number) {
  const database = await getDB()
  await database.put('cache', { sheet, data, lastSync })
}

export async function getCacheData(sheet: string) {
  const database = await getDB()
  return database.get('cache', sheet)
}

export async function clearAllCache() {
  const database = await getDB()
  await database.clear('cache')
}