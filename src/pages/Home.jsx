import { useState } from 'react';
import Header from '../components/Header';
import RequestForm from '../components/RequestForm';
import ResponseViewer from '../components/ResponseViewer';

const Home = () => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response - replace with actual API call
      const mockResponse = {
        status: 200,
        time: Math.floor(Math.random() * 200) + 100,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache',
          'x-request-id': Math.random().toString(36).substring(7),
        },
        body: {
          data: {
            id: 1,
            method: formData.method,
            url: formData.url,
            headers: formData.headers.filter(h => h.key),
            body: formData.method !== 'GET' ? JSON.parse(formData.body || '{}') : undefined
          }
        }
      };

      setResponse(mockResponse);
    } catch (error) {
      setResponse({
        status: 500,
        time: 0,
        headers: {},
        body: { error: error.message }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Request Form Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Make a Request</h2>
          <RequestForm onSubmit={handleSubmit} />
        </section>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        )}

        {/* Response Section */}
        {response && !isLoading && (
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Response</h2>
            <ResponseViewer 
              status={response.status}
              time={response.time}
              headers={response.headers}
              body={response.body}
            />
          </section>
        )}
      </main>
    </div>
  );
};

export default Home;