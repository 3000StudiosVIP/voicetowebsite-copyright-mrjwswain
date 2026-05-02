/**
 * VoiceToWebsite - Token Usage Tracker
 * Copyright © 2024-2026 3000 Studios. All rights reserved.
 * 
 * Tracks API token usage across Gemini, Vertex AI, and other services
 * Prevents accidental overages with configurable limits
 */

interface TokenUsageEntry {
  timestamp: Date;
  service: 'gemini' | 'vertex-ai' | 'speech' | 'tts' | 'other';
  tokensUsed: number;
  costEstimate: number;
  userId?: string;
  action: string;
}

interface TokenLimits {
  maxTokensPerDay: number;
  maxTokensPerMonth: number;
  warnThresholdPercentage: number;
  blockThresholdPercentage: number;
}

const DEFAULT_LIMITS: Record<string, TokenLimits> = {
  gemini: {
    maxTokensPerDay: 100000,
    maxTokensPerMonth: 2000000,
    warnThresholdPercentage: 80,
    blockThresholdPercentage: 95,
  },
  'vertex-ai': {
    maxTokensPerDay: 500000,
    maxTokensPerMonth: 10000000,
    warnThresholdPercentage: 80,
    blockThresholdPercentage: 95,
  },
};

export class TokenUsageTracker {
  private static instance: TokenUsageTracker;
  private usageLog: TokenUsageEntry[] = [];
  private limits: Record<string, TokenLimits> = DEFAULT_LIMITS;

  private constructor() {
    this.loadUsageLog();
  }

  public static getInstance(): TokenUsageTracker {
    if (!TokenUsageTracker.instance) {
      TokenUsageTracker.instance = new TokenUsageTracker();
    }
    return TokenUsageTracker.instance;
  }

  /**
   * Log token usage for an API call
   */
  public logUsage(entry: Omit<TokenUsageEntry, 'timestamp'>): void {
    const fullEntry: TokenUsageEntry = {
      ...entry,
      timestamp: new Date(),
    };

    this.usageLog.push(fullEntry);
    this.saveUsageLog();

    // Check if we're approaching limits
    this.checkLimits(entry.service);
  }

  /**
   * Get usage for a specific service today
   */
  public getUsageToday(service: string): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.usageLog
      .filter(entry => {
        entry.timestamp.setHours(0, 0, 0, 0);
        return entry.service === service && entry.timestamp.getTime() === today.getTime();
      })
      .reduce((sum, entry) => sum + entry.tokensUsed, 0);
  }

  /**
   * Get usage for a specific service this month
   */
  public getUsageThisMonth(service: string): number {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);

    return this.usageLog
      .filter(entry => entry.service === service && entry.timestamp >= firstDay)
      .reduce((sum, entry) => sum + entry.tokensUsed, 0);
  }

  /**
   * Get cost estimate for service
   */
  public getCostEstimate(service: string): number {
    return this.usageLog
      .filter(entry => entry.service === service)
      .reduce((sum, entry) => sum + entry.costEstimate, 0);
  }

  /**
   * Check if usage is approaching limits
   */
  private checkLimits(service: string): void {\n    const limits = this.limits[service];\n    if (!limits) return;\n\n    const usageToday = this.getUsageToday(service);\n    const percentageUsed = (usageToday / limits.maxTokensPerDay) * 100;\n\n    if (percentageUsed >= limits.blockThresholdPercentage) {\n      console.error(`⛔ TOKEN LIMIT BLOCKED: ${service} has reached ${percentageUsed.toFixed(1)}% of daily limit`);\n      throw new Error(`Token limit exceeded for ${service}`);\n    }\n\n    if (percentageUsed >= limits.warnThresholdPercentage) {\n      console.warn(`⚠️ TOKEN LIMIT WARNING: ${service} at ${percentageUsed.toFixed(1)}% of daily limit`);\n    }\n  }\n\n  /**\n   * Save usage log to localStorage (development) or database (production)\n   */\n  private saveUsageLog(): void {\n    if (typeof window !== 'undefined') {\n      localStorage.setItem('tokenUsageLog', JSON.stringify(this.usageLog));\n    }\n  }\n\n  /**\n   * Load usage log from localStorage or database\n   */\n  private loadUsageLog(): void {\n    if (typeof window !== 'undefined') {\n      const saved = localStorage.getItem('tokenUsageLog');\n      if (saved) {\n        try {\n          this.usageLog = JSON.parse(saved);\n        } catch (e) {\n          console.error('Failed to load usage log', e);\n        }\n      }\n    }\n  }\n\n  /**\n   * Get formatted usage report\n   */\n  public getReport(): string {\n    const services = ['gemini', 'vertex-ai', 'speech', 'tts'];\n    let report = '\\n📊 TOKEN USAGE REPORT\\n';\n    report += `Generated: ${new Date().toISOString()}\\n\\n`;\n\n    for (const service of services) {\n      const todayUsage = this.getUsageToday(service);\n      const monthUsage = this.getUsageThisMonth(service);\n      const cost = this.getCostEstimate(service);\n\n      if (todayUsage > 0 || monthUsage > 0) {\n        report += `${service}:\\n`;\n        report += `  Today: ${todayUsage} tokens\\n`;\n        report += `  This Month: ${monthUsage} tokens\\n`;\n        report += `  Est. Cost: $${cost.toFixed(2)}\\n\\n`;\n      }\n    }\n\n    return report;\n  }\n\n  /**\n   * Reset usage counters (for testing)\n   */\n  public reset(): void {\n    this.usageLog = [];\n    this.saveUsageLog();\n  }\n}\n\nexport const tokenUsageTracker = TokenUsageTracker.getInstance();