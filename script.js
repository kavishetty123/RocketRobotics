var RocketRoboticsApp = /** @class */ (function () {
    function RocketRoboticsApp() {
        this.form = document.getElementById('contactForm');
        this.messageDiv = document.getElementById('formMessage');
        this.init();
    }
    RocketRoboticsApp.prototype.init = function () {
        var _this = this;
        this.form.addEventListener('submit', function (e) { return _this.handleSubmit(e); });
        this.addSmoothScrolling();
        this.addActiveNavigation();
    };
    RocketRoboticsApp.prototype.handleSubmit = function (e) {
        e.preventDefault();
        var formData = {
            name: this.form.elements.name.value,
            email: this.form.elements.email.value,
            message: this.form.elements.message.value
        };
        console.log('Form submitted:', formData);
        this.showMessage('Thank you for your message! We will get back to you soon.', 'success');
        this.form.reset();
    };
    RocketRoboticsApp.prototype.showMessage = function (text, type) {
        var _this = this;
        this.messageDiv.textContent = text;
        this.messageDiv.style.display = 'block';
        this.messageDiv.style.backgroundColor = type === 'success' ? '#d1fae5' : '#fee2e2';
        this.messageDiv.style.color = type === 'success' ? '#065f46' : '#991b1b';
        this.messageDiv.style.border = "1px solid ".concat(type === 'success' ? '#10b981' : '#ef4444');
        setTimeout(function () {
            _this.messageDiv.style.display = 'none';
        }, 5000);
    };
    RocketRoboticsApp.prototype.addSmoothScrolling = function () {
        var links = document.querySelectorAll('nav a[href^="#"]');
        links.forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                var target = e.currentTarget.getAttribute('href');
                if (target) {
                    var element = document.querySelector(target);
                    if (element) {
                        element.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    };
    RocketRoboticsApp.prototype.addActiveNavigation = function () {
        var sections = document.querySelectorAll('section');
        var navLinks = document.querySelectorAll('nav a');
        window.addEventListener('scroll', function () {
            var current = '';
            sections.forEach(function (section) {
                var sectionTop = section.offsetTop;
                var sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id') || '';
                }
            });
            navLinks.forEach(function (link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === "#".concat(current)) {
                    link.classList.add('active');
                }
            });
        });
    };
    return RocketRoboticsApp;
}());
document.addEventListener('DOMContentLoaded', function () {
    new RocketRoboticsApp();
});
