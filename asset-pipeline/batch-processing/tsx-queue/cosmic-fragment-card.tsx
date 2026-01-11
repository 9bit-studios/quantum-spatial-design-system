import React, { useState, useEffect } from 'react';
import { ChevronRight, Zap, Box, Layers } from 'lucide-react';

export default function CosmicFragmentCard({ fragment, onActivate, status }) {
  // Fragment status options: 'inactive', 'awaiting', 'active', 'mastered'
  
  // Energy particle animation
  const particleCount = 20;
  const particles = Array.from({ length: particleCount });
  
  return (
    <div 
      className={`relative overflow-hidden rounded-xl border transition-all duration-500 ${
        status === 'inactive' 
          ? 'border-[#331F4A] bg-[#0D0D15] shadow-sm' 
          : status === 'awaiting' 
          ? 'border-[#5AC8FA] bg-[#131A36] shadow-md hover:shadow-[0_0_25px_rgba(90,200,250,0.3)]' 
          : status === 'active' 
          ? 'border-[#BF4080] bg-[#131A36] shadow-lg hover:shadow-[0_0_25px_rgba(191,64,128,0.3)]' 
          : 'border-[#6A3093] bg-[#131A36] shadow-xl hover:shadow-[0_0_25px_rgba(106,48,147,0.4)]'
      }`}
    >
      {/* Background grid with perspective */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: 'linear-gradient(rgba(90, 200, 250, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(90, 200, 250, 0.05) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          perspectiveOrigin: 'center',
          transform: 'perspective(1000px) rotateX(30deg)',
          opacity: status === 'inactive' ? 0.05 : 0.15,
          transition: 'opacity 0.5s ease-in-out'
        }}
      ></div>
      
      {/* Energy particles */}
      {status !== 'inactive' && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          {particles.map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#5AC8FA] opacity-0"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: '0 0 4px 1px rgba(90, 200, 250, 0.5)',
                animation: `float-up ${3 + Math.random() * 4}s linear infinite ${Math.random() * 5}s`,
                opacity: status === 'inactive' ? 0 : Math.random() * 0.5,
              }}
            ></div>
          ))}
        </div>
      )}

      <div className="relative z-10 p-6 h-full flex flex-col">
        {/* Fragment Icon */}
        <div 
          className={`w-12 h-12 mb-4 rounded-lg flex items-center justify-center ${
            status === 'inactive' 
              ? 'bg-[#131A36] text-[#331F4A]' 
              : status === 'awaiting' 
              ? 'bg-[#131A36] text-[#5AC8FA]' 
              : status === 'active' 
              ? 'bg-[#131A36] text-[#BF4080]' 
              : 'bg-[#131A36] text-[#6A3093]'
          }`}
        >
          {fragment.icon}
        </div>
        
        {/* Fragment Title */}
        <h3 
          className={`text-xl font-bold mb-2 ${
            status === 'inactive' 
              ? 'text-gray-500'
              : status === 'awaiting' 
              ? 'text-[#5AC8FA]' 
              : status === 'active' 
              ? 'text-[#BF4080]' 
              : 'text-[#6A3093]'
          }`}
        >
          {fragment.title}
        </h3>
        
        {/* Fragment Description */}
        <p className={`text-sm mb-6 flex-grow ${
          status === 'inactive' ? 'text-gray-600' : 'text-gray-300'
        }`}>
          {fragment.description}
        </p>
        
        {/* Activation Button */}
        <div className="mt-auto">
          {status === 'inactive' && (
            <button 
              className="w-full px-4 py-2 bg-[#131A36] text-[#331F4A] rounded cursor-not-allowed border border-[#331F4A] opacity-50"
              disabled
            >
              Locked
            </button>
          )}
          
          {status === 'awaiting' && (
            <button 
              className="w-full px-4 py-2 bg-[#131A36] hover:bg-[#1E1F5C] text-[#5AC8FA] rounded transition-all border border-[#5AC8FA] hover:shadow-[0_0_10px_rgba(90,200,250,0.3)]"
              onClick={() => onActivate(fragment.id)}
            >
              Activate
            </button>
          )}
          
          {status === 'active' && (
            <button 
              className="w-full px-4 py-2 bg-[#131A36] hover:bg-[#1E1F5C] text-[#BF4080] rounded transition-all border border-[#BF4080] hover:shadow-[0_0_10px_rgba(191,64,128,0.3)]"
              onClick={() => onActivate(fragment.id)}
            >
              Use Power
            </button>
          )}
          
          {status === 'mastered' && (
            <button 
              className="w-full px-4 py-2 bg-[#131A36] hover:bg-[#1E1F5C] text-[#6A3093] rounded transition-all border border-[#6A3093] hover:shadow-[0_0_10px_rgba(106,48,147,0.3)]"
              onClick={() => onActivate(fragment.id)}
            >
              Master Command
            </button>
          )}
        </div>
        
        {/* Status Indicator */}
        <div className="absolute top-3 right-3">
          {status === 'awaiting' && (
            <div className="w-3 h-3 rounded-full bg-[#5AC8FA] animate-pulse"></div>
          )}
          {status === 'active' && (
            <div className="w-3 h-3 rounded-full bg-[#BF4080] animate-pulse"></div>
          )}
          {status === 'mastered' && (
            <div className="w-3 h-3 rounded-full bg-[#6A3093]">
              <div className="w-full h-full rounded-full bg-[#6A3093] animate-ping"></div>
            </div>
          )}
        </div>
      </div>
      
      {/* Energy glow effect for active and mastered states */}
      {(status === 'active' || status === 'mastered') && (
        <div 
          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-40 h-40 rounded-full opacity-20"
          style={{
            background: status === 'active' 
              ? 'radial-gradient(circle, rgba(191,64,128,0.8) 0%, rgba(191,64,128,0) 70%)' 
              : 'radial-gradient(circle, rgba(106,48,147,0.8) 0%, rgba(106,48,147,0) 70%)',
            animation: 'pulse-slow 4s infinite'
          }}
        ></div>
      )}
    </div>
  );
}