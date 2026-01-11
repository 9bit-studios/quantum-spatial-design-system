/**
 * Hero Layout Component
 * 
 * A responsive hero section layout for marketing and landing pages.
 * Automatically adapts to the current design state and device capabilities.
 */

import * as React from "react";
import { motion } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";
import { useQuantumSpatial } from "../quantum-spatial-auto-importer";

interface HeroLayoutProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  textColor?: string;
  buttonText?: string;
  buttonLink?: string;
  alignment: "left" | "center" | "right";
  height: number | string;
  overlayOpacity: number;
  withGrid: boolean;
  withParticles: boolean;
  withQuantumEffects: boolean;
  width: number | string;
  children: React.ReactNode;
}

export function HeroLayout({
  title = "Welcome to Quantum-Spatial Design",
  subtitle = "A next-generation design system optimized for M4 processors",
  backgroundImage = "",
  backgroundColor = "",
  textColor = "",
  buttonText = "Get Started",
  buttonLink = "#",
  alignment = "center",
  height = "80vh",
  overlayOpacity = 0.5,
  withGrid = true,
  withParticles = true,
  withQuantumEffects = true,
  width = "100%",
  children,
  ...props
}: HeroLayoutProps) {
  // Access design system context
  const { tokens, designState, deviceInfo } = useQuantumSpatial();

  // Apply M4 optimizations if device supports them
  const useM4Features = deviceInfo?.isM4Detected || false;
  
  // Reference for particle container
  const particlesRef = React.useRef(null);
  
  // Early fallback if tokens aren't loaded
  if (!tokens) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
          padding: "24px",
          textAlign: "center",
          fontFamily: "system-ui, sans-serif",
          backgroundColor: "#0D0D15"
        }}
      >
        <h1 style={{ color: "#FFFFFF" }}>{title}</h1>
        {subtitle && <p style={{ color: "#FFFFFF" }}>{subtitle}</p>}
        {children}
      </div>
    );
  }

  // Text alignment based on prop
  const getAlignment = () => {
    return alignment === "left" 
      ? "flex-start" 
      : alignment === "right" 
        ? "flex-end" 
        : "center";
  };

  // Text alignment for content
  const textAlign = alignment;
  
  // Get colors
  const bgColor = backgroundColor || (
    designState === "heritage"
      ? "#F5F5F5"
      : designState === "transitional"
        ? "#F8F9FA"
        : tokens.colors.primary
  );
  
  const txtColor = textColor || (
    designState === "heritage" || designState === "transitional"
      ? "#333333"
      : "#FFFFFF"
  );
  
  // Set up particle animation effect
  React.useEffect(() => {
    if (!useM4Features || !withParticles || !particlesRef.current) {
      return;
    }
    
    // Simple particle animation using canvas
    // This would be replaced with a more sophisticated implementation in production
    const canvas = particlesRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    
    // Set canvas size
    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      }
    };
    
    // Create particles
    const particles = [];
    const particleCount = 50;
    
    const createParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1,
          color: tokens.colors.accent,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25
        });
      }
    };
    
    // Animate particles
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Boundary checking
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    // Initialize
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    createParticles();
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [useM4Features, withParticles, tokens, designState]);

  // Button animations
  const buttonVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.5 } },
    hover: { 
      scale: 1.05, 
      boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 0 16px rgba(90, 200, 250, 0.4)"
    },
    tap: { 
      scale: 0.95, 
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        overflow: "hidden"
      }}
      {...props}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: bgColor,
          background: backgroundImage
            ? `url(${backgroundImage})`
            : designState === "superposition" && useM4Features
              ? `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.secondary})`
              : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0
        }}
      />
      
      {/* Overlay */}
      {backgroundImage && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
            zIndex: 1
          }}
        />
      )}
      
      {/* Grid background */}
      {withGrid && (designState === "quantum" || designState === "superposition") && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: 
              designState === "superposition" && useM4Features
                ? `radial-gradient(${tokens.colors.accent}30 1px, transparent 1px)`
                : `linear-gradient(${tokens.colors.accent}20 1px, transparent 1px),
                   linear-gradient(to right, ${tokens.colors.accent}20 1px, transparent 1px)`,
            backgroundSize: 
              designState === "superposition" && useM4Features
                ? "32px 32px"
                : "32px 32px",
            opacity: 0.5,
            zIndex: 2
          }}
        />
      )}
      
      {/* Particles (M4-optimized devices only) */}
      {useM4Features && withParticles && designState === "superposition" && (
        <canvas
          ref={particlesRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 3,
            pointerEvents: "none"
          }}
        />
      )}
      
      {/* Content */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: getAlignment(),
          textAlign: textAlign,
          width: "100%",
          height: "100%",
          padding: tokens.spacing.xl,
          zIndex: 4
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            style={{
              fontSize: useM4Features ? "5rem" : "4rem",
              fontWeight: "bold",
              marginBottom: tokens.spacing.md,
              color: txtColor,
              maxWidth: "800px",
              textShadow: 
                designState === "heritage"
                  ? "none"
                  : useM4Features
                    ? "0 0 20px rgba(0,0,0,0.3)"
                    : "0 2px 10px rgba(0,0,0,0.2)"
            }}
          >
            {title}
          </h1>
        </motion.div>
        
        {subtitle && (
          <motion.h2
            style={{
              fontSize: useM4Features ? "2rem" : "1.5rem",
              marginBottom: tokens.spacing.lg,
              color: txtColor,
              opacity: 0.9,
              maxWidth: "700px",
              fontWeight: 400
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {subtitle}
          </motion.h2>
        )}
        
        {buttonText && (
          <motion.div 
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
          >
            <a
              href={buttonLink}
              style={{
                display: "inline-block",
                backgroundColor: tokens.colors.accent,
                color: "#FFFFFF",
                padding: "12px 32px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: tokens.typography.sizes?.md,
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                cursor: "pointer"
              }}
            >
              {buttonText}
            </a>
          </motion.div>
        )}
        
        <motion.div
          style={{ marginTop: tokens.spacing.lg }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {children}
        </motion.div>
      </div>
      
      {/* Optional quantum effects (glowing accent at bottom of screen) */}
      {withQuantumEffects && (designState === "quantum" || designState === "superposition") && useM4Features && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "60%",
            height: "3px",
            background: tokens.colors.accent,
            boxShadow: `0 0 20px 5px ${tokens.colors.accent}`,
            borderRadius: "3px",
            zIndex: 5
          }}
        />
      )}
    </div>
  );
}

