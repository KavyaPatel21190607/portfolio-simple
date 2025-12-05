import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { testimonialsAPI } from '../services/api';

export function Testimonials() {
  const [testimonialsData, setTestimonialsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonialsData = async () => {
      try {
        const response = await testimonialsAPI.get();
        setTestimonialsData(response.data);
      } catch (error) {
        console.error('Error fetching testimonials data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonialsData();
  }, []);

  const nextTestimonial = () => {
    if (testimonialsData?.testimonials) {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.testimonials.length);
    }
  };

  const prevTestimonial = () => {
    if (testimonialsData?.testimonials) {
      setCurrentIndex((prev) => (prev - 1 + testimonialsData.testimonials.length) % testimonialsData.testimonials.length);
    }
  };

  if (loading) {
    return (
      <section id="testimonials" className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-gray-600">Loading...</div>
        </div>
      </section>
    );
  }

  if (!testimonialsData || !testimonialsData.testimonials?.length) return null;

  const currentTestimonial = testimonialsData.testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-gray-900 mb-4">{testimonialsData.title}</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            {testimonialsData.subtitle}
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg">
            <Quote className="w-12 h-12 text-blue-600 mb-6 opacity-50" />
            
            <p className="text-gray-700 mb-8 text-lg leading-relaxed">
              {currentTestimonial.text}
            </p>
            
            <div className="flex items-center gap-4">
              <ImageWithFallback
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h4 className="text-gray-900">{currentTestimonial.name}</h4>
                <p className="text-gray-600">
                  {currentTestimonial.role} at {currentTestimonial.company}
                </p>
              </div>
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110 flex items-center justify-center text-gray-700 hover:text-blue-600"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonialsData.testimonials.map((_: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex ? 'bg-blue-600 w-8' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110 flex items-center justify-center text-gray-700 hover:text-blue-600"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* All Testimonials Grid (Small Cards) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {testimonialsData.testimonials.map((testimonial: any, index: number) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`bg-white p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                index === currentIndex
                  ? 'shadow-lg scale-105 border-2 border-blue-600'
                  : 'shadow-sm hover:shadow-md hover:scale-105'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <ImageWithFallback
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h5 className="text-gray-900">{testimonial.name}</h5>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm line-clamp-3">
                {testimonial.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
