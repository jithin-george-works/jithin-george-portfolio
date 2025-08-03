import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPinIcon } from "lucide-react";

const Experience = () => {
  const experience = {
    title: "Associate Consultant",
    company: "Gapblue Software Labs Pvt Ltd",
    location: "Kerala",
    period: "2023 - Present",
    achievements: [
      "Engineered scalable backend systems using Python and Node.js, optimizing API performance by 40% and supporting multiple AI solutions.",
      "Integrated GPT models with vector databases (Weaviate, Qdrant) using LangChain and LlamaIndex, achieving 30% faster intelligent search and retrieval.",
      "Built end-to-end RAG pipelines, batch processing tools (folder upload, scraping, chart generation), and custom APIs that boosted data handling efficiency by 45%.",
      "Led development of Knowledge Explorer, a multilingual AI search tool leveraging Azure OpenAI and Translator Services, with fuzzy glossary support for domain-specific queries.",
      "Delivered 3+ enterprise-grade AI applications in agile teams, contributing to on-time and high impact client deployments."
    ]
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Work Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary opacity-50"></div>
          
          <Card className="ml-16 hover:shadow-2xl transition-all duration-500 border-l-4 border-l-primary">
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl font-bold text-primary mb-2">
                    {experience.title}
                  </CardTitle>
                  <h3 className="text-xl font-semibold text-foreground">
                    {experience.company}
                  </h3>
                </div>
                <div className="flex flex-col md:items-end gap-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarIcon className="h-4 w-4" />
                    <span className="text-sm">{experience.period}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPinIcon className="h-4 w-4" />
                    <span className="text-sm">{experience.location}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {experience.achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground leading-relaxed">
                      {achievement}
                    </p>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 flex flex-wrap gap-2">
                {["Python", "Node.js", "LangChain", "LlamaIndex", "Vector DBs", "RAG", "Azure OpenAI", "Agile"].map((tech) => (
                  <Badge key={tech} variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <motion.div
            className="absolute left-6 top-8 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;