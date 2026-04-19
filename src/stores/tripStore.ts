import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Member, ScheduleItem, Booking, Expense, JournalEntry, TodoItem, TripConfig } from '../types'
import { DEFAULT_MEMBERS, TRIP_CONFIG } from '../constants/theme'

interface TripState {
  config: TripConfig
  members: Member[]
  schedule: ScheduleItem[]
  bookings: Booking[]
  expenses: Expense[]
  journal: JournalEntry[]
  todos: TodoItem[]
  isOnline: boolean
  lastSync: number

  setOnline: (isOnline: boolean) => void
  setConfig: (config: Partial<TripConfig>) => void
  setMembers: (members: Member[]) => void
  addMember: (member: Member) => void
  updateMember: (id: string, member: Partial<Member>) => void
  deleteMember: (id: string) => void
  setSchedule: (schedule: ScheduleItem[]) => void
  addScheduleItem: (item: ScheduleItem) => void
  updateScheduleItem: (id: string, item: Partial<ScheduleItem>) => void
  deleteScheduleItem: (id: string) => void
  setBookings: (bookings: Booking[]) => void
  addBooking: (booking: Booking) => void
  updateBooking: (id: string, booking: Partial<Booking>) => void
  deleteBooking: (id: string) => void
  setExpenses: (expenses: Expense[]) => void
  addExpense: (expense: Expense) => void
  updateExpense: (id: string, expense: Partial<Expense>) => void
  deleteExpense: (id: string) => void
  setJournal: (journal: JournalEntry[]) => void
  addJournalEntry: (entry: JournalEntry) => void
  updateJournalEntry: (id: string, entry: Partial<JournalEntry>) => void
  deleteJournalEntry: (id: string) => void
  setTodos: (todos: TodoItem[]) => void
  addTodo: (todo: TodoItem) => void
  updateTodo: (id: string, todo: Partial<TodoItem>) => void
  deleteTodo: (id: string) => void
  toggleTodo: (id: string) => void
  syncFromRemote: (data: Partial<TripState>) => void
  setLastSync: (timestamp: number) => void
}

export const useTripStore = create<TripState>()(
  persist(
    (set) => ({
      config: TRIP_CONFIG as TripConfig,
      members: DEFAULT_MEMBERS.map((m) => ({
        id: m.id,
        name: m.name,
        avatarUrl: '',
        color: m.color,
        email: '',
      })),
      schedule: [],
      bookings: [],
      expenses: [],
      journal: [],
      todos: [
        { id: '1', title: '預訂機票', assignedTo: ['1'], isCompleted: false, category: 'todo' },
        { id: '2', title: '預訂住宿', assignedTo: ['2'], isCompleted: false, category: 'todo' },
        { id: '3', title: '兌換日幣', assignedTo: [], isCompleted: false, category: 'todo' },
        { id: '4', title: '購買網路卡', assignedTo: [], isCompleted: false, category: 'todo' },
        { id: '5', title: '護照確認', assignedTo: [], isCompleted: false, category: 'todo' },
      ],
      isOnline: navigator.onLine,
      lastSync: 0,

      setOnline: (isOnline) => set({ isOnline }),
      setConfig: (config) => set((state) => ({ config: { ...state.config, ...config } })),
      setMembers: (members) => set({ members }),
      addMember: (member) => set((state) => ({ members: [...state.members, member] })),
      updateMember: (id, member) => set((state) => ({
        members: state.members.map((m) => m.id === id ? { ...m, ...member } : m)
      })),
      deleteMember: (id) => set((state) => ({
        members: state.members.filter((m) => m.id !== id)
      })),
      setSchedule: (schedule) => set({ schedule }),
      addScheduleItem: (item) => set((state) => ({ schedule: [...state.schedule, item] })),
      updateScheduleItem: (id, item) => set((state) => ({
        schedule: state.schedule.map((s) => s.id === id ? { ...s, ...item } : s)
      })),
      deleteScheduleItem: (id) => set((state) => ({
        schedule: state.schedule.filter((s) => s.id !== id)
      })),
      setBookings: (bookings) => set({ bookings }),
      addBooking: (booking) => set((state) => ({ bookings: [...state.bookings, booking] })),
      updateBooking: (id, booking) => set((state) => ({
        bookings: state.bookings.map((b) => b.id === id ? { ...b, ...booking } : b)
      })),
      deleteBooking: (id) => set((state) => ({
        bookings: state.bookings.filter((b) => b.id !== id)
      })),
      setExpenses: (expenses) => set({ expenses }),
      addExpense: (expense) => set((state) => ({ expenses: [...state.expenses, expense] })),
      updateExpense: (id, expense) => set((state) => ({
        expenses: state.expenses.map((e) => e.id === id ? { ...e, ...expense } : e)
      })),
      deleteExpense: (id) => set((state) => ({
        expenses: state.expenses.filter((e) => e.id !== id)
      })),
      setJournal: (journal) => set({ journal }),
      addJournalEntry: (entry) => set((state) => ({ journal: [...state.journal, entry] })),
      updateJournalEntry: (id, entry) => set((state) => ({
        journal: state.journal.map((j) => j.id === id ? { ...j, ...entry } : j)
      })),
      deleteJournalEntry: (id) => set((state) => ({
        journal: state.journal.filter((j) => j.id !== id)
      })),
      setTodos: (todos) => set({ todos }),
      addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
      updateTodo: (id, todo) => set((state) => ({
        todos: state.todos.map((t) => t.id === id ? { ...t, ...todo } : t)
      })),
      deleteTodo: (id) => set((state) => ({
        todos: state.todos.filter((t) => t.id !== id)
      })),
      toggleTodo: (id) => set((state) => ({
        todos: state.todos.map((t) => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t)
      })),
      syncFromRemote: (data) => set((state) => ({
        ...state,
        ...data,
        lastSync: Date.now()
      })),
      setLastSync: (timestamp) => set({ lastSync: timestamp }),
    }),
    {
      name: 'trip-storage',
      partialize: (state) => ({
        config: state.config,
        members: state.members,
        schedule: state.schedule,
        bookings: state.bookings,
        expenses: state.expenses,
        journal: state.journal,
        todos: state.todos,
        lastSync: state.lastSync,
      }),
    }
  )
)