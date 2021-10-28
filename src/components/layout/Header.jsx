import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-b from-green-500 to-green-700 px-4">
      <nav className="flex justify-between">
        <div className="text-2xl font-medium tracking-wide leading-relaxed text-blue-100">
          LengaburuGov
        </div>
        <div className="text-blue-100">
          <a
            href="https://www.geektrust.in/coding-problem/frontend/space"
            target="_blank"
            rel="noreferrer"
          >
            About Mission
          </a>
          <a href="https://www.shippit.com/" target="_blank" rel="noreferrer">
            Shipping
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
