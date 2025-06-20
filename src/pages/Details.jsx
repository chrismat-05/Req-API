import React from 'react';
import Header from '../components/Header';
import { useLocation } from 'react-router-dom';
import { formatHeaders } from '../utils/formatters';

export default function Details() {
  const location = useLocation();
  const { state } = location || {};
  const { status, statusText, timeTaken, headers, data } = state || {};

  return (
    <>
      <Header />
      <main className="p-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">API Response Details</h2>
        {state ? (
          <>
            <p className="mb-2">
              <strong>Status:</strong> {status} {statusText}
            </p>
            <p className="mb-2">
              <strong>Time Taken:</strong> {timeTaken}ms
            </p>
            <div className="mb-4">
              <strong>Headers:</strong>
              <ul className="text-sm bg-white rounded p-3 overflow-x-auto border mt-1">
                {formatHeaders(headers).map(({ key, value }) => (
                  <li key={key}>
                    <strong>{key}</strong>: {value}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Body:</strong>
              <pre className="bg-black text-green-300 p-4 rounded overflow-x-auto text-sm mt-2">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          </>
        ) : (
          <p>No response details found.</p>
        )}
      </main>
    </>
  );
}
