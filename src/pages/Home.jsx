import React, { useState } from 'react';
import Header from '../components/Header';
import RequestForm from '../components/RequestForm';
import ResponseViewer from '../components/ResponseViewer';
import Loader from '../components/Loader';
import { makeRequest } from '../services/requestHandler';

export default function Home() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      const parsedHeaders = data.headers ? JSON.parse(data.headers) : {};
      const parsedBody = data.body ? JSON.parse(data.body) : {};
      const res = await makeRequest({
        method: data.method,
        url: data.url,
        headers: parsedHeaders,
        body: parsedBody,
      });
      setResponse(res);
    } catch (err) {
      setResponse({
        status: 400,
        statusText: 'Invalid JSON',
        timeTaken: 0,
        headers: {},
        data: { message: 'Please check your headers or body JSON' },
        error: err.message,
      });
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <main className="py-8 px-4">
        <RequestForm onSubmit={handleSubmit} />
        {loading ? <Loader /> : <ResponseViewer response={response} />}
      </main>
    </>
  );
}
