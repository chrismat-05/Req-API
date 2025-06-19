import React from 'react';
import { Prism as SyntaxHighlighter } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';

const ResponseViewer = ({ status, time, headers = {}, body }) => {
  const getStatusColor = () => {
    if (status >= 200 && status < 300) return 'bg-green-500';
    if (status >= 400 && status < 500) return 'bg-yellow-500';
    if (status >= 500) return 'bg-red-500';
    return 'bg-gray-500';
  };

  const formattedHeaders = Object.entries(headers).map(([key, value]) => ({
    key,
    value: Array.isArray(value) ? value.join(', ') : value
  }));

  const formattedBody = () => {
    try {
      if (typeof body === 'object') return JSON.stringify(body, null, 2);
      return JSON.stringify(JSON.parse(body), null, 2);
    } catch {
      return body;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 mr-2">Status:</span>
          <span className={`${getStatusColor()} text-white text-sm font-semibold px-2 py-1 rounded`}>
            {status}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 mr-2">Time:</span>
          <span className="text-sm font-mono">{time} ms</span>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Headers</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {formattedHeaders.map((header, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-mono text-gray-900">{header.key}</td>
                  <td className="px-4 py-2 text-sm font-mono text-gray-900 break-all">{header.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Body</h3>
        <div className="rounded-md bg-gray-50 p-4 overflow-auto max-h-96">
          {typeof body === 'string' || typeof body === 'object' ? (
            <SyntaxHighlighter
              language="json"
              style={theme}
              customStyle={{
                backgroundColor: 'transparent',
                fontSize: '0.875rem',
                fontFamily: 'monospace',
                margin: 0,
                padding: 0,
                overflow: 'visible'
              }}
            >
              {formattedBody()}
            </SyntaxHighlighter>
          ) : (
            <pre className="text-sm font-mono text-gray-900">{body}</pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResponseViewer;