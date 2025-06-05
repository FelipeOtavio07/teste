document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slide-dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval;


    showSlide(currentSlide);
    startAutoPlay();
    function showSlide(n) {
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        currentSlide = (n + totalSlides) % totalSlides;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    function nextSlide() {
        showSlide(currentSlide + 1);
        resetAutoPlay();
    }
    function prevSlide() {
        showSlide(currentSlide - 1);
        resetAutoPlay();
    }
    function startAutoPlay() {
        slideInterval = setInterval(nextSlide, 2000);
    }
    function resetAutoPlay() {
        clearInterval(slideInterval);
        startAutoPlay();
    }
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetAutoPlay();
        });
    });
    const slideshowContainer = document.querySelector('.slideshow-container');
    slideshowContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    slideshowContainer.addEventListener('mouseleave', () => {
        startAutoPlay();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });
});


// Quiz Data - 10 questões sobre enchentes e tecnologia de prevenção
const quizData = [
    {
        question: "Qual é o principal objetivo do sistema HydroSafe?",
        options: [
            "Monitorar a qualidade da água potável",
            "Fornecer alertas precoces de enchentes",
            "Controlar o tráfego em áreas urbanas",
            "Gerenciar o abastecimento de energia"
        ],
        answer: "Fornecer alertas precoces de enchentes"
    },
    {
        question: "Quantas horas de antecedência o HydroSafe pode prever enchentes?",
        options: [
            "12 horas",
            "24 horas",
            "48 horas",
            "72 horas"
        ],
        answer: "48 horas"
    },
    {
        question: "Qual tecnologia NÃO é utilizada pelo HydroSafe?",
        options: [
            "Sensores IoT",
            "Inteligência Artificial",
            "Blockchain",
            "Aplicativo móvel"
        ],
        answer: "Blockchain"
    },
    {
        question: "Qual órgão brasileiro já realiza monitoramento similar ao HydroSafe?",
        options: [
            "INPE",
            "CEMADEN",
            "ANA",
            "IBGE"
        ],
        answer: "CEMADEN"
    },
    {
        question: "Qual região do Brasil é MENOS afetada por enchentes?",
        options: [
            "Vale do Itajaí (SC)",
            "Baixada Fluminense (RJ)",
            "Região Metropolitana de SP",
            "Centro-Oeste"
        ],
        answer: "Centro-Oeste"
    },
    {
        question: "Qual destes é um benefício direto do HydroSafe?",
        options: [
            "Redução de mortes por enchentes",
            "Aumento do turismo",
            "Geração de energia limpa",
            "Melhoria na educação"
        ],
        answer: "Redução de mortes por enchentes"
    },
    {
        question: "Quantos brasileiros vivem em áreas de risco de enchentes?",
        options: [
            "500 mil",
            "1 milhão",
            "3.5 milhões",
            "10 milhões"
        ],
        answer: "3.5 milhões"
    },
    {
        question: "Qual destes é um público-alvo do HydroSafe?",
        options: [
            "Agricultores orgânicos",
            "Defesa Civil",
            "Empresas de aviação",
            "Universidades particulares"
        ],
        answer: "Defesa Civil"
    },
    {
        question: "Qual é o prejuízo anual estimado causado por enchentes no Brasil?",
        options: [
            "R$ 500 milhões",
            "R$ 2 bilhões",
            "R$ 8 bilhões",
            "R$ 20 bilhões"
        ],
        answer: "R$ 8 bilhões"
    },
    {
        question: "Qual destas cidades foi gravemente afetada por enchentes em 2024?",
        options: [
            "Canoas (RS)",
            "Florianópolis (SC)",
            "Belo Horizonte (MG)",
            "Fortaleza (CE)"
        ],
        answer: "Canoas (RS)"
    }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = Array(quizData.length).fill(null);

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const currentQuestionElement = document.getElementById('current-question');
const questionCounter = document.getElementById('question-counter');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const quizResult = document.querySelector('.quiz-result');
const quizBody = document.querySelector('.quiz-body');
const scorePercent = document.getElementById('score-percent');
const correctAnswers = document.getElementById('correct-answers');
const progressFill = document.getElementById('progress-fill');
const restartBtn = document.getElementById('restart-btn');


function initQuiz() {
    showQuestion();
    updateNavigation();
}
function showQuestion() {
    quizBody.classList.remove('fade-out');
    
    const question = quizData[currentQuestion];
    questionText.textContent = question.question;
    currentQuestionElement.textContent = currentQuestion + 1;
    questionCounter.textContent = `${currentQuestion + 1} de ${quizData.length}`;
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionBtn = document.createElement('button');
        optionBtn.classList.add('option-btn');
        optionBtn.textContent = option;
        if (userAnswers[currentQuestion] === index) {
            optionBtn.classList.add('selected');
        }
        optionBtn.addEventListener('click', () => selectOption(option, index));
        optionsContainer.appendChild(optionBtn);
        setTimeout(() => {
            optionBtn.classList.add('show');
        }, 100 * index);
    });
    document.querySelector('.quiz-footer').style.opacity = '1';
}

