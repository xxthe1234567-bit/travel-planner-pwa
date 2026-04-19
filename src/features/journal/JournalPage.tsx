import { useState } from 'react'
import { PageContainer, Section } from '../../components/layout/PageContainer'
import { Card } from '../../components/ui/Card'
import { JournalCard } from './JournalCard'
import { JournalEditor } from './JournalEditor'
import { Modal } from '../../components/ui/Modal'
import { useTripStore } from '../../stores/tripStore'

export function JournalPage() {
  const { journal, members } = useTripStore()
  const [showEditor, setShowEditor] = useState(false)

  const sortedJournal = [...journal].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <PageContainer title="日誌">
      <Section title="">
        {sortedJournal.length === 0 ? (
          <Card className="text-center py-8">
            <p className="text-gray-400 mb-2">尚無日誌</p>
            <p className="text-sm text-gray-400">記錄旅途中的美好回憶</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {sortedJournal.map((entry) => (
              <JournalCard key={entry.id} entry={entry} members={members} />
            ))}
          </div>
        )}
      </Section>

      <Section title="">
        <Card
          className="flex items-center justify-center py-6 cursor-pointer"
          onClick={() => setShowEditor(true)}
        >
          <button className="text-sage font-medium flex items-center gap-2">
            <span className="text-2xl">+</span>
            新增日誌
          </button>
        </Card>
      </Section>

      <Modal isOpen={showEditor} onClose={() => setShowEditor(false)} title="新增日誌">
        <JournalEditor members={members} onSuccess={() => setShowEditor(false)} />
      </Modal>
    </PageContainer>
  )
}