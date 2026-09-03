/**
 * ============================================================================
 * JAVASCRIPT PRINCIPAL - PORTFÓLIO & SERVIÇOS DAVID RITTER
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    /* -------------------------------------------------------------------------
     * 0. INICIALIZAÇÃO
     * ----------------------------------------------------------------------- */
    // AOS removido para garantir compatibilidade com todos os navegadores e adblockers.

    /* -------------------------------------------------------------------------
     * 1. CURSOR PERSONALIZADO & PARALLAX NO HERO
     * ----------------------------------------------------------------------- */
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    const heroCard = document.getElementById('hero-card');
    
    // Ocultar cursor padrão apenas em dispositivos não touch
    if (window.matchMedia("(pointer: fine)").matches) {
        
        let mouseX = 0;
        let mouseY = 0;
        let ringX = 0;
        let ringY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Atualizar dot imediatamente
            if (cursorDot) {
                cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
            }

            // Efeito Parallax suave no Hero Card
            if (heroCard) {
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                const percentX = (mouseX - centerX) / centerX;
                const percentY = (mouseY - centerY) / centerY;
                
                // Limitar rotação
                const maxRotate = 8;
                heroCard.style.transform = `perspective(1000px) rotateY(${percentX * maxRotate}deg) rotateX(${percentY * -maxRotate}deg) translateY(-10px)`;
            }
        });

        // Interpolação linear para o anel (smooth follow)
        const renderRing = () => {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            
            if (cursorRing) {
                cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
            }
            requestAnimationFrame(renderRing);
        };
        requestAnimationFrame(renderRing);

        // Efeito Hover em links e botões
        const interactables = document.querySelectorAll('a, button, .project-card, .service-card, .contato-item, .skill-card');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => cursorRing?.classList.add('hovered'));
            el.addEventListener('mouseleave', () => cursorRing?.classList.remove('hovered'));
        });
    }

    /* -------------------------------------------------------------------------
     * 2. ATUALIZAÇÃO AUTOMÁTICA DO ANO NO RODAPÉ
     * ----------------------------------------------------------------------- */
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    /* -------------------------------------------------------------------------
     * 3. HEADER STICKY COM EFEITO DE ROLAGEM
     * ----------------------------------------------------------------------- */
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('back-to-top');

    const handleScrollEffects = () => {
        const scrollPosition = window.scrollY;

        if (header) {
            if (scrollPosition > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        if (backToTopBtn) {
            if (scrollPosition > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    };

    window.addEventListener('scroll', handleScrollEffects, { passive: true });
    handleScrollEffects();

    /* -------------------------------------------------------------------------
     * 4. MENU MOBILE HAMBÚRGUER
     * ----------------------------------------------------------------------- */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            navToggle.classList.toggle('open');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                navToggle.classList.remove('open');
            });
        });
    }

    /* -------------------------------------------------------------------------
     * 5. LINK ATIVO NA NAVEGAÇÃO DE ACORDO COM A SEÇÃO VISÍVEL
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

    window.addEventListener('scroll', highlightActiveNavOnScroll, { passive: true });

    /* -------------------------------------------------------------------------
     * 6. EFEITO DE DIGITAÇÃO DINÂMICA (TYPING EFFECT)
     * ----------------------------------------------------------------------- */
    const typingTextEl = document.getElementById('typing-text');
    
    if (typingTextEl) {
        const phrases = [
            "Front-End & UI/UX",
            "Landing Pages de Alta Conversão",
            "Sites Rápidos & Responsivos",
            "Interfaces Modernas"
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
                typingSpeed = 45;
            } else {
                typingTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 85;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                typingSpeed = 1800;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 400;
            }

            setTimeout(type, typingSpeed);
        }

        setTimeout(type, 1000); // Delay inicial
    }

    /* -------------------------------------------------------------------------
     * 7. FILTRO DE PROJETOS NO PORTFÓLIO
     * ----------------------------------------------------------------------- */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

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
                
                // Cards filtrados
                setTimeout(() => {
                    // Timeout apenas para aguardar a transição visual
                }, 300);
            });
        });
    }

    /* -------------------------------------------------------------------------
     * 8. CONTADOR ANIMADO (STATS SECTION)
     * ----------------------------------------------------------------------- */
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasCounted = false;

    const startCounting = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasCounted) {
                hasCounted = true;
                
                statNumbers.forEach(stat => {
                    const target = +stat.getAttribute('data-target');
                    const duration = 2000; // ms
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            stat.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            stat.innerText = target + (stat.id === 'stat-tech' ? '+' : '');
                        }
                    };
                    updateCounter();
                });
                
                observer.unobserve(entry.target);
            }
        });
    };

    const statsSection = document.getElementById('stats');
    if (statsSection && statNumbers.length > 0) {
        const observer = new IntersectionObserver(startCounting, { threshold: 0.5 });
        observer.observe(statsSection);
    }

    /* -------------------------------------------------------------------------
     * 9. FORMULÁRIO DE CONTATO & INTEGRAÇÃO COM WHATSAPP
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

            if (btnSubmit) {
                btnSubmit.disabled = true;
                btnSubmit.innerHTML = '<span>Preparando mensagem...</span> <i class="fas fa-spinner fa-spin"></i>';
            }

            const textoWhatsApp = `Olá David!%0A%0A*Nome:* ${encodeURIComponent(nome)}%0A*E-mail:* ${encodeURIComponent(email)}%0A*Telefone:* ${encodeURIComponent(telefone || 'Não informado')}%0A*Tipo de Projeto:* ${encodeURIComponent(assunto || 'Geral')}%0A%0A*Mensagem:*%0A${encodeURIComponent(mensagem)}`;

            setTimeout(() => {
                if (formStatus) {
                    formStatus.className = 'form-status success';
                    formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Mensagem pronta! Abrindo o WhatsApp para envio direto...';
                    formStatus.style.display = 'flex';
                }

                if (btnSubmit) {
                    btnSubmit.disabled = false;
                    btnSubmit.innerHTML = '<span>Mensagem Enviada!</span> <i class="fas fa-check"></i>';
                }

                const numeroWhatsApp = "5545984120389"; 
                const whatsappUrl = `https://wa.me/${numeroWhatsApp}?text=${textoWhatsApp}`;

                window.open(whatsappUrl, '_blank');

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

    /* -------------------------------------------------------------------------
     * 10. SISTEMA DE PARTÍCULAS (CANVAS)
     * ----------------------------------------------------------------------- */
    const initParticles = () => {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        let w = canvas.width = window.innerWidth;
        let h = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            init();
        });

        class Particle {
            constructor() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                // Cores da paleta: violeta, ciano, rosa
                const colors = ['#a855f7', '#06b6d4', '#ec4899'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.alpha = Math.random() * 0.5 + 0.1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > w) this.x = 0;
                if (this.x < 0) this.x = w;
                if (this.y > h) this.y = 0;
                if (this.y < 0) this.y = h;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.alpha;
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            // Ajustar quantidade baseada no tamanho da tela para performance
            const particleCount = Math.floor(w / 15);
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, w, h);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            
            // Desenhar linhas entre partículas próximas
            ctx.globalAlpha = 0.05;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = particles[i].color;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            
            requestAnimationFrame(animate);
        };

        init();
        animate();
    };

    // Iniciar partículas
    if (window.matchMedia("(min-width: 768px)").matches) {
        initParticles(); // Ativar apenas em desktop/tablet para performance
    }

});
