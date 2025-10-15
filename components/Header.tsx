
import React from 'react';

interface HeaderProps {
  name: string;
  title: string;
  avatarUrl: string;
}

const Header: React.FC<HeaderProps> = ({ name, title, avatarUrl }) => {
  return (
    <header className="relative mb-24">
      <div className="h-48 w-full">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-1/2 -left-1/4 w-full h-full bg-brand-teal transform -rotate-12 origin-top-left"></div>
          <div className="absolute -top-1/2 left-1/4 w-full h-full bg-brand-orange transform -rotate-12 origin-top-left"></div>
        </div>
      </div>
      <div className="absolute -bottom-16 left-8">
        <div className="relative">
          <img
            src={avatarUrl || 'https://via.placeholder.com/150'}
            alt={name}
            className="w-36 h-36 rounded-full border-4 border-white bg-white shadow-lg"
          />
        </div>
      </div>
      <div className="absolute top-full mt-4 left-8">
        <h1 className="text-4xl font-bold text-notion-text">{title} - {name}</h1>
      </div>
    </header>
  );
};

export default Header;
