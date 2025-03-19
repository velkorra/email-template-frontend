interface TemplateCardProps {
  image: string;
  title: string;
  description?: string;
  onClick?: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ image, title, description, onClick }) => {
  return (
    <div className="template-card">
      <img src={image} alt={title} />
      <div className="title">{title}</div>
    </div>
  );
};

export default TemplateCard;
