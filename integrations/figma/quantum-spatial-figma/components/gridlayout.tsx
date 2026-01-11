import { motion } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";
import { palette, spacing, typography } from "./quantum-tokens";

export default function GridLayout(props) {
  const { 
    columns = 3,
    gap = spacing.lg,
    title = "Grid Layout",
    items = 6
  } = props;

  const gridItems = Array.from({ length: items }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    description: `This is grid item ${i + 1}`
  }));

  return (
    <div style={{
      padding: spacing.xl,
      background: palette.voidBlack,
      minHeight: '100vh'
    }}>
      <motion.h1
        style={{
          ...typography.h1,
          color: 'white',
          marginBottom: spacing.xl,
          textAlign: 'center'
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {title}
      </motion.h1>
      
      <motion.div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: gap,
          maxWidth: '1200px',
          margin: '0 auto'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {gridItems.map((item, index) => (
          <motion.div
            key={item.id}
            style={{
              background: palette.dimensionalEggplant,
              border: `1px solid ${palette.subtleCyan}30`,
              borderRadius: '12px',
              padding: spacing.lg,
              color: 'white'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.02,
              borderColor: palette.subtleCyan 
            }}
          >
            <h3 style={{
              ...typography.h2,
              fontSize: '1.25rem',
              marginBottom: spacing.sm,
              color: palette.subtleCyan
            }}>
              {item.title}
            </h3>
            <p style={{
              ...typography.body,
              opacity: 0.8,
              margin: 0
            }}>
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

addPropertyControls(GridLayout, {
  title: { type: ControlType.String, defaultValue: "Grid Layout" },
  columns: { type: ControlType.Number, defaultValue: 3, min: 1, max: 6 },
  items: { type: ControlType.Number, defaultValue: 6, min: 1, max: 12 },
  gap: { 
    type: ControlType.Enum,
    options: [spacing.sm, spacing.md, spacing.lg, spacing.xl],
    defaultValue: spacing.lg
  }
});