import { useState } from "react";

interface LibrarySectionProps {
    title: string;
    children: React.ReactNode;
}

const LibrarySection: React.FC<LibrarySectionProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true);
  
    const toggleSection = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <section className={`library-section ${isOpen ? "open" : "closed"}`}>
        <div className="section-header" onClick={toggleSection}>
          <span className={`arrow ${isOpen ? "down" : "right"}`}></span>
          <h2 className="title">{title}</h2>
        </div>
        {isOpen && <div className="content">{children}</div>}
      </section>
    );
  };

export default LibrarySection;