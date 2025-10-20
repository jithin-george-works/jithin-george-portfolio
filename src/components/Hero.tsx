import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import ParticleBackground from "./ParticleBackground";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary via-accent to-primary-glow bg-clip-text"
            style={{ color: "#9b99999c" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            JITHIN GEORGE
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <h2 className="text-2xl md:text-4xl font-light text-muted-foreground mb-4">
              AI/ML ENGINEER
            </h2>
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"></div>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            AI/ML Engineer skilled in Python, FastAPI, and Node.js,
            building GenAI, NLP, and Deep Learning solutions with LangChain and Vector DBs.

          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4 pt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              asChild
              variant="default"
              size="lg"
              className="group hover:scale-105 transition-transform duration-300"
            >
              <a href="/Jithin-Resume-AI-Engineer.pdf" download>
                <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                Download Resume
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="group hover:scale-105 transition-transform duration-300"
            >
              <a href="mailto:jithin.george.w@gmail.com">
                <Mail className="mr-2 h-4 w-4" />
                jithin.george.w@gmail.com
              </a>
            </Button>
          </motion.div>

          <motion.div
            className="flex justify-center gap-6 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {[
              {
                icon: Github,
                href: "https://github.com/jithin-george-works",
                label: "GitHub",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/jithu010",
                label: "LinkedIn",
              },
              // {
              //   icon: Mail,
              //   href: "mailto:jithin.george.w@gmail.com",
              //   label: "Email",
              // },
            ].map(({ icon: Icon, href, label }, index) => (
              <motion.a
                key={label}
                href={href}
                className="p-3 rounded-full border border-border hover:border-primary transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              >
                <Icon className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
                <span className="sr-only">{label}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;