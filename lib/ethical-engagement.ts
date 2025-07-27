// Ethical engagement system - ensures responsible monetization
// Following industry best practices for user well-being and transparency

export interface EthicalGuidelines {
  transparentPricing: boolean
  valueFirstApproach: boolean
  respectUserChoices: boolean
  noManipulativeTactics: boolean
  clearCancellation: boolean
  dataPrivacy: boolean
}

export const ETHICAL_PRINCIPLES = {
  // Transparency - Users always know what they're paying for
  TRANSPARENT_PRICING: {
    principle: 'All costs are clearly displayed upfront',
    implementation: 'No hidden fees, clear subscription terms, usage tracking'
  },
  
  // Value-First - Users receive value before being asked to pay
  VALUE_FIRST: {
    principle: 'Provide value before monetization',
    implementation: 'Free tier with meaningful features, trial periods, progressive disclosure'
  },
  
  // Respect - Honor user decisions and boundaries
  RESPECT_BOUNDARIES: {
    principle: 'Respect user choices and financial limits',
    implementation: 'Easy cancellation, spending limits, no aggressive upselling'
  },
  
  // No Dark Patterns - Avoid manipulative design
  NO_MANIPULATION: {
    principle: 'No dark patterns or psychological manipulation',
    implementation: 'Clear CTAs, honest scarcity, no forced continuity'
  },
  
  // Privacy - Protect user data and preferences
  DATA_PROTECTION: {
    principle: 'Protect user privacy and data',
    implementation: 'Minimal data collection, secure payments, user control'
  }
} as const

export interface EngagementMetrics {
  userSatisfaction: number // 1-10 scale
  retentionRate: number // 0-1
  voluntaryUpgrades: number // Upgrades without prompting
  supportTickets: number // Lower is better
  cancellationRate: number // 0-1
  timeToValue: number // Days until user sees value
}

export class EthicalEngagementSystem {
  
  // Check if an upgrade prompt is appropriate based on user behavior
  static shouldShowUpgradePrompt(user: any, usage: any): boolean {
    // Don't show upgrade prompts to new users (less than 3 days)
    const accountAge = Date.now() - new Date(user.createdAt).getTime()
    if (accountAge < 3 * 24 * 60 * 60 * 1000) return false
    
    // Only show to engaged users (at least 5 interactions)
    if (usage.totalInteractions < 5) return false
    
    // Don't show if user recently declined (24 hour cooldown)
    if (user.lastUpgradeDeclined && 
        Date.now() - new Date(user.lastUpgradeDeclined).getTime() < 24 * 60 * 60 * 1000) {
      return false
    }
    
    // Show only when user hits a natural limit
    return usage.approachingLimit || usage.hitLimit
  }
  
  // Generate contextual, helpful upgrade messaging
  static getUpgradeMessage(user: any, context: string): string {
    const messages = {
      messageLimit: `You're getting great use out of VGirl AI! Upgrade to continue your conversations without daily limits.`,
      companionLimit: `You've created the maximum free companions. Upgrade to create unlimited AI companions.`,
      featureRequest: `This feature is available in our premium tiers. Upgrade to unlock advanced AI capabilities.`,
      valueReached: `You've been actively using VGirl AI! Consider upgrading to get even more value from your interactions.`
    }
    
    return messages[context as keyof typeof messages] || messages.valueReached
  }
  
  // Validate that monetization follows ethical guidelines
  static validateEthicalCompliance(feature: any): EthicalGuidelines {
    return {
      transparentPricing: this.hasTransparentPricing(feature),
      valueFirstApproach: this.providesValueFirst(feature),
      respectUserChoices: this.respectsUserChoices(feature),
      noManipulativeTactics: this.avoidsDarkPatterns(feature),
      clearCancellation: this.hasClearCancellation(feature),
      dataPrivacy: this.protectsPrivacy(feature)
    }
  }
  
  private static hasTransparentPricing(feature: any): boolean {
    return !!(feature.pricing && feature.pricing.displayedUpfront && !feature.pricing.hiddenFees)
  }
  
  private static providesValueFirst(feature: any): boolean {
    return !!(feature.freeTier && feature.freeTier.meaningfulFeatures)
  }
  
  private static respectsUserChoices(feature: any): boolean {
    return !!(feature.cancellation && feature.cancellation.easy && !feature.manipulation)
  }
  
  private static avoidsDarkPatterns(feature: any): boolean {
    return !(feature.urgency?.fake || feature.scarcity?.fake || feature.subscription?.autoRenewal)
  }
  
  private static hasClearCancellation(feature: any): boolean {
    return !!(feature.cancellation && feature.cancellation.oneClick)
  }
  
  private static protectsPrivacy(feature: any): boolean {
    return !!(feature.privacy && feature.privacy.minimalData && feature.privacy.userControl)
  }
}

// Healthy engagement patterns - encourage positive user behavior
export const ENGAGEMENT_PATTERNS = {
  // Progressive disclosure - reveal features gradually
  PROGRESSIVE_DISCLOSURE: {
    week1: ['Basic chat', 'Public companions'],
    week2: ['Custom companions', 'Personality customization'],
    week3: ['Advanced features', 'Premium content'],
    onboarding: 'Gradual feature introduction based on usage patterns'
  },
  
  // Natural upgrade points - when users organically need more
  NATURAL_UPGRADE_POINTS: [
    'Hit daily message limit after regular use',
    'Want to create 4th companion',
    'Request advanced AI features',
    'Engage with premium content',
    'Show creator interest'
  ],
  
  // Value reinforcement - remind users of value received
  VALUE_REINFORCEMENT: {
    weekly: 'Show conversation highlights and companion growth',
    monthly: 'Display usage stats and time saved/entertainment provided',
    milestone: 'Celebrate user achievements and companion relationships'
  }
} as const

// Anti-pattern detection - identify and prevent harmful practices
export const ANTI_PATTERNS = {
  // Red flags that indicate unethical monetization
  RED_FLAGS: [
    'Immediate upgrade prompts for new users',
    'Fake scarcity (limited time offers with no real limit)',
    'Confusing cancellation process',
    'Hidden recurring charges',
    'Manipulative language about "missing out"',
    'Excessive upselling after user declines',
    'Blocking features that were previously free'
  ],
  
  // Healthy alternatives to common dark patterns
  HEALTHY_ALTERNATIVES: {
    urgency: 'Show genuine value instead of fake scarcity',
    upselling: 'Focus on user needs and natural upgrade points',
    retention: 'Improve core product value rather than making leaving difficult',
    pricing: 'Be transparent about all costs upfront',
    features: 'Use feature gating thoughtfully, not punitively'
  }
} as const

export default EthicalEngagementSystem
