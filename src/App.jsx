import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Code2, 
  Cpu, 
  Zap, 
  ArrowUpRight, 
  ArrowLeft,
  Github, 
  Twitter, 
  Linkedin, 
  Mail,
  Menu,
  X,
  Ghost,
  BookOpen,
  Database
} from 'lucide-react';

// --- Resume & Blog Data Integration ---

const PROJECTS = [
  {
    id: 1,
    title: "EDU_HYBRID_GAME",
    category: "EdTech / Web",
    description: "A real-time multiplayer web app serving as the digital component for Python learning. Built with Node.js & Next.js.",
    tags: ["Next.js", "TypeScript", "MySQL"],
    accent: "text-blue-700", 
    border: "border-zinc-900"
  },
  {
    id: 2,
    title: "OWSB_SYSTEM",
    category: "Enterprise / Java",
    description: "Automated Purchase Order Management System. Modular design integrating inventory, supplier mgmt, and reporting.",
    tags: ["Java", "JavaFX", "Modular"],
    accent: "text-zinc-600",
    border: "border-zinc-900"
  },
  {
    id: 3,
    title: "CAR_CARE_MGMT",
    category: "System / SQL",
    description: "Service Center Management System with role-based access (Admin, Mechanic, Customer) for billing & appointments.",
    tags: ["C#", "WinForms", "SQL Server"],
    accent: "text-emerald-800",
    border: "border-zinc-900"
  },
  {
    id: 4,
    title: "RETAIL_ANALYSIS",
    category: "Data Science",
    description: "End-to-end retail data analysis. Built a Random Forest model to classify and predict customer product ratings.",
    tags: ["R Language", "Random Forest", "Data Viz"],
    accent: "text-rose-700",
    border: "border-zinc-900"
  }
];

const BLOG_POSTS = [
  {
    id: 101,
    date: "2025.10.24",
    title: "Bridging Desktop & Web: JavaFX to Next.js",
    excerpt: "My journey transitioning from strong-typed object-oriented desktop apps to the dynamic world of modern web frameworks.",
    readTime: "5 MIN",
    tags: ["Java", "React"],
    content: [
      "Coming from a background of building robust desktop applications with JavaFX and WinForms, the transition to modern web development felt like stepping into a different universe.",
      "In desktop development, state is often persistent and predictable. The application lifecycle is straightforward. However, moving to Next.js and React required a mental shift towards the component lifecycle, hooks, and the stateless nature of the web.",
      "One of the biggest challenges was understanding the hydration process in Next.js. Unlike a compiled Java application where the UI is rendered once, React components re-render based on state changes. Mastering `useEffect` and `useMemo` was crucial to avoid performance pitfalls.",
      "Despite the differences, the core principles of Software Engineering remain the same. Modular design, separation of concerns, and clean code are universal. I found that my experience with strict typing in Java made adopting TypeScript almost seamless, providing that familiar safety net I was used to.",
      "Ultimately, bridging these two worlds has made me a more versatile engineer, capable of choosing the right tool for the job, whether it's a high-performance native app or a globally accessible web platform."
    ]
  },
  {
    id: 102,
    date: "2025.06.15",
    title: "Managing Data in R vs SQL",
    excerpt: "Comparing data transformation techniques in R's Tidyverse with traditional SQL queries for large datasets.",
    readTime: "7 MIN",
    tags: ["Data Science", "R"],
    content: [
      "Data manipulation is the bread and butter of any data analysis project. Having worked with both R (specifically the Tidyverse ecosystem) and raw SQL, I've noticed distinct advantages to each approach.",
      "SQL is unbeaten when it comes to initial data retrieval and aggregation. The declarative nature of `SELECT`, `GROUP BY`, and `JOIN` allows for incredibly efficient filtering at the database level before the data even hits your application memory. For my Retail Analysis project, learning to optimize these queries was key to handling the dataset.",
      "On the other hand, R's Tidyverse shines in exploratory data analysis (EDA). The pipe operator (`%>%` or `|>`) allows for a very readable, linear transformation flow. Functions like `mutate()` and `pivot_longer()` feel more intuitive for reshaping data on the fly compared to complex SQL subqueries or window functions.",
      "My preferred workflow now involves a hybrid approach: use SQL to perform the heavy lifting and aggregation, reducing the dataset to a manageable size, and then switch to R for the fine-grained cleaning, statistical modeling (like Random Forest), and visualization.",
      "Understanding both tools allows for a pipeline that is both performant and flexible, leveraging the speed of the database engine and the statistical power of R."
    ]
  },
  {
    id: 103,
    date: "2024.10.02",
    title: "The Importance of Role-Based Access Control",
    excerpt: "Lessons learned implementing secure authentication flows in C# for enterprise management systems.",
    readTime: "6 MIN",
    tags: ["Security", "C#"],
    content: [
      "During the development of the Car Care Service Center Management System, security wasn't just an add-on; it was a core requirement. Implementing Role-Based Access Control (RBAC) taught me valuable lessons about system architecture.",
      "The system had distinct users: Admins, Mechanics, Receptionists, and Customers. Hardcoding checks like `if (user.role == 'admin')` quickly becomes unmanageable and error-prone. Instead, I adopted a permission-based model.",
      "In C# and .NET, we can leverage attributes and middleware to handle this elegantly. By defining policies rather than just roles, the code becomes more resilient to change. For example, instead of checking for the 'Manager' role, we check for the 'CanApproveRefunds' permission.",
      "Another critical aspect was database design. Ensuring that the SQL Server schema properly enforced these constraints prevented unauthorized access even if the application layer had a bug. Row-level security is often overlooked but vital.",
      "This project highlighted that security is a continuous process of design and validation, not a feature you toggle on at the end."
    ]
  }
];

