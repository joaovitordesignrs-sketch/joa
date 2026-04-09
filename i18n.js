const translations = {
  pt: {
    'nav.about': 'Sobre',
    'nav.experience': 'Experiência',
    'nav.projects': 'Projetos',
    'nav.contact': 'Contato',
    'hero.greeting': 'I AM',
    'hero.tagline': 'Product Designer com 6+ anos criando produtos digitais para Mobile, Web e TV que conectam metas de negócio com necessidades reais de usuários.',
    'exp.title': 'Experiência',
    'exp.current': 'Atual',
    'exp.weplay': 'Experiências de produto para plataformas web colaborando com times internacionais em múltiplos fusos. Componentes de UI e entregas 100% alinhadas com padrões de marca e produto. Operação autônoma em ambiente remoto e assíncrono.',
    'exp.moovz': 'Liderança de design end-to-end (UX/UI) para Mobile (iOS/Android) e Web. Liderou iniciativa B2C mobile com time de 3 devs. Projetou e lançou o sistema de Ranking de Desafios que impulsionou engajamento em base de 600+ clientes. Design System escalável no Figma usado em todas as plataformas. Pesquisa de campo em São Paulo com usuários reais.',
    'exp.docnix': 'Responsável pela experiência do usuário em produto SaaS, cobrindo pesquisa, wireframes, protótipos e testes. Liderou reestruturação de processos para cultura centrada no usuário. Arquitetou Design System escalável para a plataforma. Fluxos validados para criação de incidentes e módulos de governança.',
    'exp.pacto': 'Experiência completa para dois apps mobile de fitness (PersonalFit & Treino App) publicados no Google Play. Redesign completo do PersonalFit, elevando avaliação de 1 para 4.9 estrelas. Interfaces para 500+ personal trainers, reduzindo tempo de conclusão de tarefas em 40%.',
    'exp.freelance.role': 'Designer Gráfico & UX/UI',
    'exp.freelance': 'Atendimento a clientes de diversos setores (startups, agências, negócios locais) entregando identidade visual, comunicação digital e UI para produtos digitais. Gestão autônoma de projetos, escopo e comunicação com clientes.',
    'skills.title': 'Habilidades',
    'skills.product': 'Design de produto end-to-end, pesquisa com usuários, prototipagem e testes de usabilidade. Mobile (iOS/Android), Web e TV.',
    'skills.frontend': 'React.js (em desenvolvimento ativo), HTML, CSS. Implementação de interfaces e design-to-code.',
    'skills.figma': 'Design Systems escaláveis, componentes, prototipagem avançada e Auto Layout.',
    'skills.adobe': 'Photoshop, Illustrator e InDesign. Branding, identidade visual e materiais gráficos.',
    'skills.ai': 'Integração de ferramentas de IA no fluxo de design e desenvolvimento.',
    'skills.ds': 'Criação e manutenção de sistemas de design escaláveis com tokens, componentes e documentação.',
    'highlights.title': 'Destaques',
    'highlights.badge.project': 'Projeto',
    'highlights.taskland.desc': 'Gerenciador de tarefas gamificado que transforma sua lista em batalhas RPG. Case study completo.',
    'projects.title': 'Projetos',
    'projects.taskland.desc': 'Product Design & Frontend · 2025',
    'contact.title': 'Vamos conversar?',
    'cursor.view': 'Ver',
  },
  en: {
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'hero.greeting': 'I AM',
    'hero.tagline': 'Product Designer with 6+ years creating digital products for Mobile, Web, and TV that bridge business goals with real user needs.',
    'exp.title': 'Experience',
    'exp.current': 'Current',
    'exp.weplay': 'Delivered product experiences for web platforms collaborating with international cross-functional teams across multiple time zones. Shipped UI components 100% aligned with brand and product standards. Operated autonomously in a fully remote and asynchronous environment.',
    'exp.moovz': 'Led end-to-end design (UX/UI) for Mobile (iOS & Android) and Web. Spearheaded a B2C mobile initiative leading a team of 3 developers. Designed and launched the Challenge Ranking system boosting engagement across 600+ active clients. Built a scalable Design System in Figma. Conducted field research in São Paulo with real users.',
    'exp.docnix': 'Owned the user experience for a SaaS product covering research, wireframes, prototypes, and user testing. Led a company-wide process restructuring toward user-centered culture. Architected a scalable Design System. Produced validated flows for incident creation and governance modules.',
    'exp.pacto': 'Crafted the complete experience for two mobile fitness apps (PersonalFit & Treino App) on Google Play. Led the full redesign of PersonalFit, improving ratings from 1 to 4.9 stars. Created interfaces for 500+ personal trainers, reducing task completion time by 40%.',
    'exp.freelance.role': 'Graphic Designer & UX/UI',
    'exp.freelance': 'Served clients across sectors (startups, agencies, local businesses) delivering visual identity, digital communication, and UI for digital products. Autonomous project management, scoping, and client communication.',
    'skills.title': 'Skills',
    'skills.product': 'End-to-end product design, user research, prototyping, and usability testing. Mobile (iOS/Android), Web, and TV.',
    'skills.frontend': 'React.js (actively developing), HTML, CSS. Interface implementation and design-to-code.',
    'skills.figma': 'Scalable Design Systems, components, advanced prototyping, and Auto Layout.',
    'skills.adobe': 'Photoshop, Illustrator, and InDesign. Branding, visual identity, and graphic materials.',
    'skills.ai': 'AI tools integration into design and development workflows.',
    'skills.ds': 'Creation and maintenance of scalable design systems with tokens, components, and documentation.',
    'highlights.title': 'Highlights',
    'highlights.badge.project': 'Project',
    'highlights.taskland.desc': 'Gamified task manager that turns your to-do list into RPG battles. Full case study.',
    'projects.title': 'Projects',
    'projects.taskland.desc': 'Product Design & Frontend · 2025',
    'contact.title': "Let's talk?",
    'cursor.view': 'View',
  }
};

// Detect browser language
function getDefaultLang() {
  const saved = localStorage.getItem('lang');
  if (saved) return saved;
  const browserLang = navigator.language || navigator.userLanguage;
  return browserLang.startsWith('pt') ? 'pt' : 'en';
}

let currentLang = getDefaultLang();

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

  // Update all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Update toggle UI
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === lang);
  });

  // Notify content-loader
  document.dispatchEvent(new CustomEvent('langChanged', { detail: { lang } }));
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  setLang(currentLang);

  const toggle = document.getElementById('langToggle');
  toggle.addEventListener('click', () => {
    setLang(currentLang === 'pt' ? 'en' : 'pt');
  });
});
