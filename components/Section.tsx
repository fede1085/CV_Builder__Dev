
import React from 'react';

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, icon, children }) => {
  return (
    <section className="mt-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-xl font-semibold text-notion-text">{title}</h2>
      </div>
      <div className="pl-1 border-l-2 border-notion-divider ml-3">
        <div className="pl-7">
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;
