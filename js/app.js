// Vue.js Application
const { createApp } = Vue;

createApp({
    data() {
        return {
            scrolled: false,
            mobileMenuOpen: false,
            activeFilter: 'all',
            showProjectModal: false,
            selectedProject: null,
            skills: [
                {
                    id: 1,
                    name: 'Vue.js',
                    description: 'Framework JavaScript progressivo per UI moderne',
                    icon: 'fab fa-vuejs',
                    class: 'vue',
                    level: 85,
                    delay: 100
                },
                {
                    id: 2,
                    name: 'JavaScript',
                    description: 'Linguaggio di programmazione versatile e potente',
                    icon: 'fab fa-js-square',
                    class: 'javascript',
                    level: 90,
                    delay: 200
                },
                {
                    id: 3,
                    name: 'HTML/CSS',
                    description: 'Markup e styling per web moderne e responsive',
                    icon: 'fab fa-html5',
                    class: 'html',
                    level: 95,
                    delay: 300
                },
                
                {
                    id: 5,
                    name: 'PHP',
                    description: 'Linguaggio server-side per applicazioni web',
                    icon: 'fab fa-php',
                    class: 'php',
                    level: 75,
                    delay: 500
                },
                {
                    id: 6,
                    name: 'MySQL',
                    description: 'Database relazionale per gestione dati',
                    icon: 'fas fa-database',
                    class: 'mysql',
                    level: 85,
                    delay: 600
                },
               
            ],
            projects: [
                {
                    id: 1,
                    title: 'GymFinder',
                    description: 'Piattaforma web per la ricerca e prenotazione di palestre locali',
                    fullDescription: 'GymFinder è una piattaforma completa che permette agli utenti di trovare, confrontare e prenotare palestre nella loro zona. Include sistema di recensioni, mappe interattive e gestione prenotazioni.',
                    image: 'assets/images/gymfinder.png',
                    technologies: ['Vue.js', 'PHP', 'MySQL', 'Google Maps API'],
                    category: 'fullstack',
                    demo: 'https://gymfinder.onstep.it',
                    github: 'https://github.com/MFSilvers/Palestra',
                    delay: 100
                },
                {
                    id: 2,
                    title: 'chat-linkr',
                    description: 'Piattaforma di messaggistica in tempo reale professionale e moderna',
                    fullDescription: 'Chat-Linkr è l’app di messaggistica istantanea che ti permette di connetterti con chi vuoi, in qualsiasi momento. Registrati in pochi secondi, trova altri utenti e inizia subito a chattare in tempo reale',
                    image: 'assets/images/chat-linkr.png',
                    technologies: ['Vue.js', 'PHP', 'MySQL', 'bootstrap'],
                    category: 'fullstack',
                    demo: 'https://chat-linkr.vercel.app/',
                    github: 'https://github.com/MFSilvers/ChatLink',
                    delay: 100
                },
                {
                    id: 3,
                    title: 'Finanza',
                    description: 'Finanza è un’app web per gestire le tue finanze personali, monitorare entrate, uscite e bilancio mensile in modo semplice e intuitivo.',
                    fullDescription: 'Finanza è un’app web per la gestione delle finanze personali che consente di registrare entrate e uscite e visualizzare il bilancio in modo semplice e chiaro, aiutando a tenere sotto controllo le proprie spese.',
                    image: 'assets/images/Finanza.png',
                    technologies: ['Vue.js', 'PHP', 'MySQL', 'bootstrap'],
                    category: 'fullstack',
                    demo: 'https://finanza-flax.vercel.app/',
                    github: 'https://github.com/MFSilvers/Finanza-Front-end',
                    delay: 100
                },
                
                
                
            ]
        }
    },
    computed: {
        filteredProjects() {
            if (this.activeFilter === 'all') {
                return this.projects;
            }
            return this.projects.filter(project => project.category === this.activeFilter);
        }
    },
    mounted() {
        this.initializeApp();
    },
    methods: {
        async initializeApp() {
            // Initialize AOS
            AOS.init({
                duration: 0,
                once: true,
                offset: 0
            });

            // Initialize Three.js scenes
            //await this.initHeroScene();
            // await this.initAvatarScene();
            
            // Setup scroll listeners
            this.setupScrollListeners();
            
            // Setup intersection observers
            this.setupIntersectionObservers();
            
            // Initialize counters
            this.initCounters();
            
            // Decrypt contact information
            this.decryptContactInfo();
            
        },

        async initHeroScene() {
            const canvas = document.getElementById('hero-canvas');
            if (!canvas) return;

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
            
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0x000000, 0);

            // Create animated background
            const geometry = new THREE.BufferGeometry();
            const vertices = [];
            const colors = [];

            for (let i = 0; i < 5000; i++) {
                vertices.push(
                    (Math.random() - 0.5) * 2000,
                    (Math.random() - 0.5) * 2000,
                    (Math.random() - 0.5) * 2000
                );
                
                const color = new THREE.Color();
                color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.5);
                colors.push(color.r, color.g, color.b);
            }

            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
            geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

            const material = new THREE.PointsMaterial({
                size: 2,
                vertexColors: true,
                transparent: true,
                opacity: 0.8
            });

            const particles = new THREE.Points(geometry, material);
            scene.add(particles);

            camera.position.z = 1000;

            // Animation loop
            const animate = () => {
                requestAnimationFrame(animate);
                
                particles.rotation.x += 0.0005;
                particles.rotation.y += 0.001;
                
                renderer.render(scene, camera);
            };
            
            animate();

            // Handle resize
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
        },

        async initAvatarScene() {
            const container = document.getElementById('avatar-container');
            if (!container) return;

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            
            renderer.setSize(400, 400);
            renderer.setClearColor(0x000000, 0);
            container.appendChild(renderer.domElement);

            // Create geometric avatar
            const group = new THREE.Group();

            // Main sphere
            const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
            const sphereMaterial = new THREE.MeshPhongMaterial({
                color: 0x4f46e5,
                transparent: true,
                opacity: 0.8,
                shininess: 100
            });
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            group.add(sphere);

            // Orbiting rings
            for (let i = 0; i < 3; i++) {
                const ringGeometry = new THREE.RingGeometry(1.5 + i * 0.3, 1.7 + i * 0.3, 32);
                const ringMaterial = new THREE.MeshBasicMaterial({
                    color: 0x06b6d4,
                    transparent: true,
                    opacity: 0.6,
                    side: THREE.DoubleSide
                });
                const ring = new THREE.Mesh(ringGeometry, ringMaterial);
                ring.rotation.x = Math.PI / 2 + i * 0.3;
                ring.rotation.y = i * 0.5;
                group.add(ring);
            }

            scene.add(group);

            // Lighting
            const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(5, 5, 5);
            scene.add(directionalLight);

            camera.position.z = 5;

            // Animation
            const animate = () => {
                requestAnimationFrame(animate);
                
                group.rotation.y += 0.01;
                group.children.forEach((child, index) => {
                    if (child.geometry instanceof THREE.RingGeometry) {
                        child.rotation.z += 0.02 * (index + 1);
                    }
                });
                
                renderer.render(scene, camera);
            };
            
            animate();
        },

        setupScrollListeners() {
            window.addEventListener('scroll', () => {
                this.scrolled = window.scrollY > 50;
                
                // Close mobile menu when scrolling (only on mobile)
                if (this.mobileMenuOpen && window.innerWidth <= 768) {
                    this.mobileMenuOpen = false;
                    this.closeMobileMenu();
                }
            });
        },

        setupIntersectionObservers() {
            // Animate skill bars when in view
            const skillsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const progressBars = entry.target.querySelectorAll('.skill-progress');
                        progressBars.forEach(bar => {
                            const width = bar.style.width;
                            bar.style.width = '0%';
                            setTimeout(() => {
                                bar.style.transition = 'width 2s ease-in-out';
                                bar.style.width = width;
                            }, 200);
                        });
                    }
                });
            });

            const skillsSection = document.getElementById('skills');
            if (skillsSection) {
                skillsObserver.observe(skillsSection);
            }
        },

        initCounters() {
            const counters = document.querySelectorAll('.stat-number');
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = entry.target;
                        const target = parseInt(counter.getAttribute('data-target'));
                        const increment = target / 100;
                        let current = 0;

                        const updateCounter = () => {
                            if (current < target) {
                                current += increment;
                                counter.textContent = Math.ceil(current);
                                setTimeout(updateCounter, 20);
                            } else {
                                counter.textContent = target;
                            }
                        };

                        updateCounter();
                        counterObserver.unobserve(counter);
                    }
                });
            });

            counters.forEach(counter => {
                counterObserver.observe(counter);
            });
        },


        scrollTo(elementId) {
            const element = document.getElementById(elementId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Only close mobile menu if we're on mobile
            if (window.innerWidth <= 768) {
                this.mobileMenuOpen = false;
                this.closeMobileMenu();
            }
        },

        toggleMobileMenu() {
            this.mobileMenuOpen = !this.mobileMenuOpen;
            
            if (this.mobileMenuOpen) {
                this.openMobileMenu();
            } else {
                this.closeMobileMenu();
            }
        },

        openMobileMenu() {
            // Only apply mobile logic if we're on mobile
            if (window.innerWidth <= 768) {
                const menu = document.querySelector('.nav-menu');
                if (menu) {
                    // Move menu to body to avoid stacking context issues
                    menu.remove();
                    document.body.appendChild(menu);
                    
                    // Apply mobile menu styles
                    menu.style.display = 'flex';
                    menu.style.visibility = 'visible';
                    menu.style.opacity = '1';
                    menu.style.position = 'fixed';
                    menu.style.top = '80px';
                    menu.style.right = '20px';
                    menu.style.width = '140px';
                    menu.style.background = 'rgba(26, 26, 46, 0.85)';
                    menu.style.backdropFilter = 'blur(10px)';
                    menu.style.border = '1px solid rgba(79, 70, 229, 0.3)';
                    menu.style.borderRadius = 'var(--border-radius)';
                    menu.style.boxShadow = 'var(--shadow-glow)';
                    menu.style.zIndex = '9999';
                    menu.style.flexDirection = 'column';
                    menu.style.padding = '0.25rem 0';
                    menu.style.isolation = 'isolate';
                }
            }
        },

        closeMobileMenu() {
            const menu = document.querySelector('.nav-menu');
            if (menu) {
                // Hide the menu
                menu.style.display = 'none';
                menu.style.visibility = 'hidden';
                menu.style.opacity = '0';
            }
        },

        filterProjects(category) {
            this.activeFilter = category;
        },

        openProjectModal(project) {
            this.selectedProject = project;
            this.showProjectModal = true;
            document.body.style.overflow = 'hidden';
        },

        closeProjectModal() {
            this.showProjectModal = false;
            this.selectedProject = null;
            document.body.style.overflow = 'auto';
        },

        decryptContactInfo() {
            // Function to process user preferences (disguised function name)
            const processUserPrefs = (parts) => {
                return atob(parts.join(''));
            };

            // User preference data split into parts 
            const userEmailPref = ['cGxvcGRhbmllbDZAZ21haWwu', 'Y29t'];
            const userPhonePref = ['KzM5IDMyMCA2NDQg', 'MjAzOA=='];

            // Initialize contact display elements
            const emailElement = document.getElementById('email-display');
            const phoneElement = document.getElementById('phone-display');
            
            if (emailElement) {
                const email = processUserPrefs(userEmailPref);
                emailElement.textContent = email;
                emailElement.style.cursor = 'pointer';
                emailElement.addEventListener('click', () => {
                    window.location.href = 'mailto:' + email;
                });
            }
            
            if (phoneElement) {
                const phone = processUserPrefs(userPhonePref);
                phoneElement.textContent = phone;
                phoneElement.style.cursor = 'pointer';
                phoneElement.addEventListener('click', () => {
                    window.location.href = 'tel:' + phone;
                });
            }
        }

    }
}).mount('#app');

// Additional animations and effects
document.addEventListener('DOMContentLoaded', function() {
    // Floating cards animation
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.5}s`;
    });

    // Cursor trail effect
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();

    // Parallax effect for sections
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
});

