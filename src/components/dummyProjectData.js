// src/constants/projectsData.js

import {
    project2,
    busSystemImage,
    edustifyImage,
    todoImage,
    quizImage,
    bubbleGameImage,
    stonePaperScissorImage,
    ticTacToeImage,
    currencyConverterImage,
    AISaasImage,
    authImage
} from "../assets";

export const projects = [
    {
        id: 1,
        title: "Bus Reservation Website",
        description: "Developed a complete full-stack Bus Reservation System website that allows users to select buses, view available routes, and book tickets online in real-time. The system includes features like route filtering, seat selection, booking confirmation, and user-friendly",
        fullDescription: "🚌 Developed a complete full-stack Bus Reservation System website that allows users to select buses, view available routes, and book tickets online in real-time. The system includes features like route filtering, seat selection, booking confirmation, and user-friendly authentication. Backend functionality was handled using Supabase/PostgreSQL, ensuring secure data handling and real-time updates. Built with Next.js and Tailwind CSS, the frontend is fully responsive and optimized for mobile and desktop use. Integrated user login and signup system with proper validations and protected routes. This project demonstrates my ability to build scalable, database-driven applications with a seamless user experience.",
        image: busSystemImage,
        liveDemoLink: "http://bus-pro.vercel.app/",
        gitHubLink: "https://github.com/Anus-Imran/BusMate",
        detailsLink: "/project/1",
        techStack: ["Next JS", "Tailwind CSS", "PostgreSQL", "Supabase"]
    },
    {
        id: 2,
        title: "Edustify Website",
        description: "Edustify is a basic frontend school website developed to sharpen my skills in React.js and modern UI/UX design principles.",
        fullDescription: "Edustify is a basic frontend school website developed to sharpen my skills in React.js and modern UI/UX design principles. The site features a clean, user-friendly interface with responsive layouts and smooth interactions, ensuring a seamless experience across devices. The design focuses on accessibility and readability, mimicking real-world educational platforms. This project helped me strengthen my understanding of component-based architecture and state management in React.",
        image: edustifyImage,
        liveDemoLink: "https://edustify-college.netlify.app/",
        gitHubLink: "https://edustify-college.netlify.app/",
        detailsLink: "/project/2",
        techStack: ["React", "Tailwind CSS"]
    },
    {
        id: 3,
        title: "Todo Web App",
        description: "Developed a fully functional To-Do Web Application using HTML, CSS, and JavaScript. The app allows users to add, edit, delete, and mark tasks as completed, providing a simple and efficient way to manage daily tasks. Implemented local storage",
        fullDescription: "Developed a fully functional To-Do Web Application using HTML, CSS, and JavaScript. The app allows users to add, edit, delete, and mark tasks as completed, providing a simple and efficient way to manage daily tasks. Implemented local storage to retain tasks even after the browser is closed or refreshed. The user interface is clean, responsive, and optimized for both desktop and mobile devices. This project helped strengthen my core JavaScript skills and DOM manipulation techniques.",
        image: todoImage,
        liveDemoLink: "https://js-todo-web-app.netlify.app/",
        gitHubLink: "https://github.com/Anus-Imran/To-Do-Web",
        detailsLink: "/project/3",
        techStack: ["HTML", "CSS", "JavaScript"]
    },
    {
        id: 4,
        title: "Quiz Web App",
        description: "Developed an interactive Quiz Web Application that allows users to select the number of questions and difficulty level before starting the quiz. The app dynamically fetches questions from an external API using JavaScript fetch, Promises, and async/await for smooth asynchronous operations. It provides real-time feedback",
        fullDescription: "Developed an interactive Quiz Web Application that allows users to select the number of questions and difficulty level before starting the quiz. The app dynamically fetches questions from an external API using JavaScript fetch, Promises, and async/await for smooth asynchronous operations. It provides real-time feedback on each question and displays the final score upon completion. Designed with a responsive layout and clean UI to ensure a user-friendly experience across all devices. This project enhanced my understanding of API integration, asynchronous JavaScript, and error handling.",
        image: quizImage,
        liveDemoLink: "https://quizchamp.netlify.app/",
        gitHubLink: "https://quizchamp.netlify.app/",
        detailsLink: "/project/4",
        techStack: ["HTML", "CSS", "JavaScript"]
    },
    {
        id: 5,
        title: "Bubble Game",
        description: "Developed an interactive Bubble Game using HTML, CSS, and JavaScript, where players must find and click on a randomly generated target number. Multiple bubbles with random numbers are displayed, and the numbers reshuffle after each hit to increase the challenge. On hitting the correct number, the player earns 10 points, and the game continues with a new target.",
        fullDescription: "Developed an interactive Bubble Game using HTML, CSS, and JavaScript, where players must find and click on a randomly generated target number. Multiple bubbles with random numbers are displayed, and the numbers reshuffle after each hit to increase the challenge. On hitting the correct number, the player earns 10 points, and the game continues with a new target. Implemented dynamic DOM updates, random number generation, and real-time score tracking for an engaging experience. This project enhanced my JavaScript skills, especially in handling events, logic building, and UI responsiveness.",
        image: bubbleGameImage,
        liveDemoLink: "https://hit-score-bubble-game.netlify.app/",
        gitHubLink: "https://github.com/Anus-Imran/Bubble-Game",
        detailsLink: "/project/5",
        techStack: ["HTML", "CSS", "JavaScript"]
    },
    {
        id: 6,
        title: "Tic Tac Toe Game",
        description: "Built a fully functional Tic Tac Toe game using HTML, CSS, and JavaScript. The game features a responsive design, smooth user interactions, and real-time win/draw detection logic. Implemented core game mechanics including player turns, result tracking, and game reset ",
        fullDescription: "Built a fully functional Tic Tac Toe game using HTML, CSS, and JavaScript. The game features a responsive design, smooth user interactions, and real-time win/draw detection logic. Implemented core game mechanics including player turns, result tracking, and game reset functionality. This project helped reinforce my understanding of game logic, DOM manipulation, and user interface design.",
        image: ticTacToeImage,
        liveDemoLink: "https://js-game-tictactoe.netlify.app/",
        gitHubLink: "https://github.com/Anus-Imran/Tic-Tac-Toe",
        detailsLink: "/project/6",
        techStack: ["HTML", "CSS", "JavaScript"]
    },
    {
        id: 7,
        title: "Stone Paper Scissor Game",
        description: "Created a visually appealing Stone Paper Scissors game using HTML, CSS, and JavaScript with a strong focus on modern UI/UX design. The game allows users to play against the computer with instant result display and score tracking. Implemented game logic to handle win, lose, and draw conditions based on player and computer choices. Designed a responsive and interactive interface that",
        fullDescription: "Created a visually appealing Stone Paper Scissors game using HTML, CSS, and JavaScript with a strong focus on modern UI/UX design. The game allows users to play against the computer with instant result display and score tracking. Implemented game logic to handle win, lose, and draw conditions based on player and computer choices. Designed a responsive and interactive interface that works seamlessly across devices. This project improved my skills in event handling, condition-based logic, and front-end user experience design.",
        image: stonePaperScissorImage,
        liveDemoLink: "https://js-stone-paper-scissors.netlify.app/",
        gitHubLink: "https://github.com/Anus-Imran/Rock-Paper-Scisssor-Game",
        detailsLink: "/project/7",
        techStack: ["HTML", "CSS", "JavaScript"]
    },
    {
        id: 8,
        title: "Currency Converter Web App",
        description: "Developed a Currency Converter Web Application using HTML, CSS, and JavaScript that allows users to convert between different currencies in real time. Integrated a public exchange rate API to fetch live conversion rates using asynchronous JavaScript (fetch, async/await). The interface is clean, responsive, and designed to provide quick and accurate currency conversions with minimal user input. Included features such as currency selection, automatic rate updates, and erro",
        fullDescription: "Developed a Currency Converter Web Application using HTML, CSS, and JavaScript that allows users to convert between different currencies in real time. Integrated a public exchange rate API to fetch live conversion rates using asynchronous JavaScript (fetch, async/await). The interface is clean, responsive, and designed to provide quick and accurate currency conversions with minimal user input. Included features such as currency selection, automatic rate updates, and error handling for a smooth user experience. This project strengthened my skills in API integration, asynchronous programming, and responsive UI design.",
        image: currencyConverterImage,
        liveDemoLink: "https://anus-currency-converter.netlify.app/",
        gitHubLink: "https://github.com/Anus-Imran/Currency-Converter",
        detailsLink: "/project/8",
        techStack: ["HTML", "CSS", "JavaScript"]
    },
    {
        id: 9,
        title: "AI SAAS Web App",
        description: "I have built a powerful and modern AI SaaS web application that provides various useful AI tools to users. With this platform, users can generate full articles and blog titles, create images using text, review resumes, remove backgrounds from images, and even remove unwanted objects from photos. The Article Generation and Blog Title Generation features are free to use for all users — but only up to 10 credits. After those 10 credits are used, users need to buy a subscription to continue using these two features.",
        fullDescription: "I have built a powerful and modern AI SaaS web application that provides various useful AI tools to users. With this platform, users can generate full articles and blog titles, create images using text, review resumes, remove backgrounds from images, and even remove unwanted objects from photos. The Article Generation and Blog Title Generation features are free to use for all users — but only up to 10 credits. After those 10 credits are used, users need to buy a subscription to continue using these two features. The other features (like image generation, resume review, background remover, and object remover) are premium only, which means there are no free credits available for them. A subscription is required to access these tools. For authentication, the app uses Clerk, a secure and reliable authentication system. It protects the platform and ensures that only verified users can access the tools. Clerk is also used for handling billing and subscriptions. Users can choose between free and premium plans, and upgrade anytime through Clerk’s built-in billing system. The user interface (UI) and user experience (UX) of the application are designed with great care. The design is clean, modern, and visually attractive. Everything is mobile-friendly and responsive — it works perfectly on desktops, tablets, and smartphones. Navigation is simple and smooth, making the entire platform easy to use even for beginners.",
        image: AISaasImage,
        liveDemoLink: "https://intelli-sense-three.vercel.app/",
        gitHubLink: "https://github.com/Anus-Imran/Intelli-Sense",
        detailsLink: "/project/9",
        techStack: ["React JS", "Node JS", "Express JS", "PostgreSQL", "Neon", "Clerk Authentication", "Gemini API", "Cloudinary API", "Clip Drop API", "Framer Motion"]
    },
    {
        id: 10,
        title: "MERN Authentication Web App",
        description: "MERN AUTH is a secure full-stack authentication system built with the MERN stack. It features user signup/login, email verification via OTP, and password reset functionality. Emails are sent using Nodemailer and Gmail SMTP. The app is fully responsive and uses JWT for secure route protection.",
        fullDescription: "MERN AUTH is a secure full-stack authentication system built with the MERN stack. It features user signup/login, email verification via OTP, and password reset functionality. Emails are sent using Nodemailer and Gmail SMTP. The app is fully responsive and uses JWT for secure route protection. I also implemented automatic deployment using GitHub + Vercel, which streamlined the development process with a CI/CD-like workflow. This helped me quickly debug, test, and push updates without manual redeployment.",
        image: authImage,
        liveDemoLink: "https://github.com/Anus-Imran/mern-auth",
        gitHubLink: "https://github.com/Anus-Imran/mern-auth",
        detailsLink: "/project/10",
        techStack: ["React JS", "Node JS", "Express JS", "PostgreSQL", "MongoDB Atlas", "JWT Auth", "Google SMTP", "NodeMailer"]
    }
];