import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Team = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensagem enviada!",
      description: "Obrigado pelo contato. Responderemos em breve.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  const teamMembers = [
    {
      name: "Arthur Azevedo da Silva",
      role: "Orientador",
      description: "Bacharel em Ciência da Computação e Especialista em Robótica",
      social: {
        github: "https://github.com/arthurazevedods",
        linkedin: "https://linkedin.com",
        email: "mailto:arthurdstech@gmail.com"
      }
    },
    {
      name: "Sofia...",
      role: "Orientador",
      description: "Bacharel em Ciência da Computação e Especialista em Robótica",
      social: {
        github: "https://github.com/arthurazevedods",
        linkedin: "https://linkedin.com",
        email: "mailto:arthurdstech@gmail.com"
      }
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Equipe e Contato
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça quem está por trás da OpenCity SLZ e entre em contato conosco
          </p>
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <Card key={index} className="border-2 hover:border-primary transition-all">
              <CardHeader className="text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-white">
                  {member.name.charAt(0)}
                </div>
                <CardTitle className="text-xl">{member.name}</CardTitle>
                <p className="text-sm text-primary">{member.role}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  {member.description}
                </p>
                <div className="flex justify-center gap-3">
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href={member.social.email}
                    className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">

          {/* Additional Contact Info */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">Ou nos encontre em:</p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" size="lg" asChild>
                <a href="mailto:contato@opencityslz.com">
                  <Mail className="h-5 w-5 mr-2" />
                  E-mail
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5 mr-2" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
