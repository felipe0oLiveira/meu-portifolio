import { useState, useEffect, useRef } from "react";
import Project from "../components/Project";
import { myProjects } from "../constants";
import { useMotionValue, useSpring } from "motion/react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from 'react-i18next';

const isMobile = () => typeof window !== 'undefined' && window.innerWidth <= 853;

const Projects = () => {
  const { t } = useTranslation();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 10, stiffness: 50 });
  const springY = useSpring(y, { damping: 10, stiffness: 50 });
  const [preview, setPreview] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const timeoutRef = useRef(null);
  // Scroll reveal
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Centralizar e animar preview no mobile
  useEffect(() => {
    if (preview && isMobile()) {
      setShowPreview(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setShowPreview(false);
        setPreview(null);
      }, 5000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [preview]);

  const handleMouseMove = (e) => {
    if (!isMobile()) {
      x.set(e.clientX + 20);
      y.set(e.clientY + 20);
    }
  };

  const handleTouchMove = (e) => {
    if (!isMobile()) return;
    if (e.touches[0]) {
      x.set(e.touches[0].clientX + 20);
      y.set(e.touches[0].clientY + 20);
    }
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 60 },
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      id="projects"
      onMouseMove={handleMouseMove}
      // Remover onTouchMove para mobile, pois não é necessário
      className="relative c-space"
    >
      <h2 className="text-heading mt-8 sm:mt-12 px-4 sm:px-0">{t('projects.title', 'My Selected Projects')}</h2>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-4 h-[1px] w-full mx-4 sm:mx-0" />
      {myProjects.map((project) => (
        <Project key={project.id} {...project} setPreview={setPreview} />
      ))}
      {/* Preview da imagem */}
      {preview && (
        isMobile() ? (
          <motion.img
            key="mobile-preview"
            className="fixed z-50 object-cover rounded-lg shadow-lg pointer-events-none"
            src={preview}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: showPreview ? 1 : 0, scale: showPreview ? 1 : 0.8 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '30%',
              width: '60vw',
              height: '30vh',
              maxWidth: 250,
              maxHeight: 180,
              transform: 'translate(-50%, -50%)',
              objectFit: 'cover',
            }}
          />
        ) : (
          <motion.img
            key="desktop-preview"
            className="fixed top-0 left-0 z-50 object-cover h-56 rounded-lg shadow-lg pointer-events-none w-80"
            src={preview}
            style={{ x: springX, y: springY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )
      )}
    </motion.section>
  );
};

export default Projects;