const TECH_STACK = [
  "JAVA", "C#", "JAVASCRIPT", "TYPESCRIPT", "PYTHON", "R", "REACT", "NEXT.JS", "TAILWIND", "MYSQL", "POSTGRESQL", "UBUNTU LINUX", "FIGMA", "GIT"
];

// --- Components ---

const GlitchText = ({ text }) => {
  return (
    <div className="relative inline-block group cursor-default select-none">
      <span className="relative z-10 text-zinc-900">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[3px] translate-y-[2px]">{text}</span>
    </div>
  );
};

const BrutalButton = ({ children, onClick, className = "", variant = "primary", href, target }) => {
  const baseClass = "inline-block px-6 py-3 font-bold uppercase tracking-wider border-2 border-zinc-900 transition-all duration-200 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none text-center cursor-pointer";
  
  const variants = {
    primary: "bg-zinc-900 text-white hover:bg-blue-700 hover:border-blue-700 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]",
    outline: "bg-transparent text-zinc-900 hover:bg-zinc-100 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
    ghost: "bg-white text-zinc-900 border-transparent hover:underline",
    back: "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 border-transparent flex items-center gap-2 text-sm py-2 px-4"
  };

  if (href) {
    return (
      <a 
        href={href} 
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={`${baseClass} ${variants[variant]} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button 
      onClick={onClick}
      className={`${baseClass} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const NavLink = ({ children, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`
      relative px-4 py-2 font-mono text-sm uppercase tracking-widest transition-colors
      ${isActive ? 'text-zinc-900 font-bold' : 'text-zinc-500 hover:text-zinc-900'} 
    `}
  >
    <span className="relative z-10 flex items-center gap-2">
      {isActive && <span className="w-2 h-2 bg-zinc-900" />} 
      {children}
    </span>
  </button>
);

// --- Main App ---

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedPost, setSelectedPost] = useState(null); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Gmail compose link
  const gmailLink = "https://mail.google.com/mail/?view=cm&fs=1&to=waikitpua05@gmail.com";

  const scrollTo = (id) => {
    setActiveSection(id);
    setSelectedPost(null); 
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPost = (post) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white overflow-x-hidden">
      
      <style>{`
        .grid-bg {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-0 grid-bg"></div>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b-2 border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => scrollTo('home')}
          >
            <div className="w-10 h-10 bg-zinc-900 flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="font-mono font-bold text-white text-lg">WK</span>
            </div>
            <span className="font-bold text-xl tracking-tighter group-hover:tracking-wide transition-all">
              WAI KIT<span className="font-serif italic font-light text-zinc-500">PUA</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {['home', 'projects', 'skills', 'blog', 'about'].map((item) => (
              <NavLink 
                key={item} 
                isActive={activeSection === item}
                onClick={() => scrollTo(item)}
              >
                {item}
              </NavLink>
            ))}
            <BrutalButton 
              className="ml-4 text-xs py-2 px-5" 
              variant="primary" 
              href={gmailLink}
              target="_blank"
            >
              Contact Me
            </BrutalButton>
          </div>

          <button 
            className="md:hidden p-2 text-zinc-900 border-2 border-zinc-900 hover:bg-zinc-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 md:hidden">
          {['home', 'projects', 'skills', 'blog', 'about'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="text-4xl font-black uppercase hover:underline decoration-4 underline-offset-4"
            >
              {item}
            </button>
          ))}
        </div>
      )}

      <main className="pt-20 relative z-10">
        
        {/* --- HERO SECTION --- */}
        {activeSection === 'home' && (
          <section className="min-h-[85vh] flex flex-col justify-center px-6 max-w-7xl mx-auto relative">
            <div className="absolute top-20 right-0 md:right-10 opacity-5 pointer-events-none">
              <Terminal size={400} strokeWidth={0.5} className="text-zinc-900" />
            </div>

            <div className="space-y-2 mb-8">
              <div className="inline-flex items-center gap-3 px-4 py-1 border border-zinc-300 bg-white shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                <span className="font-mono text-xs font-bold tracking-widest text-zinc-500 uppercase">
                  Internship Period: Jan - Apr 2026
                </span>
              </div>
            </div>

            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.9] mb-8 text-zinc-900">
              SOFTWARE <br />
              <GlitchText text="ENGINEER" /> <br />
              <span className="font-serif italic font-light text-zinc-400 text-5xl md:text-7xl">
                & undergraduate
              </span>
            </h1>

            <p className="max-w-xl text-xl md:text-2xl text-zinc-600 mb-12 leading-relaxed font-medium border-l-4 border-zinc-900 pl-6">
              Year 2 B.Sc. Software Engineering Student @ APU.<br/>
              {/* Current GPA: <span className="font-black text-zinc-900">3.86</span>. */}
            </p>

            <div className="flex flex-wrap gap-4">
              <BrutalButton onClick={() => scrollTo('projects')} variant="primary">
                View Works
              </BrutalButton>
              <BrutalButton href="https://github.com/OvHvO" variant="outline" target="_blank">
                GitHub Profile
              </BrutalButton>
            </div>

            <div className="mt-32 border-y-2 border-zinc-900 bg-white py-6 overflow-hidden relative">
              <div className="flex animate-marquee whitespace-nowrap">
                {[...TECH_STACK, ...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                  <span key={i} className="mx-8 font-mono text-xl md:text-3xl font-bold text-zinc-400 hover:text-zinc-900 transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* --- PROJECTS SECTION --- */}
        {activeSection === 'projects' && (
          <section className="min-h-screen px-6 py-20 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-end justify-between mb-16 border-b-4 border-zinc-900 pb-6">
              <div>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-2">PROJECTS</h2>
                <p className="font-mono text-zinc-500 font-bold">/// SELECTED WORKS 2018-2024</p>
              </div>
              <Cpu className="hidden md:block w-12 h-12 text-zinc-900" strokeWidth={1.5} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PROJECTS.map((project) => (
                <div 
                  key={project.id}
                  className={`
                    group relative bg-white border-2 border-zinc-900 p-8 
                    flex flex-col justify-between min-h-[320px] transition-all duration-200
                    hover:-translate-y-2 hover:translate-x-2 hover:shadow-[8px_8px_0px_0px_rgba(24,24,27,1)]
                  `}
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <span className="font-mono text-xs font-bold px-2 py-1 bg-zinc-100 border border-zinc-200">
                        {project.category}
                      </span>
                      <ArrowUpRight className="w-6 h-6 text-zinc-900 transition-transform group-hover:rotate-45" />
                    </div>
                    <h3 className="text-2xl font-black mb-4 uppercase tracking-tight leading-none">
                      {project.title.replace('_', ' ')}
                    </h3>
                    <p className="text-zinc-600 leading-relaxed mb-6 text-sm font-medium">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="border-t border-zinc-200 pt-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className={`text-xs font-bold ${project.accent}`}>#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- SKILLS SECTION --- */}
        {activeSection === 'skills' && (
          <section className="min-h-screen px-6 py-20 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-16 text-center">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-900 mb-4">
                TECHNICAL SKILLS
              </h2>
              <p className="text-zinc-500 font-serif italic text-xl">
                A comprehensive toolkit for modern software engineering.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Languages */}
                <div className="bg-white border-2 border-zinc-900 p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                  <div className="flex items-center gap-3 mb-6">
                    <Code2 className="w-6 h-6" />
                    <h3 className="font-bold text-xl">LANGUAGES</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Java", "C#", "JavaScript", "TypeScript", "Python", "R"].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-zinc-100 text-sm font-mono border border-zinc-200">{skill}</span>
                    ))}
                  </div>
                </div>

                {/* Web Dev */}
                <div className="bg-white border-2 border-zinc-900 p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                  <div className="flex items-center gap-3 mb-6">
                    <Zap className="w-6 h-6" />
                    <h3 className="font-bold text-xl">WEB FRAMEWORKS</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Next.js", "React Native", "Tailwind CSS", "HTML/CSS"].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-zinc-100 text-sm font-mono border border-zinc-200">{skill}</span>
                    ))}
                  </div>
                </div>

                {/* Databases & OS */}
                <div className="bg-white border-2 border-zinc-900 p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                  <div className="flex items-center gap-3 mb-6">
                    <Database className="w-6 h-6" />
                    <h3 className="font-bold text-xl">DATA & OS</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["MySQL", "PostgreSQL", "SQL Server", "Ubuntu 24.04", "Windows 11"].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-zinc-100 text-sm font-mono border border-zinc-200">{skill}</span>
                    ))}
                  </div>
                </div>

                 {/* Tools */}
                 <div className="bg-white border-2 border-zinc-900 p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                  <div className="flex items-center gap-3 mb-6">
                    <Terminal className="w-6 h-6" />
                    <h3 className="font-bold text-xl">TOOLS</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Git", "GitHub", "Figma", "VS Code", "Visual Studio", "Eclipse"].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-zinc-100 text-sm font-mono border border-zinc-200">{skill}</span>
                    ))}
                  </div>
                </div>
            </div>
            
            <div className="mt-16 border-t border-zinc-200 pt-8 text-center">
              <h3 className="font-bold text-xl mb-4">LANGUAGE PROFICIENCY</h3>
              <div className="flex justify-center gap-8 font-mono text-sm">
                 <span className="flex items-center gap-2"><span className="w-2 h-2 bg-zinc-900 rounded-full"></span> MANDARIN (FLUENT)</span>
                 <span className="flex items-center gap-2"><span className="w-2 h-2 bg-zinc-900 rounded-full"></span> ENGLISH (FLUENT)</span>
                 <span className="flex items-center gap-2"><span className="w-2 h-2 bg-zinc-400 rounded-full"></span> MALAY (INTERMEDIATE)</span>
              </div>
            </div>
          </section>
        )}

        {/* --- BLOG SECTION --- */}
        {activeSection === 'blog' && (
          <section className="min-h-screen px-6 py-20 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {!selectedPost ? (
              <>
                <div className="mb-16 text-center">
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-900 mb-4">
                    JOURNAL
                  </h2>
                  <p className="text-zinc-500 font-serif italic text-xl">
                    Observations on software, design, and entropy.
                  </p>
                </div>

                <div className="space-y-6">
                  {BLOG_POSTS.map((post) => (
                    <article 
                      key={post.id}
                      onClick={() => openPost(post)}
                      className="group bg-white border-2 border-zinc-100 hover:border-zinc-900 p-8 transition-all duration-300 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] cursor-pointer"
                    >
                      <div className="flex flex-col md:flex-row gap-6 items-baseline justify-between">
                        <div className="flex-grow space-y-2">
                          <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 uppercase tracking-widest">
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.readTime} READ</span>
                          </div>
                          <h3 className="text-2xl md:text-3xl font-bold group-hover:underline decoration-2 underline-offset-4">
                            {post.title}
                          </h3>
                          <p className="text-zinc-600 max-w-xl">{post.excerpt}</p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {post.tags.map(tag => (
                              <span key={tag} className="text-xs font-bold text-zinc-400 bg-zinc-50 px-2 py-1">#{tag}</span>
                            ))}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            ) : (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="mb-8">
                  <BrutalButton 
                    variant="back" 
                    onClick={() => setSelectedPost(null)} 
                    className="inline-flex"
                  >
                    <ArrowLeft size={16} /> Back to Journal
                  </BrutalButton>
                </div>

                <article className="bg-white border-2 border-zinc-900 p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(24,24,27,0.05)]">
                  <header className="mb-12 border-b border-zinc-200 pb-8">
                    <div className="flex items-center gap-3 font-mono text-sm text-zinc-500 uppercase tracking-widest mb-6">
                      <span>{selectedPost.date}</span>
                      <span className="w-1 h-1 bg-zinc-400 rounded-full" />
                      <span>{selectedPost.readTime} READ</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black leading-tight text-zinc-900 mb-6">
                      {selectedPost.title}
                    </h1>
                    <div className="flex flex-wrap gap-2">
                       {selectedPost.tags.map(tag => (
                          <span key={tag} className="text-xs font-bold text-white bg-zinc-900 px-3 py-1">#{tag}</span>
                        ))}
                    </div>
                  </header>

                  <div className="prose prose-zinc prose-lg max-w-none">
                    {selectedPost.content.map((paragraph, index) => (
                      <p key={index} className="mb-6 text-zinc-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="mt-16 pt-8 border-t border-zinc-200 flex justify-between items-center">
                    <span className="font-serif italic text-zinc-500">Thanks for reading.</span>
                    <div className="flex gap-4">
                       <button className="p-2 rounded-full hover:bg-zinc-100 transition-colors text-zinc-400 hover:text-zinc-900">
                         <Twitter size={20} />
                       </button>
                       <button className="p-2 rounded-full hover:bg-zinc-100 transition-colors text-zinc-400 hover:text-zinc-900">
                         <Linkedin size={20} />
                       </button>
                    </div>
                  </div>
                </article>
              </div>
            )}
          </section>
        )}

        {/* --- ABOUT SECTION --- */}
        {activeSection === 'about' && (
          <section className="min-h-[80vh] px-6 py-20 max-w-7xl mx-auto flex flex-col justify-center animate-in fade-in zoom-in-95 duration-500">
            <div className="grid md:grid-cols-2 gap-16 items-center border-2 border-zinc-900 bg-white p-8 md:p-16 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)]">
              
              <div className="flex flex-col justify-center items-center text-center space-y-6">
                <div className="w-32 h-32 bg-zinc-900 text-white flex items-center justify-center rounded-full overflow-hidden border border-black">
                  <img
                    src="/me.jpeg"
                    alt="Me"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-black uppercase">Wai Kit PUA</h2>
                  <p className="font-mono text-zinc-500 text-sm mt-2">Age: 20 // Kuala Lumpur</p>
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                  Engineering <span className="font-serif italic text-blue-700">robust</span> solutions.
                </h3>
                <div className="prose prose-zinc text-zinc-600 text-lg">
                  <p>
                    I am a Year 2 Software Engineering student at <strong>Asia Pacific University</strong>. 
                    I have a strong background in both object-oriented programming and modern web development.
                  </p>
                  <p>
                    My experience ranges from building complex desktop management systems with Java and C# to creating real-time web applications using Next.js. I am skilled in balancing university studies with work, demonstrating strong time management.
                  </p>
                </div>

                <div className="pt-8 border-t border-zinc-200">
                  <div className="flex gap-6">
                    {[
                      { icon: Github, label: "Github", href: "https://github.com/OvHvO", target: "_blank" },
                      { icon: Mail, label: "Email", href: gmailLink, target: "_blank" }
                    ].map((social) => (
                      <a 
                        key={social.label}
                        href={social.href}
                        target={social.target}
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-zinc-900 transition-colors transform hover:scale-110"
                      >
                        <social.icon size={24} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t-2 border-zinc-900 bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-black text-xl">
            WK.PUA
          </div>
          
          <div className="flex gap-8 text-zinc-500 font-mono text-xs uppercase tracking-widest">
            <span>waikitpua05@gmail.com</span>
          </div>
        </div>
      </footer>
    </div>
  );
}