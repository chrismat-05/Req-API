import React from 'react';

export default function Header() {
  return (
    <header className="bg-primary text-white sticky top-0 shadow-md z-50">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold tracking-wide">API Peek</h1>
        <a
          href="https://github.com/chrismat-05/api-peek"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-sm font-medium transition-colors hover:text-gray-200"
        >
          GitHub ↗
        </a>
      </div>
    </header>
  );
}
