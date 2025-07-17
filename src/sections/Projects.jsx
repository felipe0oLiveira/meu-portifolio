import { useState } from "react";
import Project from "../components/Project";
import { myProjects } from "../constants";
import { useMotionValue, useSpring } from "motion/react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
const Projects = () => {
  const { t } = useTranslation();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 10, stiffness: 50 });
  const springY = useSpring(y, { damping: 10, stiffness: 50 });
  const handleMouseMove = (e) => {
    x.set(e.clientX + 20);
    y.set(e.clientY + 20);
  };
  const [preview, setPreview] = useState(null);
  // Scroll reveal
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
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
      className="relative c-space"
    >
      <h2 className="text-heading mt-12">{t('projects.title', 'My Selected Projects')}</h2>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-4 h-[1px] w-full" />
      {myProjects.map((project) => (
        <Project key={project.id} {...project} setPreview={setPreview} />
      ))}
      {preview && (
        <motion.img
          className="fixed top-0 left-0 z-50 object-cover h-56 rounded-lg shadow-lg pointer-events-none w-80"
          src={preview}
          style={{ x: springX, y: springY }}
        />
      )}
    </motion.section>
  );
};

export default Projects;
