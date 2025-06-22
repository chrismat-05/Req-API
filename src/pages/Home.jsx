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
    toast.loading('Sending request...', {
      style: {
        background: '#0F172A',
        color: '#F8FAFC',
      },
    });
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
      toast.success('API request successful!', {
        style: {
          background: '#047857',
          color: '#F8FAFC',
        },
        iconTheme: {
          primary: '#F8FAFC',
          secondary: '#047857',
        },
      });
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
      toast.error('Invalid JSON. Please fix and try again.', {
        style: {
          background: '#B91C1C',
          color: '#F8FAFC',
        },
      });
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          className: 'font-medium',
        }}
      />
      <Header />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        <motion.section
          className="bg-gradient-to-r from-indigo-300 to-slate-900 rounded-2xl p-8 md:p-12 text-center shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Debug APIs with <span className="text-indigo-200">Ease</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Req API is your lightweight companion for API exploration. Send requests, inspect responses, and debug effortlessly with our intuitive interface.
            </p>
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-blue-50 text-sm font-medium">
              <span>✨</span>
              <span>Open Source & Free Forever</span>
            </div>
          </div>
        </motion.section>

        <motion.div
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="p-6 border-b border-slate-200 bg-slate-50">
            <h2 className="text-xl font-semibold text-slate-800">API Request</h2>
            <p className="text-slate-600 mt-1">Configure your request and hit Send</p>
          </div>
          <div className="p-6">
            <RequestForm onSubmit={handleSubmit} />
          </div>
        </motion.div>

        {loading ? (
          <motion.div
            className="mt-8 bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center border border-slate-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Loader />
            <p className="mt-4 text-slate-700 font-medium">Waiting for API response...</p>
          </motion.div>
        ) : (
          response && (
            <motion.div
              className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="p-6 border-b border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-800">API Response</h2>
                    <div className="flex items-center mt-1 space-x-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        response.status >= 400 ? 'bg-red-50 text-red-700 border border-red-100' : 
                        response.status >= 200 ? 'bg-green-50 text-green-700 border border-green-100' : 
                        'bg-blue-50 text-blue-700 border border-blue-100'
                      }`}>
                        {response.status} {response.statusText}
                      </span>
                      <span className="text-slate-600 text-sm">
                        {response.timeTaken} ms
                      </span>
                    </div>
                  </div>
                  {response.error && (
                    <span className="text-red-600 text-sm font-medium">
                      {response.error}
                    </span>
                  )}
                </div>
              </div>
              <div className="p-6">
                <ResponseViewer response={response} />
              </div>
            </motion.div>
          )
        )}
      </main>

      <Footer />
    </div>
  );
}