// 


import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react";
import emailjs from "emailjs-com";

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "jithin.george.w@gmail.com",
      href: "mailto:jithin.george.w@gmail.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      value: "+91 9633473792",
      href: "tel:+919633473792"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      value: "Kochi, Kerala, India",
      href: "https://www.google.com/maps/place/Edappally,+Kochi,+Kerala/@10.0168564,76.2753103,13.25z/data=!4m6!3m5!1s0x3b080da53444d5e9:0xb46c57c6b1bc9aff!8m2!3d10.0260688!4d76.3124753!16zL20vMDg3NWMw?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D"
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-6 h-6" />,
      name: "GitHub",
      href: "https://github.com/jithin-george-works",
      color: "hover:text-gray-900 dark:hover:text-gray-100"
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/jithu010",
      color: "hover:text-blue-600"
    }
  ];

  // EmailJS integration
  const form = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    emailjs
      .sendForm(
        "service_46m9aps",    // <-- replace with your EmailJS service ID
        "template_kfvwy3q",   // <-- replace with your EmailJS template ID
        form.current!,
        "LsHezOLno7vdDoW0P"     // <-- replace with your EmailJS public key
      )
      .then(
        () => {
          setSent(true);
          setSending(false);
          if (form.current) form.current.reset();
        },
        () => {
          setError("Failed to send message. Please try again.");
          setSending(false);
        }
      );
  };

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
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to collaborate on innovative AI solutions? Let's discuss how we can build something amazing together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-secondary/50 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{info.title}</h3>
                      <p className="text-muted-foreground group-hover:text-primary transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </CardContent>
            </Card>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h3 className="text-lg font-semibold mb-4 text-primary">Follow Me</h3>
              <div className="flex justify-center gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`p-3 rounded-full border border-border hover:border-primary transition-all duration-300 ${link.color} hover:shadow-lg hover:shadow-primary/20`}
                  >
                    {link.icon}
                    <span className="sr-only">{link.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary">
                  Send a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form ref={form} onSubmit={sendEmail} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Input
                        name="name"
                        placeholder="Your Name"
                        required
                        className="border-border/50 focus:border-primary transition-colors"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <Input
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        required
                        className="border-border/50 focus:border-primary transition-colors"
                      />
                    </motion.div>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <Input
                      name="title"
                      placeholder="Subject"
                      required
                      className="border-border/50 focus:border-primary transition-colors"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      rows={6}
                      required
                      className="border-border/50 focus:border-primary transition-colors resize-none"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full group hover:scale-[1.02] transition-transform duration-300"
                      size="lg"
                      disabled={sending}
                    >
                      <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      {sending ? "Sending..." : sent ? "Message Sent!" : "Send Message"}
                    </Button>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    {sent && !error && <p className="text-green-600 text-sm mt-2">Your message has been sent!</p>}
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;