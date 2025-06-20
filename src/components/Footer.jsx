import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-primary text-center text-sm text-white py-6 border-t mt-10">
      <div>
        Built by{' '}
        <a
          href="https://thecma.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white font-semibold underline underline-offset-2 hover:text-gray-200 transition-colors"
        >
          CMA
        </a>
      </div>
      <div>
        Open Sourced at{' '}
        <a
          href="https://github.com/chrismat-05/api-peek"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white font-semibold underline underline-offset-2 hover:text-gray-200 transition-colors"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
