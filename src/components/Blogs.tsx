import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { blogsAPI } from '../services/api';

export function Blogs() {
  const [blogsData, setBlogsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogsData = async () => {
      try {
        const response = await blogsAPI.get();
        setBlogsData(response.data);
      } catch (error) {
        console.error('Error fetching blogs data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogsData();
  }, []);

  if (loading) {
    return (
      <section id="blogs" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-gray-600">Loading...</div>
        </div>
      </section>
    );
  }

  if (!blogsData) return null;

  return (
    <section id="blogs" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-gray-900 mb-4">{blogsData.title}</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            {blogsData.subtitle}
          </p>
        </div>
        
        {/* Featured Blog */}
        {blogsData.featuredBlog && (
          <div className="mb-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="h-64 md:h-auto">
                <ImageWithFallback
                  src={blogsData.featuredBlog.image}
                  alt={blogsData.featuredBlog.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 bg-blue-600 text-white rounded-full text-sm w-fit mb-4">
                  Featured Post
                </span>
                <h3 className="text-gray-900 mb-4">{blogsData.featuredBlog.title}</h3>
                <p className="text-gray-600 mb-6">{blogsData.featuredBlog.excerpt}</p>
                <div className="flex items-center gap-4 text-gray-600 mb-6">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {blogsData.featuredBlog.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {blogsData.featuredBlog.readTime}
                  </span>
                </div>
                <a 
                  href={blogsData.featuredBlog.link || '#'}
                  className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-2 group"
                >
                  Read More
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        )}
        
        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogsData.blogs?.map((blog: any, index: number) => (
            <article 
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {blog.category && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
                    {blog.category}
                  </span>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-gray-600 text-sm mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {blog.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {blog.readTime}
                  </span>
                </div>
                
                <h3 className="text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                
                <a 
                  href={blog.link || '#'}
                  className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-2 group/link"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
