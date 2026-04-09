const translations = {
  pt: {
    'nav.about': 'Quem sou eu',
    'nav.experience': 'Experiência',
    'nav.projects': 'Projetos',
    'nav.contact': 'Contato',
    'hero.greeting': 'I AM',
    'hero.tagline': 'Projetando produtos que as pessoas realmente usam.',
    'exp.title': 'Experiência',
    'exp.current': 'Atual',
    'exp.weplay': 'Atuação internacional remota em entretenimento esportivo e esports. Experiências de produto para web, colaboração com times multifuncionais em diferentes fusos. Design-to-code handoff com React.js.',
    'exp.moovz': 'Liderança de design em fitness tech. Design end-to-end mobile (iOS/Android) e web, Design System escalável no Figma, lançamento do Ranking de Desafios. Contribuição direta no crescimento de 35 para +600 clientes em 12 meses.',
    'exp.docnix': 'Atuação híbrida com foco em UX/UI em ambiente de produto estruturado. Pesquisa, prototipagem e trabalho colaborativo com times de produto e engenharia.',
    'exp.pacto': 'Primeira experiência formal em UX com foco em soluções corporativas. Criação de mockups, mapeamento da experiência do cliente e design centrado no usuário.',
    'exp.freelance.role': 'Designer Gráfico / UX-UI',
    'exp.freelance': '+6 anos de atuação independente em branding, marketing digital e design de produto. Identidade visual, tipografia, teoria das cores e gestão de projetos.',
    'skills.title': 'Habilidades',
    'skills.product': 'Design de produto end-to-end, pesquisa com usuários, prototipagem e testes de usabilidade.',
    'skills.frontend': 'React.js, HTML, CSS, JavaScript. Implementação de interfaces e design-to-code handoff.',
    'skills.figma': 'Design Systems escaláveis, componentes, prototipagem avançada e Auto Layout.',
    'skills.adobe': 'Photoshop, Illustrator e InDesign. Branding, identidade visual e materiais gráficos.',
    'skills.ai': 'Integração de ferramentas de inteligência artificial no fluxo de design e desenvolvimento.',
    'skills.ds': 'Criação e manutenção de sistemas de design escaláveis com tokens, componentes e documentação.',
    'highlights.title': 'Destaques',
    'highlights.badge.project': 'Projeto',
    'highlights.badge.article': 'Artigo',
    'highlights.project.desc': 'Case de produto com resultados de impacto. Clique para ver o estudo completo.',
    'highlights.linkedin.title': 'Post sobre Design Systems',
    'highlights.linkedin.desc': 'Reflexão sobre como escalar design systems em startups de alto crescimento.',
    'highlights.article.title': 'Título do Artigo',
    'highlights.article.desc': 'Um artigo sobre processo de design, ferramentas ou aprendizados de carreira.',
    'projects.title': 'Projetos',
    'projects.taskland.desc': 'Product Design & Frontend · 2025',
    'highlights.taskland.desc': 'Gerenciador de tarefas gamificado que transforma sua lista em batalhas RPG. Case study completo.',
    'contact.title': 'Vamos conversar?',
    'cursor.view': 'Ver',
  },
  en: {
    'nav.about': 'About me',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'hero.greeting': 'I AM',
    'hero.tagline': 'Designing products that people actually use.',
    'exp.title': 'Experience',
    'exp.current': 'Current',
    'exp.weplay': 'International remote work in sports entertainment and esports. Web product experiences, cross-functional collaboration across time zones. Design-to-code handoff with React.js.',
    'exp.moovz': 'Design leadership in fitness tech. End-to-end mobile (iOS/Android) and web design, scalable Design System in Figma, launched the Challenge Ranking feature. Direct contribution to growth from 35 to 600+ clients in 12 months.',
    'exp.docnix': 'Hybrid role focused on UX/UI in a structured product environment. Research, prototyping, and collaborative work with product and engineering teams.',
    'exp.pacto': 'First formal UX role focused on enterprise solutions. Mockup creation, customer experience mapping, and user-centered design.',
    'exp.freelance.role': 'Graphic Designer / UX-UI',
    'exp.freelance': '6+ years of independent work in branding, digital marketing, and product design. Visual identity, typography, color theory, and project management.',
    'skills.title': 'Skills',
    'skills.product': 'End-to-end product design, user research, prototyping, and usability testing.',
    'skills.frontend': 'React.js, HTML, CSS, JavaScript. Interface implementation and design-to-code handoff.',
    'skills.figma': 'Scalable Design Systems, components, advanced prototyping, and Auto Layout.',
    'skills.adobe': 'Photoshop, Illustrator, and InDesign. Branding, visual identity, and graphic materials.',
    'skills.ai': 'AI tools integration into design and development workflows.',
    'skills.ds': 'Creation and maintenance of scalable design systems with tokens, components, and documentation.',
    'highlights.title': 'Highlights',
    'highlights.badge.project': 'Project',
    'highlights.badge.article': 'Article',
    'highlights.project.desc': 'Product case study with impactful results. Click to see the full study.',
    'highlights.linkedin.title': 'Post about Design Systems',
    'highlights.linkedin.desc': 'Thoughts on scaling design systems in high-growth startups.',
    'highlights.article.title': 'Article Title',
    'highlights.article.desc': 'An article about design process, tools, or career learnings.',
    'projects.title': 'Projects',
    'projects.taskland.desc': 'Product Design & Frontend · 2025',
    'highlights.taskland.desc': 'Gamified task manager that turns your to-do list into RPG battles. Full case study.',
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
