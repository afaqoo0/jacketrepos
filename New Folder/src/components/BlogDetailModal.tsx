import React from 'react';
import type { Blog } from '../types';
import { X, Calendar, User, BookOpen } from 'lucide-react';

interface BlogDetailModalProps {
  blog: Blog;
  onClose: () => void;
}

export const BlogDetailModal: React.FC<BlogDetailModalProps> = ({ blog, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl glass-panel rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden text-slate-900 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-slate-950" />
            <span className="text-sm font-bold text-slate-950 uppercase font-heading">{blog.category}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-600 hover:text-white hover:bg-slate-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-6">
          
          {/* Featured Image */}
          {blog.image && (
            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-white border border-slate-200">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Meta Info */}
          <div className="flex items-center space-x-4 text-xs text-slate-600">
            <span className="flex items-center space-x-1.5">
              <Calendar className="w-4 h-4 text-slate-950" />
              <span>{blog.publishedAt}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <User className="w-4 h-4 text-slate-600" />
              <span>By {blog.author}</span>
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-950 font-heading leading-tight">
            {blog.title}
          </h2>

          {/* Summary */}
          <p className="text-sm text-slate-700 leading-relaxed italic border-l-2 border-slate-950 pl-4">
            {blog.summary}
          </p>

          {/* Content */}
          <div className="prose prose-invert prose-sm max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
            {blog.content}
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            Close Article
          </button>
        </div>

      </div>
    </div>
  );
};
