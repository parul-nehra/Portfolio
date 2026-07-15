# 🌌 Premium Interactive Developer Portfolio Template

An interactive, glassmorphic portfolio template designed for software engineers and developers. Built from scratch using vanilla HTML, CSS, JavaScript, and Three.js for a high-performance, premium, and futuristic presentation.

![Clean Shot of Portfolio Mockup](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80&auto=format&fit=crop)

---

## ✨ Features

- 🌀 **Three.js Interactive Hero Background**: Dynamic, interactive particle stream that reacts to mouse movement.
- 🔮 **Interactive Skills Orbit**: A custom-built 3D orbit visualization grouped by Languages, Frameworks, and Infrastructure.
- ⚡ **Micro-Animations & Glow Effects**: Spotlight cursor glow, card tilt effects, glassmorphic styling, and viewport entry animations.
- 📈 **Dynamic Counter Cards**: Stat trackers that animate as they enter the screen viewport.
- 📟 **Typewriter Role Display**: Customizable typing terminal effect for engineering roles.
- 📱 **Fully Responsive**: Fluid layout scaling beautifully from desktop monitors to mobile phones.
- 🛠️ **No Framework Overhead**: Extremely fast load times and clean code structure.

---

## 🛠️ Tech Stack

- **Core**: HTML5, Vanilla JavaScript (ES6)
- **Styling**: Vanilla CSS3 (Custom Variables, Flexbox, Grid, keyframe animations)
- **3D Graphics**: [Three.js](https://threejs.org/) (loaded via CDN)
- **Fonts**: [Google Fonts](https://fonts.google.com/) (Space Grotesk, Orbitron, Inter, IBM Plex Mono)

---

## 🚀 Getting Started

Since this project is built entirely on vanilla web technologies, starting it is simple and lightweight.

### Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/parul-nehra/Portfolio.git
   cd Portfolio
   ```

2. **Run a local server:**
   You can open `index.html` directly in the browser, but it is recommended to run a lightweight local web server to prevent CORS issues (specifically when loading custom local fonts, icons, or assets):

   * **Python:**
     ```bash
     python3 -m http.server 8000
     ```
   * **Node.js (using `npx`):**
     ```bash
     npx serve
     ```
   * **VS Code:** Use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.

---

## ⚙️ Customization Guide

### 1. Personalize Information
Open [index.html](file:///Users/parul/Downloads/Portfolio/index.html) and search for the `<!-- EDIT ME -->` tags. Customize the name, description, professional experience, projects, and contact links.

### 2. Update Skills & Orbit
Open [script.js](file:///Users/parul/Downloads/Portfolio/script.js) to modify the skills list. The script automatically populates the 3D orbital rings based on the skills array:
* Language skills
* Framework skills
* Infrastructure skills

---

## 🌎 Deployment

You can deploy this site in seconds on any static hosting provider:

* **GitHub Pages**: Go to `Settings -> Pages` in this repository, select `main` branch as the source, and save.
* **Vercel**: Install Vercel CLI and run `vercel` in the root folder.
* **Netlify**: Drag and drop the repository folder directly into the Netlify dashboard.
