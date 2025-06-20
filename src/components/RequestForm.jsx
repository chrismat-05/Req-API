import React from 'react';
import { useForm } from 'react-hook-form';

export default function RequestForm({ onSubmit }) {
  const { register, handleSubmit, watch } = useForm();
  const method = watch('method');

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl mx-auto space-y-4"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Request Method</label>
        <select {...register('method')} className="w-full border rounded px-3 py-2">
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Request URL</label>
        <input
          {...register('url')}
          required
          placeholder="https://api.example.com"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Headers (JSON format)</label>
        <textarea
          {...register('headers')}
          placeholder='{ "Authorization": "Bearer token" }'
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {method !== 'GET' && (
        <div>
          <label className="block text-sm font-medium mb-1">Body (JSON)</label>
          <textarea
            {...register('body')}
            placeholder='{ "key": "value" }'
            className="w-full border rounded px-3 py-2"
          />
        </div>
      )}

      <button
        type="submit"
        className="bg-primary hover:bg-primaryDark text-white font-medium px-4 py-2 rounded w-full"
      >
        Send Request
      </button>
    </form>
  );
}
