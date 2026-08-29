/**
 * ============================================================================
 * JAVASCRIPT PRINCIPAL - PORTFÓLIO & SERVIÇOS DAVID RITTER
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    /* -------------------------------------------------------------------------
     * 1. ATUALIZAÇÃO AUTOMÁTICA DO ANO NO RODAPÉ
     * ----------------------------------------------------------------------- */
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    /* -------------------------------------------------------------------------
     * 2. HEADER STICKY COM EFEITO DE ROLAGEM
     * ----------------------------------------------------------------------- */
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('back-to-top');

    const handleScrollEffects = () => {
        const scrollPosition = window.scrollY;

        // Header com fundo glassmorphic sólido após rolar
        if (header) {
            if (scrollPosition > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Botão voltar ao topo
        if (backToTopBtn) {
            if (scrollPosition > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    };

    window.addEventListener('scroll', handleScrollEffects);
    handleScrollEffects(); // Execução inicial

    /* -------------------------------------------------------------------------
     * 3. MENU MOBILE HAMBÚRGUER
     * ----------------------------------------------------------------------- */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const isOpen = navMenu.classList.contains('open');
            navToggle.innerHTML = isOpen 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });

        // Fechar o menu ao clicar em qualquer link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

        // Fechar ao clicar fora do menu
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }

    /* -------------------------------------------------------------------------
     * 4. LINK ATIVO NA NAVEGAÇÃO DE ACORDO COM A SEÇÃO VISÍVEL
     * ----------------------------------------------------------------------- */
    const sections = document.querySelectorAll('section[id]');

    const highlightActiveNavOnScroll = () => {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

            if (correspondingLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', highlightActiveNavOnScroll);

    /* -------------------------------------------------------------------------
     * 5. EFEITO DE DIGITAÇÃO DINÂMICA (TYPING EFFECT)
     * ----------------------------------------------------------------------- */
    const typingTextEl = document.getElementById('typing-text');
    
    if (typingTextEl) {
        const phrases = [
            "Desenvolvimento Web Front-End",
            "Landing Pages de Alta Conversão",
            "Sites Rápidos & Responsivos",
            "Interfaces Modernas & UI/UX"
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 90;

        function type() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typingTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 45; // Apaga mais rápido
            } else {
                typingTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 85;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                // Pausa quando a frase termina de ser escrita
                typingSpeed = 1800;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 400; // Pausa antes de começar a próxima
            }

            setTimeout(type, typingSpeed);
        }

        type();
    }

    /* -------------------------------------------------------------------------
     * 6. FILTRO DE PROJETOS NO PORTFÓLIO
     * ----------------------------------------------------------------------- */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Atualizar estado ativo dos botões
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                // Filtrar os cards com animação sutil
                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    if (filterValue === 'all' || filterValue === cardCategory) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 250);
                    }
                });
            });
        });
    }

    /* -------------------------------------------------------------------------
     * 7. FORMULÁRIO DE CONTATO & INTEGRAÇÃO COM WHATSAPP
     * ----------------------------------------------------------------------- */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const btnSubmit = document.getElementById('btn-submit');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const assunto = document.getElementById('assunto').value;
            const mensagem = document.getElementById('mensagem').value.trim();

            if (!nome || !email || !mensagem) {
                alert('Por favor, preencha todos os campos obrigatórios (*).');
                return;
            }

            // Desabilitar botão temporariamente para efeito de carregamento
            if (btnSubmit) {
                btnSubmit.disabled = true;
                btnSubmit.innerHTML = '<span>Preparando mensagem...</span> <i class="fas fa-spinner fa-spin"></i>';
            }

            // Montar mensagem para WhatsApp
            const textoWhatsApp = `Olá David!%0A%0A*Nome:* ${encodeURIComponent(nome)}%0A*E-mail:* ${encodeURIComponent(email)}%0A*Telefone:* ${encodeURIComponent(telefone || 'Não informado')}%0A*Tipo de Projeto:* ${encodeURIComponent(assunto || 'Geral')}%0A%0A*Mensagem:*%0A${encodeURIComponent(mensagem)}`;

            setTimeout(() => {
                if (formStatus) {
                    formStatus.className = 'form-status success';
                    formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Mensagem pronta! Abrindo o WhatsApp para envio direto...';
                    formStatus.style.display = 'block';
                }

                if (btnSubmit) {
                    btnSubmit.disabled = false;
                    btnSubmit.innerHTML = '<span>Mensagem Enviada!</span> <i class="fas fa-check"></i>';
                }

                // Número de WhatsApp configurado
                const numeroWhatsApp = "5545984120389"; 
                const whatsappUrl = `https://wa.me/${numeroWhatsApp}?text=${textoWhatsApp}`;

                // Abrir WhatsApp em nova aba
                window.open(whatsappUrl, '_blank');

                // Limpar formulário após alguns segundos
                setTimeout(() => {
                    contactForm.reset();
                    if (btnSubmit) {
                        btnSubmit.innerHTML = '<span>Enviar Mensagem</span> <i class="fas fa-arrow-right"></i>';
                    }
                    if (formStatus) {
                        formStatus.style.display = 'none';
                    }
                }, 4000);

            }, 700);
        });
    }

});
