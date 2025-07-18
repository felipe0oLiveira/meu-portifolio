import React, { useState } from "react";
import ProjectDetails from "./ProjectDetails";
import { useTranslation } from 'react-i18next';

const Project = ({
  i18nKey,
  href,
  image,
  tags,
  setPreview,
}) => {
  const [isHidden, setIsHidden] = useState(false);
  const { t, i18n } = useTranslation();
  return (
    <>
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-6 sm:py-10 space-y-4 sm:space-y-0 px-4 sm:px-0"
        onMouseEnter={() => setPreview(image)}
        onMouseLeave={() => setPreview(null)}
        onTouchStart={() => setPreview(image)}
        onTouchEnd={() => setTimeout(() => setPreview(null), 2000)}
      >

        
        <div className="w-full sm:w-auto">
          <p className="text-xl sm:text-2xl font-semibold">{t(`projects.${i18nKey}.title`)}</p>
          <div className="flex flex-wrap gap-2 sm:gap-5 mt-2 text-sand text-sm sm:text-base">
            {tags.map((tag) => (
              <span key={tag.id} className="px-2 py-1 bg-gray-800 rounded-md">{tag.name}</span>
            ))}
          </div>

        </div>
        <button
          onClick={() => setIsHidden(true)}
          className="flex items-center gap-1 cursor-pointer hover-animation"
        >
          {t('projects.readMore', 'Read More')}
          <img src="assets/arrow-right.svg" className="w-5" />
        </button>
      </div>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />
      {isHidden && (
        <ProjectDetails
          title={t(`projects.${i18nKey}.title`)}
          description={t(`projects.${i18nKey}.description`)}
          subDescription={t(`projects.${i18nKey}.subDescription`, { returnObjects: true })}
          image={image}
          tags={tags}
          href={href}
          closeModal={() => setIsHidden(false)}
        />
      )}
    </>
  );
};

export default Project;
