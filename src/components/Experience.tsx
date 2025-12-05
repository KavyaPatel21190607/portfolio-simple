import React, { useState, useEffect } from 'react';
import { Briefcase } from 'lucide-react';
import { experienceAPI } from '../services/api';

export function Experience() {
  const [experienceData, setExperienceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        const response = await experienceAPI.get();
        setExperienceData(response.data);
      } catch (error) {
        console.error('Error fetching experience data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperienceData();
  }, []);

  if (loading) {
    return (
      <section id="experience" className="py-20 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-gray-600">Loading...</div>
        </div>
      </section>
    );
  }

  if (!experienceData) return null;

  return (
    <section id="experience" className="py-20 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-gray-900 mb-4">{experienceData.title}</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            {experienceData.subtitle}
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-blue-200"></div>
          
          <div className="space-y-12">
            {experienceData.experiences?.map((exp: any, index: number) => (
              <div 
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                
                {/* Content */}
                <div className={`ml-20 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <span className="text-blue-600">{exp.year}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-gray-900 mb-1">{exp.role}</h3>
                    <p className="text-gray-700 mb-4">{exp.company}</p>
                    
                    <ul className="space-y-2">
                      {exp.responsibilities?.map((resp: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
