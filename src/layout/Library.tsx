import LibrarySection from "../components/LibrarySection";
import TemplateCard from "../components/TemplateCard";
import TemplateGrid from "../components/TemplateGrid";

const Library: React.FC = () => {
  return (
    <>
      <LibrarySection title="Базовые шаблоны">
        <TemplateGrid>
          <TemplateCard image="/letter.png" title="Letter"></TemplateCard>
          <TemplateCard image="/letter.png" title="Letter"></TemplateCard>
          <TemplateCard image="/letter.png" title="Letter"></TemplateCard>
          <TemplateCard image="/letter.png" title="Letter"></TemplateCard>
          <TemplateCard image="/letter.png" title="Letter"></TemplateCard>
        </TemplateGrid>
      </LibrarySection>
      <LibrarySection title="Открытки">
        <TemplateGrid>
          <TemplateCard image="/letter.png" title="Letter"></TemplateCard>
          <TemplateCard image="/letter.png" title="Letter"></TemplateCard>
          <TemplateCard image="/letter.png" title="Letter"></TemplateCard>
          <TemplateCard image="/letter.png" title="Letter"></TemplateCard>
          <TemplateCard image="/letter.png" title="Letter"></TemplateCard>
          <TemplateCard image="/letter.png" title="Letter"></TemplateCard>
          <TemplateCard image="/letter.png" title="Letter"></TemplateCard>
          <TemplateCard image="/letter.png" title="Letter"></TemplateCard>
          <TemplateCard image="/letter.png" title="Letter"></TemplateCard>
          <TemplateCard image="/letter.png" title="Letter"></TemplateCard>
          <TemplateCard image="/letter.png" title="Letter"></TemplateCard>
        </TemplateGrid>
      </LibrarySection>
    </>
  );
};

export default Library;
