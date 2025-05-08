import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-#1a1a1a text-white py-6"> 
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} medMagic. All rights reserved.</p>
        </div>
    </footer>
  );
};

export default Footer;