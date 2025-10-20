import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCapIcon, CalendarIcon, MapPinIcon } from "lucide-react";

const Education = () => {
  const educationData = [
    {
      degree: "Master of Science in Computer Science",
      specialization: "Artificial Intelligence",
      institution: "Cochin University of Science and Technology",
      location: "Kochi",
      period: "2021 - 2023",
      project: "Developed a weather event prediction system using a hybrid Autoencoder ARIMA model, Bidirectional LSTM, and DNN to forecast AQI, environmental features, and heatwave occurrences.",
      icon: "🎓"
    },
    {
      degree: "Bachelor of Computer Applications",
      institution: "Rajagiri College of Management and Applied Sciences",
      location: "Kochi",
      period: "2018 - 2021",
      project: "Built a dynamic E-commerce web application using HTML, CSS, JavaScript, PHP, and SQL with features like user authentication, product catalog management, and order processing.",
      icon: "📚"
    }
  ];

  const certifications = [
    "Oracle AI Vector Search Professional",
    "OCI 2023 AI Foundations Associate"
  ];

  return (
    <section className="py-20 px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Education & Certifications
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
        </motion.div>

        <div className="space-y-8">
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-2xl transition-all duration-500 border-l-4 border-l-primary group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{edu.icon}</div>
                      <div>
                        <CardTitle className="text-xl md:text-2xl font-bold text-primary group-hover:text-accent transition-colors">
                          {edu.degree}
                        </CardTitle>
                        {edu.specialization && (
                          <p className="text-lg text-primary group-hover:text-accent transition-colors">
                            Specialization in {edu.specialization}
                          </p>
                        )}
                        <h3 className="text-lg font-semibold text-foreground mt-2">
                          {edu.institution}
                        </h3>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <CalendarIcon className="h-4 w-4" />
                        <span className="text-sm">{edu.period}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPinIcon className="h-4 w-4" />
                        <span className="text-sm">{edu.location}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Final-year Project:</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {edu.project}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-primary">
            Professional Certifications
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Badge 
                  variant="outline" 
                  className="text-sm py-2 px-4 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-default"
                >
                  <GraduationCapIcon className="w-4 h-4 mr-2" />
                  {cert}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;