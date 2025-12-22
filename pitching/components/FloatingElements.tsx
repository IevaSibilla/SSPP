import React from 'react';
import { motion } from 'framer-motion';

export const FloatingElements: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Red Swoosh Top Right */}
        <motion.svg
          className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] opacity-10 text-brand-red"
          viewBox="0 0 200 200"
          animate={{
             rotate: [0, 10, -5, 0],
             scale: [1, 1.05, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        >
            <path fill="currentColor" d="M45,-76.2C58.9,-69.3,71.2,-59.1,79.8,-46.8C88.4,-34.5,93.3,-20.1,91.8,-6.2C90.3,7.7,82.4,21.1,72.8,32.3C63.2,43.5,51.9,52.5,40.4,59.3C28.9,66.1,17.2,70.7,5.1,71.9C-7,73.1,-19.5,70.9,-31.6,65.6C-43.7,60.3,-55.4,51.9,-64.7,41.1C-74,30.3,-80.9,17.1,-82.1,3.4C-83.3,-10.3,-78.8,-24.5,-70.5,-36.2C-62.2,-47.9,-50.1,-57.1,-37.2,-64.5C-24.3,-71.9,-10.6,-77.5,1.9,-78C14.4,-78.5,28.8,-74,45,-76.2Z" transform="translate(100 100)" />
        </motion.svg>

        {/* Gray Blob Bottom Left */}
        <motion.svg
          className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] opacity-5 text-brand-dark"
          viewBox="0 0 200 200"
          animate={{
             rotate: [0, -15, 5, 0],
             translateY: [0, -20, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
            <path fill="currentColor" d="M38.1,-63.9C49.6,-59.3,59.3,-49.6,68.1,-38.7C76.9,-27.8,84.9,-15.7,83.9,-4.1C82.9,7.5,72.9,18.6,63.1,28.6C53.3,38.6,43.7,47.5,33.1,55.1C22.5,62.7,10.9,69,0.3,68.5C-10.3,68,-22.9,60.7,-34.9,53.4C-46.9,46.1,-58.3,38.8,-66.4,28.7C-74.5,18.6,-79.3,5.7,-77.3,-6.2C-75.3,-18.1,-66.5,-29,-56.9,-38.2C-47.3,-47.4,-36.9,-54.9,-26.1,-60.1C-15.3,-65.3,-4.1,-68.2,5.7,-77.1L15.5,-86.1" transform="translate(100 100)" />
        </motion.svg>
    </div>
  );
};