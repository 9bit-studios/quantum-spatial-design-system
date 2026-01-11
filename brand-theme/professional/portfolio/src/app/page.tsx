import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#010005] to-[#0A0621] text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-6xl font-bold mb-8">
          Penny Platt
        </h1>
        <p className="text-2xl mb-12 text-gray-300">
          Design Systems Engineer | Apple Intelligence | M4 Optimization
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/quantum-spatial" className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl hover:bg-white/10 transition">
            <h2 className="text-3xl font-bold mb-4">Quantum-Spatial Design System</h2>
            <p className="text-gray-300">Apple HIG compliant design system with M4 optimization</p>
          </Link>

          <Link href="/runsmart" className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl hover:bg-white/10 transition">
            <h2 className="text-3xl font-bold mb-4">RunSmart Interface</h2>
            <p className="text-gray-300">Professional running coaching platform</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
