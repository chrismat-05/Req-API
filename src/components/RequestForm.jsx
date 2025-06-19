import { useForm, useWatch } from "react-hook-form";
import { useState } from "react";
import { makeRequest } from "../services/requestHandler";

const RequestForm = ({ onResponse }) => {
  const { register, handleSubmit, control, setError, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      method: "GET",
      url: "",
      headers: [{ key: "", value: "" }],
      body: "",
    },
  });

  const selectedMethod = useWatch({ control, name: "method" });
  const [headers, setHeaders] = useState([{ key: "", value: "" }]);

  const addHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  const removeHeader = (index) => {
    const newHeaders = [...headers];
    newHeaders.splice(index, 1);
    setHeaders(newHeaders);
  };

  const onSubmit = async (formData) => {
    try {
      const validHeaders = formData.headers.filter(header => header.key.trim() !== "");
      
      let parsedBody = "";
      if (formData.method !== "GET" && formData.body) {
        try {
          parsedBody = JSON.parse(formData.body);
        } catch (e) {
          setError("body", { 
            type: "manual",
            message: "Invalid JSON format"
          });
          return;
        }
      }

      const response = await makeRequest({
        method: formData.method,
        url: formData.url,
        headers: validHeaders,
        body: parsedBody
      });

      onResponse(response);
    } catch (error) {
      onResponse({
        status: 500,
        time: 0,
        headers: {},
        body: { error: "Request failed", details: error.message }
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Method
            </label>
            <select
              {...register("method")}
              className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>

          <div className="w-full md:w-5/6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL
            </label>
            <input
              type="text"
              {...register("url", { 
                required: "URL is required",
                pattern: {
                  value: /^(https?:\/\/)/,
                  message: "URL must start with http:// or https://"
                }
              })}
              placeholder="https://api.example.com/endpoint"
              className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            {errors.url && (
              <p className="mt-1 text-sm text-red-600">{errors.url.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Headers
          </label>
          <div className="space-y-2">
            {headers.map((_, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="text"
                  {...register(`headers[${index}].key`)}
                  placeholder="Key"
                  className="flex-1 rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <input
                  type="text"
                  {...register(`headers[${index}].value`)}
                  placeholder="Value"
                  className="flex-1 rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                {headers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeHeader(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addHeader}
              className="text-sm text-primary-600 hover:text-primary-800 font-medium"
            >
              + Add Header
            </button>
          </div>
        </div>

        {selectedMethod !== "GET" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Request Body (JSON)
            </label>
            <textarea
              {...register("body", {
                validate: value => {
                  if (!value) return true;
                  try {
                    JSON.parse(value);
                    return true;
                  } catch {
                    return "Invalid JSON format";
                  }
                }
              })}
              rows={6}
              className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono text-sm"
              placeholder='{"key": "value"}'
            />
            {errors.body && (
              <p className="mt-1 text-sm text-red-600">{errors.body.message}</p>
            )}
          </div>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200 ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Sending...' : 'Send Request'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestForm;