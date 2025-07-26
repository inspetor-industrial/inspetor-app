import { Card, CardContent, CardHeader } from '@ipa/components/ui/card'
import { Skeleton } from '@ipa/components/ui/skeleton'

export function TableSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Skeleton className="mb-2 h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="w-full sm:w-48">
            <Skeleton className="mb-2 h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-6 w-16" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
