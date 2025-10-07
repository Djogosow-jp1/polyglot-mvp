import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Polyglot MVP - Home</title>
        <meta name="description" content="Polyglot MVP Application" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <main className="container mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold text-center text-gray-900 mb-8">
            Welcome to Polyglot MVP
          </h1>
          <p className="text-xl text-center text-gray-600 mb-12">
            Your multilingual application platform
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/dashboard"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/settings"
              className="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
            >
              Settings
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
