export const ROLE_KEYWORDS = {
  general: {
    critical: ["team", "project", "manage", "communication", "leadership"],
    important: ["problem solving", "organization", "collaboration", "planning"],
    bonus: ["innovation", "initiative", "adaptability"],
  },
  frontend: {
    critical: ["react", "javascript", "typescript", "html", "css", "frontend", "ui", "ux"],
    important: ["redux", "context api", "tailwind", "sass", "responsive", "web performance", "dom", "git"],
    bonus: ["vue", "angular", "next.js", "vite", "webpack", "jest", "cypress", "accessibility", "a11y"],
  },
  backend: {
    critical: ["node.js", "python", "java", "api", "database", "sql", "backend", "server"],
    important: ["express", "django", "spring boot", "postgresql", "mysql", "mongodb", "rest", "git"],
    bonus: ["redis", "rabbitmq", "microservices", "docker", "kubernetes", "aws", "gcp", "graphql"],
  },
  fullstack: {
    critical: ["react", "javascript", "node.js", "api", "database", "fullstack", "frontend", "backend"],
    important: ["typescript", "sql", "nosql", "rest", "git", "deployment", "css", "html"],
    bonus: ["aws", "docker", "next.js", "graphql", "ci/cd", "microservices"],
  },
  dataAnalyst: {
    critical: ["sql", "python", "data", "analysis", "excel", "dashboard", "reporting"],
    important: ["tableau", "power bi", "pandas", "statistics", "data visualization", "a/b testing"],
    bonus: ["machine learning", "r", "etl", "data engineering", "bigquery"],
  },
  android: {
    critical: ["kotlin", "java", "android sdk", "mobile", "app", "ui"],
    important: ["mvvm", "compose", "coroutines", "rest", "git", "sqlite", "room"],
    bonus: ["rxjava", "dagger", "hilt", "firebase", "ci/cd", "play store"],
  },
  ios: {
    critical: ["swift", "ios", "objective-c", "mobile", "app", "ui"],
    important: ["mvvm", "combine", "rest", "git", "sqlite", "core data"],
    bonus: ["rxswift", "dagger", "hilt", "firebase", "ci/cd", "app store"],
  },
  mlEngineer: {
    critical: ["machine learning", "python", "data", "model", "algorithm", "deep learning"],
    important: ["tensorflow", "pytorch", "scikit-learn", "nlp", "computer vision", "statistics"],
    bonus: ["aws", "gcp", "azure", "docker", "kubernetes", "mlops", "llm"],
  },
  devops: {
    critical: ["aws", "docker", "kubernetes", "ci/cd", "automation", "scripting"],
    important: ["terraform", "ansible", "jenkins", "git", "monitoring", "linux"],
    bonus: ["gcp", "azure", "helm", "prometheus", "grafana", "microservices"],
  },
  qaEngineer: {
    critical: ["testing", "qa", "automation", "test plan", "test case", "api testing"],
    important: ["selenium", "cypress", "playwright", "postman", "git", "jira"],
    bonus: ["performance testing", "security testing", "load testing", "ci/cd"],
  },
  projectManager: {
    critical: ["project management", "agile", "scrum", "planning", "execution", "delivery"],
    important: ["stakeholder management", "risk management", "budgeting", "team leadership"],
    bonus: ["pmp", "jira", "confluence", "communication", "strategy"],
  },
  productManager: {
    critical: ["product management", "strategy", "roadmap", "market research", "user experience"],
    important: ["agile", "scrum", "analytics", "stakeholder management", "prioritization"],
    bonus: ["product launch", "growth hacking", "a/b testing", "competitive analysis"],
  },
  uiuxDesigner: {
    critical: ["ui", "ux", "design", "prototyping", "wireframing", "user research"],
    important: ["figma", "sketch", "adobe xd", "interaction design", "visual design"],
    bonus: ["motion design", "accessibility", "design systems", "user testing"],
  },
  mobile: {
    critical: ["mobile", "ios", "android", "app", "ui", "ux"],
    important: ["swift", "kotlin", "react native", "flutter", "rest", "git"],
    bonus: ["mvvm", "compose", "combine", "rxjava", "rxswift", "firebase"],
  },
  gameDeveloper: {
    critical: ["game development", "unity", "unreal engine", "c#", "c++", "game"],
    important: ["gameplay", "physics", "animation", "graphics", "ai"],
    bonus: ["shader development", "multiplayer", "game design", "optimization"],
  },
  embeddedSystems: {
    critical: ["embedded", "c", "c++", "microcontroller", "firmware", "real-time"],
    important: ["rtos", "linux", "device drivers", "hardware", "debugging"],
    bonus: ["iot", "can bus", "spi", "i2c", "arm", "fpga"],
  },
  blockchain: {
    critical: ["blockchain", "smart contracts", "solidity", "web3", "cryptocurrency"],
    important: ["ethereum", "bitcoin", "defi", "nft", "cryptography"],
    bonus: ["solana", "polkadot", "rust", "smart contract audit", "dapp"],
  },
  cybersecurity: {
    critical: ["cybersecurity", "security", "network security", "penetration testing", "vulnerability"],
    important: ["firewall", "ids/ips", "siem", "incident response", "risk assessment"],
    bonus: ["ethical hacking", "malware analysis", "forensics", "compliance", "iso 27001"],
  },
  cloudEngineer: {
    critical: ["aws", "azure", "gcp", "cloud", "infrastructure", "serverless"],
    important: ["docker", "kubernetes", "terraform", "ci/cd", "monitoring"],
    bonus: ["microservices", "security", "networking", "devops", "automation"],
  },
  dataScientist: {
    critical: ["data science", "machine learning", "python", "statistics", "modeling"],
    important: ["deep learning", "nlp", "computer vision", "big data", "sql"],
    bonus: ["mlops", "aws", "gcp", "azure", "spark", "hadoop"],
  },
  dataEngineer: {
    critical: ["data engineering", "big data", "etl", "sql", "pipeline", "data warehouse"],
    important: ["spark", "hadoop", "kafka", "aws", "gcp", "azure"],
    bonus: ["data modeling", "data governance", "data quality", "mlops"],
  },
  qaAutomation: {
    critical: ["qa", "automation", "testing", "selenium", "cypress", "playwright"],
    important: ["api testing", "performance testing", "test plan", "test case"],
    bonus: ["ci/cd", "jira", "git", "postman", "load testing"],
  },
  technicalWriter: {
    critical: ["technical writing", "documentation", "api documentation", "user guides"],
    important: ["content strategy", "editing", "proofreading", "communication"],
    bonus: ["markdown", "dita", "xml", "content management systems"],
  },
  itSupport: {
    critical: ["it support", "help desk", "troubleshooting", "technical support", "hardware"],
    important: ["windows", "linux", "networking", "customer service"],
    bonus: ["active directory", "remote support", "itIL", "security"],
  },
  networkEngineer: {
    critical: ["networking", "cisco", "router", "switch", "firewall", "tcp/ip"],
    important: ["vpn", "security", "routing", "switching", "troubleshooting"],
    bonus: ["aws", "azure", "sdn", "network automation", "security"],
  },
  salesEngineer: {
    critical: ["sales", "technical sales", "solution architecture", "pre-sales", "customer success"],
    important: ["product knowledge", "communication", "presentation", "negotiation"],
    bonus: ["crm", "technical expertise", "business development"],
  },
  businessAnalyst: {
    critical: ["business analysis", "requirements gathering", "stakeholder management", "process improvement"],
    important: ["data analysis", "documentation", "agile", "scrum"],
    bonus: ["sql", "excel", "jira", "process mapping", "strategy"],
  },
  projectCoordinator: {
    critical: ["project coordination", "planning", "scheduling", "communication", "organization"],
    important: ["task management", "stakeholder communication", "reporting"],
    bonus: ["jira", "confluence", "agile", "team coordination"],
  },
  qaLead: {
    critical: ["qa", "leadership", "test strategy", "team management", "automation"],
    important: ["mentoring", "quality assurance", "process improvement", "risk management"],
    bonus: ["ci/cd", "performance testing", "security testing", "test automation frameworks"],
  },
  softwareArchitect: {
    critical: ["software architecture", "system design", "scalability", "performance", "security"],
    important: ["design patterns", "microservices", "cloud architecture", "api design"],
    bonus: ["aws", "azure", "gcp", "devops", "technical leadership"],
  },
};