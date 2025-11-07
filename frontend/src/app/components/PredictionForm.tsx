'use client';

import React, { useState } from 'react';
import { predictData } from '../services/api';

export function PredictionForm() {
  const [features, setFeatures] = useState<string>('');
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const featureArray = features.split(',').map(Number);
      const result = await predictData(featureArray);
      setPrediction(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="features" className="block text-sm font-medium text-gray-700">
            Enter features (comma-separated numbers):
          </label>
          <input
            type="text"
            id="features"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="1,2,3,4"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? 'Predicting...' : 'Predict'}
        </button>
      </form>
      
      {error && (
        <div className="mt-4 text-red-600">
          {error}
        </div>
      )}
      
      {prediction && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-900">Prediction Result:</h3>
          <p className="mt-2 text-sm text-gray-600">
            Prediction: {prediction.prediction}
            <br />
            Probability: {(prediction.probability * 100).toFixed(2)}%
          </p>
        </div>
      )}
    </div>
  );
}