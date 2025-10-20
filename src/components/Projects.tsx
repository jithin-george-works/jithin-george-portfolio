import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Zap, Search, Cloud, BarChart3,Bot,Cpu } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Knowledge Explorer",
      description:
        "A multilingual AI search tool leveraging Azure OpenAI and Translator Services with fuzzy glossary support for domain-specific queries. Features intelligent search capabilities and real-time translation.",
      technologies: [
        "Azure OpenAI",
        "LangChain",
        "Python",
        "Translator API",
        "Vector DB",
      ],
      icon: <Search className="w-8 h-8" />,
      gradient: "from-blue-500 to-cyan-500",
      features: [
        "Multilingual search capabilities",
        "Fuzzy glossary matching",
        "Real-time translation",
        "Domain-specific query optimization",
      ],
    },
    {
      title: "RAG Pipeline System",
      description:
        "End-to-end Retrieval Augmented Generation pipelines with batch processing tools including folder upload, web scraping, and automated chart generation for enhanced data handling.",
      technologies: [
        "LlamaIndex",
        "Vector Databases",
        "FastAPI",
        "Python",
        "Batch Processing",
      ],
      icon: <Zap className="w-8 h-8" />,
      gradient: "from-purple-500 to-pink-500",
      features: [
        "Automated data ingestion",
        "Intelligent document processing",
        "Custom API endpoints",
        "Real-time chart generation",
      ],
    },
    {
      title: "Weather Prediction System",
      description:
        "Advanced weather event prediction using hybrid Autoencoder-ARIMA model with Bidirectional LSTM and DNN to forecast AQI, environmental features, and heatwave occurrences.",
      technologies: [
        "Deep Learning",
        "LSTM",
        "ARIMA",
        "Python",
        "TensorFlow",
        "Time Series",
      ],
      icon: <Cloud className="w-8 h-8" />,
      gradient: "from-green-500 to-emerald-500",
      features: [
        "Hybrid ML/DL approach",
        "Multi-parameter forecasting",
        "Real-time weather analysis",
        "Environmental impact assessment",
      ],
    },
    {
      title: "Scalable Backend Systems",
      description:
        "High-performance backend architecture supporting multiple AI solutions with optimized API performance, achieving 40% improvement in response times and enhanced scalability.",
      technologies: [
        "Node.js",
        "Python",
        "API Optimization",
        "Microservices",
        "Load Balancing",
      ],
      icon: <BarChart3 className="w-8 h-8" />,
      gradient: "from-orange-500 to-red-500",
      features: [
        "40% performance improvement",
        "Microservices architecture",
        "Auto-scaling capabilities",
        "Enterprise-grade security",
      ],
    },
    {
      title: "Agentic Workflow Orchestrator",
      description:
        "An intelligent multi-agent system leveraging LangGraph and CrewAI for orchestrating autonomous task execution, tool coordination, and reasoning across distributed workflows in enterprise AI systems.",
      technologies: [
        "LangGraph",
        "CrewAI",
        "LangChain",
        "Azure OpenAI",
        "Python",
        "Vector Databases",
      ],
      icon: <Bot className="w-8 h-8" />,
      gradient: "from-indigo-500 to-sky-500",
      features: [
        "Agent-based task planning and collaboration",
        "Dynamic memory management and reasoning",
        "Tool invocation using CrewAI with contextual awareness",
        "Integrated RAG pipelines for knowledge grounding",
      ],
    },
    {
      title: "Model Fine-Tuning & Optimization Suite",
      description:
        "Developed a fine-tuning pipeline using PEFT, LoRA, and QLoRA for optimizing LLMs like GPT and LLaMA, with RLHF-based evaluation for improved domain alignment and response quality.",
      technologies: [
        "PEFT",
        "LoRA",
        "QLoRA",
        "RLHF",
        "Transformers",
        "Hugging Face",
        "PyTorch",
        "LangChain",
      ],
      icon: <Cpu className="w-8 h-8" />,
      gradient: "from-fuchsia-500 to-purple-600",
      features: [
        "Custom LoRA and QLoRA fine-tuning for LLMs",
        "RLHF-driven performance evaluation and feedback loop",
        "Training optimization with mixed precision and gradient checkpointing",
        "Deployed fine-tuned models into RAG-based production pipelines",
      ],
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            Showcasing innovative AI solutions and scalable systems that drive business impact
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-500 border-border/50 hover:border-primary/50 group-hover:scale-[1.02]">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${project.gradient} text-white shadow-lg`}>
                      {project.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                        {project.title}
                      </CardTitle>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-primary mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {project.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + featureIndex * 0.05 }}
                          viewport={{ once: true }}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-primary mb-3">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge 
                          key={tech} 
                          variant="secondary" 
                          className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* <div className="flex gap-3 pt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 group-hover:border-primary transition-colors"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      View Code
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="flex-1"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Button>
                  </div> */}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;