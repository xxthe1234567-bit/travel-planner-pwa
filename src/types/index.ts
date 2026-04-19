export interface Member {
  id: string
  name: string
  avatarUrl: string
  color: string
  email: string
}

export interface ScheduleItem {
  id: string
  date: string
  time: string
  location: string
  category: 'attraction' | 'food' | 'transport' | 'accommodation'
  title: string
  notes: string
  mapUrl: string
  photos: string[]
  weather?: 'sunny' | 'cloudy' | 'rainy'
  temperature?: number
}

export interface Booking {
  id: string
  type: 'flight' | 'hotel' | 'car' | 'ticket'
  title: string
  details: string
  imageUrl: string
  pdfUrl: string
  cost: number
  currency: string
  sharedBy: string[]
  checkIn?: string
  checkOut?: string
  pickUpTime?: string
  dropOffTime?: string
  pickUpLocation?: string
  dropOffLocation?: string
  pinProtected: boolean
}

export interface Expense {
  id: string
  date: string
  amount: number
  currency: string
  category: 'food' | 'transport' | 'accommodation' | 'shopping' | 'entertainment' | 'other'
  payer: string
  splitAmong: string[]
  notes: string
}

export interface JournalEntry {
  id: string
  date: string
  author: string
  title: string
  content: string
  photos: string[]
  location: string
}

export interface TodoItem {
  id: string
  title: string
  assignedTo: string[]
  isCompleted: boolean
  category: 'todo' | 'packing' | 'shopping'
  dueDate?: string
}

export interface TripConfig {
  destination: string
  startDate: string
  endDate: string
  currency: string
  spreadsheetUrl?: string
}

export interface SyncQueueItem {
  id: string
  type: 'create' | 'update' | 'delete'
  sheet: string
  data: Record<string, unknown>
  timestamp: number
}