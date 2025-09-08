import React from 'react';
import { motion } from 'framer-motion';
import useSceneControls from '../store/useSceneControls';

const Text = () => {
  const { textVisible } = useSceneControls();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: textVisible ? 1 : 0, y: textVisible ? 0 : 20 }}
      transition={{ duration: 0.5 }}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl"
      style={{ zIndex: 999 }}
    >
      <p>Este es un texto que aparece y desaparece</p>
    </motion.div>
  );
};

export default Text;