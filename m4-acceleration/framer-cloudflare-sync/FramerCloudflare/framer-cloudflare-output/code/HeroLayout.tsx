import { motion } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";
import { palette, spacing, typography } from "./quantum-tokens";

export default function HeroLayout(props) {
  const { 
    title = "Quantum-Spatial Experience",
    subtitle = "Building the future of spatial computing",
    ctaText = "Get Started",
    backgroundType = "gradient"
  } = props;

  const backgrounds = {
    gradient: `linear-gradient(135deg, ${palette.deepSpaceIndigo} 0%, ${palette.dimensionalEggplant} 100%)`,
    solid: palette.voidBlack,
    image: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920")'
  };

  return (
    <section style={{
      height: '100vh',
      background: backgrounds[backgroundType],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background particles */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.1,
        background: `radial-gradient(circle at 25% 25%, ${palette.subtleCyan} 0%, transparent 50%),
                    radial-gradient(circle at 75% 75%, ${palette.roseEnergy} 0%, transparent 50%)`
      }} />
      
      <motion.div
        style={{
          textAlign: 'center',
          zIndex: 1,
          maxWidth: '800px',
          padding: spacing.xl
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          style={{
            ...typography.h1,
            fontSize: '4rem',
            marginBottom: spacing.lg,
            background: `linear-gradient(45deg, ${palette.subtleCyan}, ${palette.roseEnergy})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {title}
        </motion.h1>
        
        <motion.p
          style={{
            ...typography.body,
            fontSize: '1.25rem',
            marginBottom: spacing.xl,
            color: palette.subtleCyan,
            opacity: 0.9
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {subtitle}
        </motion.p>
        
        <motion.button
          style={{
            background: `linear-gradient(45deg, ${palette.roseEnergy}, ${palette.dimensionalTeal})`,
            color: 'white',
            border: 'none',
            padding: `${spacing.md} ${spacing.xl}`,
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            fontFamily: typography.body.fontFamily
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {ctaText}
        </motion.button>
      </motion.div>
    </section>
  );
}

addPropertyControls(HeroLayout, {
  title: { type: ControlType.String, defaultValue: "Quantum-Spatial Experience" },
  subtitle: { type: ControlType.String, defaultValue: "Building the future of spatial computing" },
  ctaText: { type: ControlType.String, defaultValue: "Get Started" },
  backgroundType: { 
    type: ControlType.Enum,
    options: ["gradient", "solid", "image"],
    defaultValue: "gradient"
  }
});