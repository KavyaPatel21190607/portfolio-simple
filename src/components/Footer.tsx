import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';
import { footerAPI } from '../services/api';

const iconMap: any = {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Heart,
};

export function Footer() {
  const [footerData, setFooterData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await footerAPI.get();
        setFooterData(response.data);
      } catch (error) {
        console.error('Error fetching footer data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  if (loading || !footerData) {
    return (
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <div className="text-gray-600">Loading...</div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-gray-900 mb-4">{footerData.brand?.name}</h3>
            <p className="text-gray-600 mb-4">
              {footerData.brand?.description}
            </p>
            <div className="flex gap-3">
              {footerData.socialLinks?.map((social: any, index: number) => {
                const Icon = iconMap[social.icon] || Mail;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.platform}
                    className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all hover:scale-110"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerData.quickLinks?.slice(0, 4).map((link: any, index: number) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* More Links */}
          <div>
            <h4 className="text-gray-900 mb-4">More</h4>
            <ul className="space-y-2">
              {footerData.quickLinks?.slice(4).map((link: any, index: number) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 flex items-center gap-2">
              {footerData.bottomBar?.text}
              {footerData.bottomBar?.heartIcon && (
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              )}
            </p>
            <div className="flex gap-6">
              {footerData.bottomBar?.links?.map((link: any, index: number) => (
                <a 
                  key={index}
                  href={link.href} 
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
