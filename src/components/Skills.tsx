import React, { useState, useEffect } from 'react';
import { Code, Palette, Database, Zap, Globe, Smartphone } from 'lucide-react';
import { skillsAPI } from '../services/api';

const iconMap: any = {
  Code,
  Palette,
  Database,
  Zap,
  Globe,
  Smartphone,
};

export function Skills() {
  const [skillsData, setSkillsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const response = await skillsAPI.get();
        setSkillsData(response.data);
      } catch (error) {
        console.error('Error fetching skills data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkillsData();
  }, []);

  if (loading) {
    return (
      <section id="skills" className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-gray-600">Loading...</div>
        </div>
      </section>
    );
  }

  if (!skillsData) return null;

  return (
    <section id="skills" className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-gray-900 mb-4">{skillsData.title}</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            {skillsData.subtitle}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skillsData.skillCategories?.map((category: any, index: number) => {
            const Icon = iconMap[category.icon] || Code;
            return (
              <div 
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-gray-900">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills?.map((skill: string, idx: number) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h3 className="text-gray-900 mb-6">Proficiency Levels</h3>
          <div className="space-y-4">
            {skillsData.proficiencySkills?.map((skill: any, index: number) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">{skill.name}</span>
                  <span className="text-blue-600">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
