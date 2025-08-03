import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Code, 
  Briefcase, 
  GraduationCap, 
  FolderOpen, 
  Mail,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

const NavigationSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sections = [
    { id: "hero", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Code },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed left-4 top-1/2 -translate-y-1/2 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="ghost"
          size="icon"
          className="rounded-full border border-border/50 bg-background/80 backdrop-blur-sm hover:bg-accent"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </motion.div>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-4 top-1/2 -translate-y-1/2 z-40 w-64 bg-background/95 backdrop-blur-md border border-border/50 rounded-lg shadow-2xl p-4"
          >
            <h3 className="text-lg font-semibold text-primary mb-4">Navigation</h3>
            <nav className="space-y-2">
              {sections.map((section, index) => (
                <motion.button
                  key={section.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(section.id)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg hover:bg-accent transition-colors group"
                >
                  <section.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-sm font-medium">{section.label}</span>
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavigationSidebar;