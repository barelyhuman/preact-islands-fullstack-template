import BaseLayout from '@/components/BaseLayout'

function URLItem({ item }) {
  return (
    <li class="flex my-2 gap-2 justify-between p-2">
      <span class="leading-relaxed tracking-wide">
        <strong>{item.path}</strong>
      </span>{' '}
      <span>
        {item.methods.map(x => (
          <span class={`tracking-widest text-zinc-400 rounded-md px-2 py-1`}>
            {x}
          </span>
        ))}
      </span>
    </li>
  )
}

export default function AllRoutes({ routes }) {
  return (
    <BaseLayout>
      <h1 class="text-2xl font-bold">All Registered Routes</h1>
      <div>
        <ul class="w-100">
          {routes.map(x => (
            <URLItem item={x} />
          ))}
        </ul>
      </div>
    </BaseLayout>
  )
}
