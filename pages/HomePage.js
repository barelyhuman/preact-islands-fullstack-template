import Counter from '@/components/Counter.island'
import BaseLayout from '@/components/BaseLayout'

export default function ({ email }) {
  const initData = { initValue: 10 }
  return (
    <>
      <BaseLayout>
        <h1 class="text-xl font-bold">Hello from {email || 'Preact Island'}</h1>
        <div class="flex align-center gap-2">
          <Counter {...initData} /> <h4>&larr; I'm an 🏝️</h4>
        </div>
        <a
          href="/all"
          class="underline hover:no-underline underline-offset-4 text-zinc-400 hover:text-zinc-600"
        >
          Check all registered pages
        </a>
      </BaseLayout>
    </>
  )
}