function selectOption(option, index) {
    const options = document.querySelectorAll('.option-btn');
    options.forEach(opt => opt.classList.remove('selected', 'correct', 'incorrect'));
    options[index].classList.add('selected');
    userAnswers[currentQuestion] = index;
    updateNavigation();
}
function updateNavigation() {
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = userAnswers[currentQuestion] === null;
    nextBtn.textContent = currentQuestion === quizData.length - 1 ? "Finalizar" : "Próxima";
}
function showResult() {
    quizBody.classList.add('fade-out');
    setTimeout(() => {
        score = 0;
        for (let i = 0; i < quizData.length; i++) {
            if (userAnswers[i] !== null) {
                const selectedOption = quizData[i].options[userAnswers[i]];
                if (selectedOption === quizData[i].answer) {
                    score++;
                }
            }
        }
        const percentage = Math.round((score / quizData.length) * 100);
        scorePercent.textContent = percentage;
        correctAnswers.textContent = score;
        quizResult.classList.add('show');
        setTimeout(() => {
            progressFill.style.width = `${percentage}%`;
        }, 300);
    }, 300);
}
nextBtn.addEventListener('click', () => {
    if (currentQuestion < quizData.length - 1) {
        quizBody.classList.add('fade-out');
        setTimeout(() => {
            currentQuestion++;
            showQuestion();
            updateNavigation();
        }, 300);
    } else {
        showResult();
    }
});
prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
        quizBody.classList.add('fade-out');
        setTimeout(() => {
            currentQuestion--;
            showQuestion();
            updateNavigation();
        }, 300);
    }
});

restartBtn.addEventListener('click', () => {
    quizResult.classList.remove('show');
    setTimeout(() => {
        currentQuestion = 0;
        score = 0;
        userAnswers = Array(quizData.length).fill(null);
        progressFill.style.width = '0%';
        showQuestion();
        updateNavigation();
    }, 300);
});
document.addEventListener('DOMContentLoaded', initQuiz);


// Menu Hambúrguer
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const themeSwitcher = document.querySelector('.theme-switcher-btn');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    themeSwitcher.classList.toggle('active');
});
document.querySelectorAll('.nav-menu a').forEach(item => {
    item.addEventListener('click', () => {
        navMenu.classList.remove('active');
        themeSwitcher.classList.remove('active');
    });
});
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});



// Troca de Temas
const themeBtn = document.querySelector('.theme-switcher-btn');
let currentTheme = 'light';


function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    const icon = themeBtn.querySelector('i');
    if (theme === 'dark') {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else if (theme === 'blue') {
        icon.classList.replace('fa-sun', 'fa-droplet');
    } else {
        icon.classList.replace('fa-droplet', 'fa-moon');
    }
    localStorage.setItem('theme', theme);
}
function toggleTheme() {
    const themes = ['light', 'dark', 'blue'];
    currentTheme = themes[(themes.indexOf(currentTheme) + 1) % themes.length];
    applyTheme(currentTheme);
}
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    currentTheme = savedTheme;
}
applyTheme(currentTheme);
themeBtn.addEventListener('click', toggleTheme);