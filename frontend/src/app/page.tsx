import { PredictionForm } from './components/PredictionForm';
import { ChatWidget } from './components/ChatWidget';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 dark:bg-gray-900">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">
          Welcome to NeuroServe
        </h1>
        <p className="text-xl mb-4 text-center text-gray-600 dark:text-gray-300">
          A Next.js + FastAPI ML Application
        </p>
        
        <div className="my-12">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
            Try ML Prediction
          </h2>
          <PredictionForm />
        </div>

        <div className="my-12">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
            Real-time Chat
          </h2>
          <ChatWidget />
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Features:</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
            <li>Machine Learning Predictions</li>
            <li>Real-time WebSocket Updates</li>
            <li>Secure Authentication</li>
            <li>Dark Mode Support</li>
            <li>Kubernetes Deployment Ready</li>
          </ul>
        </div>
      </div>
    </main>
  )
}