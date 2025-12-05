import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { contactAPI } from '../services/api';

const iconMap: any = {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
};

export function Contact() {
  const [contactData, setContactData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await contactAPI.get();
        setContactData(response.data);
      } catch (error) {
        console.error('Error fetching contact data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await contactAPI.submit(formData);
      console.log('Form submitted:', formData);
      setFormData({ name: '', email: '', subject: '', message: '' });
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-gray-600">Loading...</div>
        </div>
      </section>
    );
  }

  if (!contactData) return null;

  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-gray-900 mb-4">{contactData.title}</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            {contactData.subtitle}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {contactData.contactInfo?.map((info: any, index: number) => {
            const Icon = iconMap[info.icon] || Mail;
            return (
              <a
                key={index}
                href={info.link}
                className="bg-white p-6 rounded-2xl text-center hover:shadow-lg transition-all duration-300 hover:scale-105 group"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                  <Icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-gray-900 mb-2">{info.title}</h4>
                <p className="text-gray-600">{info.value}</p>
              </a>
            );
          })}
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h3 className="text-gray-900 mb-6">Send Me a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {contactData.form?.fields?.map((field: any, index: number) => (
                <div key={index}>
                  <label htmlFor={field.name} className="block text-gray-700 mb-2">
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      required={field.required}
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors resize-none"
                      placeholder={field.placeholder}
                    />
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      required={field.required}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}
              
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 group"
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                {contactData.form?.submitButton?.text || 'Send Message'}
              </button>
            </form>
          </div>
          
          {/* Map & Additional Info */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-lg">
              <h3 className="text-gray-900 mb-4">Let&apos;s Connect</h3>
              <p className="text-gray-600 mb-6">
                {contactData.additionalInfo?.introText}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span>{contactData.additionalInfo?.responseTime}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span>{contactData.additionalInfo?.availability}</span>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-gray-900 mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  {contactData.socialLinks?.map((social: any, index: number) => {
                    const Icon = iconMap[social.icon] || Github;
                    return (
                      <a
                        key={index}
                        href={social.link}
                        className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all hover:scale-110"
                        aria-label={social.platform}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Map Placeholder */}
            <div className="bg-white p-4 rounded-3xl shadow-lg h-64">
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                  <p className="text-gray-600">{contactData.map?.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
