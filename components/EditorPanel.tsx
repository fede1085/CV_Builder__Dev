
import React from 'react';
import type { ProfileData, Experience, Education, Language } from '../types';
import { CloseIcon, PlusIcon, TrashIcon } from './Icons';

interface EditorPanelProps {
  data: ProfileData;
  setData: React.Dispatch<React.SetStateAction<ProfileData>>;
  onClose: () => void;
}

const EditorField: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; isTextarea?: boolean }> = ({ label, value, onChange, isTextarea }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
    {isTextarea ? (
      <textarea value={value} onChange={onChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm" rows={4} />
    ) : (
      <input type="text" value={value} onChange={onChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm" />
    )}
  </div>
);

const EditorPanel: React.FC<EditorPanelProps> = ({ data, setData, onClose }) => {
  const handleChange = <K extends keyof ProfileData>(field: K, value: ProfileData[K]) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = <T,>(section: keyof ProfileData, index: number, field: keyof T, value: string | boolean) => {
    const list = data[section] as T[];
    const updatedList = list.map((item, i) => (i === index ? { ...item, [field]: value } : item));
    setData(prev => ({ ...prev, [section]: updatedList }));
  };

  const handleCoreCompetencyChange = (index: number, value: string) => {
    const updatedList = data.coreCompetencies.map((skill, i) => (i === index ? value : skill));
    setData(prev => ({ ...prev, coreCompetencies: updatedList }));
  };

  const handleContactDetailsChange = (field: keyof ProfileData['contactDetails'], value: string) => {
      setData(prev => ({...prev, contactDetails: {...prev.contactDetails, [field]: value}}))
  }

  const handleAddItem = (section: 'experience' | 'education' | 'languages' | 'coreCompetencies') => {
    const newItem = section === 'experience' ? { id: Date.now(), role: '', isContract: false, company: '', location: '', dates: '', description: '' }
                  : section === 'education' ? { institution: '', degree: '', location: '', status: '' }
                  : section === 'languages' ? { flag: '', name: '', level: '' }
                  : '';
    setData(prev => ({ ...prev, [section]: [...(prev[section] as any[]), newItem] }));
  };

  const handleRemoveItem = (section: keyof ProfileData, index: number) => {
    const list = data[section] as any[];
    setData(prev => ({ ...prev, [section]: list.filter((_, i) => i !== index) }));
  };


  return (
    <aside className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out translate-x-0 lg:relative lg:max-w-none">
      <div className="p-6 h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-notion-text">Edit Curriculum</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
            <CloseIcon className="w-6 h-6 text-notion-gray" />
          </button>
        </div>

        {/* General Info */}
        <div className="p-4 border rounded-lg mb-4">
            <h3 className="font-semibold mb-2">General</h3>
            <EditorField label="Title" value={data.title} onChange={e => handleChange('title', e.target.value)} />
            <EditorField label="Name" value={data.name} onChange={e => handleChange('name', e.target.value)} />
            <EditorField label="Avatar URL" value={data.avatarUrl} onChange={e => handleChange('avatarUrl', e.target.value)} />
            <EditorField label="Availability" value={data.availability} onChange={e => handleChange('availability', e.target.value)} />
            <EditorField label="Email" value={data.email} onChange={e => handleChange('email', e.target.value)} />
            <EditorField label="Phone" value={data.phone} onChange={e => handleChange('phone', e.target.value)} />
            <EditorField label="Overview" value={data.overview} onChange={e => handleChange('overview', e.target.value)} isTextarea/>
        </div>

        {/* Experience */}
        <div className="p-4 border rounded-lg mb-4">
            <h3 className="font-semibold mb-2">Experience</h3>
            {data.experience.map((exp, index) => (
                <div key={exp.id} className="p-3 border rounded mb-2 relative">
                    <EditorField label="Role" value={exp.role} onChange={e => handleNestedChange<Experience>('experience', index, 'role', e.target.value)} />
                    <EditorField label="Company" value={exp.company} onChange={e => handleNestedChange<Experience>('experience', index, 'company', e.target.value)} />
                    <EditorField label="Location" value={exp.location} onChange={e => handleNestedChange<Experience>('experience', index, 'location', e.target.value)} />
                    <EditorField label="Dates" value={exp.dates} onChange={e => handleNestedChange<Experience>('experience', index, 'dates', e.target.value)} />
                    <EditorField label="Description" value={exp.description} onChange={e => handleNestedChange<Experience>('experience', index, 'description', e.target.value)} isTextarea />
                     <div className="flex items-center mt-2">
                        <input type="checkbox" checked={exp.isContract} onChange={e => handleNestedChange<Experience>('experience', index, 'isContract', e.target.checked)} id={`isContract-${index}`} className="mr-2"/>
                        <label htmlFor={`isContract-${index}`} className="text-sm">Tijdelijk contract</label>
                    </div>
                    <button onClick={() => handleRemoveItem('experience', index)} className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700"><TrashIcon className="w-4 h-4"/></button>
                </div>
            ))}
            <button onClick={() => handleAddItem('experience')} className="text-sm text-indigo-600 flex items-center gap-1 mt-2"><PlusIcon className="w-4 h-4"/> Add Experience</button>
        </div>
        
        {/* Education */}
        <div className="p-4 border rounded-lg mb-4">
            <h3 className="font-semibold mb-2">Education</h3>
            {data.education.map((edu, index) => (
                <div key={index} className="p-3 border rounded mb-2 relative">
                    <EditorField label="Institution" value={edu.institution} onChange={e => handleNestedChange<Education>('education', index, 'institution', e.target.value)} />
                    <EditorField label="Degree" value={edu.degree} onChange={e => handleNestedChange<Education>('education', index, 'degree', e.target.value)} />
                    <EditorField label="Location" value={edu.location} onChange={e => handleNestedChange<Education>('education', index, 'location', e.target.value)} />
                    <EditorField label="Status" value={edu.status} onChange={e => handleNestedChange<Education>('education', index, 'status', e.target.value)} />
                    <button onClick={() => handleRemoveItem('education', index)} className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700"><TrashIcon className="w-4 h-4"/></button>
                </div>
            ))}
            <button onClick={() => handleAddItem('education')} className="text-sm text-indigo-600 flex items-center gap-1 mt-2"><PlusIcon className="w-4 h-4"/> Add Education</button>
        </div>

        {/* Languages */}
        <div className="p-4 border rounded-lg mb-4">
            <h3 className="font-semibold mb-2">Languages</h3>
            {data.languages.map((lang, index) => (
                <div key={index} className="p-3 border rounded mb-2 relative">
                    <EditorField label="Flag (Emoji)" value={lang.flag} onChange={e => handleNestedChange<Language>('languages', index, 'flag', e.target.value)} />
                    <EditorField label="Name" value={lang.name} onChange={e => handleNestedChange<Language>('languages', index, 'name', e.target.value)} />
                    <EditorField label="Level" value={lang.level} onChange={e => handleNestedChange<Language>('languages', index, 'level', e.target.value)} />
                    <button onClick={() => handleRemoveItem('languages', index)} className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700"><TrashIcon className="w-4 h-4"/></button>
                </div>
            ))}
            <button onClick={() => handleAddItem('languages')} className="text-sm text-indigo-600 flex items-center gap-1 mt-2"><PlusIcon className="w-4 h-4"/> Add Language</button>
        </div>
        
        {/* Contact Details */}
        <div className="p-4 border rounded-lg mb-4">
            <h3 className="font-semibold mb-2">Contact Details</h3>
            <EditorField label="Address" value={data.contactDetails.address} onChange={e => handleContactDetailsChange('address', e.target.value)} />
            <EditorField label="Nationality" value={data.contactDetails.nationality} onChange={e => handleContactDetailsChange('nationality', e.target.value)} />
            <EditorField label="Status" value={data.contactDetails.status} onChange={e => handleContactDetailsChange('status', e.target.value)} />
        </div>

        {/* Core Competencies */}
        <div className="p-4 border rounded-lg mb-4">
            <h3 className="font-semibold mb-2">Core Competencies</h3>
            {data.coreCompetencies.map((skill, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                    <input type="text" value={skill} onChange={e => handleCoreCompetencyChange(index, e.target.value)} className="w-full p-2 border border-gray-300 rounded-md text-sm"/>
                    <button onClick={() => handleRemoveItem('coreCompetencies', index)} className="p-1 text-red-500 hover:text-red-700"><TrashIcon className="w-4 h-4"/></button>
                </div>
            ))}
            <button onClick={() => handleAddItem('coreCompetencies')} className="text-sm text-indigo-600 flex items-center gap-1 mt-2"><PlusIcon className="w-4 h-4"/> Add Competency</button>
        </div>

        {/* References */}
        <div className="p-4 border rounded-lg mb-4">
            <h3 className="font-semibold mb-2">References</h3>
            <EditorField label="Reference Text" value={data.references} onChange={e => handleChange('references', e.target.value)} isTextarea/>
        </div>
      </div>
    </aside>
  );
};

export default EditorPanel;