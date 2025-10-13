import React from "react";
import { motion, AnimatePresence } from "motion/react";

const Modal = ({ Message, bgColor, show }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }} // Start hidden below
          animate={{ opacity: 1, y: 0 }} // Slide up + fade in
          exit={{ opacity: 0, y: 50 }} // Slide down + fade out
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`${bgColor} text-richBlack fixed bottom-4 right-4 p-4 rounded z-10 shadow`}
        >
          <p>{Message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
