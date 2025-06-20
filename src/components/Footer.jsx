import React from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-8 mt-12 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm">
            Built by{' '}
            <a
              href="https://thecma.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-indigo-300 font-medium hover:text-indigo-200 transition-colors"
            >
              CMA <FiExternalLink className="ml-1 w-3 h-3" />
            </a>
          </div>
          
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/chrismat-05/Req-API"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-slate-300 hover:text-white transition-colors"
            >
              <FiGithub className="mr-1.5 w-4 h-4" />
              Star on GitHub
            </a>
            
            <a
              href="https://github.com/chrismat-05/Req-API/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-slate-300 hover:text-white transition-colors"
            >
              Report an Issue
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-800/50 text-xs text-slate-500 text-center">
          © {new Date().getFullYear()} Req API. Open source under MIT license.
        </div>
      </div>
    </footer>
  );
}