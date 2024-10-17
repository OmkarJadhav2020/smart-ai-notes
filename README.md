# Smart AI Notes

[![Smart AI Notes Demo](https://img.shields.io/badge/Demo-Live%20App-brightgreen)](https://smart-ai-notes.vercel.app/)

Smart AI Notes is an intelligent note-taking app that solves mathematical and graphical questions in real-time. Just write your question or problem, and the system will detect and solve it, providing the answer with beautifully rendered mathematical expressions. The project is built using **Next.js** for both frontend and backend, and leverages the **Gemini model** to provide answers. Math rendering is handled by **MathJax**.

## 🚀 Live Demo
You can try out the live app here: [Smart AI Notes](https://smart-ai-notes.vercel.app/)

## 📹 Demo Video
You can find demo video at [Youtube](https://youtu.be/jN0tGNHqr6w).

## Features
- **Real-time problem solving**: Write any mathematical or graphical question and get instant answers.
- **Supports complex mathematics**: Solves algebraic equations, calculus problems, and more.
- **Graphical problem solving**: Supports questions involving graphs and geometry.
- **Rendered solutions**: Uses **MathJax** to display clean, readable answers in LaTeX format.
- **Powered by AI**: Uses **Gemini model** for AI-powered question understanding and solving.

## Tech Stack
- **Frontend & Backend**: [Next.js](https://nextjs.org/)
- **AI Model**: Gemini model for solving questions
- **Math Rendering**: [MathJax](https://www.mathjax.org/)

## Getting Started

### Prerequisites
- **Node.js**: Make sure you have Node.js installed. You can download it from [here](https://nodejs.org/).

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/OmkarJadhav2020/smart-ai-notes.git
2. Navigate to the project directory:
    ```bash
    cd smart-ai-notes
3. Install the dependencies:
    ```bash
    npm install
4. Run the development server:
    ```bash
    npm run dev
The app will be available at http://localhost:3000.

## Usage
- Open the app and start writing your question in the input area.
- The app will detect the problem type and provide an answer, whether it's a mathematical equation or a graphical question.
- The result will be displayed with proper mathematical formatting thanks to **MathJax**.

## Project Structure
```bash
    ├── public            # Contains the demo video and other public assets
    ├── pages             # Next.js pages (frontend & backend)
    ├── components        # React components
    ├── styles            # CSS and styling for the app
    └── README.md         # Project documentation
```
## Contributing
Contributions are welcome! If you'd like to contribute, feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.