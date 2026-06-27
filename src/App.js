import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronDown,
  MapPin,
  ArrowRight,
  Code2,
  Brain,
  Briefcase,
  Award,
  Menu,
  X
} from 'lucide-react';

// ============================================================================
// DATA
// ============================================================================

const SOCIAL_LINKS = {
  github: 'https://github.com/faoziaabedin',
  linkedin: 'https://linkedin.com/in/faozia-abedin',
  email: 'faoziaabedin2@gmail.com',
  location: 'Toronto, Ontario'
};

const PROJECTS = [
  {
    name: 'GridlockLondon',
    type: 'Software',
    description: 'Simulating 10,000+ vehicles in real-time across London\'s road network using optimized graph algorithms and multi-threaded rendering.',
    tech: ['C++', 'OpenGL', 'Graph Algorithms', 'Multi-threading'],
    github: 'https://github.com/faoziaabedin/GridlockLondon',
    color: '#f472b6'
  },
  {
    name: 'MediCure',
    type: 'ML/AI',
    description: 'ML pipeline predicting clinical outcomes on 6,000+ patient records, achieving R² = 0.806 with SHAP-based interpretability for healthcare stakeholders.',
    tech: ['Python', 'XGBoost', 'SHAP', 'Pandas', 'Scikit-learn'],
    github: 'https://github.com/Millicent-Song/MediCure',
    color: '#60a5fa'
  },
  {
    name: 'RecipeRemixer',
    type: 'Software',
    description: 'Transform any recipe for dietary needs using GPT-4 — handles allergies, substitutions, and nutritional adjustments in seconds.',
    tech: ['Python', 'OpenAI API', 'FastAPI', 'React'],
    github: 'https://github.com/faoziaabedin/RecipeRemixer',
    color: '#81b29a'
  },
  {
    name: 'CodeTrace',
    type: 'Software',
    description: 'Interactive debugger that visualizes code execution step-by-step, helping students understand control flow and variable states.',
    tech: ['TypeScript', 'React', 'AST Parsing', 'Canvas API'],
    github: 'https://github.com/faoziaabedin/CodeTrace',
    color: '#f2cc8f'
  },
  {
    name: 'Credit Kickstart',
    type: 'Case Study',
    description: 'Product case study designing a gamified credit-building app for Gen Z — complete with user research, PRD, and go-to-market strategy.',
    tech: ['Product Strategy', 'User Research', 'Figma', 'Data Analysis'],
    github: 'https://drive.google.com/file/d/1TBmB6aespfrIJ8eJgBIpen3INV9Ql95H/view?usp=sharing',
    color: '#a78bfa'
  }
];

