// Aguarda o HTML ser totalmente carregado antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

  const defaultConfig = {
    main_title: "Seu Nome",
    subtitle: "Sua Profissão ou Frase",
    description: "Escreva aqui uma breve descrição sobre você. Conte um pouco sobre sua personalidade, seus interesses e o que faz você único. Esta é sua oportunidade de se apresentar ao mundo!",
    section_title: "Conheça Minha História",
    section_subtitle: "Explore diferentes aspectos da minha vida e jornada pessoal",
    biography_title: "Biografia",
    biography_content: "Aqui você pode escrever sua biografia completa. Conte sobre sua infância, suas origens, momentos marcantes da sua vida e como você se tornou a pessoa que é hoje. Compartilhe suas memórias favoritas e experiências que moldaram sua personalidade.",
    profession_title: "Profissão",
    profession_content: "Descreva sua carreira profissional, suas habilidades, conquistas e projetos importantes. Fale sobre sua formação, experiências de trabalho e o que você ama fazer profissionalmente. Compartilhe seus sucessos e aprendizados.",
    friends_title: "Amigos e Família",
    friends_content: "Fale sobre as pessoas especiais em sua vida - seus amigos mais próximos e sua família. Compartilhe histórias engraçadas, momentos memoráveis e o que essas pessoas significam para você. Descreva as tradições familiares e amizades duradouras.",
    relationship_title: "Relacionamento",
    relationship_content: "Compartilhe sobre sua vida amorosa e relacionamentos significativos. Fale sobre o que você valoriza em um parceiro, suas experiências românticas e o que o amor significa para você. Conte sua história de amor ou suas expectativas para o futuro.",
    school_title: "Escola",
    school_content: "Descreva sua jornada educacional desde a infância até hoje. Fale sobre suas escolas favoritas, professores marcantes, matérias que você amava e conquistas acadêmicas. Compartilhe memórias da época de estudante e como a educação impactou sua vida.",
    future_title: "Planos Futuros",
    future_content: "Compartilhe seus sonhos e planos para o futuro. Onde você se vê daqui a 5 ou 10 anos? Quais são seus objetivos pessoais e profissionais? Fale sobre seus projetos, aspirações e o legado que deseja deixar.",
    primary_color: "#A599B5",
    secondary_color: "#048A33",
    background_color: "#E9C46A",
    text_color: "#264653",
    accent_color: "#ffffff"
  };

  let currentCategory = null;

  const categoryMap = {
    biography: { title: 'biography_title', content: 'biography_content' },
    profession: { title: 'profession_title', content: 'profession_content' },
    friends: { title: 'friends_title', content: 'friends_content' },
    relationship: { title: 'relationship_title', content: 'relationship_content' },
    school: { title: 'school_title', content: 'school_content' },
    future: { title: 'future_title', content: 'future_content' }
  };

  function openModal(category) {
    const config = window.elementSdk ? window.elementSdk.config : defaultConfig;
    const categoryInfo = categoryMap[category];
    
    document.getElementById('modalTitle').textContent = config[categoryInfo.title] || defaultConfig[categoryInfo.title];
    document.getElementById('modalContent').textContent = config[categoryInfo.content] || defaultConfig[categoryInfo.content];
    
    document.getElementById('modalPopup').classList.add('active');
    currentCategory = category;
  }

  function closeModal() {
    document.getElementById('modalPopup').classList.remove('active');
    currentCategory = null;
  }

  async function onConfigChange(config) {
    document.getElementById('mainTitle').textContent = config.main_title || defaultConfig.main_title;
    document.getElementById('subtitle').textContent = config.subtitle || defaultConfig.subtitle;
    document.getElementById('description').textContent = config.description || defaultConfig.description;
    document.getElementById('sectionTitle').textContent = config.section_title || defaultConfig.section_title;
    document.getElementById('sectionSubtitle').textContent = config.section_subtitle || defaultConfig.section_subtitle;
    document.getElementById('biographyTitle').textContent = config.biography_title || defaultConfig.biography_title;
    document.getElementById('professionTitle').textContent = config.profession_title || defaultConfig.profession_title;
    document.getElementById('friendsTitle').textContent = config.friends_title || defaultConfig.friends_title;
    document.getElementById('relationshipTitle').textContent = config.relationship_title || defaultConfig.relationship_title;
    document.getElementById('schoolTitle').textContent = config.school_title || defaultConfig.school_title;
    document.getElementById('futureTitle').textContent = config.future_title || defaultConfig.future_title;

    if (currentCategory) {
      const categoryInfo = categoryMap[currentCategory];
      document.getElementById('modalTitle').textContent = config[categoryInfo.title] || defaultConfig[categoryInfo.title];
      document.getElementById('modalContent').textContent = config[categoryInfo.content] || defaultConfig[categoryInfo.content];
    }

    const primaryColor = config.primary_color || defaultConfig.primary_color;
    const secondaryColor = config.secondary_color || defaultConfig.secondary_color;
    const backgroundColor = config.background_color || defaultConfig.background_color;
    const textColor = config.text_color || defaultConfig.text_color;
    const accentColor = config.accent_color || defaultConfig.accent_color;

    document.body.style.background = secondaryColor;
    document.querySelector('.hero-banner').style.background = primaryColor;
    // O seletor original '.hero-subtitle' parecia errado, mas mantive. Se a cor não aplicar, avise.
    // O modal-close inline no HTML também usa a cor primária, mantive lá.
    // document.querySelector('.hero-subtitle').style.color = primaryColor; 
    // document.querySelector('.modal-close').style.background = primaryColor;

    const cards = document.querySelectorAll('.category-card');
    cards.forEach(card => {
      card.style.background = backgroundColor;
    });

    const categoryImages = document.querySelectorAll('.category-image');
    categoryImages.forEach(img => {
      img.style.background = primaryColor;
    });

    const profilePhoto = document.querySelector('.profile-photo');
    profilePhoto.style.background = textColor;

    const titles = document.querySelectorAll('.hero-title, .category-title, .modal-title, .section-title, .section-subtitle');
    titles.forEach(title => {
      title.style.color = textColor;
    });

    const descriptions = document.querySelectorAll('.hero-description, .category-description, .modal-text');
    descriptions.forEach(desc => {
      desc.style.color = accentColor;
    });

    const categoriesSection = document.querySelector('.categories-section');
    categoriesSection.style.background = `rgba(233, 196, 106, 0.95)`; // Este estava fixo, mantive.

    // O modal-content inline no HTML usa backgroundColor, mantive lá.
    // document.querySelector('.modal-content').style.background = backgroundColor;
  }

  if (window.elementSdk) {
    window.elementSdk.init({
      defaultConfig,
      onConfigChange,
      mapToCapabilities: (config) => ({
        recolorables: [
          {
            get: () => config.primary_color || defaultConfig.primary_color,
            set: (value) => {
              config.primary_color = value;
              window.elementSdk.setConfig({ primary_color: value });
            }
          },
          {
            get: () => config.secondary_color || defaultConfig.secondary_color,
            set: (value) => {
              config.secondary_color = value;
              window.elementSdk.setConfig({ secondary_color: value });
            }
          },
          {
            get: () => config.background_color || defaultConfig.background_color,
            set: (value) => {
              config.background_color = value;
              window.elementSdk.setConfig({ background_color: value });
            }
          },
          {
            get: () => config.text_color || defaultConfig.text_color,
            set: (value) => {
              config.text_color = value;
              window.elementSdk.setConfig({ text_color: value });
            }
          },
          {
            get: () => config.accent_color || defaultConfig.accent_color,
            set: (value) => {
              config.accent_color = value;
              window.elementSdk.setConfig({ accent_color: value });
            }
          }
        ],
        borderables: [],
        fontEditable: undefined,
        fontSizeable: undefined
      }),
      mapToEditPanelValues: (config) => new Map([
        ["main_title", config.main_title || defaultConfig.main_title],
        ["subtitle", config.subtitle || defaultConfig.subtitle],
        ["description", config.description || defaultConfig.description],
        ["section_title", config.section_title || defaultConfig.section_title],
        ["section_subtitle", config.section_subtitle || defaultConfig.section_subtitle],
        ["biography_title", config.biography_title || defaultConfig.biography_title],
        ["biography_content", config.biography_content || defaultConfig.biography_content],
        ["profession_title", config.profession_title || defaultConfig.profession_title],
        ["profession_content", config.profession_content || defaultConfig.profession_content],
        ["friends_title", config.friends_title || defaultConfig.friends_title],
        ["friends_content", config.friends_content || defaultConfig.friends_content],
        ["relationship_title", config.relationship_title || defaultConfig.relationship_title],
        ["relationship_content", config.relationship_content || defaultConfig.relationship_content],
        ["school_title", config.school_title || defaultConfig.school_title],
        ["school_content", config.school_content || defaultConfig.school_content],
        ["future_title", config.future_title || defaultConfig.future_title],
        ["future_content", config.future_content || defaultConfig.future_content]
      ])
    });
  }
  
  // Aplica a configuração inicial caso o SDK não exista (para testes locais)
  if (!window.elementSdk) {
      onConfigChange(defaultConfig);
  }

  // Event Listeners para os cards
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      openModal(category);
    });
  });

  // Event Listener para fechar o modal
  document.getElementById('closeModal').addEventListener('click', function() {
    closeModal();
  });

  // Fechar modal ao clicar fora dele
  document.getElementById('modalPopup').addEventListener('click', function(e) {
    if (e.target === this) {
      closeModal();
    }
  });

});
