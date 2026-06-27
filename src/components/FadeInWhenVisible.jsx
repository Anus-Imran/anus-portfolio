import { motion } from 'framer-motion';

const FadeInWhenVisible = ({ children, delay = 0, duration = 0.5, yOffset = 50, once = true, amount = 0.3 }) => {
    const variants = {
        hidden: { opacity: 0, y: yOffset },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay,
                duration,
                ease: "easeOut",
            },
        },
    };

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount }}
            style={{ width: '100%' }} // Ensure it takes full width for proper layout
        >
            {children}
        </motion.div>
    );
};

export default FadeInWhenVisible;