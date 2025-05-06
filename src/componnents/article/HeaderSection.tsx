// components/article/HeaderSection.tsx
import { motion } from 'framer-motion';
import SearchComponent from './SearchComponnent';


interface HeaderSectionProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const HeaderSection = ({ 
  searchTerm, 
  onSearchChange 
}: HeaderSectionProps) => (
  <>
    <motion.h1 
      className="text-3xl font-bold mb-8 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Latest Articles
    </motion.h1>
    <div style={{ overflow: "hidden" }}>
      <SearchComponent 
        value={searchTerm} 
        onChange={onSearchChange}
      />
    </div>
  </>
);