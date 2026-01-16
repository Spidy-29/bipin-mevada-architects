import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GridBackground } from "@/components/GridBackground";
import { useToast } from "@/hooks/use-toast";
import { SOCIAL_LINKS, CONTACT_INFO } from "@/constants/contact";
import projectLiving from "@/assets/project-living.jpg";
import heroImage from "@/assets/hero-architecture.jpg";
import { logAnalyticsEvent } from "@/lib/firebase";

const services = [
  {
    title: "Architectural Design",
    description: "Complete residential and commercial architectural solutions from concept to completion.",
  },
  {
    title: "Interior Design",
    description: "Thoughtful interior spaces that balance aesthetics with functionality.",
  },
  {
    title: "Space Planning",
    description: "Optimizing layouts to maximize the potential of every square foot.",
  },
  {
    title: "3D Visualization",
    description: "Photorealistic renders and walkthroughs to bring your vision to life.",
  },
];



const About = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    logAnalyticsEvent('generate_lead', {
      event_category: 'contact',
      event_label: 'contact_form'
    });
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background relative">
      <GridBackground />
      <Header />

      <main className="pt-24 md:pt-32 relative z-10">
        {/* About Section */}
        <section className="section-container">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="space-y-6">
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  About Us
                </span>
                <h1 className="font-serif text-3xl md:text-5xl font-light">
                  Architecture as a
                  <br />
                  <span className="italic">dialogue with nature</span>
                </h1>
                <div className="w-12 h-px bg-line" />
                <div className="space-y-4 text-muted-foreground">
                  <p className="text-base md:text-lg leading-relaxed">
                    We are a multidisciplinary design practice rooted in the belief that spaces should be felt before they are seen.
                  </p>
                  <p className="leading-relaxed">
                    Our work oscillates between the technical rigors of construction and the poetic nuances of habitation.
                  </p>
                  <p className="leading-relaxed">
                    From the first sketch to the final stone, we pursue a singular vision: to create environments that are not just occupied, but experienced.
                  </p>
                </div>
              </div>

              <div className="relative">
                <img
                  src={heroImage}
                  alt="Our studio"
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute -bottom-3 -left-3 md:-bottom-4 md:-left-4 w-20 h-20 md:w-28 md:h-28 border border-line" />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="section-container bg-card/50 backdrop-blur-sm">
          <div className="container">
            <div className="text-center mb-10 md:mb-14">
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground block mb-3">
                What We Do
              </span>
              <h2 className="font-serif text-2xl md:text-4xl font-light">Our Services</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className="p-6 border border-border hover:border-foreground/30 bg-background/50 transition-all duration-300 opacity-0 animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
                >
                  <h3 className="font-serif text-lg md:text-xl font-light mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Break */}
        <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <img
            src={projectLiving}
            alt="Our work"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/20" />
        </section>

        {/* Contact Section */}
        <section className="section-container">
          <div className="container">
            <div className="text-center mb-10 md:mb-14">
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground block mb-3">
                Get In Touch
              </span>
              <h2 className="font-serif text-2xl md:text-4xl font-light">
                Let's create together
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Info */}
              <div className="space-y-8">
                <p className="text-muted-foreground leading-relaxed">
                  Have a project in mind? We'd love to hear from you.
                  Reach out through any of the channels below or send us a message.
                </p>

                {/* Email */}
                <a
                  href={CONTACT_INFO.email.href}
                  className="flex items-center gap-4 group"
                  onClick={() => logAnalyticsEvent('select_content', { content_type: 'contact_link', content_id: 'email' })}
                >
                  <div className="w-12 h-12 flex items-center justify-center border border-border group-hover:border-foreground group-hover:bg-foreground transition-all duration-300">
                    <CONTACT_INFO.email.icon size={18} className="text-muted-foreground group-hover:text-background transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{CONTACT_INFO.email.label}</p>
                    <p className="group-hover:text-muted-foreground transition-colors">{CONTACT_INFO.email.value}</p>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center border border-border">
                    <CONTACT_INFO.location.icon size={18} className="text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{CONTACT_INFO.location.label}</p>
                    <p className="text-muted-foreground">{CONTACT_INFO.location.value}</p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-4">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                    Follow & Connect
                  </p>
                  <div className="space-y-3">
                    {SOCIAL_LINKS.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => logAnalyticsEvent('select_content', { content_type: 'social_link', content_id: social.label })}
                        className="flex items-center gap-4 group"
                      >
                        <div className="w-10 h-10 flex items-center justify-center border border-border group-hover:border-foreground group-hover:bg-foreground transition-all duration-300">
                          <social.icon size={16} className="text-muted-foreground group-hover:text-background transition-colors" />
                        </div>
                        <div>
                          <p className="text-sm group-hover:text-muted-foreground transition-colors">
                            {social.label}
                          </p>
                          <p className="text-xs text-muted-foreground">{social.value}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-card/80 backdrop-blur-sm p-6 md:p-10 border border-border">
                <h3 className="font-serif text-xl md:text-2xl font-light mb-6">
                  Send a message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-transparent border-b border-border focus:border-foreground outline-none py-2 text-sm transition-colors"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-transparent border-b border-border focus:border-foreground outline-none py-2 text-sm transition-colors"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs uppercase tracking-widest text-muted-foreground">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-transparent border-b border-border focus:border-foreground outline-none py-2 text-sm transition-colors"
                      placeholder="Project inquiry"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs uppercase tracking-widest text-muted-foreground">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-transparent border-b border-border focus:border-foreground outline-none py-2 text-sm transition-colors resize-none"
                      placeholder="Tell us about your project..."
                      required
                    />
                  </div>

                  <Button type="submit" variant="architectural" className="w-full mt-4">
                    <Send size={16} />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
