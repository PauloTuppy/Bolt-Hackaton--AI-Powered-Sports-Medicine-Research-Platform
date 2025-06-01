# 📚 **Bolt App: AI-Powered Sports Medicine & Research Platform**

Welcome to Bolt, your AI-powered partner in sports medicine and athletic research. This comprehensive platform combines cutting-edge artificial intelligence with sports science to revolutionize how athletes, coaches, and researchers approach performance optimization and medical analysis.

## 🚀 **About This Project**

Bolt is a React-TypeScript application built for the Bolt Hackathon, designed to bridge the gap between sports medicine, athletic performance, and AI-driven research. The platform provides everything you need to harness the full potential of modern sports science technology.

---

## **Table of Contents**

1. [**Getting Started**](#-getting-started)
2. [**AI Research Assistant**](#-ai-research-assistant)
3. [**Medical Examination Dashboard**](#-medical-examination-dashboard)
4. [**Athlete Performance Analysis**](#-athlete-performance-analysis)
5. [**PubMed Research Integration**](#-pubmed-research-integration)
6. [**Pro Tips & Best Practices**](#-pro-tips--best-practices)
7. [**Troubleshooting & Support**](#-troubleshooting--support)
8. [**Privacy & Security**](#-privacy--security)
9. [**Installation & Development**](#-installation--development)

---

## 🎯 **Getting Started**

This section will help you get the app running in minutes.

### **1. Launch the Application**

Bolt is a modular platform. You can access different tools by opening the specific interfaces:

* `research-assistant.html`: For all AI-driven research tasks.
* `medical-exams.html`: For clinical data analysis and health monitoring.
* `training-plans.html`: For creating and managing athlete training programs.

### **2. Connect Your AI Engine (Required)**

To unlock the AI capabilities, you need to connect your Google Gemini API key.

* **Get Your Key:** Obtain a free API key from [Google AI Studio](https://makersuite.google.com/app/apikey).
* **Add it to Bolt:** In the research assistant interface, find the field labeled "API Key" and paste your key there.
* **(Optional) PubMed API Key:** For more advanced medical literature searches, you can add a PubMed API key.

### **3. Explore the Core Modules**

* **AI Research Assistant:** Brainstorm ideas, analyze data, and draft papers.
* **Medical Dashboard:** Visualize and interpret medical and physiological data.
* **Performance Analysis:** Compare athletes and predict matchup outcomes.

---

## 🔬 **AI Research Assistant**

This tool is designed to accelerate your research from ideation to publication.

### **Step 1: Set Your Foundation**

1. **Define Your Topic:** In the "Research Topic" field, enter a clear and concise subject.
   * *Examples: "ACL injury prevention in female soccer players," "Altitude training effects on hematology," "Ketogenic diets for endurance athletes."*
2. **Start Discovery:** Click the **`Start Discovery`** button. This initializes your workspace and unlocks the next steps.

### **Step 2: Generate Ideas & Review Literature**

1. **Generate Concepts:** Click **`Generate Ideas & Articles`**. The AI will produce:
   * Three innovative research ideas based on your topic.
   * A list of simulated scientific articles to inspire you.

> **⚠️ IMPORTANT DISCLAIMER**
> The articles generated in this step (titles, authors, abstracts) are **fictional and for inspirational purposes only**. They are designed to simulate real research and help you brainstorm. **DO NOT** cite them as real sources. Always validate findings with real, peer-reviewed literature via the PubMed integration or other academic databases.

2. **Save Your Ideas:** Use the **`Copy Ideas`** button to easily paste the generated content into your notes.

### **Step 3: Analyze & Interpret Data**

1. **Input Your Data:** Paste your raw data, summaries, or experimental results into the data analysis field.
2. **Run Analysis:** Click **`Analyze Data`**. The AI will process your input and provide:
   * Three key insights hidden in your data.
   * Two actionable optimization strategies.
   * Suggested next steps for your research.

### **Step 4: Refine & Communicate Your Work**

1. **Submit Your Text:** Paste a draft abstract, research proposal, or any other text.
2. **Get AI Feedback:** The AI will act as your writing partner, offering:
   * Three concrete suggestions for improvement.
   * A concise, one-sentence summary of your text.
   * An assessment of its potential originality.

### **Step 5: Create a Professional Report**

1. **Generate PDF:** Click **`Generate PDF Report`**.
2. **Download:** The system automatically compiles all the content from your session into a polished PDF document, named after your research topic.

---

## 🏥 **Medical Examination Dashboard**

Monitor athlete health with a clean, intuitive interface for complex medical data.

### **Dashboard Overview**

The dashboard is organized into clear sections for quick assessment:

* **🫀 Cardiology:** Track real-time heart health, including ECG, QT interval, ST segment, and blood pressure trends.
* **🧬 Lab Results:** Analyze blood work and metabolic panels, from hematology and biochemistry to hormone levels (testosterone, cortisol) and nutrition (vitamins, minerals).
* **🦴 Physical Assessment:** View key performance indicators like anthropometry (body composition), flexibility, strength, and endurance metrics.

### **How to Use the Dashboard**

1. **View Details:** Click any metric card to expand it. You'll see detailed data, historical trends, and color-coded indicators (green for normal, red for abnormal).
2. **Generate Reports:** Export data from a single test or create a comprehensive health summary to share with athletes or healthcare providers.

---

## 🏃‍♂️ **Athlete Performance Analysis**

Leverage AI to gain a competitive edge by comparing athletes and identifying key performance gaps.

### **Athlete Comparison Tool**

1. **Select Athletes:** Use the search bar to choose two athletes to compare.
2. **Analyze the Matchup:**
   * **Statistics:** An objective, side-by-side comparison of key performance metrics.
   * **Prediction:** An AI-powered analysis of a potential matchup, highlighting probable outcomes.
   * **Similarity:** An overall score rating how closely matched the athletes are.
3. **Gain Actionable Insights:** The tool provides a summary of each athlete's top three strengths, areas for improvement, and personalized training recommendations.

---

## 🔬 **PubMed Research Integration**

Bridge the gap between AI-driven ideas and real-world scientific evidence.

### **Automated Literature Search**

1. **Enter a Medical Query:** Use natural language to ask a research question.
   * *Examples: "What is the link between exercise and cortisol?", "Evidence for creatine supplementation in sprinters."*
2. **Let AI Do the Work:** The system translates your query into an optimized PubMed search, retrieves relevant abstracts, and analyzes them in context.
3. **Receive Personalized Recommendations:** Based on the real scientific literature, the AI suggests:
   * Adjustments to a training plan.
   * Nutritional or supplement modifications.
   * New recovery protocols to consider.

---

## 🎨 **Pro Tips & Best Practices**

### **Workflow Efficiency**

* **Tabbed Browse:** Keep the research, medical, and training interfaces open in separate browser tabs to switch between them seamlessly.
* **Document Everything:** Regularly use the `Copy` buttons and generate PDF reports. Think of the app as your workspace, but your external documents are your permanent archive.
* **Start Broad, Then Go Deep:** Use the AI to explore general topics first, then use its suggestions to narrow your focus and conduct specific PubMed searches.

### **Validate AI Results**

The AI is a powerful assistant, not a replacement for professional judgment.

* **Cross-Reference:** Always verify AI-generated insights against peer-reviewed literature.
* **Consult Experts:** Discuss all medical and training recommendations with qualified healthcare professionals and coaches.

---

## 🚨 **Troubleshooting & Support**

### **Common Issues & Fixes**

* **AI Features Not Working?**
  * ✅ **Check API Key:** Ensure your Gemini API key is correctly pasted.
  * ✅ **Check Internet:** AI features require an active internet connection.
  * ✅ **Refresh Page:** A simple refresh (`Ctrl+R` or `Cmd+R`) often solves temporary glitches.

* **Slow Performance?**
  * ✅ **Close Tabs:** Too many open tabs can consume system resources.
  * ✅ **Clear Cache:** A cluttered browser cache can slow things down.

### **How to Get Help**

1. **Check the Console:** Press `F12` to open your browser's developer tools and click on the "Console" tab. Look for red error messages—they provide valuable clues.
2. **Use a Modern Browser:** Ensure you are using an up-to-date version of Chrome, Firefox, Safari, or Edge with JavaScript enabled.

---

## 🔐 **Privacy & Security**

Your data privacy is paramount.

* **Local-First Processing:** Most data and all your activity remain within your browser. The platform is designed to be stateless.
* **Secure API Calls:** Communication with AI services like Google Gemini is encrypted.
* **No Cloud Storage:** The Bolt platform **does not** store your research, API keys, or personal information on any server.
* **User Control:** You are in complete control of your data.

### **Security Recommendations**

1. **Avoid Sensitive Data:** Do not input personally identifiable information (PII) or protected health information (PHI).
2. **Guard Your API Keys:** Treat your API keys like passwords. Do not share them publicly.
3. **Use Secure Computers:** When using a public or shared computer, always use incognito mode and close the browser when you are finished.

---

## 💻 **Installation & Development**

### **Prerequisites**

* Node.js (v16 or higher)
* npm or yarn package manager
* Modern web browser with JavaScript enabled

### **Quick Start**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/PauloTuppy/Bolt-Hackaton--AI-Powered-Sports-Medicine-Research-Platform.git
   cd Bolt-Hackaton--AI-Powered-Sports-Medicine-Research-Platform
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000` to access the application.

### **Tech Stack**

* **Frontend:** React 18, TypeScript, Tailwind CSS
* **Build Tool:** Vite
* **State Management:** React Hooks
* **Database:** Supabase
* **AI Integration:** Google Gemini API
* **Research Integration:** PubMed API

### **Project Structure**

```
├── src/
│   ├── components/          # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Application pages
│   ├── lib/                # Utility libraries
│   └── config/             # Configuration files
├── public/                 # Static assets
├── docs/                   # Documentation
└── tests/                  # Test files
```

### **Available Scripts**

* `npm run dev` - Start development server
* `npm run build` - Build for production
* `npm run preview` - Preview production build
* `npm run lint` - Run ESLint
* `npm run test` - Run tests

---

## 🤝 **Contributing**

We welcome contributions to the Bolt platform! Please read our contributing guidelines and submit pull requests for any improvements.

### **Development Guidelines**

1. Follow TypeScript best practices
2. Use Tailwind CSS for styling
3. Write comprehensive tests
4. Document new features
5. Follow the existing code style

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🏆 **Hackathon Information**

This project was developed for the Bolt Hackathon, focusing on AI-powered solutions for sports medicine and athletic research. The platform demonstrates the potential of combining artificial intelligence with sports science to create innovative tools for athletes, coaches, and researchers.

---

## 📞 **Contact & Support**

For questions, suggestions, or support, please:

* Open an issue on GitHub
* Contact the development team
* Check the documentation for common solutions

---

**Built with ❤️ for the sports medicine and research community**