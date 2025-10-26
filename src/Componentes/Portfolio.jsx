import { useEffect, useState, useMemo } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Menu,
  X,
  Code2,
  Palette,
  Rocket,
  Phone,
  Monitor,
  Smartphone,
  Globe,
  Layers,
  Image as ImageIcon,
  Layout,
  Sun,
  Moon,
    Type,  
  Atom,  
  FileCode, 
  Layers3,  
  Box,      
  GitBranch,
  Activity,
  Brush,  
  } from "lucide-react"; 
import "../Style/Portifolio.css";
import logoLight from "../assets/logo-branco.png"; 
import logoDark from "../assets/logo-azul.png"; 
import profile from "../assets/profile.jpeg";

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [currentService, setCurrentService] = useState(0);

  // ===== Tema (light | dark) — escuro é o padrão =====
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "dark";
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme");
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  // Escolhe a logo conforme o tema
  const navLogoSrc = theme === "light" ? logoDark : logoLight;

  // Dados 
  const skills = useMemo(
    () => [
      { name: "HTML", level: 95, color: "skill-html", icon: Activity },
      { name: "CSS", level: 90, color: "skill-css", icon: Brush },
      { name: "JavaScript", level: 85, color: "skill-javascript", icon: FileCode },
      { name: "React", level: 90, color: "skill-react", icon: Atom },
      { name: "Tailwind CSS", level: 80, color: "skill-tailwind", icon: Layers3 },
      { name: "Sass", level: 75, color: "skill-sass", icon: Box },
      { name: "Bootstrap", level: 85, color: "skill-bootstrap", icon: Box },
      { name: "Git", level: 85, color: "skill-git", icon: GitBranch },
      { name: "TypeScript", level: 70, color: "skill-react", icon: Type },
    ],
    []
  );

  const services = useMemo(
    () => [
      {
        icon: Monitor,
        title: "Aplicação Desktop",
        description:
          "Aplicações multiplataformas exclusivas, para sistemas operacionais Windows, Linux e Mac OS, onde o usuário necessita instalar o software em sua máquina.",
      },
      {
        icon: ImageIcon,
        title: "Design Gráfico",
        description:
          "Essencial para o marketing Digital, uma arte gráfica pode fazer toda a diferença para o seu negócio. Panfletos, flyers, convites, banners, avatars, entre outras.",
      },
      {
        icon: Layout,
        title: "UI/UX Design",
        description:
          "A experiência do usuário e a análise interativa com a aplicação é um diferencial para as aplicações modernas que focam soluções no ponto de vista do usuário.",
      },
      {
        icon: Globe,
        title: "Sistema Integrado",
        description:
          "Envolve o desenvolvimento multiplataformas, onde dispositivos diferentes se comunicam e trabalham em sincronia através da internet.",
      },
      {
        icon: Layers,
        title: "Aplicação Web",
        description:
          "Desde uma simples landpage, sites pessoais ou comercial, até lojas virtuais e sistemas complexos para internet.",
      },
      {
        icon: Smartphone,
        title: "Aplicação Mobile",
        description:
          "Aplicações híbridas ou nativas em multiplataformas para dispositivos móveis com Android ou iOS, disponibilizando em suas respectivas lojas e extraindo o seu instalador.",
      },
    ],
    []
  );

  const projects = useMemo(
    () => [
      {
        title: "Projeto E-commerce",
        description:
          "Loja virtual responsiva com carrinho de compras e integração de API",
        tech: ["React", "Tailwind", "API REST"],
        link: "#",
      },
      {
        title: "Dashboard Analytics",
        description:
          "Painel administrativo com gráficos e visualização de dados",
        tech: ["React", "Chart.js", "Sass"],
        link: "#",
      },
      {
        title: "Landing Page",
        description:
          "Página de conversão moderna com animações e design responsivo",
        tech: ["HTML", "CSS", "JavaScript"],
        link: "#",
      },
      {
        title: "App de Clima",
        description:
          "Aplicação que consome API de clima com busca por cidade",
        tech: ["React", "API", "Bootstrap"],
        link: "#",
      },
      {
        title: "Portfólio Criativo",
        description: "Portfólio interativo com tema escuro e animações",
        tech: ["React", "Tailwind", "Framer Motion"],
        link: "#",
      },
      {
        title: "To-Do List",
        description:
          "Aplicação de tarefas com filtros e armazenamento local",
        tech: ["JavaScript", "CSS", "LocalStorage"],
        link: "#",
      },
    ],
    []
  );

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const ids = ["home", "about", "projects", "skills", "services", "contact"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      {
        root: null,
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0.01,
      }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % services.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [services.length]);

  const navItems = ["home", "about", "projects", "skills", "services", "contact"];

  return (
    <div className="portfolio-container">
      <a className="skip-link" href="#home">
        Pular para o conteúdo
      </a>

      <nav className="portfolio-nav" aria-label="Navegação principal">
        <div className="container nav-flex">
          <a
            href="#home"
            className="nav-logo"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
          >
            <img
              src={navLogoSrc}
              alt="Logo Ingryd Aylana"
              className="nav-logo-img"
              width="32"
              height="32"
              decoding="async"
              fetchPriority="high"
            />
          </a>

          <div
            className="nav-links-desktop"
            role="menubar"
            aria-label="Seções do portfólio"
          >
            {navItems.map((id) => (
              <a
                key={id}
                role="menuitem"
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(id);
                }}
                className={`nav-link-button ${
                  activeSection === id ? "active-section" : ""
                }`}
                aria-current={activeSection === id ? "page" : undefined}
              >
                {id === "services" ? "Serviços" : id[0].toUpperCase() + id.slice(1)}
              </a>
            ))}

            {/* Botão de tema (desktop) */}
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === "light" ? "Ativar tema escuro" : "Ativar tema claro"}
              title={theme === "light" ? "Tema: Claro (clique para Escuro)" : "Tema: Escuro (clique para Claro)"}
            >
              {theme === "light" ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
            </button>
          </div>

          <button
            className="menu-button-mobile"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div
            id="mobile-menu"
            className="mobile-menu"
            role="menu"
            aria-label="Menu móvel"
          >
            <div className="mobile-link-list container">
              {navItems.map((id) => (
                <a
                  key={id}
                  role="menuitem"
                  href={`#${id}`}
                  className="mobile-link-button"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(id);
                  }}
                  aria-current={activeSection === id ? "page" : undefined}
                >
                  {id === "services" ? "Serviços" : id[0].toUpperCase() + id.slice(1)}
                </a>
              ))}

              {/* Botão de tema (mobile) */}
              <button
                className="mobile-link-button"
                role="menuitem"
                onClick={toggleTheme}
                aria-label={theme === "light" ? "Ativar tema escuro" : "Ativar tema claro"}
              >
                {theme === "light" ? "Tema escuro" : "Tema claro"}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section
        id="home"
        className="hero-section section-anchor"
        aria-labelledby="hero-title"
      >
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-icon-wrapper" aria-hidden="true">
              <Code2 size={44} className="hero-icon" />
            </div>

            <h1 id="hero-title" className="hero-title">
              INGRYD AYLANA
            </h1>
            <p className="hero-subtitle">Desenvolvedora Front-End</p>
            <p className="hero-description">
              Apaixonada por transformar ideias em interfaces intuitivas e
              responsivas. Criando experiências digitais memoráveis com código
              limpo e design moderno.
            </p>

            <div
              className="social-links"
              role="group"
              aria-label="Perfis de redes sociais"
            >
              <a
                href="https://github.com/Ingryd-Aylana"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-button"
                aria-label="Abrir GitHub de Ingryd Aylana"
                title="GitHub"
              >
                <Github size={22} aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/in/ingryd-aylana-silva-dos-santos-4a2701158/"
                target="_blank"
                className="social-link-button"
                aria-label="Abrir LinkedIn de Ingryd Aylana"
                title="LinkedIn"
              >
                <Linkedin size={22} aria-hidden="true" />
              </a>
              <a
                href="#contact"
                className="social-link-button"
                aria-label="Ir para seção de contato"
                title="Contato"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
              >
                <Mail size={22} aria-hidden="true" />
              </a>
              <a
                href="https://web.whatsapp.com/21973377060"
                className="social-link-button"
                aria-label="Ir para seção de contato"
                title="Telefone"
                target="_blank"
              >
                <Phone size={22} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="hero-media" aria-hidden="true">
            <div className="hero-photo">
              <img src={profile} alt="" loading="eager" decoding="async" />
            </div>
            <span className="hero-shape hero-dots" />
            <span className="hero-shape hero-stairs" />
            <span className="hero-shape hero-arc" />
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section
        id="about"
        className="section-padding section-anchor"
        aria-labelledby="about-title"
      >
        <div className="container">
          <h2 id="about-title" className="section-title">
            Sobre Mim
          </h2>
          <div className="about-grid">
            <article className="about-card">
              <Palette className="card-icon" size={32} aria-hidden="true" />
              <h3 className="card-title">Design & UX</h3>
              <p className="card-text">
                Curiosa por UX/UI e acessibilidade, busco criar interfaces que
                não apenas funcionam bem, mas também proporcionam experiências
                agradáveis aos usuários.
              </p>
            </article>
            <article className="about-card">
              <Rocket className="card-icon" size={32} aria-hidden="true" />
              <h3 className="card-title">Sempre Evoluindo</h3>
              <p className="card-text">
                Atualmente estudando TypeScript e Node.js, sempre em busca de
                novos desafios e oportunidades para expandir minhas habilidades
                no desenvolvimento web.
              </p>
            </article>
          </div>

          <article className="about-card mt-8">
            <Rocket className="card-icon" size={32} aria-hidden="true" />
            <h3 className="card-title">Desenvolvimento Full Stack</h3>
            <p className="card-text">
              Foco em front-end e constante atualização. Tenho experiência com
              HTML, CSS, JavaScript, React, Git, Bootstrap, Sass, e consumo de
              APIs. Gosto de compartilhar aprendizados e desafios superados no
              desenvolvimento. Sempre aberta para colaborações e novos projetos!
            </p>
          </article>
        </div>
      </section>

      {/* Projetos */}
      <section
        id="projects"
        className="section-padding section-anchor"
        aria-labelledby="projects-title"
      >
        <div className="container">
          <h2 id="projects-title" className="section-title">
            Projetos
          </h2>
          <div className="projects-grid">
            {projects.map((project) => (
              <article key={project.title} className="project-card">
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="card-text mb-4">{project.description}</p>
                <ul
                  className="project-tech-list"
                  aria-label="Tecnologias usadas"
                >
                  {project.tech.map((tech) => (
                    <li key={tech} className="project-tech-item">
                      {tech}
                    </li>
                  ))}
                </ul>
                <a
                  href={project.link}
                  className="project-link"
                  aria-label={`Ver projeto ${project.title}`}
                >
                  Ver projeto <ExternalLink size={16} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Habilidades (MODIFICADO) */}
      <section
        id="skills"
        className="section-padding section-anchor"
        aria-labelledby="skills-title"
      >
        <div className="container">
          <h2 id="skills-title" className="section-title">
            Habilidades
          </h2>

          <div className="skills-grid">
            {skills.map((skill) => {
              const dots = Math.max(1, Math.min(5, Math.round(skill.level / 20)));
              const SkillIcon = skill.icon; // Pega o componente do ícone
              return (
                <article
                  key={skill.name}
                  className="skill-card"
                  aria-label={`${skill.name} nível ${dots} de 5`}
                >
                  <header className="skill-card-header">
                    {/* TROCA DO TEXTO PELO ÍCONE */}
                    <span className={`skill-badge ${skill.color}`}>
                      <SkillIcon size={24} aria-hidden="true" /> 
                    </span>
                    <h3 className="skill-name">{skill.name}</h3>
                  </header>

                  <p className="skill-desc">{skill.level}% de proficiência</p>

                  <div
                    className="skill-level-dots"
                    role="img"
                    aria-label={`Proficiência ${dots} de 5`}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`dot ${i < dots ? "filled" : ""}`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section
        id="services"
        className="section-padding section-anchor"
        aria-labelledby="services-title"
      >
        <div className="container">
          <div className="services-wrapper">
            <div className="services-header">
              <span className="services-tag">SERVIÇOS</span>
              <h2 id="services-title" className="section-title">
                Como posso te ajudar?
              </h2>
              <p className="services-subtitle">
                Se você precisa de um site, aplicativo, está no lugar certo!
              </p>
            </div>

            <div className="services-carousel">
              <div className="services-slider">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  const isActive = index === currentService;
                  const isPrev =
                    index === (currentService - 1 + services.length) % services.length;
                  const isNext = index === (currentService + 1) % services.length;

                  let position = "hidden";
                  if (isActive) position = "active";
                  else if (isPrev) position = "prev";
                  else if (isNext) position = "next";

                  return (
                    <article
                      key={service.title}
                      className={`service-card ${position}`}
                      aria-hidden={!isActive}
                    >
                      <div className="service-icon-wrapper">
                        <Icon size={48} className="service-icon" />
                      </div>
                      <h3 className="service-title">{service.title}</h3>
                      <p className="service-description">{service.description}</p>
                    </article>
                  );
                })}
              </div>

              <div className="carousel-dots">
                {services.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentService(index)}
                    className={`carousel-dot ${index === currentService ? "active" : ""}`}
                    aria-label={`Ir para serviço ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section
        id="contact"
        className="section-padding skills-section section-anchor"
        aria-labelledby="contact-title"
      >
        <div className="container text-center">
          <h2 id="contact-title" className="section-title">
            Vamos Conversar?
          </h2>
          <p className="card-text mb-12 text-lg">
            Sempre aberta para novas oportunidades, colaborações e desafios.
          </p>

          <ul className="contact-pills" role="list">
            <li>
              <a className="contact-pill" href="mailto:seu-email@exemplo.com">
                <span className="pill-icon">
                  <Mail size={18} />
                </span>
                <span className="pill-text">E-mail</span>
              </a>
            </li>
            <li>
              <a
                className="contact-pill"
                href="https://www.linkedin.com/in/ingryd-aylana-silva-dos-santos-4a2701158/"
                target="_blank"
              >
                <span className="pill-icon">
                  <Linkedin size={18} />
                </span>
                <span className="pill-text">LinkedIn</span>
              </a>
            </li>
            <li>
              <a
                className="contact-pill"
                href="https://github.com/Ingryd-Aylana"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="pill-icon">
                  <Github size={18} />
                </span>
                <span className="pill-text">GitHub</span>
              </a>
            </li>
            <li>
              <a
                className="contact-pill"
                href="https://web.whatsapp.com/21973377060"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="pill-icon">
                  <Phone size={18} />
                </span>
                <span className="pill-text">Whatsapp</span>
              </a>
            </li>
          </ul>

          <footer className="portfolio-footer">
            <p>
              Desenvolvido com ❤️ © {new Date().getFullYear()} Ingryd Aylana.
            </p>

            <a
              href="#home"
              className="nav-logo"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("home");
              }}
            >
              <img
                src={navLogoSrc}
                alt="Logo Ingryd Aylana"
                className="nav-logo-img"
                width="32"
                height="32"
                decoding="async"
                fetchPriority="high"
              />
            </a>
          </footer>
        </div>
      </section>
    </div>
  );
}