const EXPERIENCE = [
  {
    period: 'May 2026 - Present',
    role: 'Software Engineering Intern',
    company: 'Toronto Dominion Bank',
    location: 'Toronto, Ontario',
    color: '#22c55e',
    achievements: [
      'Built a QA reconciliation framework for 1000+ PingAM authentication journeys that tracked coverage gaps, caught duplicate classifications, and flagged missing analyses, giving the team full traceability across QA outputs',
      'Wrote a Postman Collection Generator that parses PingAM authentication graphs and produces ready-to-run API test workflows, handling sub-journeys, callbacks, and script-generated callbacks, replacing manual collection and environment setup with an automated pipeline',
      'Added node classification and edge-case handling to a Journey Translator agent by analyzing script-level behavior across authentication graph types, improving validation accuracy by 30% across complex multi-branch login flows'
    ]
  },
  {
    period: 'Sept 2025 - Present',
    role: 'Director of Mentorship & Projects',
    company: 'Women+ in Tech Society',
    location: 'London, Ontario',
    color: '#f472b6',
    achievements: [
      'Architected scalable mentor-matching system connecting 100+ participants, reducing coordination overhead by 30%',
      'Delivered technical workshops on product architecture and system design with 90%+ satisfaction scores',
      'Managed 8+ concurrent project lifecycles using Jira; delivered KPI dashboards to executive stakeholders'
    ]
  },
  {
    period: 'May 2025 - Aug 2025',
    role: 'Front End Developer',
    company: 'Aview International',
    location: 'Toronto, Ontario',
    color: '#81b29a',
    achievements: [
      'Engineered responsive web app using React 18, Next.js 14, TypeScript with SSR/SSG for 1,000+ daily users',
      'Built component library with atomic design principles, reducing UI inconsistencies by 40%',
      'Delivered 3 production features across 8-week Agile sprints with optimized bundle size via lazy loading'
    ]
  },
  {
    period: 'Jan 2025 - Apr 2025',
    role: "Let's SOLVE It Fellow",
    company: 'RBC Borealis AI',
    location: 'Toronto, Ontario',
    color: '#f2cc8f',
    achievements: [
      'Built predictive ML pipeline using XGBoost on 6,000+ clinical records achieving R² = 0.806',
      'Integrated SHAP library for feature importance visualizations, identifying and mitigating data bias',
      'Collaborated with 5-person research team; presented technical reports to 50+ AI researchers'
    ]
  },
  {
    period: 'Dec 2024 - Aug 2025',
    role: 'VP of Sponsorship',
    company: 'Ignition Hacks',
    location: 'Toronto, Ontario',
    color: '#a78bfa',
    achievements: [
      'Secured $15,000+ in sponsorships from Uber, Amazon, MLH, and other tech industry leaders',
      'Built and maintained relationships with 20+ potential sponsors through cold outreach and pitch decks',
      'Coordinated sponsor deliverables and ensured brand visibility across event marketing and attendee communications'
    ]
  }
];

const SKILLS = [
  { category: 'Languages', items: ['Python', 'TypeScript', 'C++', 'JavaScript', 'SQL'] },
  { category: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'Figma'] },
  { category: 'Backend', items: ['Node.js', 'FastAPI', 'PostgreSQL', 'MongoDB'] },
  { category: 'ML/AI', items: ['TensorFlow', 'PyTorch', 'XGBoost', 'SHAP'] },
  { category: 'Product', items: ['User Research', 'Roadmapping', 'A/B Testing', 'PRDs'] },
  { category: 'Tools', items: ['Git', 'Docker', 'AWS', 'Jira', 'Vercel'] }
];

const AWARDS = [
  { title: 'TD Women in Data Analytics Award', detail: '$7,000', year: '2025' },
  { title: 'RBC Borealis AI Fellowship', detail: 'Research Fellow', year: '2025' },
  { title: 'ADA Mentorship Hackathon', detail: '1st Place', year: '2024' },
  { title: 'Accenture Leadership Program', detail: 'STEM/AI Track', year: '2024' }
];

// ============================================================================
// COMPONENTS
// ============================================================================

// Animated text component
function AnimatedText({ children, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {children}
    </div>
  );
}

// Custom cursor
function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = (e) => {
      if (e.target.closest('a, button, [data-hover]')) setIsHovering(true);
    };

    const handleMouseLeave = (e) => {
      if (e.target.closest('a, button, [data-hover]')) setIsHovering(false);
    };

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);
    document.addEventListener('mouseleave', () => setIsVisible(false));

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999]"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        className="rounded-full transition-all duration-200"
        style={{
          width: isHovering ? '40px' : '8px',
          height: isHovering ? '40px' : '8px',
          backgroundColor: isHovering ? '#f472b6' : '#faf7f2',
          opacity: isHovering ? 0.9 : 1,
        }}
      />
    </div>
  );
}

