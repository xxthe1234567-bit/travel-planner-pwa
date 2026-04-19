export const COLORS = {
  cream: '#F7F4EB',
  'cream-dark': '#E8E4DA',
  'cream-light': '#FAF8F3',
  sage: '#9CAF88',
  'sage-light': '#C5D1B0',
  'sage-dark': '#7A9068',
  earth: '#B5A689',
  'earth-dark': '#8B7355',
  warm: '#E8DCC8',
  'warm-dark': '#D4C4A8',
} as const

export const MEMBER_COLORS = [
  '#E57373', // coral
  '#64B5F6', // sky
  '#81C784', // forest
  '#BA68C8', // lavender
  '#FFB74D', // orange
] as const

export const CATEGORY_COLORS = {
  attraction: '#81C784',
  food: '#FFB74D',
  transport: '#64B5F6',
  accommodation: '#BA68C8',
} as const

export const EXPENSE_CATEGORIES = {
  food: '#FFB74D',
  transport: '#64B5F6',
  accommodation: '#BA68C8',
  shopping: '#E57373',
  entertainment: '#81C784',
  other: '#B5A689',
} as const

export const DEFAULT_MEMBERS = [
  { id: '1', name: 'Member 1', color: MEMBER_COLORS[0] },
  { id: '2', name: 'Member 2', color: MEMBER_COLORS[1] },
  { id: '3', name: 'Member 3', color: MEMBER_COLORS[2] },
  { id: '4', name: 'Member 4', color: MEMBER_COLORS[3] },
  { id: '5', name: 'Member 5', color: MEMBER_COLORS[4] },
] as const

export const TRIP_CONFIG = {
  destination: 'Tokyo, Japan',
  startDate: '2026-05-01',
  endDate: '2026-05-07',
  currency: 'JPY',
} as const

export const EXCHANGE_RATES: Record<string, number> = {
  TWD: 1,
  JPY: 4.5,
  USD: 32,
  EUR: 35,
  KRW: 0.025,
  HKD: 4.1,
}