// Framer property controls
addPropertyControls(HeroLayout, {
  title: {
    type: ControlType.String,
    title: "Title",
    defaultValue: "Welcome to Quantum-Spatial Design"
  },
  subtitle: {
    type: ControlType.String,
    title: "Subtitle",
    defaultValue: "A next-generation design system optimized for M4 processors"
  },
  backgroundImage: {
    type: ControlType.Image,
    title: "Background Image"
  },
  backgroundColor: {
    type: ControlType.Color,
    title: "Background Color",
    defaultValue: ""
  },
  textColor: {
    type: ControlType.Color,
    title: "Text Color",
    defaultValue: ""
  },
  buttonText: {
    type: ControlType.String,
    title: "Button Text",
    defaultValue: "Get Started"
  },
  buttonLink: {
    type: ControlType.String,
    title: "Button Link",
    defaultValue: "#"
  },
  alignment: {
    type: ControlType.Enum,
    title: "Alignment",
    options: ["left", "center", "right"],
    defaultValue: "center"
  },
  height: {
    type: ControlType.NumberOrString,
    title: "Height",
    defaultValue: "80vh"
  },
  overlayOpacity: {
    type: ControlType.Number,
    title: "Overlay Opacity",
    defaultValue: 0.5,
    min: 0,
    max: 1,
    step: 0.1,
    displayStepper: true,
    hidden(props) { return !props.backgroundImage }
  },
  withGrid: {
    type: ControlType.Boolean,
    title: "Show Grid",
    defaultValue: true
  },
  withParticles: {
    type: ControlType.Boolean,
    title: "Show Particles",
    defaultValue: true
  },
  withQuantumEffects: {
    type: ControlType.Boolean,
    title: "Quantum Effects",
    defaultValue: true
  },
  width: {
    type: ControlType.NumberOrString,
    title: "Width",
    defaultValue: "100%"
  }
});

export default HeroLayout;