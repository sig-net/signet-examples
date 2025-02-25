import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl font-bold">Welcome to Chain Signature Demo</h1>
      <div className="flex flex-col gap-6">
        <Link
          href="/near"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
        >
          NEAR
        </Link>
        <Link
          href="/evm"
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
        >
          EVM
        </Link>
      </div>
    </div>
  );
}
