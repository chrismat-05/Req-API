import React from 'react';
import { formatTime, formatHeaders } from '../utils/formatters';

export default function ResponseViewer({ response }) {
  if (!response) return null;
  const { status, statusText, timeTaken, headers, data } = response;

  const statusColor =
    status >= 200 && status < 300
      ? 'bg-green-500'
      : status >= 400
      ? 'bg-red-500'
      : 'bg-yellow-500';

  return (
    <div className="bg-gray-100 p-6 rounded-xl shadow-md mt-8 max-w-3xl mx-auto">
      <div className="mb-4">
        <span className={`inline-block px-3 py-1 text-white rounded-full text-sm ${statusColor}`}>
          {status} {statusText}
        </span>
        <span className="ml-4 text-sm text-gray-600">Time: {formatTime(timeTaken)}</span>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-1">Response Headers</h3>
        <ul className="text-sm bg-white rounded p-3 overflow-x-auto border">
          {formatHeaders(headers).map(({ key, value }) => (
            <li key={key}>
              <strong>{key}</strong>: {value}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Response Body</h3>
        <pre className="bg-black text-green-300 p-4 rounded overflow-x-auto text-sm">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
}
