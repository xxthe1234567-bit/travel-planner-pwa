import { useState } from 'react'
import { Modal } from '../../components/ui/Modal'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

interface PinModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function PinModal({ isOpen, onClose, onSuccess }: PinModalProps) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  const handleVerify = () => {
    if (pin === '007') {
      onSuccess()
      setPin('')
      setError('')
    } else {
      setError('PIN 錯誤，請重新輸入')
      setPin('')
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="輸入 PIN 碼">
      <div className="space-y-4">
        <p className="text-gray-600">此資訊已加密保護，請輸入 PIN 碼解除檢視</p>

        <Input
          type="password"
          value={pin}
          onChange={(e) => { setPin(e.target.value); setError('') }}
          placeholder="請輸入 PIN 碼"
          error={error}
          maxLength={4}
          inputMode="numeric"
        />

        <div className="flex gap-3">
          <Button variant="secondary" onClick={onClose} className="flex-1">
            取消
          </Button>
          <Button onClick={handleVerify} className="flex-1">
            確認
          </Button>
        </div>
      </div>
    </Modal>
  )
}