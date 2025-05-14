"use client"
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

function PatientDataForm() {
  const [state, handleSubmit] = useForm("xovdyewp");
  
  if (state.succeeded) {
    return (
      <div className="max-w-md mx-auto p-6 rounded-lg bg-[#1a1a1a] text-center">
        <p className="text-xl text-green-400 font-medium mb-2">Patient data submitted successfully!</p>
        <p className="text-gray-300">Thank you for your submission.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-lg bg-[#1a1a1a] shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-white">Patient Data Collection</h2>
      
      <form action={"https://formspree.io/f/xovdyewp"} method='POST' className="space-y-4">
        <div>
          <label htmlFor="patientName" className="block text-sm font-medium text-gray-300 mb-1">
            Full Name
          </label>
          <input
            id="patientName"
            type="text" 
            name="patientName"
            required
            className="w-full px-4 py-2 rounded-md bg-[#2a2a2a] border border-[#333] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ValidationError 
            prefix="Name" 
            field="patientName"
            errors={state.errors}
            className="text-red-400 text-sm mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-1">
              Age
            </label>
            <input
              id="age"
              type="number"
              name="age"
              min="0"
              max="120"
              required
              className="w-full px-4 py-2 rounded-md bg-[#2a2a2a] border border-[#333] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ValidationError 
              prefix="Age" 
              field="age"
              errors={state.errors}
              className="text-red-400 text-sm mt-1"
            />
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-300 mb-1">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              required
              className="w-full px-4 py-2 rounded-md bg-[#2a2a2a] border border-[#333] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
            <ValidationError 
              prefix="Gender" 
              field="gender"
              errors={state.errors}
              className="text-red-400 text-sm mt-1"
            />
          </div>
        </div>

        <div>
          <label htmlFor="medicalCondition" className="block text-sm font-medium text-gray-300 mb-1">
            Medical Condition
          </label>
          <input
            id="medicalCondition"
            type="text"
            name="medicalCondition"
            required
            className="w-full px-4 py-2 rounded-md bg-[#2a2a2a] border border-[#333] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ValidationError 
            prefix="Medical Condition" 
            field="medicalCondition"
            errors={state.errors}
            className="text-red-400 text-sm mt-1"
          />
        </div>

        <div>
          <label htmlFor="symptoms" className="block text-sm font-medium text-gray-300 mb-1">
            Symptoms
          </label>
          <textarea
            id="symptoms"
            name="symptoms"
            rows="4"
            required
            className="w-full px-4 py-2 rounded-md bg-[#2a2a2a] border border-[#333] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ValidationError 
            prefix="Symptoms" 
            field="symptoms"
            errors={state.errors}
            className="text-red-400 text-sm mt-1"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={state.submitting}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {state.submitting ? 'Submitting...' : 'Submit Patient Data'}
          </button>
        </div>
      </form>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-[#121212] p-6">
      <PatientDataForm />
    </div>
  );
}

export default App;