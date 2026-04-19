import { useRef, useState } from 'react'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { Avatar } from '../../components/ui/Select'
import { useTripStore } from '../../stores/tripStore'
import type { Member } from '../../types'

interface MemberCardProps {
  member: Member
}

export function MemberCard({ member }: MemberCardProps) {
  const { updateMember, deleteMember } = useTripStore()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(member.name)
  const fileInput = useRef<HTMLInputElement>(null)

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (ev) => {
      updateMember(member.id, { avatarUrl: ev.target?.result as string })
    }
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    updateMember(member.id, { name })
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (confirm(`確定要移除 ${member.name} 嗎？`)) {
      deleteMember(member.id)
    }
  }

  return (
    <Card className="flex items-center gap-4">
      <button
        onClick={() => fileInput.current?.click()}
        className="relative"
      >
        <Avatar src={member.avatarUrl} name={member.name} color={member.color} size="lg" />
        <div className="absolute bottom-0 right-0 w-5 h-5 bg-sage rounded-full flex items-center justify-center text-white text-xs">
          📷
        </div>
        <input
          type="file"
          ref={fileInput}
          onChange={handlePhotoUpload}
          accept="image/*"
          className="hidden"
        />
      </button>

      <div className="flex-1">
        {isEditing ? (
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="姓名"
          />
        ) : (
          <>
            <p className="font-bold text-gray-800">{member.name}</p>
            {member.email && (
              <p className="text-sm text-gray-500">{member.email}</p>
            )}
          </>
        )}
      </div>

      <div className="flex gap-2">
        {isEditing ? (
          <>
            <Button variant="secondary" size="sm" onClick={() => setIsEditing(false)}>
              取消
            </Button>
            <Button size="sm" onClick={handleSave}>
              儲存
            </Button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              ✏️
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-gray-400 hover:text-red-500"
            >
              🗑️
            </button>
          </>
        )}
      </div>
    </Card>
  )
}