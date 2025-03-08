# 🌅 Dawn Pomodoro Timer | Pomodoro Timer

**Dawn Pomodoro Timer** is a **simple yet powerful** web-based Pomodoro timer that helps you manage your work and break times effectively. Stay focused, boost productivity, and never miss a break! ⏳✨

## 🔥 Key Features

- **Auto Work & Break Cycles** ✅ - Automatically switches between work sessions and breaks based on the Pomodoro technique.
- **Customizable Settings** ⚙️ - Adjust work duration, short break, and long break times to suit your needs.
- **Smart Notifications** 🔔 - Receive browser notifications when the timer ends (requires permission).
- **Full-Screen Pop-up Reminders** 💡 - If you’re in full-screen mode watching videos or have minimized the window, an **alert pop-up** will appear, ensuring you never miss a break or work session.
- **Celebration Animation** 🎉 - Get a visual reward with an engaging particle animation when completing a Pomodoro session.
- **Progress Tracking** 📊 - Keep track of your completed Pomodoros and total focus time for the day.

---

## 🚀 Try It Now

No installation required! You can use the timer directly online via **GitHub Pages**:  
👉 **[Dawn Pomodoro Timer](https://cxz4444.github.io/cxpomodoro-timer/)**

---

## 🛠 Installation & Usage

### 1️⃣ Download the Code

Clone this repository or download the following files into the same directory:

- `index.html`
- `styles.css`
- `script.js`
- `sw.js`
- `popup.html`
- `README.md` (this file)

### 2️⃣ Run Locally

Since this project uses **Service Workers** and **Notifications**, it needs to be served over HTTP/HTTPS. You can start a local server using:

#### **🔹 Option 1: Python HTTP Server**
Run the following command in the project folder:
```sh
python -m http.server 5500
