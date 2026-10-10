export type Language = 'en' | 'kn';

export type CropType = 'tomato' | 'potato' | 'maize';

export interface CropInfo {
  id: CropType;
  nameEn: string;
  nameKn: string;
  scientificName: string;
  seasonKarnataka: string;
  majorGrowingDistricts: string[];
  isSupported: boolean;
}

export interface DiagnosisResult {
  id: string;
  timestamp: string;
  crop: CropType;
  imageQualityAssessment: string;
  isConclusive: boolean;
  possibleCondition: string;
  conditionKannada: string;
  confidenceLevel?: string;
  alternativePossibilities?: string[];
  observedSymptoms: string[];
  possibleCauses: string[];
  preventionAdvice: string[];
  safeManagementSteps: string[];
  organicOptions: string[];
  expertInspectionNeeded: boolean;
  expertGuidance: string;
  limitations: string;
  isDemoFallback: boolean;
  source: string;
  imageDataUrl?: string; // Stored only if user consents
  farmerNotes?: string;
}

export interface Scheme {
  id: string;
  officialNameEn: string;
  officialNameKn: string;
  level: 'Central' | 'Karnataka State';
  category: 'Income Support' | 'Crop Insurance & Loss' | 'Irrigation & Infrastructure' | 'Millet & Seed Subsidy' | 'Credit & Loan' | 'Social Security';
  purposeEn: string;
  purposeKn: string;
  verificationStatus: 'Officially Verified' | 'Requires Field Verification';
  lastVerifiedDate: string;
  eligibilityEn: string[];
  eligibilityKn: string[];
  requiredDocumentsEn: string[];
  requiredDocumentsKn: string[];
  applicationProcedureEn: string[];
  applicationProcedureKn: string[];
  applicationPortalUrl: string;
  portalName: string;
  officialHelpline: string;
  applicableDistricts: string; // 'All Karnataka Districts' or specific
  applicableCrops: string[];
  sourceUrl: string;
}

export interface FarmerQuestionnaire {
  district: string;
  taluk: string;
  cropType: string;
  landHoldingSize: 'small_marginal' | 'medium_large' | 'tenant'; // Small/marginal (<2 ha / 5 acres)
  cropInsured: 'yes' | 'no' | 'unsure';
  assistanceNeeded: 'crop_loss' | 'income_support' | 'irrigation_equipment' | 'seeds_fertilizer' | 'credit_kcc';
  currentDamageSituation: 'drought' | 'pest_disease' | 'unseasonal_rain' | 'none';
}

export interface SchemeMatchResult {
  scheme: Scheme;
  matchScore: number; // 0 to 100
  matchReasonEn: string;
  matchReasonKn: string;
  unverifiedConditionsEn: string[];
  unverifiedConditionsKn: string[];
  missingInformationEn: string[];
  missingInformationKn: string[];
}

export interface CropAlert {
  id: string;
  crop: CropType | 'all';
  severity: 'high' | 'medium' | 'info';
  titleEn: string;
  titleKn: string;
  districtZoneEn: string;
  districtZoneKn: string;
  seasonKarnatakaEn: string;
  seasonKarnatakaKn: string;
  symptomsAndRiskEn: string;
  symptomsAndRiskKn: string;
  actionRequiredEn: string[];
  actionRequiredKn: string[];
  source: string;
  lastUpdatedDate: string;
  isEducationalAdvisory: boolean;
}

export interface SampleDemoCase {
  id: string;
  titleEn: string;
  titleKn: string;
  crop: CropType;
  conditionEn: string;
  conditionKn: string;
  descriptionEn: string;
  descriptionKn: string;
  mockResult: Omit<DiagnosisResult, 'id' | 'timestamp'>;
  sampleSvg: string; // High-fidelity visual preview
}

export type TrackerCategory = 'irrigation' | 'fertilizer' | 'pest_scouting' | 'weeding' | 'harvest' | 'general';

export interface GrowthStageMilestone {
  id: string;
  stageNameEn: string;
  stageNameKn: string;
  dayStart: number; // Days after sowing/planting
  dayEnd: number;
  stageCategory: 'germination' | 'vegetative' | 'flowering' | 'fruiting' | 'maturity' | 'harvest';
  descriptionEn: string;
  descriptionKn: string;
  recommendedTasksEn: string[];
  recommendedTasksKn: string[];
  pestAlertEn: string;
  pestAlertKn: string;
  isHarvestStage?: boolean;
}

export interface CropGrowthTemplate {
  cropId: string;
  cropNameEn: string;
  cropNameKn: string;
  emoji: string;
  scientificName: string;
  durationDays: number;
  seasonKarnatakaEn: string;
  seasonKarnatakaKn: string;
  recommendedMethod: 'direct_seed' | 'transplant';
  stages: GrowthStageMilestone[];
  harvestTipsEn: string[];
  harvestTipsKn: string[];
  maturityIndicatorsEn: string[];
  maturityIndicatorsKn: string[];
}

export interface TrackerReminder {
  id: string;
  titleEn: string;
  titleKn: string;
  category: TrackerCategory;
  targetDate: string; // YYYY-MM-DD
  dayOffset: number; // DAS
  stageId: string;
  isCompleted: boolean;
  notes?: string;
}

export interface CropTrackerRecord {
  id: string;
  userId?: string;
  cropId: string;
  cropNameEn: string;
  cropNameKn: string;
  emoji: string;
  plotName: string;
  plantingDate: string; // YYYY-MM-DD
  varietyOrType?: string;
  areaAcreage?: string;
  method: 'direct_seed' | 'transplant';
  notes?: string;
  createdAt: string;
  reminders: TrackerReminder[];
}
