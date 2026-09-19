import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { BlogDetailModal } from '../components/BlogDetailModal';
import { BookOpen, Calendar, User, ArrowRight } from 'lucide-react';

export const BlogsView: React.FC = () => {
  const { blogs, selectedBlog, setSelectedBlog } = useStore();
  const publishedBlogs = blogs.filter((b) => b.status === 'published');
  const [filterCat, setFilterCat] = useState('All');

  const categories = ['All', 'Sports Science', 'Injury Prevention', 'Maintenance', 'Academy & Clubs'];

  const filtered = publishedBlogs.filter((b) => {
    if (filterCat !== 'All' && b.category !== filterCat) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Title */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-white/30 text-white text-xs font-bold font-heading">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Articles, News & Gear Maintenance</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-heading">
          TS SPORTS PERFORMANCE BLOG
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl">
          Explore expert insight into sports biomechanics, friction elimination science, gear maintenance tips, and academy squad announcements.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-slate-800">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCat(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              filterCat === cat
                ? 'bg-white text-slate-950 font-heading shadow-md shadow-white/10'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((blog) => (
          <div
            key={blog.id}
            onClick={() => setSelectedBlog(blog)}
            className="glass-card rounded-3xl overflow-hidden cursor-pointer flex flex-col justify-between group hover:border-white/50 transition-all duration-300"
          >
            <div className="aspect-[16/9] bg-slate-900 overflow-hidden relative">
              <img
                src={blog.image || '/hero-collage.jpg'}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-white text-slate-950 font-heading">
                {blog.category}
              </div>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-white" />
                  <span>{blog.publishedAt}</span>
                  <span>•</span>
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>{blog.author}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-white transition-colors font-heading leading-snug">
                  {blog.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {blog.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-white font-heading">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reader Modal */}
      {selectedBlog && (
        <BlogDetailModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
      )}

    </div>
  );
};
