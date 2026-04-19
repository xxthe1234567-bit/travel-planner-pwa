import { useState, useRef } from 'react'
import { Input, TextArea } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Button } from '../../components/ui/Button'
import { useTripStore } from '../../stores/tripStore'
import type { Member } from '../../types'

interface JournalEditorProps {
  members: Member[]
  onSuccess: () => void
}

export function JournalEditor({ members, onSuccess }: JournalEditorProps) {
  const { addJournalEntry } = useTripStore()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState(members[0]?.id || '')
  const [location, setLocation] = useState('')
  const [photos, setPhotos] = useState<string[]>([])
  const fileInput = useRef<HTMLInputElement>(null)

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setPhotos((prev) => [...prev, ev.target?.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const handleSubmit = () => {
    if (!title || !content || !author) return

    addJournalEntry({
      id: Date.now().toString(),
      date: new Date().toISOString(),
      title,
      content,
      author,
      location,
      photos,
    })

    setTitle('')
    setContent('')
    setLocation('')
    setPhotos([])
    onSuccess()
  }

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <Input
        label="標題"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="給這篇日誌一個標題"
      />

      <TextArea
        label="內容"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="記錄今天的美好回憶..."
        rows={4}
      />

      <Select
        label="作者"
        options={members.map((m) => ({ value: m.id, label: m.name }))}
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <Input
        label="地點"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="選填"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">照片</label>
        <input
          type="file"
          ref={fileInput}
          onChange={handlePhotoUpload}
          accept="image/*"
          multiple
          className="hidden"
        />
        <div className="flex flex-wrap gap-2">
          {photos.map((photo, i) => (
            <div key={i} className="relative">
              <img
                src={photo}
                alt=""
                className="w-20 h-20 rounded-xl object-cover"
              />
              <button
                type="button"
                onClick={() => removePhoto(i)}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            className="w-20 h-20 rounded-xl border-2 border-dashed border-cream-dark flex items-center justify-center text-gray-400"
          >
            +
          </button>
        </div>
      </div>

      <Button onClick={handleSubmit} className="w-full">
        發布日誌
      </Button>
    </div>
  )
}