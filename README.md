# Personal Portfolio Website - Emir DEDE

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Formspree](https://img.shields.io/badge/Formspree-E31212?style=for-the-badge&logo=formspree&logoColor=white)](https://formspree.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A modern, highly interactive, and visually stunning personal portfolio website designed to showcase projects, skills, and academic accomplishments. Built using standard web standards (HTML5, Vanilla CSS3, and JavaScript) and tailored with a custom premium dark-rose theme.

🌐 **Live Website**: [emirtdede.com](https://emirtdede.com)

---

## 🌟 Key Features

### 1. 🌐 Dual-Language Translation System
- Fully integrated translation switch between **Turkish (TR)** and **English (EN)**.
- Saves the user's preferred language locally (`localStorage`) to maintain the language state across visits.

### 2. 🎨 Premium Dark-Rose Aesthetic
- Styled with a custom-themed dark brown background (`#342626`) and soft rose details (`#cc9595`).
- Fluid layouts, modern Google Fonts (Poppins), and custom scrollbar styles.
- Beautiful, high-contrast, interactive elements with custom animations (Entrance slides, circular button hover effects).

### 3. 📂 Interactive Projects Showroom
- Showcase of 14 key academic and freelance software development projects (including Perde Dünyası, EEG/EMG Integration, Social Crisis Sim, and ML pipelines).
- Cards dynamically display tags for technologies used and contain direct link triggers redirecting visitors to live demos, Figma files, and GitHub repositories.

### 4. ✉️ Serverless Formspree Contact Form & Custom Attachment Support
- Send emails directly from the client side without needing a back-end, via AJAX.
- **Custom File Uploader**: An elegant dashed selector supporting file attachment (up to 10 MB). Highlights selected file names and sizes, with a trash-can removal function.
- **Client-Side Validation**: Automatically validates inputs and intercepts files exceeding 10 MB, preventing network failures.

### 5. 🔔 Custom Warning Popup Modals
- Customized overlay warning and success notifications matching the dark-rose aesthetic.
- Replaces standard blocking browser `alert()` popups with soft-scale entrance springs and glassmorphic blurs.

---

## ⚙️ Installation & Local Development

No special build tools, compilers, or external bundlers are required. The site runs natively in any standard web browser.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/emirtdede/Personal-Web-Site.git
   ```

2. **Navigate into the project directory:**
   ```bash
   cd Personal-Web-Site
   ```

3. **Launch the project:**
   - Double-click `index.html` to run directly, or
   - Start a local development server using Python:
     ```bash
     python -m http.server 8000
     ```
   - Open `http://localhost:8000` in your web browser.

---

## 📁 Directory Structure

```text
Personal-Web-Site/
├── css/
│   └── style.css       # Clean, modern Vanilla CSS styling and animations
├── js/
│   └── script.js       # Dynamic language switcher, form ajax & custom notifications
├── images/
│   └── home.jpg        # Header background artwork
├── index.html          # Core page structure and translation strings
├── README.md           # Project documentation
└── LICENSE             # MIT License details
```

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

*Designed and Developed with 💻 by [Emir Dede](https://github.com/emirtdede).*
