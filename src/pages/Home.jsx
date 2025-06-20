import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import Header from '../components/Header';
import RequestForm from '../components/RequestForm';
import ResponseViewer from '../components/ResponseViewer';
import Loader from '../components/Loader';
import { makeRequest } from '../services/requestHandler';
import Footer from '../components/Footer';

export default function Home() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    toast.loading('Sending request...');
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
      toast.dismiss();
      toast.success('API request successful!');
    } catch (err) {
      setResponse({
        status: 400,
        statusText: 'Invalid JSON',
        timeTaken: 0,
        headers: {},
        data: { message: 'Please check your headers or body JSON' },
        error: err.message,
      });
      toast.dismiss();
      toast.error('Invalid JSON. Please fix and try again.');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Header />

      <main className="flex-grow py-10 px-6 max-w-5xl mx-auto w-full">
        <motion.section
          className="bg-white shadow-lg rounded-xl p-8 mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">What's API Peek?</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            API Peek is a lightweight API request debugger. Enter any API endpoint, customize headers or request body, and view instant responses, including status, headers, time, and body.
          </p>
          <p className="mt-4 text-gray-500 text-base italic">
            Designed to be simple, user-friendly, and open source; so you can focus on what matters.
          </p>
        </motion.section>

        <motion.div
          className="bg-white shadow-md rounded-lg p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <RequestForm onSubmit={handleSubmit} />
        </motion.div>

        {loading ? (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Loader />
          </motion.div>
        ) : (
          response && (
            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <ResponseViewer response={response} />
            </motion.div>
          )
        )}
      </main>

      <Footer />
    </div>
  );
}
