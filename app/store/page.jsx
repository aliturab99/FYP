"use client"
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const products = [
  {
    id: 1,
    name: "Cough Syrup",
    price: 20.00,
    image: "/cough_syrup.jpg",
    link: "https://buy.stripe.com/test_5kA9CJaNm6t84pycMM",
    category: "medications"
  },
  {
    id: 2,
    name: "Cotton Roll",
    price: 25.00,
    image: "/cotton_roll.jpg",
    link: "https://buy.stripe.com/test_3cs6qx08I3gW3lu5kl",
    category: "medical-supplies"
  },
  {
    id: 3,
    name: "Gauze Pads",
    price: 30.00,
    image: "/gauze_pads.jpg",
    link: "https://buy.stripe.com/test_5kA4ip8Fe8Bg4py5km",
    category: "medical-supplies"
  },
  {
    id: 4,
    name: "Digital Thermometer",
    price: 15.00,
    image: "/thermometer.jpg",
    link: "https://buy.stripe.com/test_aEU7uB9Ji6t8e088wz",
    category: "devices"
  },
  {
    id: 5,
    name: "Band-Aids",
    price: 18.00,
    image: "/band-aids.jpg",
    link: "https://buy.stripe.com/test_00g2ahbRq9Fk5tC3cg",
    category: "first-aid"
  },
  {
    id: 6,
    name: "Antiseptic Cream",
    price: 22.00,
    image: "/antiseptic_cream.jpg",
    link: "https://buy.stripe.com/test_fZeeX34oYdVAg8gaEJ",
    category: "first-aid"
  },
  {
    id: 7,
    name: "Hand Sanitizer",
    price: 19.00,
    image: "/sanitizer.jpg",
    link: "https://buy.stripe.com/test_14k5mtf3C18O8FO8wC",
    category: "hygiene"
  },
  {
    id: 8,
    name: "Face Masks",
    price: 28.00,
    image: "/face_mask.jpg",
    link: "https://buy.stripe.com/test_7sI4ip3kU7xc09ibIP",
    category: "hygiene"
  },
  {
    id: 9,
    name: "Disposable Gloves",
    price: 21.00,
    image: "/gloves.jpg",
    link: "https://buy.stripe.com/test_eVabKR5t28Bg5tCcMU",
    category: "medical-supplies"
  },
  {
    id: 10,
    name: "Infant Formula",
    price: 26.00,
    image: "/baby_formula.jpg",
    link: "https://buy.stripe.com/test_14k5mt4oY8BgcW4fZ7",
    category: "baby-care"
  },
  {
    id: 11,
    name: "Nebulizer",
    price: 32.00,
    image: "/nebulizer.jpg",
    link: "https://buy.stripe.com/test_3csg178FebNsg8g28i",
    category: "devices"
  },
  {
    id: 12,
    name: "Electrolyte Sachets",
    price: 29.00,
    image: "/electrolyte.jpg",
    link: "https://buy.stripe.com/test_9AQ2ah8Fe6t84pyaEP",
    category: "medications"
  },
  {
    id: 13,
    name: "Throat Lozenges",
    price: 23.00,
    image: "/lozenges.jpg",
    link: "https://buy.stripe.com/test_eVag171cMg3I3lu5kw",
    category: "medications"
  },
  {
    id: 14,
    name: "Hot Water Bag",
    price: 24.00,
    image: "/hot_bottle.jpg",
    link: "https://buy.stripe.com/test_4gw6qx3kU9Fk6xGbIV",
    category: "first-aid"
  },
  {
    id: 15,
    name: "Baby Wipes",
    price: 17.00,
    image: "/baby_wipes.jpg",
    link: "https://buy.stripe.com/test_3csbKR4oY8Bg7BK8wK",
    category: "baby-care"
  },
  {
    id: 16,
    name: "Pulse Oximeter",
    price: 27.00,
    image: "/oximeter.jpg",
    link: "https://buy.stripe.com/test_9AQ6qx5t2dVA09i4gv",
    category: "devices"
  },
  {
    id: 17,
    name: "Blood Pressure Monitor",
    price: 34.00,
    image: "/BP.jpg",
    link: "https://buy.stripe.com/test_14kcOVf3C8BgbS05kA",
    category: "devices"
  },
  {
    id: 18,
    name: "Blood Glucose Meter",
    price: 31.00,
    image: "/glucose.jpg",
    link: "https://buy.stripe.com/test_bIYbKRf3CdVA7BK00h",
    category: "devices"
  },
  {
    id: 19,
    name: "Iron Syrup",
    price: 20.00,
    image: "/iron_syrup.jpg",
    link: "https://buy.stripe.com/test_8wMg178Fe04K3ludR8",
    category: "medications"
  },
  {
    id: 20,
    name: "Probiotic Capsules",
    price: 30.00,
    image: "/probiotic.jpg",
    link: "https://buy.stripe.com/test_9AQbKR08IaJo6xG9AT",
    category: "medications"
  }
];

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'medications', name: 'Medications' },
  { id: 'medical-supplies', name: 'Medical Supplies' },
  { id: 'devices', name: 'Medical Devices' },
  { id: 'first-aid', name: 'First Aid' },
  { id: 'hygiene', name: 'Hygiene Products' },
  { id: 'baby-care', name: 'Baby Care' }
];

const Page = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  // Use useEffect to set document title
  useEffect(() => {
    document.title = "medMagic - Store";
  }, []);

  return (
    <>
      <Head>
        <meta name="description" content="All products you need at your doorstep" />
      </Head>
      
      <section id="products" className="bg-gradient-to-br from-[#1a1a1a] via-gray-900 to-[#1a1a1a] text-white min-h-screen py-16 px-6">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Medical Store
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our comprehensive collection of premium medical supplies, powered by AI recommendations
            </p>
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${activeCategory === category.id 
                  ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-lg transform scale-105' 
                  : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#333] hover:text-white border border-gray-600'}`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 shadow-xl hover:shadow-emerald-700/30 transition-all duration-300 hover:-translate-y-3 group flex flex-col overflow-hidden min-h-[370px] animate-fade-in"
              >
                {/* Price badge */}
                <span className="absolute top-4 right-4 z-10 bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg border border-white/20">
                  ${product.price.toFixed(2)}
                </span>
                <div className="relative h-44 w-full flex-shrink-0 overflow-hidden">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full group-hover:scale-110 transition-transform duration-500 rounded-t-3xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                </div>
                <div className="flex-1 flex flex-col justify-between p-7 gap-4">
                  <div>
                    <h4 className="font-semibold text-xl mb-1 text-white group-hover:text-emerald-400 transition-colors truncate tracking-tight">
                      {product.name}
                    </h4>
                  </div>
                  <Link href={product.link}>
                    <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-5 py-3 rounded-2xl hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 font-semibold shadow hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:ring-offset-2 text-base group/button">
                      <svg className="w-5 h-5 text-white group-hover/button:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 007.48 19h8.96a2 2 0 001.83-1.3L21 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7" /></svg>
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="mb-6">
                <svg className="w-16 h-16 text-gray-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-400 mb-2">No Products Found</h3>
              <p className="text-xl text-gray-500">No products found in this category. Try selecting a different category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Page