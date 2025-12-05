import React, { useState, useEffect } from 'react';
import { Code, Palette, Smartphone, Globe, Database, Zap } from 'lucide-react';
import { servicesAPI } from '../services/api';

const iconMap: any = {
  Code,
  Palette,
  Smartphone,
  Globe,
  Database,
  Zap,
};

export function Services() {
  const [servicesData, setServicesData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const response = await servicesAPI.get();
        setServicesData(response.data);
      } catch (error) {
        console.error('Error fetching services data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServicesData();
  }, []);

  if (loading) {
    return (
      <section id="services" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-gray-600">Loading...</div>
        </div>
      </section>
    );
  }

  if (!servicesData) return null;

  return (
    <section id="services" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-gray-900 mb-4">{servicesData.title}</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            {servicesData.subtitle}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.services?.map((service: any, index: number) => {
            const Icon = iconMap[service.icon] || Code;
            return (
              <div 
                key={index}
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                <a 
                  href={service.link}
                  className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-2 group-hover:gap-3 transition-all"
                >
                  Learn More
                  <span>→</span>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
