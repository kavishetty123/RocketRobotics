interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

interface FormElements extends HTMLFormControlsCollection {
    name: HTMLInputElement;
    email: HTMLInputElement;
    message: HTMLTextAreaElement;
}

interface ContactForm extends HTMLFormElement {
    readonly elements: FormElements;
}

class RocketRoboticsApp {
    private form: ContactForm;
    private messageDiv: HTMLElement;

    constructor() {
        this.form = document.getElementById('contactForm') as ContactForm;
        this.messageDiv = document.getElementById('formMessage') as HTMLElement;
        this.init();
    }

    private init(): void {
        this.form.addEventListener('submit', (e: Event) => this.handleSubmit(e));
        this.addSmoothScrolling();
        this.addActiveNavigation();
    }

    private handleSubmit(e: Event): void {
        e.preventDefault();

        const formData: ContactFormData = {
            name: this.form.elements.name.value,
            email: this.form.elements.email.value,
            message: this.form.elements.message.value
        };

        console.log('Form submitted:', formData);

        this.showMessage('Thank you for your message! We will get back to you soon.', 'success');
        this.form.reset();
    }

    private showMessage(text: string, type: 'success' | 'error'): void {
        this.messageDiv.textContent = text;
        this.messageDiv.style.display = 'block';
        this.messageDiv.style.backgroundColor = type === 'success' ? '#d1fae5' : '#fee2e2';
        this.messageDiv.style.color = type === 'success' ? '#065f46' : '#991b1b';
        this.messageDiv.style.border = `1px solid ${type === 'success' ? '#10b981' : '#ef4444'}`;

        setTimeout(() => {
            this.messageDiv.style.display = 'none';
        }, 5000);
    }

    private addSmoothScrolling(): void {
        const links = document.querySelectorAll('nav a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e: Event) => {
                e.preventDefault();
                const target = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
                
                if (target) {
                    const element = document.querySelector(target);
                    if (element) {
                        element.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    private addActiveNavigation(): void {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');

        window.addEventListener('scroll', () => {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id') || '';
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new RocketRoboticsApp();
});
