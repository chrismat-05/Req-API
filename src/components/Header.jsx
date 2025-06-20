import React from 'react';

export default function Header() {
  return (
    <header className="bg-primary text-white p-4 sticky top-0 shadow-md z-50 flex justify-between items-center">
      <h1 className="text-xl font-semibold tracking-wide">API Peek</h1>
      <a
        href="https://github.com/thecmaofficial/api-peek"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline text-sm"
      >
        GitHub ↗
      </a>
    </header>
  );
}
