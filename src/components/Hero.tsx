import React, { useState, useEffect } from 'react';
import { Download, Mail } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { heroAPI } from '../services/api';

export function Hero() {
  const [heroData, setHeroData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await heroAPI.get();
        setHeroData(response.data);
      } catch (error) {
        console.error('Error fetching hero data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-gray-600">Loading...</div>
      </section>
    );
  }

  if (!heroData) return null;

  return (
    <section className={`min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br ${heroData.background?.gradient || 'from-blue-50 via-white to-purple-50'}`}>
      <div className="max-w-7xl w-full mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-blue-600">{heroData.greeting}</p>
              <h1 className="text-gray-900">{heroData.name}</h1>
              <h2 className="text-gray-700">{heroData.role}</h2>
            </div>
            
            <p className="text-gray-600 max-w-xl">
              {heroData.bio}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              {heroData.ctaButtons?.map((button: any, index: number) => {
                const Icon = button.icon === 'Mail' ? Mail : Download;
                return (
                  <a
                    key={index}
                    href={button.link}
                    className={`px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2 ${
                      button.type === 'primary'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {button.label}
                  </a>
                );
              })}
            </div>
          </div>
          
          {/* Right Image */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600 rounded-2xl transform rotate-6 opacity-10"></div>
              <ImageWithFallback
                src={heroData.heroImage?.src}
                alt={heroData.heroImage?.alt || heroData.name}
                className="relative w-80 h-80 object-cover rounded-2xl shadow-2xl"
              />
              {heroData.heroImage?.experienceLabel && (
                <div className="absolute -bottom-4 -right-4 bg-white px-6 py-3 rounded-lg shadow-lg">
                  <p className="text-blue-600">{heroData.heroImage.experienceLabel}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
