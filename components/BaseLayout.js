export default function BaseLayout({ children }) {
	return (
		<section class="max-w-3xl mx-auto px-2 py-1 h-screen flex flex-col gap-2 justify-center">
			{children}
		</section>
	)
}
