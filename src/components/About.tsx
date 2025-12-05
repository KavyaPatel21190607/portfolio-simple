import React, { useState, useEffect } from 'react';
import { Users, Briefcase, Award, Coffee } from 'lucide-react';
import { aboutAPI } from '../services/api';

const iconMap: any = {
  Briefcase,
  Users,
  Award,
  Coffee,
};

export function About() {
  const [aboutData, setAboutData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await aboutAPI.get();
        setAboutData(response.data);
      } catch (error) {
        console.error('Error fetching about data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-gray-600">Loading...</div>
        </div>
      </section>
    );
  }

  if (!aboutData) return null;

  return (
    <section id="about" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-gray-900 mb-4">{aboutData.title}</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-4">
            <h3 className="text-gray-900">Hello! I&apos;m {aboutData.name}</h3>
            {aboutData.bio?.map((paragraph: string, index: number) => (
              <p key={index} className="text-gray-600">
                {paragraph}
              </p>
            ))}
          </div>
          
          <div className="space-y-3">
            {aboutData.highlights?.map((highlight: string, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-gray-600">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {aboutData.stats?.map((stat: any, index: number) => {
            const Icon = iconMap[stat.icon] || Briefcase;
            return (
              <div 
                key={index}
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                {/* Display uploaded image icon if available */}
                {stat.iconImage ? (
                  <img 
                    src={stat.iconImage} 
                    alt={stat.label}
                    className="w-12 h-12 mx-auto mb-3 object-contain"
                  />
                ) : stat.icon && !iconMap[stat.icon] ? (
                  // Display emoji or text icon
                  <div className="text-4xl mx-auto mb-3">{stat.icon}</div>
                ) : (
                  // Display Lucide icon as fallback
                  <Icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                )}
                <div className="text-gray-900 mb-1">{stat.value}</div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
