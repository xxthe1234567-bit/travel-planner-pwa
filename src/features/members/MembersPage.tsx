import { PageContainer, Section } from '../../components/layout/PageContainer'
import { Card } from '../../components/ui/Card'
import { MemberCard } from './MemberCard'
import { useTripStore } from '../../stores/tripStore'

export function MembersPage() {
  const { members, config } = useTripStore()

  return (
    <PageContainer title="成員">
      <Section title={config.destination}>
        <Card className="text-center py-4">
          <p className="text-gray-600">
            {config.startDate} ~ {config.endDate}
          </p>
        </Card>
      </Section>

      <Section title={`成員 (${members.length})`}>
        <div className="grid grid-cols-1 gap-3">
          {members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </Section>

      <Section title="">
        <Card className="flex items-center justify-center py-6">
          <button className="text-sage font-medium flex items-center gap-2">
            <span className="text-2xl">+</span>
            新增成員
          </button>
        </Card>
      </Section>
    </PageContainer>
  )
}