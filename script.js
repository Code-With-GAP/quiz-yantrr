const quizData = [
    {
        img: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
        options: ["Python", "Java", "C#", "Ruby"],
        answer: 0
    },
    {
        img: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
        options: ["C++", "JavaScript", "PHP", "TypeScript"],
        answer: 1
    },
    {
        img: "https://upload.wikimedia.org/wikipedia/commons/4/47/React.svg",
        options: ["Angular", "React", "Vue", "Svelte"],
        answer: 1
    },
    {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLgn2M1_x3zddo_Ydy0gTJtXO9PjKs-gFkAw&s",
        options: ["Express.js", "Node.js", "Next.js", "NestJS"],
        answer: 1
    },
    {
        img: "https://substackcdn.com/image/fetch/$s_!G1lk!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.jpeg",
        options: ["fruit", "T-REx", "apple", "Iphone"],
        answer: 0
    },
    {
        img: "https://upload.wikimedia.org/wikipedia/commons/7/73/Ruby_logo.svg",
        options: ["Rust", "Ruby", "Python", "Swift"],
        answer: 1
    },
    {
        img: "https://c8.alamy.com/comp/2RJ41MG/php-circle-letter-logo-design-with-circle-and-ellipse-shape-php-ellipse-letters-with-typographic-style-the-three-initials-form-a-circle-logo-php-ci-2RJ41MG.jpg",
        options: ["Perl", "Python", "PHP", "Lua"],
        answer: 2
    },
    {
        img: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/e8219132-2120-4d45-9486-e30a4d9b5b61/d2mycp8-525cf60a-f25a-46d6-a682-e931482ca035.png/v1/fill/w_256,h_256,q_80,strp/vlc_icon_black_orange_by_mrbress_d2mycp8-fullview.jpg",
        options: ["vlc", "C++", "C#", "Objective-C"],
        answer: 0
    },
    {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjzV9X9tSXawCu4GBihzZAea85HT8h43Aubg&s",
        options: ["TypeScript", "JavaScript", "JSON", "Java"],
        answer: 0
    },
    {
        img: "https://i.pinimg.com/originals/b5/1b/78/b51b78ecc9e5711274931774e433b5e6.png",
        options: ["Rust", "Git", "Kotlin", "Swift"],
        answer: 1
    }
];

let current = 0;
let score = 0;

let logo = document.getElementById("logo");
let options = document.getElementById("options");
let nextBtn = document.getElementById("next-btn");
let progress = document.getElementById("progress");

function loadQuestion() {
    const q = quizData[current];
    logo.src = q.img;
    options.innerHTML = "";
    nextBtn.style.display = "none";

    q.options.forEach((opt, index) => {
        const btn = document.createElement("div");
        btn.textContent = opt;
        btn.classList.add("option");
        btn.addEventListener("click", () => selectOption(index, btn));
        options.appendChild(btn);
    });

    progress.style.width = `${(current / quizData.length) * 100}%`;
}

function selectOption(index, btn) {
    const q = quizData[current];
    const options = document.querySelectorAll(".option");
    options.forEach(opt => opt.style.pointerEvents = "none");

    if (index === q.answer) {
        btn.classList.add("correct");
        score++;
    } else {
        btn.classList.add("wrong");
        options[q.answer].classList.add("correct");
    }

    nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
    current++;
    if (current < quizData.length) {
        loadQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    document.querySelector(".quiz-container").innerHTML = `
        <div class="score">Your Score: ${score} / ${quizData.length}</div>
        <p>you really thought you will score 10/10 😂😹🤣 mtlb kuch bhi</p>
        <button id="restart-btn" class="next-btn" style="display:block; margin:20px auto;">
            Play Again
        </button>
    `;

    document.getElementById("restart-btn").addEventListener("click", restartQuiz);
}

function restartQuiz() {
    current = 0;
    score = 0;

    document.querySelector(".quiz-container").innerHTML = `
        <div class="question">
            <img id="logo" class="logo" src="" alt="Programming Logo">
        </div>
        <div id="options"></div>
        <div style="display: flex; justify-content: center;">
            <button id="next-btn" class="next-btn">Next</button>
        </div>
        <div class="progress-bar">
            <div id="progress" class="progress"></div>
        </div>
    `;

    // reconnect DOM elements
    logo = document.getElementById("logo");
    options = document.getElementById("options");
    nextBtn = document.getElementById("next-btn");
    progress = document.getElementById("progress");

    nextBtn.addEventListener("click", () => {
        current++;
        if (current < quizData.length) {
            loadQuestion();
        } else {
            showScore();
        }
    });

    loadQuestion();
}

loadQuestion();
