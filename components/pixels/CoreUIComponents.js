import { jsx as _jsx } from "react/jsx-runtime";
import { useDesignSystem } from './DesignSystemProvider';
export const Button = ({ variant = 'primary', children, onClick, disabled, style = {}, ...props }) => {
    const { styles } = useDesignSystem();
    const buttonStyle = {
        ...styles.button[variant],
        ...style,
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
    };
    return (_jsx("button", { style: buttonStyle, onClick: disabled ? undefined : onClick, disabled: disabled, onMouseEnter: (e) => {
            if (!disabled) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = styles.button[variant].boxShadow.replace('0.2', '0.4');
            }
        }, onMouseLeave: (e) => {
            if (!disabled) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = styles.button[variant].boxShadow;
            }
        }, ...props, children: children }));
};
export const Card = ({ variant = 'default', children, style = {}, ...props }) => {
    const { styles } = useDesignSystem();
    return (_jsx("div", { style: { ...styles.card[variant], ...style }, ...props, children: children }));
};
export const Container = ({ children, style = {}, ...props }) => {
    const { styles } = useDesignSystem();
    return (_jsx("div", { style: { ...styles.layout.container, ...style }, ...props, children: children }));
};
export const Grid = ({ columns = 'repeat(auto-fit, minmax(300px, 1fr))', children, style = {}, ...props }) => {
    const { styles } = useDesignSystem();
    return (_jsx("div", { style: {
            ...styles.layout.grid,
            gridTemplateColumns: columns,
            ...style
        }, ...props, children: children }));
};
export const Flex = ({ direction = 'row', align = 'center', justify = 'flex-start', children, style = {}, ...props }) => {
    const { styles } = useDesignSystem();
    return (_jsx("div", { style: {
            ...styles.layout.flex,
            flexDirection: direction,
            alignItems: align,
            justifyContent: justify,
            ...style
        }, ...props, children: children }));
};
//# sourceMappingURL=CoreUIComponents.js.map