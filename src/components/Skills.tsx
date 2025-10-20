import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const Skills = () => {
  const skillCategories = [
    {
      title: "AI & Machine Learning",
      skills: [
        { name: "Python", icon: "🐍", level: 95 },
        { name: "LangChain", icon: "🔗", level: 90 },
        { name: "LlamaIndex", icon: "🦙", level: 88 },
        { name: "RAG", icon: "🔍", level: 92 },
        { name: "Vector DB", icon: "🗄️", level: 85 },
        { name: "ML/DL", icon: "🧠", level: 88 }
      ]
    },
    {
      title: "Backend Development",
      skills: [
        { name: "Node.js", icon: "🟢", level: 80 },
        { name: "FastAPI", icon: "⚡", level: 90 },
        { name: "SQL", icon: "🗃️", level: 85 },
        { name: "MongoDB", icon: "🍃", level: 75 },
        { name: "JavaScript", icon: "📜", level: 80 },
      ]
    },
    {
      title: "Frontend & Tools",
      skills: [
        { name: "React", icon: "⚛️", level: 75 },
        { name: "Angular", icon: "🅰️", level: 80 },
        { name: "Model Context Protocol", icon: "🔧", level: 85 },
        { name: "LLMs", icon: "🤖", level: 90 },
        { name: "Generative AI", icon: "✨", level: 92 }
      ]
    }
  ];

  return (
    <section className="py-20 px-4 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-6 text-center text-primary">
                    {category.title}
                  </h3>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: categoryIndex * 0.2 + skillIndex * 0.1 
                        }}
                        viewport={{ once: true }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{skill.icon}</span>
                            <span className="text-sm font-medium">{skill.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ 
                              duration: 1, 
                              delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.5 
                            }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;