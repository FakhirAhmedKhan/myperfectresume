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
  }
};
