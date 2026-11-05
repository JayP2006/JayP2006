



[](https://jaypatel-portfolio-2006.vercel.app) [](https://linkedin.com/in/pjaykumar/) [](https://leetcode.com/u/jay3001/) [GeeksforGeeks](https://www.google.com/search?q=https://www.geeksforgeeks.org/user/jay4code/) [](mailto:jay91451@gmail.com) 

> **SYSTEM IDENTITY // JAYKUMAR RAKESHBHAI PATEL**
> **Role:** Software Engineer — Full-Stack MERN Systems, Real-Time WebSockets, Applied Machine Learning & Competitive Programming
> **Education:** B.Tech in Computer Science & Engineering @ Shree Swaminarayan Institute of Technology (SSIT), Gujarat (2023–2027) · **CGPA: 8.65 / 10.0**
> **Engineering Philosophy:** Frame the bottleneck → Architect the system → Ship the code → Measure the latency & recall.

## ◈ 01 // ALGORITHMIC SIGNALS & COMPETITIVE TELEMETRY



     

| Benchmark / Arena | Verified Metric | Percentile & Standing | Visual Signal Bar | Profile / Verification |
| :--- | :--- | :--- | :--- | :--- |
| **LeetCode Rating** | **2212+ Peak** | **Top ~2% Globally** (Guardian Tier) | `███████████████████░ 98.1%` | [leetcode.com/u/jay3001](https://leetcode.com/u/jay3001/) |
| **LeetCode Weekly 503** | **Global Rank #35** | Top **0.089%** out of **39,000+** contestants | `████████████████████ 99.9%` | [Contest Standing](https://leetcode.com/u/jay3001/) |
| **CodeChef Rating** | **2014+ Peak** | **5-Star Division** Algorithmic Programmer | `██████████████████░░ 94.0%` | Verified Resume Metric |
| **DSA Problem Corpus** | **1,700+ Solved** | Medium–Hard DP, Graphs, Trees & Greedy | `███████████████████░ 96.5%` | [LeetCode](https://leetcode.com/u/jay3001/) · [GFG @jay4code](https://www.google.com/search?q=https://www.geeksforgeeks.org/user/jay4code/) |
| **TCS NQT-IT (Coding)** | **600 / 600** | **100% Perfect Score** in Programming Section | `████████████████████ 100%` | National Qualifier Verified |
| **HackerRank** | **5-Star Gold** | Data Structures & Algorithmic Problem Solving | `████████████████████ 100%` | 5-Star Verified |
| **GTU Academic Honors** | **8.65 CGPA** | **Dewang Mehta IT Award** (Top B.E. Ranker) | `██████████████████░░ 86.5%` | Gujarat Technological Univ. |

## ◈ 02 // PRODUCTION SYSTEMS & ENGINEERING ARCHITECTURE



### Executive Systems Matrix

| System | Category | Core Architecture & Stack | Key Engineering Metric / Impact | Access Links |
| :--- | :--- | :--- | :--- | :--- |
| **ShrinkX** | AI URL & Analytics Engine | `React` `Node` `Express` `MongoDB` `Redis` `Gemini AI` | **-34% API Latency** via Redis cache-aside + AI click spike alerts | [Live App](https://shrinkx.onrender.com/) · [GitHub](https://github.com/JayP2006/Urlshortner) |
| **BharatSkill Connect** | P2P Skill Marketplace | `React` `Node` `Express` `MongoDB` `Socket.IO` `JWT` `Cloudinary` | **Real-time WebSocket** rooms, RBAC security & auto-certificates | [Live App](https://shiksha-mudraa.onrender.com/) · [GitHub](https://github.com/JayP2006/Bharat-Skill-Exchange) |
| **Telco Churn ML** | Supervised ML Pipeline | `Python` `Scikit-Learn` `XGBoost` `Pandas` `SMOTE` `Seaborn` | **76.15% Recall** & **60.09% F1** across 7,043 records (6 models) | [GitHub Repo](https://www.google.com/search?q=https://github.com/JayP2006/customer-churn-prediction) |
| **ChatObi** | Real-Time Messaging | `React` `Node` `Express` `MongoDB` `Socket.IO` | **Full-duplex WebSockets** with instant presence & persistence | [Live App](https://chatobi.onrender.com/) · [GitHub](https://github.com/JayP2006/chat-app) |
| **AI Assessment Tool** | EdTech AI Evaluator | `MERN Stack` `EJS` `AI/NLP APIs` `REST Architecture` | Automated **ATS resume scoring**, grammar & plagiarism analytics | [GitHub Repo](https://github.com/JayP2006/ai-assessment-tool) |
| **AI Image Enhancer** | Computer Vision Web App | `MongoDB` `Express` `React` `Node` `AI Upscaling Models` | Real-time **image denoising, sharpening & upscaling** pipeline | [GitHub Repo](https://github.com/JayP2006/image-enhancer) |

### System Blueprints & Deep-Dive Telemetry

#### 1. ShrinkX — High-Throughput URL Shortener with Redis Caching & Gemini AI
[](https://shrinkx.onrender.com/) [](https://github.com/JayP2006/Urlshortner) 

* **Low-Latency Cache Architecture:** Engineered a Redis cache-aside layer in front of MongoDB for high-frequency short-link resolution, cutting average API response latency by **34%** and eliminating repetitive database reads.
* **Generative AI Link Intelligence:** Integrated **Google Gemini** to generate contextual safe-link previews and AI-driven click prediction models with automated traffic-spike alerting.
* **Edge Access & Telemetry:** Built custom alias routing, password-protected links, TTL expiry auto-deactivation, API rate limiting, instant QR code generation, and a real-time analytics dashboard tracking click volume, referrer sources, device types, and geolocation.

```text
[Client Request] ──► [Express Rate Limiter] ──► [Redis Cache Lookup] ──► (HIT: <15ms Redirect | -34% Latency)
                                                        │
                                                   (CACHE MISS)
                                                        ▼
                                             [MongoDB Atlas Query] ──► [Async Telemetry + Gemini Spike Predictor]
```

#### 2. BharatSkill Connect — Hyperlocal Peer-to-Peer Skill Exchange Platform
[](https://shiksha-mudraa.onrender.com/) [](https://github.com/JayP2006/Bharat-Skill-Exchange) 

* **Real-Time Marketplace Engine:** Built a scalable two-sided peer marketplace connecting mentors (*Gurus*) and learners (*Shishyas*) with live session requests, booking workflows, availability calendars, and interactive workshop management.
* **Hardened MVC Security:** Architected modular REST APIs with stateless **JWT authentication**, Role-Based Access Control (RBAC), request rate limiting, centralized error middleware, and **Cloudinary** media pipelines.
* **Trust & Credentialing Loop:** Engineered bidirectional WebSocket chat, verified peer review ledgers, and automated completion certificate generation to drive platform credibility.

```text
[React + Tailwind SPA] ──(HTTPS REST / JWT + RBAC)──► [Express MVC Controllers] ──► [MongoDB + Cloudinary CDN]
         │                                                        │
         └───────────────(Full-Duplex Socket.IO Rooms)────────────┴──► [Live P2P Chat + Session Booking Engine]
```

#### 3. Telco Customer Churn Prediction — Supervised Machine Learning Pipeline
[Source Code](https://www.google.com/search?q=https://github.com/JayP2006/customer-churn-prediction)   

* **Feature Engineering & Leakage-Free Balancing:** Processed **7,043 Telco customer records** across 21 features with missing-value imputation, categorical encoding, standard feature scaling, and training-split-only **SMOTE** oversampling to solve class imbalance without test contamination.
* **6-Classifier Cross-Validation Benchmark:** Trained and compared **Logistic Regression, Decision Tree, Random Forest, SVM, Naive Bayes, and XGBoost** using stratified 5-fold cross-validation.
* **Recall-Centric Model Selection:** Selected calibrated **Logistic Regression** (**76.15% Recall**, **60.09% F1-score**, **75.02% Test Accuracy**) to maximize capture of high-risk churning customers where false negatives carry the highest business cost.

```text
[7,043 Telco Records] ──► [EDA + Encoding + Scaling] ──► [Train/Test Split] ──► [SMOTE on Train Split Only]
                                                                                        │
[Selected: Logistic Regression (76.15% Recall | 60.09% F1 | 75.02% Acc)] ◄── [5-Fold CV Across 6 Classifiers]
```

## ◈ 03 // FULL-STACK, REAL-TIME & ML TOOLCHAIN



| Engineering Layer | Core Technologies | Production Application in My Systems |
| :--- | :--- | :--- |
| **Languages & Core CS** | `JavaScript (ES6+)` `Python` `C` `Java` `SQL` | 1,700+ algorithmic solutions, OOP system design, OS, DBMS & Computer Networks |
| **Backend & Caching** | `Node.js` `Express.js` `Redis` `Socket.IO` `REST APIs` | MVC APIs, Redis cache-aside (-34% latency), JWT/RBAC security & WebSocket rooms |
| **Frontend & UI** | `React.js` `Tailwind CSS` `HTML5` `CSS3` | Reactive SPAs, real-time analytics dashboards, QR generators & chat interfaces |
| **Machine Learning & Data** | `Scikit-Learn` `XGBoost` `Pandas` `NumPy` `SMOTE` `Seaborn` | End-to-end supervised classification, 5-fold CV, EDA & Gemini AI integrations |
| **Databases & Cloud** | `MongoDB` `MySQL` `Cloudinary` `Git` `GitHub` `Postman` | Indexed document stores, relational schemas, CDN media pipelines & cloud deploys |

## ◈ 04 // LIVE GITHUB TELEMETRY & CONTRIBUTION GRAPH

 





> **OPEN FOR OPPORTUNITIES:** Available for Software Engineering, Full-Stack (MERN), and Machine Learning internships & roles · **Email:** [jay91451@gmail.com](mailto:jay91451@gmail.com) · **Portfolio:** [jaypatel-portfolio-2006.vercel.app](https://jaypatel-portfolio-2006.vercel.app) · **LinkedIn:** [linkedin.com/in/pjaykumar](https://linkedin.com/in/pjaykumar/)
