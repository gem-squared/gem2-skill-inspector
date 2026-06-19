export interface SkillAudit {
  name: string;
  path: string;
  tokenCount: number;
  description: string;
  triggerCollisions: string[];
  ambiguityScore: number;
  compactionResistance: 'high' | 'medium' | 'low';
}

export interface InspectionReport {
  scannedAt: string;
  skillsDirectory: string;
  totalSkills: number;
  totalTokens: number;
  audits: SkillAudit[];
  collisions: Array<{ skillA: string; skillB: string; similarity: number }>;
  duplicates: Array<{ skills: string[]; reason: string }>;
  recommendations: string[];
}
