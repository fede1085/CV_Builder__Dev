
import React, { useState, useEffect } from 'react';
import { initialProfileData } from './data/initialData';
import type { ProfileData } from './types';
import Header from './components/Header';
import Section from './components/Section';
import Accordion from './components/Accordion';
import EditorPanel from './components/EditorPanel';
import DownloadPdfButton from './components/DownloadPdfButton';
import { MailIcon, PhoneIcon, HandshakeIcon, DocumentIcon, GraduationCapIcon, ChatBubbleIcon, LocationIcon, BriefcaseIcon, StarIcon, ReferenceIcon, EditIcon, ViewIcon } from './components/Icons';

// Custom hook for using localStorage
const useLocalStorage = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

const App: React.FC = () => {
  const [profileData, setProfileData] = useLocalStorage<ProfileData>('profileData', initialProfileData);
  const [isEditMode, setIsEditMode] = useState(true);

  return (
    <div className={`font-sans transition-all duration-300 ${isEditMode ? 'grid grid-cols-1 lg:grid-cols-[1fr_400px]' : ''}`}>
      <main id="cv-content" className="max-w-4xl mx-auto px-4 sm:px-8 py-8 text-notion-text">
        <Header 
          name={profileData.name} 
          title={profileData.title} 
          avatarUrl={profileData.avatarUrl}
        />
        
        <div className="mt-8">
          <div className="bg-gray-100/80 p-4 rounded-lg text-sm flex items-center gap-3">
            <span className="text-xl">📍</span>
            <span>{profileData.availability}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-sm">
            <div className="border border-notion-divider rounded-lg p-3 flex items-center gap-3">
              <MailIcon className="w-5 h-5 text-notion-gray" />
              <span>{profileData.email}</span>
            </div>
            <div className="border border-notion-divider rounded-lg p-3 flex items-center gap-3">
              <PhoneIcon className="w-5 h-5 text-notion-gray" />
              <span>{profileData.phone}</span>
            </div>
          </div>

          <Section title="Overzicht" icon={<HandshakeIcon />}>
            <p className="text-notion-text leading-relaxed">{profileData.overview}</p>
          </Section>

          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-x-16 gap-y-8">
            <div className="flex flex-col gap-8">
              <Section title="Ervaring" icon={<DocumentIcon />}>
                 <p className="text-notion-gray text-sm -mt-2 mb-4">klik om te openen</p>
                {profileData.experience.map((exp) => (
                  <Accordion 
                    key={exp.id} 
                    title={exp.role} 
                    subtitle={`${exp.company} (${exp.location}) - ${exp.dates}`}
                    isContract={exp.isContract}
                    description={exp.description}
                  />
                ))}
              </Section>

              <Section title="Onderwijs" icon={<GraduationCapIcon />}>
                <ul className="list-disc pl-5 space-y-2">
                  {profileData.education.map((edu, index) => (
                    <li key={index}>
                      <span className="font-semibold">{edu.institution}</span> - {edu.degree} ({edu.location}) <span className="text-notion-gray">{edu.status}</span>
                    </li>
                  ))}
                </ul>
              </Section>
              
              <Section title="Talen" icon={<ChatBubbleIcon />}>
                <ul className="space-y-3">
                  {profileData.languages.map((lang, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <span className="text-xl">{lang.flag}</span>
                      <span className="font-semibold">{lang.name}</span>
                      <span className="text-notion-gray">({lang.level})</span>
                    </li>
                  ))}
                </ul>
              </Section>
            </div>

            <div className="flex flex-col gap-8">
              <Section title="Contactgegevens" icon={<LocationIcon />}>
                <div className="space-y-2 text-sm">
                  <p><span className="font-semibold">Adres:</span> {profileData.contactDetails.address}</p>
                  <p><span className="font-semibold">Nationaliteit:</span> {profileData.contactDetails.nationality}</p>
                  <p><span className="font-semibold">Relatiestatus:</span> {profileData.contactDetails.status}</p>
                </div>
              </Section>

              <Section title="Kerncompetenties" icon={<StarIcon />}>
                <ul className="list-disc pl-5 space-y-1">
                  {profileData.coreCompetencies.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </Section>

              <Section title="Referenties" icon={<ReferenceIcon />}>
                <p className="text-notion-text">{profileData.references}</p>
              </Section>
            </div>
          </div>
        </div>
      </main>
      
      {isEditMode && (
          <EditorPanel 
            data={profileData}
            setData={setProfileData}
            onClose={() => setIsEditMode(false)}
          />
      )}

      {!isEditMode && (
        <DownloadPdfButton 
          rootElementId="cv-content"
          fileName={`CV-${profileData.name.replace(/\s/g, '-')}`}
          toggleButtonId="toggle-edit-button"
        />
      )}

      <button
        id="toggle-edit-button"
        onClick={() => setIsEditMode(!isEditMode)}
        className="fixed bottom-6 right-6 bg-notion-text text-white p-4 rounded-full shadow-lg hover:bg-opacity-80 transition-all duration-200 z-50"
        aria-label={isEditMode ? "Close editor" : "Open editor"}
      >
        {isEditMode ? <ViewIcon className="w-6 h-6" /> : <EditIcon className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default App;