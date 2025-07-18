import { FlipWords } from "./FlipWords";
import { motion } from "motion/react";
import { useTranslation } from 'react-i18next';

const HeroText = () => {
  const { t } = useTranslation();
  const words = t('hero.words', { returnObjects: true }) || ["Security", "Modern", "Scalable"];
  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <div className="z-10 mt-16 sm:mt-20 text-center md:mt-40 md:text-left rounded-3xl bg-clip-text px-4 md:px-0">
      {/* Desktop View */}
      <div className="flex-col hidden md:flex c-space">
        <motion.h1
          className="text-4xl font-medium"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          {t('hero.title', "Hi, I'm Jonathas Felipe")}
        </motion.h1>
        <div className="flex flex-col items-start">
          <motion.p
            className="text-4xl font-medium text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
          >
            {t('hero.subtitle', 'Developer Full Stack')} <br /> {t('hero.subtitle2', 'Building Systems from Ideas')}
          </motion.p>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
          >
            <FlipWords
              words={words}
              className="font-black text-white text-8xl"
            />
          </motion.div>
          <motion.p
            className="text-4xl font-medium text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8 }}
          >
            {t('hero.cta', 'Code-Driven Solutions')}
          </motion.p>
        </div>
      </div>
      {/* Mobile View */}
      <div className="flex flex-col space-y-4 md:hidden">
        <motion.p
          className="text-2xl sm:text-3xl font-medium"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          {t('hero.title', "Hi, I'm Jonathas Felipe")}
        </motion.p>
        <div>
          <motion.p
            className="text-3xl sm:text-4xl font-black text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
          >
            {t('hero.mobile1', 'Developing')}
          </motion.p>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
          >
            <FlipWords
              words={words}
              className="font-bold text-white text-5xl sm:text-6xl"
            />
          </motion.div>
          <motion.p
            className="text-3xl sm:text-4xl font-black text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8 }}
          >
            {t('hero.mobile2', 'Software Solutions')}
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default HeroText;
