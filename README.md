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
Then open: [http://127.0.0.1:5500/](http://127.0.0.1:5500/)

### 🔹 Option 2: VSCode Live Server

- Install the **Live Server** extension in VSCode.
- Open `index.html`, right-click, and select **"Open with Live Server"**.

### 🔹 Option 3: GitHub Pages (Recommended)

- Upload the project files to a GitHub repository.
- Go to **Settings > Pages**, set the branch to `main` and source to `/ (root)`.
- GitHub will provide a link like this:  
  👉 **[https://cxz4444.github.io/cxpomodoro-timer/](https://cxz4444.github.io/cxpomodoro-timer/)**

Now anyone can access your Pomodoro Timer online without installing anything! 🚀

---

## 🌍 Browser Compatibility

- **Supported Browsers**: Chrome, Edge, Firefox, Safari (latest versions recommended).
- **Notification Permission**:
  - On the first start, the browser will ask for **notification permission**. Click "Allow" to receive alerts.
  - If notifications don’t appear, check your browser settings and **enable notifications** for the site.
- **HTTPS Requirement**:  
  Service Worker and notifications require **HTTP/HTTPS**. If opening directly from a file (`file://`), some features may not work.

---

## ❓ FAQ

### ❔ Why don't notifications appear when watching full-screen videos?

- Many browsers **suppress notifications** in full-screen mode to prevent distractions.
- This project includes **a pop-up reminder** to ensure you get notified even when notifications are blocked.

### ❔ How can I enable notifications again if I blocked them?

- In Chrome/Edge, click the **lock icon 🔒** next to the URL bar and enable "Notifications."
- Alternatively, clear the site’s cookies and reload the page.

### ❔ Can I customize the timer style?

Yes! Modify `styles.css` to adjust colors, fonts, and animations.

### ❔ Can I use this on my phone?

Yes! This works on mobile browsers, but **pop-up reminders** may be blocked due to system restrictions.

---

## 🤝 Contributing

If you have suggestions, issues, or improvements, feel free to open a pull request or create an issue.

---

## 👨‍💻 Author

**Chenxi**