// Project Card
function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      data-hover
      className="group block rounded-2xl p-6 transition-all duration-300"
      style={{
        backgroundColor: isHovered ? project.color + '15' : '#1a1a1a',
        border: `1px solid ${isHovered ? project.color : '#2a2a2a'}`,
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Type Badge */}
      <div className="flex items-center justify-between mb-3">
        <span 
          className="text-xs font-mono px-2 py-1 rounded"
          style={{ 
            backgroundColor: project.color + '20',
            color: project.color
          }}
        >
          {project.type}
        </span>
        <ExternalLink 
          size={16} 
          className="transition-all"
          style={{ 
            color: isHovered ? project.color : '#5a5a5a',
            transform: isHovered ? 'translate(2px, -2px)' : 'translate(0, 0)'
          }}
        />
      </div>
      <h3 
        className="text-xl font-bold mb-2 transition-colors"
        style={{ color: isHovered ? project.color : '#faf7f2' }}
      >
        {project.name}
      </h3>
      <p className="text-sm mb-4 leading-relaxed" style={{ color: '#9a9a9a' }}>
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t, j) => (
          <span 
            key={j} 
            className="text-xs px-2 py-1 rounded-full transition-colors"
            style={{ 
              backgroundColor: isHovered ? project.color + '20' : '#2a2a2a',
              color: isHovered ? project.color : '#7a7a7a'
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </a>
  );
}

// Experience Card
function ExperienceCard({ exp, index }) {
  return (
    <AnimatedText delay={index * 100}>
      <div 
        className="rounded-2xl p-6 mb-6 transition-all duration-300 hover:translate-x-2"
        style={{ 
          backgroundColor: '#1a1a1a',
          borderLeft: `4px solid ${exp.color}`
        }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl font-bold" style={{ color: '#faf7f2' }}>{exp.role}</h3>
            <p style={{ color: exp.color }}>{exp.company}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-mono" style={{ color: '#6a6a6a' }}>{exp.period}</p>
            <p className="text-xs" style={{ color: '#5a5a5a' }}>{exp.location}</p>
          </div>
        </div>
        <ul className="space-y-2">
          {exp.achievements.map((achievement, j) => (
            <li key={j} className="text-sm flex items-start gap-3" style={{ color: '#9a9a9a' }}>
              <span 
                className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                style={{ backgroundColor: exp.color }}
              />
              {achievement}
            </li>
          ))}
        </ul>
      </div>
    </AnimatedText>
  );
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['About', 'Experience', 'Projects', 'Contact'];

  return (
    <div className="min-h-screen cursor-none" style={{ backgroundColor: '#0f0f0f', color: '#faf7f2' }}>
      <CustomCursor />

      {/* Navigation */}
      <nav 
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{ 
          backgroundColor: scrolled ? 'rgba(15,15,15,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#hero" className="text-xl font-bold" style={{ color: '#faf7f2' }}>
            faozia<span style={{ color: '#f472b6' }}>.</span>
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm transition-colors hover:text-[#f472b6]"
                style={{ color: '#9a9a9a' }}
              >
                {link}
              </a>
            ))}
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105"
              style={{ backgroundColor: '#f472b6', color: '#0f0f0f' }}
              onMouseEnter={e => e.target.style.backgroundColor = '#ec4899'}
              onMouseLeave={e => e.target.style.backgroundColor = '#f472b6'}
            >
              Contact Me
            </a>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden px-6 py-4" style={{ backgroundColor: '#0f0f0f' }}>
            {navLinks.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-lg"
              >
                {link}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center pt-20">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <AnimatedText>
                <div className="flex items-center gap-2 mb-4">
                  <Code2 size={18} style={{ color: '#f472b6' }} />
                  <span className="text-sm font-mono" style={{ color: '#6a6a6a' }}>
                    Software Engineering • Product • AI/ML
                  </span>
                </div>
              </AnimatedText>

              <AnimatedText delay={100}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  Hey, it's<br />
                  <span style={{ color: '#f472b6' }}>Faozia Abedin</span> :)
                </h1>
              </AnimatedText>

              <AnimatedText delay={200}>
                <p className="text-xl mb-8 leading-relaxed" style={{ color: '#9a9a9a' }}>
                  Creative software developer interested in AI/ML and building products with real impact. Pursuing a <span style={{ color: '#faf7f2' }}>BS Honours Specialization in Computer Science</span> at Western University.
                </p>
              </AnimatedText>

              <AnimatedText delay={300}>
                <div className="flex flex-wrap gap-4 mb-8">
                  <a
                    href={`mailto:${SOCIAL_LINKS.email}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all hover:scale-105"
                    style={{ backgroundColor: '#f472b6', color: '#0f0f0f' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#ec4899'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f472b6'}
                  >
                    Contact Me <ArrowRight size={18} />
                  </a>
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all hover:scale-105"
                    style={{ border: '1px solid #3a3a3a', color: '#faf7f2' }}
                  >
                    Projects
                  </a>
                </div>
              </AnimatedText>

              <AnimatedText delay={400}>
                <div className="flex items-center gap-6">
                  <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#f472b6]" style={{ color: '#6a6a6a' }}>
                    <Github size={22} />
                  </a>
                  <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#f472b6]" style={{ color: '#6a6a6a' }}>
                    <Linkedin size={22} />
                  </a>
                  <a href={`mailto:${SOCIAL_LINKS.email}`} className="transition-colors hover:text-[#f472b6]" style={{ color: '#6a6a6a' }}>
                    <Mail size={22} />
                  </a>
                </div>
              </AnimatedText>
            </div>

            <div className="flex justify-center">
              <AnimatedText delay={200}>
                <div className="relative">
                  <div 
                    className="w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden"
                    style={{ border: '2px solid #2a2a2a' }}
                  >
                    <img 
                      src="/faozia.jpg" 
                      alt="Faozia Abedin"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Floating badge */}
                  <div 
                    className="absolute -bottom-4 -right-4 px-4 py-2 rounded-full text-sm font-medium"
                    style={{ backgroundColor: '#f472b6', color: '#0f0f0f' }}
                  >
                    CS @ Western
                  </div>
                </div>
              </AnimatedText>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
            <a href="#about">
              <ChevronDown size={24} style={{ color: '#4a4a4a' }} />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedText>
            <h2 className="text-4xl md:text-5xl font-bold mb-12">
              About <span style={{ color: '#f472b6' }}>Me</span>
            </h2>
          </AnimatedText>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <AnimatedText delay={100}>
                <p className="text-lg mb-6 leading-relaxed" style={{ color: '#9a9a9a' }}>
                  Hi! I'm a third-year CS student at Western University. I'm a very creative person and I love working with people, that combo is what got me into building software in the first place, since the best products come from understanding people, not just writing good code.
                </p>
              </AnimatedText>
              <AnimatedText delay={200}>
                <p className="text-lg mb-6 leading-relaxed" style={{ color: '#9a9a9a' }}>
                  I like to think about both sides of a project, the technical part where I get to actually build and architect things, and the human part where I'm thinking about who's using it and why it matters to them. To me that's the fun part of CS, it's never just about the code, it's about what the code does for someone.
                </p>
              </AnimatedText>
              <AnimatedText delay={300}>
                <p className="text-lg leading-relaxed" style={{ color: '#9a9a9a' }}>
                  Lately I've been really drawn to AI and machine learning, especially how it can be applied in healthcare, there's something exciting about tech that can actually improve people's lives in a tangible way.
                </p>
              </AnimatedText>
            </div>

            <div>
              <AnimatedText delay={200}>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Award size={20} style={{ color: '#f472b6' }} />
                  Recognition
                </h3>
                <div className="space-y-4 mb-8">
                  {AWARDS.map((award, i) => (
                    <div 
                      key={i}
                      className="flex justify-between items-center p-3 rounded-lg transition-all hover:translate-x-2"
                      style={{ backgroundColor: '#1a1a1a' }}
                    >
                      <div>
                        <p className="font-medium" style={{ color: '#faf7f2' }}>{award.title}</p>
                        <p className="text-sm" style={{ color: '#6a6a6a' }}>{award.detail}</p>
                      </div>
                      <span className="text-xs font-mono px-2 py-1 rounded" style={{ backgroundColor: '#2a2a2a', color: '#f472b6' }}>
                        {award.year}
                      </span>
                    </div>
                  ))}
                </div>
              </AnimatedText>
            </div>
          </div>

          {/* Skills */}
          <AnimatedText delay={400}>
            <h3 className="text-xl font-bold mt-12 mb-6 flex items-center gap-2">
              <Code2 size={20} style={{ color: '#f472b6' }} />
              Tech Stack
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {SKILLS.map((skill, i) => (
                <div key={i} className="p-4 rounded-xl" style={{ backgroundColor: '#1a1a1a' }}>
                  <p className="text-xs font-mono mb-2" style={{ color: '#f472b6' }}>{skill.category}</p>
                  <div className="flex flex-wrap gap-1">
                    {skill.items.map((item, j) => (
                      <span key={j} className="text-xs" style={{ color: '#8a8a8a' }}>
                        {item}{j < skill.items.length - 1 ? ',' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedText>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedText>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              My <span style={{ color: '#f472b6' }}>Experience</span>
            </h2>
            <p className="text-lg mb-12" style={{ color: '#6a6a6a' }}>
              Where I've contributed, learned, and made an impact.
            </p>
          </AnimatedText>

          <div className="max-w-3xl">
            {EXPERIENCE.map((exp, i) => (
              <ExperienceCard key={i} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedText>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              My <span style={{ color: '#f472b6' }}>Projects</span>
            </h2>
            <p className="text-lg mb-12" style={{ color: '#6a6a6a' }}>
              A collection of projects I've worked on, from web apps to ML pipelines to case studies.
            </p>
          </AnimatedText>

          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((project, i) => (
              <AnimatedText key={i} delay={i * 100}>
                <ProjectCard project={project} index={i} />
              </AnimatedText>
            ))}
          </div>

          <AnimatedText delay={400}>
            <div className="mt-8 text-center">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm transition-colors hover:text-[#f472b6]"
                style={{ color: '#6a6a6a' }}
              >
                View more on GitHub <ArrowRight size={16} />
              </a>
            </div>
          </AnimatedText>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <AnimatedText>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Like what you see?
            </h2>
            <p className="text-xl mb-8" style={{ color: '#6a6a6a' }}>
              I'm currently seeking internships for Fall 2026 and Winter 2027.
            </p>
          </AnimatedText>

          <AnimatedText delay={100}>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-lg transition-all hover:scale-105"
                style={{ backgroundColor: '#f472b6', color: '#0f0f0f' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#ec4899'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f472b6'}
              >
                <Mail size={20} />
                Get in touch
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-lg transition-all hover:scale-105"
                style={{ border: '1px solid #3a3a3a', color: '#faf7f2' }}
              >
                <Linkedin size={20} />
                LinkedIn
              </a>
            </div>
          </AnimatedText>

          <AnimatedText delay={200}>
            <div className="flex items-center justify-center gap-2 text-sm" style={{ color: '#5a5a5a' }}>
              <MapPin size={16} />
              {SOCIAL_LINKS.location}
            </div>
          </AnimatedText>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8" style={{ borderTop: '1px solid #1a1a1a' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <a 
              href="mailto:faoziaabedin2@gmail.com" 
              className="text-sm font-mono transition-colors hover:text-[#f472b6]" 
              style={{ color: '#9a9a9a' }}
            >
              faoziaabedin2@gmail.com
            </a>
            <div className="flex items-center gap-6">
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#f472b6]" style={{ color: '#4a4a4a' }}>
                <Github size={18} />
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#f472b6]" style={{ color: '#4a4a4a' }}>
                <Linkedin size={18} />
              </a>
              <a href={`mailto:${SOCIAL_LINKS.email}`} className="transition-colors hover:text-[#f472b6]" style={{ color: '#4a4a4a' }}>
                <Mail size={18} />
              </a>
            </div>
            <p className="text-sm font-mono" style={{ color: '#4a4a4a' }}>
              © 2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
