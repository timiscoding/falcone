import React from 'react';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';

const Page = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-300">
      <Header />
      <Content>{children}</Content>
      <Footer />
    </div>
  );
};

export default Page;
