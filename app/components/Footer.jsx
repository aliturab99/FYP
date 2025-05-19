import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white p-4"> 
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} medMagic. All rights reserved.</p>
        <p>Scan to access on phone</p>
        <center>
        <Image src={"/frame.svg"} alt="Bar code" width={150} height={150}/>
        </center>
        </div>
    </footer>
  );
};

export default Footer;