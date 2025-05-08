"use client";
import { useState } from 'react';
import { Fondamento } from 'next/font/google';

const fonda = Fondamento({
  subsets: ["latin"],
  weight: "400"
});

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState({
    height: '',
    weight: ''
  });

  const validateInput = (value, type) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      return 'Please enter a valid number';
    }
    if (type === 'height') {
      if (numValue <= 0) return 'Height must be greater than zero';
      if (numValue > 300) return 'Height seems unrealistic (max 300cm)';
    }
    if (type === 'weight') {
      if (numValue < 20) return 'Weight must be at least 20kg';
      if (numValue > 500) return 'Weight seems unrealistic (max 500kg)';
    }
    return '';
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    
    const heightError = validateInput(height, 'height');
    const weightError = validateInput(weight, 'weight');
    
    setErrors({
      height: heightError,
      weight: weightError
    });

    if (heightError || weightError) {
      setBmi(null);
      setCategory('');
      return;
    }

    const heightInMeters = parseFloat(height) / 100;
    const calculatedBmi = parseFloat(weight) / (heightInMeters * heightInMeters);
    setBmi(parseFloat(calculatedBmi.toFixed(1)));

    if (calculatedBmi < 18.5) {
      setCategory('Underweight');
    } else if (calculatedBmi >= 18.5 && calculatedBmi < 25) {
      setCategory('Normal weight');
    } else if (calculatedBmi >= 25 && calculatedBmi < 30) {
      setCategory('Overweight');
    } else {
      setCategory('Obese');
    }
  };

  const handleReset = () => {
    setHeight('');
    setWeight('');
    setBmi(null);
    setCategory('');
    setErrors({ height: '', weight: '' });
  };

  const getCategoryColor = () => {
    if (!category) return '';
    if (category === 'Underweight') return 'bg-blue-400/20 text-blue-400';
    if (category === 'Normal weight') return 'bg-emerald-400/20 text-emerald-400';
    if (category === 'Overweight') return 'bg-yellow-400/20 text-yellow-400';
    return 'bg-red-400/20 text-red-400';
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto p-6 bg-[#1a1a1a] rounded-2xl shadow-xl overflow-hidden border border-gray-800">
      {/* Dark-themed background elements */}
      <div className='absolute inset-0 opacity-20'>
        <div className='absolute top-20 left-20 w-40 h-40 rounded-full bg-emerald-900/50 filter blur-3xl'></div>
        <div className='absolute bottom-10 right-32 w-60 h-60 rounded-full bg-gray-800 filter blur-3xl'></div>
        <div className='absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-gray-700/50 filter blur-2xl'></div>
      </div>
      
      <div className="relative z-10 text-center">
        <h2 className={`text-2xl sm:text-3xl font-bold text-white ${fonda.className}`}>BMI Calculator</h2>
        <p className="text-gray-400 mb-6">Check your body mass index</p>
      </div>
      
      <form onSubmit={handleCalculate} className="relative z-10 space-y-4">
        <div className="space-y-2">
          <label htmlFor="height" className="block text-sm font-medium text-gray-300">
            Height (cm)
          </label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter your height"
            className={`w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
              errors.height ? 'border-red-400 focus:ring-red-400/50' : ''
            }`}
          />
          {errors.height && (
            <p className="mt-1 text-sm text-red-400">{errors.height}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="weight" className="block text-sm font-medium text-gray-300">
            Weight (kg)
          </label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight (min 20kg)"
            className={`w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
              errors.weight ? 'border-red-400 focus:ring-red-400/50' : ''
            }`}
          />
          {errors.weight && (
            <p className="mt-1 text-sm text-red-400">{errors.weight}</p>
          )}
        </div>
        
        <div className="flex space-x-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Calculate BMI
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 border-2 border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Reset
          </button>
        </div>
      </form>
      
      {bmi !== null && (
        <div className="relative z-10 mt-6 p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 space-y-4 animate-fade-in">
          <h3 className="text-xl font-semibold text-white">Your Results</h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-300">BMI:</span>
            <strong className="text-3xl font-bold text-white">{bmi}</strong>
          </div>
          <div className={`px-4 py-3 rounded-lg text-center font-medium ${getCategoryColor()} border border-current`}>
            {category}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Underweight</span>
              <span>Normal</span>
              <span>Overweight</span>
              <span>Obese</span>
            </div>
            <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden">
              <div className="absolute inset-0 flex">
                <div className={`h-full w-1/4 ${bmi < 18.5 ? 'bg-blue-500' : 'bg-blue-900/50'}`}></div>
                <div className={`h-full w-1/4 ${
                  bmi >= 18.5 && bmi < 25 ? 'bg-emerald-500' : 'bg-emerald-900/50'
                }`}></div>
                <div className={`h-full w-1/4 ${
                  bmi >= 25 && bmi < 30 ? 'bg-yellow-500' : 'bg-yellow-900/50'
                }`}></div>
                <div className={`h-full w-1/4 ${
                  bmi >= 30 ? 'bg-red-500' : 'bg-red-900/50'
                }`}></div>
              </div>
              <div 
                className="absolute top-0 h-full w-1 bg-gray-300"
                style={{
                  left: `${Math.min(Math.max((bmi / 40) * 100, 2.5), 97.5)}%`
                }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>&lt; 18.5</span>
              <span>18.5 - 24.9</span>
              <span>25 - 29.9</span>
              <span>≥ 30</span>
            </div>
          </div>

          {bmi >= 25 && (
            <div className="mt-4 p-4 bg-gray-800/70 rounded-lg border border-gray-700">
              <h4 className="font-bold text-emerald-400 mb-3">Tips for Healthy Weight Loss:</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 text-xl">🍎</span>
                  <p>Increase <span className="font-semibold text-white">protein & fiber</span> intake to stay full longer</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 text-xl">🚶</span>
                  <p>Aim for <span className="font-semibold text-white">10,000 steps daily</span> to burn calories</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 text-xl">💤</span>
                  <p>Get <span className="font-semibold text-white">7-9 hours</span> of quality sleep nightly</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 text-xl">🏋️</span>
                  <p>Include <span className="font-semibold text-white">strength training</span> 2-3x/week</p>
                </li>
              </ul>
              <p className="mt-4 text-sm text-gray-400">
                <span className="font-semibold text-emerald-400">Healthy goal:</span> Aim for 1-2 lbs (0.5-1 kg) weight loss per week.
              </p>
              <p className="mt-2 text-xs text-gray-500">
                Always consult a doctor before starting a new diet/exercise plan.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BMICalculator;