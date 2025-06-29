
export enum RiskLevel {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Critical = 'Critical'
}

export interface AuditSection {
  title: string;
  risk: RiskLevel;
  analysis: string;
  recommendation: string;
}

export interface AuditResult {
  overallRisk: RiskLevel;
  summary: string;
  sections: AuditSection[];
}
