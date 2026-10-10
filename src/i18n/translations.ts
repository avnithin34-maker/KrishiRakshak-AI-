import { Language } from '../types';

export const translations = {
  en: {
    appTitle: 'KrishiRakshak AI',
    appTagline: 'Identify Early. Protect Crops. Discover Farmer Benefits.',
    karnatakaFocusBadge: 'Karnataka Agricultural Advisory & Scheme Navigator',
    disclaimerBanner: 'Independent Agricultural Advisory Tool. Not an official government department portal. Always verify treatments with your local Raitha Samparka Kendra.',
    
    // Navigation
    navHome: 'Home Dashboard',
    navDoctor: 'Crop Doctor',
    navSchemes: 'Scheme Navigator',
    navAlerts: 'Crop Alerts',
    navHistory: 'My Crop History',
    navTips: 'IPM & Safe Protection',
    navChat: 'Krishi Mitra Chatbot',
    navMaps: 'RSK & Mandi Locator',

    // Auth & Cloud Sync
    signInBtn: 'Sign in with Google',
    signOutBtn: 'Sign Out',
    cloudSynced: 'Cloud Synced (Firestore)',
    localMode: 'Local Storage Mode',
    signInToSyncMsg: 'Sign in with Google to securely sync your crop records across all your devices using Firebase Firestore.',
    
    // Language Switcher
    langSwitchKn: 'ಕನ್ನಡ',
    langSwitchEn: 'English',

    // Hero & Home
    heroWelcome: 'Welcome, Karnataka Farmers',
    heroSubtitle: 'Instant visual leaf screening for Tomato, Potato & Maize. Learn safe field remedies and check eligible Karnataka & Central government schemes.',
    btnUploadPhoto: 'Upload Leaf Photo',
    btnExploreSchemes: 'Check Eligible Schemes',
    btnViewDemo: 'Explore Sample Demos',

    // Feature Cards
    cardDoctorTitle: 'AI Crop Doctor',
    cardDoctorDesc: 'Upload a leaf photo to screen for visible fungal, bacterial, or insect damage with safe IPM measures.',
    cardSchemeTitle: 'Government Schemes',
    cardSchemeDesc: 'Explore PM-KISAN, PMFBY, Parihara crop loss, Krishi Bhagya & FID registration without revealing Aadhaar.',
    cardAlertsTitle: 'Local Alerts',
    cardAlertsDesc: 'Seasonal pest advisories for Karnataka agro-climatic zones, Fall armyworm, and blights.',
    cardHistoryTitle: 'My Crop History',
    cardHistoryDesc: 'Review saved screenings and notes directly in your browser. No personal records uploaded.',
    cardTipsTitle: 'Safe IPM Practices',
    cardTipsDesc: 'Organic bio-control solutions, field sanitation, and certified agronomist contact guidelines.',

    // Step by step
    howItWorksTitle: 'How KrishiRakshak Works in 4 Steps',
    step1Title: '1. Select Crop & Take Photo',
    step1Desc: 'Choose Tomato, Potato, or Maize. Take a clear, focused photo of an affected leaf in bright daylight.',
    step2Title: '2. Preliminary Visual Screening',
    step2Desc: 'Gemini AI evaluates leaf patterns, distinguishing observed visual marks from potential causes.',
    step3Title: '3. Safe Non-Chemical Advice',
    step3Desc: 'Follow field sanitation, neem-based bio-pesticides, and expert consultation guidelines.',
    step4Title: '4. Scheme Assistance',
    step4Desc: 'Find out if you qualify for crop insurance claims, drought relief, or input subsidies.',

    // Sample Demonstrations
    sampleDemoTitle: 'Illustrative Sample Demonstrations',
    sampleDemoSubtitle: 'Test the system with realistic illustrative leaf cases. Clearly marked sample data for educational demonstration.',
    btnTestSample: 'Load This Sample',

    // Crop Doctor Page
    doctorTitle: 'AI Crop Disease Detection',
    doctorSubtitle: 'Select your crop, capture or upload a leaf photo, and receive transparent visual screening with safety advice.',
    selectCropLabel: 'Select Crop',
    cropTomato: 'Tomato (ಟೊಮೇಟೊ)',
    cropPotato: 'Potato (ಆಲೂಗಡ್ಡೆ)',
    cropMaize: 'Maize / Corn (ಮೆಕ್ಕೆಜೋಳ)',
    cropOther: 'Other Crops (Coming Soon)',
    cropOtherNotice: 'Only Tomato, Potato, and Maize are currently supported for validated leaf screening. Other crops will be enabled after calibration.',
    
    uploadBoxTitle: 'Upload or Capture Leaf Photograph',
    uploadBoxSubtitle: 'Supports JPG, PNG, WebP up to 10MB. Ensure good lighting and a clear close-up of the leaf surface.',
    btnCaptureOrBrowse: 'Choose Photo / Use Camera',
    btnRemoveImage: 'Remove Photo',
    btnAnalyze: 'Analyse Crop Leaf',
    btnAnalyzing: 'Screening Leaf with AI...',
    btnUseDemoMode: 'Run in Offline Demo Mode',

    // Validation & Quality
    errNoImage: 'Please select or capture a leaf photo first.',
    errInvalidFormat: 'Invalid file format. Please upload a JPEG, PNG, or WebP image.',
    errFileTooLarge: 'File size exceeds 10MB limit. Please upload a smaller photograph.',
    
    // Result Card
    resultHeading: 'Visual Screening Result',
    badgeConclusive: 'Leaf Evaluated',
    badgeInconclusive: 'Inconclusive / Photo Unclear',
    badgeDemo: 'Illustrative Demo Mode',
    imageQualityLabel: 'Photo Quality Review',
    possibleConditionLabel: 'Possible Suspected Condition',
    alternativePossibilitiesLabel: 'Alternative Possibilities',
    observedSymptomsLabel: 'Directly Observed Visual Symptoms',
    possibleCausesLabel: 'Potential Environmental & Biological Causes',
    safeManagementLabel: 'Safe Field Management & Sanitation',
    preventionAdviceLabel: 'Preventative Cultural Practices',
    organicOptionsLabel: 'Organic & Bio-Control Measures',
    expertGuidanceLabel: 'Agronomist & Official Consultation',
    limitationsLabel: 'Scientific Limitations & Disclaimer',
    btnSaveHistory: 'Save Result to My History',
    btnSavedSuccess: 'Saved to Crop History!',
    savePhotoConsent: 'Include compressed photo preview in browser history',

    // Scheme Navigator
    schemeNavTitle: 'Karnataka & Central Government Scheme Navigator',
    schemeNavSubtitle: 'Search verified farmer programmes, check eligibility criteria, and find official application links without sharing confidential numbers.',
    tabAllSchemes: 'All Schemes Directory',
    tabEligibilityWizard: 'Find Schemes for My Land (Questionnaire)',
    filterLevel: 'All Levels',
    filterCentral: 'Central Government',
    filterKarnataka: 'Karnataka State',
    searchPlaceholder: 'Search by scheme name, crop, or benefit...',
    verifiedBadge: 'Verified Scheme Info',
    fieldVerificationBadge: 'Field Verification Needed',
    lastVerifiedPrefix: 'Last verified:',
    btnViewDetails: 'View Scheme Details & Procedure',
    btnApplyPortal: 'Open Official Application Portal',

    // Questionnaire
    wizardTitle: 'Farmer Eligibility Questionnaire',
    wizardSubtitle: 'Answer simple questions about your land and crop. We do NOT ask for Aadhaar, Bank Details, or OTPs.',
    labelDistrict: 'Select Karnataka District',
    labelTaluk: 'Enter Taluk / Village Area',
    labelCrop: 'Select Current Crop',
    labelLandSize: 'Land Holding Category',
    optSmallMarginal: 'Small & Marginal Farmer (Less than 2 Hectares / 5 Acres)',
    optMediumLarge: 'Medium / Large Farmer (More than 2 Hectares)',
    optTenant: 'Tenant Farmer / Sharecropper',
    labelInsured: 'Is this crop insured under PMFBY / Raitha Suraksha?',
    optYes: 'Yes, Enrolled',
    optNo: 'No, Not Insured',
    optUnsure: 'Not Sure / Need to check FID',
    labelAssistance: 'Primary Assistance Needed',
    optCropLoss: 'Crop Damage / Natural Calamity Compensation',
    optIncomeSupport: 'Direct Income Support / Cash Assistance',
    optIrrigation: 'Drip / Sprinkler Irrigation Subsidy (Krishi Bhagya)',
    optSeedsFertilizer: 'Seed, Micro-Nutrient or Millet Subsidy',
    optCredit: 'Kisan Credit Card (KCC) Crop Loan',
    labelDamage: 'Current Farm Damage Situation',
    optDrought: 'Drought / Severe Water Shortage',
    optPest: 'Pest Infestation / Disease Attack',
    optUnseasonal: 'Heavy Rain / Hailstorm / Flood Damage',
    optNone: 'Normal Season / General Benefits',
    btnCheckEligibility: 'Compute Matching Schemes',
    matchingSchemesTitle: 'Potentially Relevant Schemes for Your Situation',
    noMatchNotice: 'No exact match found based on the selected criteria. Browse the full scheme directory below or consult your Gram Panchayat / RSK office.',

    // History Page
    historyTitle: 'My Crop Screening History',
    historySubtitle: 'Diagnostic records saved locally on this browser. No personal data is stored on remote servers.',
    emptyHistoryTitle: 'No Saved Screenings Yet',
    emptyHistoryDesc: 'Analyze a leaf photograph in the Crop Doctor page and click "Save Result to My History" to view it here.',
    btnClearAllHistory: 'Clear All Local History',
    confirmClearHistory: 'Are you sure you want to delete all saved crop screening records from this browser?',
    btnPrintHistory: 'Print / Save Report',
    notesPlaceholder: 'Add farmer field notes (e.g. spray date, plot number, rainfall)...',
    btnSaveNotes: 'Save Note',

    // Crop Alerts
    alertsTitle: 'Karnataka Seasonal Crop Alerts & Advisories',
    alertsSubtitle: 'Research-grounded pest and disease advisories from Karnataka Agricultural Universities and Department of Agriculture.',
    alertEducationalNote: 'Educational advisory notice based on Karnataka Package of Practices. For real-time localized surveillance, contact your Taluk Agriculture Office.',
    
    // Safety & IPM Tips
    tipsTitle: 'Crop Protection & Integrated Pest Management (IPM)',
    tipsSubtitle: 'Environment-friendly pest suppression guidelines for Karnataka farming conditions.',
    
    // Privacy & Safety Modal
    privacyTitle: 'Privacy & Data Protection Notice',
    privacyBody: 'KrishiRakshak AI is built with privacy-first principles. We do not store leaf photographs on external servers unless you analyze them. No Aadhaar number, bank account, or OTP is ever requested. Saved history resides strictly in your browser storage.',

    // PWA & Low Connectivity
    installAppBtn: 'Install App',
    installOnIOSBtn: 'Install on Phone',
    installIOSTitle: 'Install KrishiRakshak AI on iPhone / iPad',
    installIOSStep1: 'Tap the Share icon in Safari toolbar.',
    installIOSStep2: 'Scroll down and tap "Add to Home Screen".',
    offlineStatusBadge: 'Offline Mode Active',
    offlineStatusMessage: 'Low connectivity detected. Working offline from cached data. Scheme catalog, crop protection guides, and saved history are available offline.',
    onlineRestoredMessage: 'Network connectivity restored. Live services active.',
    closeBtn: 'Close',
  },

  kn: {
    appTitle: 'ಕೃಷಿ ರಕ್ಷಕ AI',
    appTagline: 'ರೋಗ ಮುಂಚಿತವಾಗಿ ಗುರುತಿಸಿ. ಬೆಳೆ ರಕ್ಷಿಸಿ. ರೈತ ಸವಲತ್ತುಗಳನ್ನು ಪಡೆಯಿರಿ.',
    karnatakaFocusBadge: 'ಕರ್ನಾಟಕ ಕೃಷಿ ಸಲಹೆ ಮತ್ತು ಸರಕಾರಿ ಯೋಜನೆಗಳ ಮಾರ್ಗದರ್ಶಿ',
    disclaimerBanner: 'ಸ್ವತಂತ್ರ ಕೃಷಿ ಸಲಹಾ ಸಾಧನ. ಇದು ಅಧಿಕೃತ ಸರಕಾರಿ ಇಲಾಖಾ ತಾಣವಲ್ಲ. ಯಾವುದೇ ರಾಸಾಯನಿಕ ಚಿಕಿತ್ಸೆಗೆ ನಿಮ್ಮ ಸ್ಥಳೀಯ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರವನ್ನು (RSK) ಸಂಪರ್ಕಿಸಿ.',

    // Navigation
    navHome: 'ಮುಖಪುಟ',
    navDoctor: 'ಬೆಳೆ ವೈದ್ಯ (ರೋಗ ಪತ್ತೆ)',
    navSchemes: 'ಯೋಜನೆ ಮಾರ್ಗದರ್ಶಿ',
    navAlerts: 'ಬೆಳೆ ಎಚ್ಚರಿಕೆಗಳು',
    navHistory: 'ನನ್ನ ಬೆಳೆ ಇತಿಹಾಸ',
    navTips: 'ಸುರಕ್ಷಿತ ಬೆಳೆ ರಕ್ಷಣೆ',
    navChat: 'ಕೃಷಿ ಮಿತ್ರ AI ಚಾಟ್‌ಬಾಟ್',
    navMaps: 'ಕೃಷಿ ಕೇಂದ್ರಗಳು (ನಕ್ಷೆ)',

    // Auth & Cloud Sync
    signInBtn: 'ಗೂಗಲ್ ಲಾಗಿನ್',
    signOutBtn: 'ಲಾಗ್‌ಔಟ್',
    cloudSynced: 'ಮೇಘ ಸಂಗ್ರಹಣೆ (Firestore)',
    localMode: 'ಸ್ಥಳೀಯ ಬ್ರೌಸರ್ ಕ್ರಮ',
    signInToSyncMsg: 'ಫೈರ್‌ಬೇಸ್ ಫೈರ್‌ಸ್ಟೋರ್ ಮೂಲಕ ನಿಮ್ಮ ಎಲ್ಲಾ ಫೋನ್‌ಗಳಲ್ಲಿ ಬೆಳೆ ದಾಖಲೆಗಳನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಸಿಂಕ್ ಮಾಡಲು ಗೂಗಲ್ ಮೂಲಕ ಲಾಗಿನ್ ಆಗಿ.',

    // Language Switcher
    langSwitchKn: 'ಕನ್ನಡ',
    langSwitchEn: 'English',

    // Hero & Home
    heroWelcome: 'ಕರ್ನಾಟಕದ ರೈತ ಬಾಂಧವರಿಗೆ ಸುಸ್ವಾಗತ',
    heroSubtitle: 'ಟೊಮೇಟೊ, ಆಲೂಗಡ್ಡೆ ಮತ್ತು ಮೆಕ್ಕೆಜೋಳದ ಎಲೆ ರೋಗಗಳನ್ನು ತಕ್ಷಣವೇ ಪತ್ತೆಹಚ್ಚಿ. ಸುರಕ್ಷಿತ ಕೃಷಿ ಪದ್ಧತಿಗಳು ಮತ್ತು ಸರಕಾರಿ ಸವಲತ್ತುಗಳನ್ನು ತಿಳಿಯಿರಿ.',
    btnUploadPhoto: 'ಎಲೆಯ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    btnExploreSchemes: 'ಅರ್ಹ ಯೋಜನೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ',
    btnViewDemo: 'ಮಾದರಿ ಪರೀಕ್ಷೆ ನೋಡಿ',

    // Feature Cards
    cardDoctorTitle: 'AI ಬೆಳೆ ವೈದ್ಯ',
    cardDoctorDesc: 'ಎಲೆಯ ಫೋಟೋ ತೆಗೆದು ಶಿಲೀಂಧ್ರ, ಬ್ಯಾಕ್ಟೀರಿಯಾ ಅಥವಾ ಕೀಟಬಾಧೆಯನ್ನು ಸುರಕ್ಷಿತ ಕ್ರಮಗಳೊಂದಿಗೆ ಪರಿಶೀಲಿಸಿ.',
    cardSchemeTitle: 'ಸರಕಾರಿ ಯೋಜನೆಗಳು',
    cardSchemeDesc: 'ಪಿಎಂ-ಕಿಸಾನ್, ಬೆಳೆ ವಿಮೆ (PMFBY), ಪರಿಹಾರ ತಂತ್ರಾಂಶ, ಕೃಷಿ ಭಾಗ್ಯ ಹಾಗೂ ಫ್ರೂಟ್ಸ್ (FID) ನೋಂದಣಿ ಮಾಹಿತಿ.',
    cardAlertsTitle: 'ಸ್ಥಳೀಯ ಬೆಳೆ ಎಚ್ಚರಿಕೆಗಳು',
    cardAlertsDesc: 'ಕರ್ನಾಟಕದ ಕೃಷಿ ಹವಾಮಾನ ವಲಯಗಳಿಗೆ ಅನುಗುಣವಾಗಿ ಸೈನಿಕ ಹುಳು ಮತ್ತು ರೋಗಗಳ ಮುನ್ನೆಚ್ಚರಿಕೆ ಮಾಹಿತಿ.',
    cardHistoryTitle: 'ನನ್ನ ಬೆಳೆ ಇತಿಹಾಸ',
    cardHistoryDesc: 'ನೀವು ಪರಿಶೀಲಿಸಿದ ಬೆಳೆ ವರದಿಗಳನ್ನು ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲಿಯೇ ಸುರಕ್ಷಿತವಾಗಿ ಉಳಿಸಿಕೊಳ್ಳಿ.',
    cardTipsTitle: 'ಸುರಕ್ಷಿತ ಕೃಷಿ ಪದ್ಧತಿ',
    cardTipsDesc: 'ಸಾವಯವ ಜೈವಿಕ ನಿಯಂತ್ರಣ, ಬೇವಿನ ಕಷಾಯ, ಹೊಲದ ನೈರ್ಮಲ್ಯ ಹಾಗೂ ಕೃಷಿ ಅಧಿಕಾರಿಗಳ ಸಂಪರ್ಕ ಸೂಚಿ.',

    // Step by step
    howItWorksTitle: 'ಕೃಷಿ ರಕ್ಷಕ ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ? (೪ ಸರಳ ಹಂತಗಳು)',
    step1Title: '೧. ಬೆಳೆ ಆರಿಸಿ, ಫೋಟೋ ತೆಗೆಯಿರಿ',
    step1Desc: 'ಟೊಮೇಟೊ, ಆಲೂಗಡ್ಡೆ ಅಥವಾ ಮೆಕ್ಕೆಜೋಳವನ್ನು ಆರಿಸಿ. ಸೂರ್ಯನ ಬೆಳಕಿನಲ್ಲಿ ರೋಗಗ್ರಸ್ತ ಎಲೆಯ ಸ್ಪಷ್ಟ ಫೋಟೋ ತೆಗೆಯಿರಿ.',
    step2Title: '೨. ಪ್ರಾಥಮಿಕ ದೃಶ್ಯ ವಿಶ್ಲೇಷಣೆ',
    step2Desc: 'ಜೆಮಿನಿ AI ಎಲೆಯ ಮೇಲಿನ ದೃಶ್ಯ ಲಕ್ಷಣಗಳನ್ನು ಸೂಕ್ಷ್ಮವಾಗಿ ಪರಿಶೀಲಿಸಿ ಸಂಭಾವ್ಯ ರೋಗವನ್ನು ಅಂದಾಜಿಸುತ್ತದೆ.',
    step3Title: '೩. ಸುರಕ್ಷಿತ ಸಾವಯವ ಸಲಹೆ',
    step3Desc: 'ಅನಗತ್ಯ ಕೀಟನಾಶಕಗಳ ಬದಲು ಹೊಲದ ನೈರ್ಮಲ್ಯ, ಬೇವಿನ ಎಣ್ಣೆ ಹಾಗೂ ಜೈವಿಕ ನಿಯಂತ್ರಣ ಕ್ರಮಗಳನ್ನು ಪಾಲಿಸಿ.',
    step4Title: '೪. ಸರಕಾರಿ ಪರಿಹಾರ ಮಾಹಿತಿ',
    step4Desc: 'ಬೆಳೆ ನಷ್ಟ ಪರಿಹಾರ, ಬೆಳೆ ವಿಮೆ ಅಥವಾ ಹನಿ ನೀರಾವರಿ ಸಬ್ಸಿಡಿ ಪಡೆಯಲು ಅರ್ಹತೆಯ ವಿವರಗಳನ್ನು ಪಡೆಯಿರಿ.',

    // Sample Demonstrations
    sampleDemoTitle: 'ಪ್ರಾತ್ಯಕ್ಷಿಕೆ ಮಾದರಿಗಳು (ಡೆಮೊ)',
    sampleDemoSubtitle: 'ವಾಸ್ತವಿಕ ಮಾದರಿ ಎಲೆಗಳನ್ನು ಬಳಸಿ ವ್ಯವಸ್ಥೆಯನ್ನು ಪರೀಕ್ಷಿಸಿ. ಇದು ಶೈಕ್ಷಣಿಕ ಪ್ರಾತ್ಯಕ್ಷಿಕೆಗಾಗಿ ನೀಡಿದ ಮಾದರಿಗಳು.',
    btnTestSample: 'ಈ ಮಾದರಿಯನ್ನು ಪರೀಕ್ಷಿಸಿ',

    // Crop Doctor Page
    doctorTitle: 'AI ಬೆಳೆ ರೋಗ ಪತ್ತೆ (ಕ್ರಾಪ್ ಡಾಕ್ಟರ್)',
    doctorSubtitle: 'ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ಆರಿಸಿ, ಎಲೆಯ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ, ತಕ್ಷಣವೇ ಪ್ರಾಥಮಿಕ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಸುರಕ್ಷಿತ ಸಲಹೆ ಪಡೆಯಿರಿ.',
    selectCropLabel: 'ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    cropTomato: 'ಟೊಮೇಟೊ (Tomato)',
    cropPotato: 'ಆಲೂಗಡ್ಡೆ (Potato)',
    cropMaize: 'ಮೆಕ್ಕೆಜೋಳ (Maize)',
    cropOther: 'ಇತರ ಬೆಳೆಗಳು (ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ)',
    cropOtherNotice: 'ಪ್ರಸ್ತುತ ಟೊಮೇಟೊ, ಆಲೂಗಡ್ಡೆ ಮತ್ತು ಮೆಕ್ಕೆಜೋಳ ಬೆಳೆಗಳಿಗೆ ಮಾತ್ರ ಪರೀಕ್ಷಿತ ವಿಶ್ಲೇಷಣೆ ಲಭ್ಯವಿದೆ. ಇತರ ಬೆಳೆಗಳನ್ನು ಶೀಘ್ರದಲ್ಲೇ ಸೇರಿಸಲಾಗುವುದು.',

    uploadBoxTitle: 'ಎಲೆಯ ಛಾಯಾಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ತೆಗೆಯಿರಿ',
    uploadBoxSubtitle: 'JPG, PNG, WebP ಸ್ವರೂಪಗಳನ್ನು ಬೆಂಬಲಿಸುತ್ತದೆ (ಗರಿಷ್ಠ 10MB). ಉತ್ತಮ ಬೆಳಕಿನಲ್ಲಿ ಎಲೆಯ ಮೇಲ್ಮೈ ಸ್ಪಷ್ಟವಾಗಿರುವಂತೆ ನೋಡಿಕೊಳ್ಳಿ.',
    btnCaptureOrBrowse: 'ಫೋಟೋ ಆರಿಸಿ / ಕ್ಯಾಮೆರಾ ಬಳಸಿ',
    btnRemoveImage: 'ಫೋಟೋ ತೆಗೆದುಹಾಕಿ',
    btnAnalyze: 'ಬೆಳೆ ಎಲೆ ವಿಶ್ಲೇಷಿಸಿ',
    btnAnalyzing: 'AI ಮೂಲಕ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...',
    btnUseDemoMode: 'ಆಫ್‌ಲೈನ್ ಡೆಮೊ ಕ್ರಮದಲ್ಲಿ ಪರೀಕ್ಷಿಸಿ',

    // Validation & Quality
    errNoImage: 'ದಯವಿಟ್ಟು ಮೊದಲು ಎಲೆಯ ಫೋಟೋವನ್ನು ಆಯ್ಕೆಮಾಡಿ ಅಥವಾ ಕ್ಯಾಮೆರಾದಿಂದ ತೆಗೆಯಿರಿ.',
    errInvalidFormat: 'ಅಮಾನ್ಯ ಫೈಲ್ ಸ್ವರೂಪ. ದಯವಿಟ್ಟು JPEG, PNG ಅಥವಾ WebP ಚಿತ್ರವನ್ನು ನೀಡಿ.',
    errFileTooLarge: 'ಫೈಲ್ ಗಾತ್ರವು 10MB ಗಿಂತ ಹೆಚ್ಚಾಗಿದೆ. ದಯವಿಟ್ಟು ಚಿಕ್ಕ ಚಿತ್ರವನ್ನು ನೀಡಿ.',

    // Result Card
    resultHeading: 'ಪ್ರಾಥಮಿಕ ವಿಶ್ಲೇಷಣಾ ವರದಿ',
    badgeConclusive: 'ಎಲೆ ಪರಿಶೀಲಿಸಲಾಗಿದೆ',
    badgeInconclusive: 'ಅಸ್ಪಷ್ಟ ಛಾಯಾಚಿತ್ರ / ನಿಖರತೆ ಸಾಲದು',
    badgeDemo: 'ಶೈಕ್ಷಣಿಕ ಡೆಮೊ ಮಾದರಿ',
    imageQualityLabel: 'ಫೋಟೋದ ಗುಣಮಟ್ಟ ಪರೀಕ್ಷೆ',
    possibleConditionLabel: 'ಸಂಭಾವ್ಯ ರೋಗ ಅಥವಾ ಬಾಧೆ',
    alternativePossibilitiesLabel: 'ಇತರ ಸಂಭವನೀಯ ಸಾಧ್ಯತೆಗಳು',
    observedSymptomsLabel: 'ಎಲೆಯಲ್ಲಿ ಕಂಡುಬಂದ ಪ್ರಮುಖ ದೃಶ್ಯ ಲಕ್ಷಣಗಳು',
    possibleCausesLabel: 'ಸಂಭಾವ್ಯ ಕಾರಣಗಳು (ಹವಾಮಾನ / ಶಿಲೀಂಧ್ರ / ಕೀಟ)',
    safeManagementLabel: 'ಸುರಕ್ಷಿತ ಹೊಲದ ನಿರ್ವಹಣೆ ಮತ್ತು ನೈರ್ಮಲ್ಯ',
    preventionAdviceLabel: 'ಮುನ್ನೆಚ್ಚರಿಕೆ ಕೃಷಿ ಪದ್ಧತಿಗಳು',
    organicOptionsLabel: 'ಸಾವಯವ ಮತ್ತು ಜೈವಿಕ ನಿಯಂತ್ರಣ ಕ್ರಮಗಳು',
    expertGuidanceLabel: 'ಕೃಷಿ ಅಧಿಕಾರಿ ಮತ್ತು ತಜ್ಞರ ಮಾರ್ಗದರ್ಶನ',
    limitationsLabel: 'ವೈಜ್ಞಾನಿಕ ಮಿತಿಗಳು ಮತ್ತು ಎಚ್ಚರಿಕೆ',
    btnSaveHistory: 'ವರದಿಯನ್ನು ನನ್ನ ಇತಿಹಾಸಕ್ಕೆ ಉಳಿಸಿ',
    btnSavedSuccess: 'ಬೆಳೆ ಇತಿಹಾಸದಲ್ಲಿ ಉಳಿಸಲಾಗಿದೆ!',
    savePhotoConsent: 'ಬ್ರೌಸರ್ ಇತಿಹಾಸದಲ್ಲಿ ಫೋಟೋ ಮುನ್ನೋಟವನ್ನು ಉಳಿಸಿಕೊಳ್ಳಿ',

    // Scheme Navigator
    schemeNavTitle: 'ಕರ್ನಾಟಕ ಮತ್ತು ಕೇಂದ್ರ ಸರಕಾರದ ಕೃಷಿ ಯೋಜನೆಗಳ ಮಾರ್ಗದರ್ಶಿ',
    schemeNavSubtitle: 'ಅಧಿಕೃತ ಯೋಜನೆಗಳು, ಅರ್ಹತಾ ಮಾನದಂಡಗಳು ಮತ್ತು ಅರ್ಜಿ ಸಲ್ಲಿಕೆಯ ಕ್ರಮಗಳನ್ನು ತಿಳಿಯಿರಿ. ಯಾವುದೇ ಗೌಪ್ಯ ಸಂಖ್ಯೆಗಳ ಅಗತ್ಯವಿಲ್ಲ.',
    tabAllSchemes: 'ಎಲ್ಲಾ ಸರಕಾರಿ ಯೋಜನೆಗಳ ಪಟ್ಟಿ',
    tabEligibilityWizard: 'ನನ್ನ ಜಮೀನಿಗೆ ಸೂಕ್ತ ಯೋಜನೆ ಹುಡುಕಿ (ಪ್ರಶ್ನಾವಳಿ)',
    filterLevel: 'ಎಲ್ಲಾ ಹಂತಗಳು',
    filterCentral: 'ಕೇಂದ್ರ ಸರಕಾರ',
    filterKarnataka: 'ಕರ್ನಾಟಕ ರಾಜ್ಯ ಸರಕಾರ',
    searchPlaceholder: 'ಯೋಜನೆಯ ಹೆಸರು, ಬೆಳೆ ಅಥವಾ ಪ್ರಯೋಜನ ಹುಡುಕಿ...',
    verifiedBadge: 'ದೃಢೀಕೃತ ಯೋಜನೆ ಮಾಹಿತಿ',
    fieldVerificationBadge: 'ಸ್ಥಳೀಯ ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ',
    lastVerifiedPrefix: 'ಕೊನೆಯ ಪರಿಶೀಲನೆ ದಿನಾಂಕ:',
    btnViewDetails: 'ಯೋಜನೆಯ ವಿವರ ಮತ್ತು ಅರ್ಜಿ ವಿಧಾನ ನೋಡಿ',
    btnApplyPortal: 'ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್‌ಗೆ ಭೇಟಿ ನೀಡಿ',

    // Questionnaire
    wizardTitle: 'ರೈತರ ಅರ್ಹತಾ ಪ್ರಶ್ನಾವಳಿ',
    wizardSubtitle: 'ನಿಮ್ಮ ಜಮೀನು ಮತ್ತು ಬೆಳೆಯ ಬಗ್ಗೆ ಸರಳ ವಿವರಗಳನ್ನು ನೀಡಿ. ನಾವು ಆಧಾರ್, ಬ್ಯಾಂಕ್ ಖಾತೆ ಅಥವಾ OTP ಕೇಳುವುದಿಲ್ಲ.',
    labelDistrict: 'ಕರ್ನಾಟಕದ ಜಿಲ್ಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    labelTaluk: 'ತಾಲೂಕು / ಗ್ರಾಮದ ಹೆಸರು',
    labelCrop: 'ಪ್ರಸ್ತುತ ಬೆಳೆ',
    labelLandSize: 'ಹಿಡುವಳಿ ವರ್ಗ (ಭೂಮಿಯ ವಿಸ್ತೀರ್ಣ)',
    optSmallMarginal: 'ಸಣ್ಣ ಮತ್ತು ಅತಿ ಸಣ್ಣ ರೈತರು (೨ ಹೆಕ್ಟೇರ್ / ೫ ಎಕರೆಗಿಂತ ಕಡಿಮೆ)',
    optMediumLarge: 'ಮಧ್ಯಮ / ದೊಡ್ಡ ರೈತರು (೨ ಹೆಕ್ಟೇರ್‌ಗಿಂತ ಹೆಚ್ಚು)',
    optTenant: 'ಗೇಣಿದಾರ / ಪಾಲುದಾರ ರೈತರು',
    labelInsured: 'ಬೆಳೆ ವಿಮೆ (PMFBY / ರೈತ ಸುರಕ್ಷಾ) ಮಾಡಿಸಲಾಗಿದೆಯೇ?',
    optYes: 'ಹೌದು, ನೋಂದಾಯಿಸಲಾಗಿದೆ',
    optNo: 'ಇಲ್ಲ, ನೋಂದಾಯಿಸಿಲ್ಲ',
    optUnsure: 'ಖಚಿತವಿಲ್ಲ / FID ಪರಿಶೀಲಿಸಬೇಕು',
    labelAssistance: 'ನಿಮಗೆ ಅಗತ್ಯವಿರುವ ಮುಖ್ಯ ಸಹಾಯ',
    optCropLoss: 'ಬೆಳೆ ಹಾನಿ / ನೈಸರ್ಗಿಕ ವಿಕೋಪ ಪರಿಹಾರ',
    optIncomeSupport: 'ನೇರ ಆದಾಯ ಬೆಂಬಲ / ಧನಸಹಾಯ (ಪಿಎಂ ಕಿಸಾನ್)',
    optIrrigation: 'ಹನಿ / ತುಂತುರು ನೀರಾವರಿ ಸಬ್ಸಿಡಿ (ಕೃಷಿ ಭಾಗ್ಯ)',
    optSeedsFertilizer: 'ಬೀಜ, ಲಘು ಪೋಷಕಾಂಶ ಅಥವಾ ಸಿರಿಧಾನ್ಯ ಪ್ರೋತ್ಸಾಹಧನ',
    optCredit: 'ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ (KCC) ಬೆಳೆ ಸಾಲ',
    labelDamage: 'ಪ್ರಸ್ತುತ ತೋಟ ಅಥವಾ ಹೊಲದ ಹಾನಿಯ ಸ್ಥಿತಿ',
    optDrought: 'ಬರಗಾಲ / ತೀವ್ರ ನೀರಿನ ಕೊರತೆ',
    optPest: 'ಕೀಟಬಾಧೆ / ರೋಗದ ಹರಡುವಿಕೆ',
    optUnseasonal: 'ಅಕಾಲಿಕ ಭಾರಿ ಮಳೆ / ಆಲಿಕಲ್ಲು / ಪ್ರವಾಹ ಹಾನಿ',
    optNone: 'ಸಾಮಾನ್ಯ ಬೆಳೆ ಸ್ಥಿತಿ / ನಿಯಮಿತ ಸವಲತ್ತುಗಳು',
    btnCheckEligibility: 'ಹೊಂದಿಕೆಯಾಗುವ ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ',
    matchingSchemesTitle: 'ನಿಮ್ಮ ಸನ್ನಿವೇಶಕ್ಕೆ ಸೂಕ್ತವಾದ ಸಂಭವನೀಯ ಯೋಜನೆಗಳು',
    noMatchNotice: 'ಆಯ್ಕೆಮಾಡಿದ ವಿವರಗಳಿಗೆ ತಕ್ಷಣದ ಯೋಜನೆ ಕಂಡುಬಂದಿಲ್ಲ. ಕೆಳಗಿನ ಪೂರ್ಣ ಪಟ್ಟಿಯನ್ನು ವೀಕ್ಷಿಸಿ ಅಥವಾ ಗ್ರಾಮ ಪಂಚಾಯತಿ / RSK ಅಧಿಕಾರಿಗಳನ್ನು ಭೇಟಿ ಮಾಡಿ.',

    // History Page
    historyTitle: 'ನನ್ನ ಬೆಳೆ ತಪಾಸಣಾ ಇತಿಹಾಸ',
    historySubtitle: 'ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಸ್ಥಳೀಯವಾಗಿ ಉಳಿಸಲಾದ ವರದಿಗಳು. ಯಾವುದೇ ಮಾಹಿತಿ ಹೊರಗಿನ ಸರ್ವರ್‌ನಲ್ಲಿ ಉಳಿಯುವುದಿಲ್ಲ.',
    emptyHistoryTitle: 'ಯಾವುದೇ ಉಳಿಸಿದ ವರದಿಗಳಿಲ್ಲ',
    emptyHistoryDesc: 'ಬೆಳೆ ವೈದ್ಯ ಪುಟದಲ್ಲಿ ಎಲೆ ವಿಶ್ಲೇಷಣೆ ನಡೆಸಿ "ವರದಿಯನ್ನು ನನ್ನ ಇತಿಹಾಸಕ್ಕೆ ಉಳಿಸಿ" ಕ್ಲಿಕ್ ಮಾಡಿ.',
    btnClearAllHistory: 'ಇತಿಹಾಸವನ್ನು ಅಳಿಸಿಹಾಕಿ',
    confirmClearHistory: 'ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿರುವ ಎಲ್ಲಾ ಉಳಿಸಿದ ಬೆಳೆ ವರದಿಗಳನ್ನು ಖಚಿತವಾಗಿ ಅಳಿಸಬೇಕೆ?',
    btnPrintHistory: 'ವರದಿ ಮುದ್ರಿಸಿ / ಪಿಡಿಎಫ್ ಉಳಿಸಿ',
    notesPlaceholder: 'ರೈತರ ಟಿಪ್ಪಣಿ ಬರೆಯಿರಿ (ಉದಾ: ಔಷಧ ಸಿಂಪಡಿಸಿದ ದಿನ, ಮಳೆಯ ವಿವರ)...',
    btnSaveNotes: 'ಟಿಪ್ಪಣಿ ಉಳಿಸಿ',

    // Crop Alerts
    alertsTitle: 'ಕರ್ನಾಟಕ ಕಾಲೋಚಿತ ಬೆಳೆ ಮುನ್ನೆಚ್ಚರಿಕೆಗಳು',
    alertsSubtitle: 'ಕರ್ನಾಟಕ ಕೃಷಿ ವಿಶ್ವವಿದ್ಯಾನಿಲಯಗಳು ಹಾಗೂ ಕೃಷಿ ಇಲಾಖೆಯ ಶಿಫಾರಸುಗಳ ಆಧಾರದ ಮೇಲಿನ ಸಲಹೆಗಳು.',
    alertEducationalNote: 'ಇದು ಕೃಷಿ ಪದ್ಧತಿಯ ಪ್ಯಾಕೇಜ್ ಆಧಾರಿತ ಶೈಕ್ಷಣಿಕ ಮುನ್ನೆಚ್ಚರಿಕೆಯಾಗಿದೆ. ಸ್ಥಳೀಯ ಮಾಹಿತಿಗಾಗಿ ನಿಮ್ಮ ತಾಲೂಕು ಕೃಷಿ ಕಚೇರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.',

    // Safety & IPM Tips
    tipsTitle: 'ಸುರಕ್ಷಿತ ಸಮಗ್ರ ಬೆಳೆ ರಕ್ಷಣೆ (IPM)',
    tipsSubtitle: 'ಪರಿಸರಸ್ನೇಹಿ ಕೃಷಿ, ಜೈವಿಕ ಔಷಧಗಳು ಮತ್ತು ಸುರಕ್ಷತಾ ಮಾರ್ಗಸೂಚಿಗಳು.',

    // Privacy & Safety Modal
    privacyTitle: 'ಗೌಪ್ಯತೆ ಮತ್ತು ಮಾಹಿತಿ ಸುರಕ್ಷತಾ ನಿಯಮಾವಳಿ',
    privacyBody: 'ಕೃಷಿ ರಕ್ಷಕ AI ರೈತರ ಗೌಪ್ಯತೆಯನ್ನು ಸಂಪೂರ್ಣ ಗೌರವಿಸುತ್ತದೆ. ನಾವು ನಿಮ್ಮ ಆಧಾರ್ ಸಂಖ್ಯೆ, ಬ್ಯಾಂಕ್ ಖಾತೆ ಅಥವಾ OTP ಕೇಳುವುದಿಲ್ಲ. ನಿಮ್ಮ ಬೆಳೆ ಇತಿಹಾಸವು ನಿಮ್ಮ ಫೋನ್ ಅಥವಾ ಕಂಪ್ಯೂಟರ್‌ನ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಮಾತ್ರ ಇರುತ್ತದೆ.',

    // PWA & Low Connectivity
    installAppBtn: 'ಆ್ಯಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ',
    installOnIOSBtn: 'ಫೋನ್‌ನಲ್ಲಿ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ',
    installIOSTitle: 'ಐಫೋನ್/ಐಪ್ಯಾಡ್‌ನಲ್ಲಿ ಕೃಷಿ ರಕ್ಷಕ AI ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ',
    installIOSStep1: 'ಸಫಾರಿ ಬ್ರೌಸರ್‌ನ ಕೆಳಗಿನ "Share" ಬಟನ್ ಒತ್ತಿರಿ.',
    installIOSStep2: 'ನಂತರ "Add to Home Screen" ಆಯ್ಕೆ ಮಾಡಿ.',
    offlineStatusBadge: 'ಆಫ್‌ಲೈನ್ ಮೋಡ್ ಸಕ್ರಿಯವಾಗಿದೆ',
    offlineStatusMessage: 'ಕಡಿಮೆ ಸಂಪರ್ಕ ಪ್ರದೇಶದಲ್ಲಿ ಆಫ್‌ಲೈನ್ ಆಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿದೆ. ಉಳಿಸಿದ ಬೆಳೆ ಇತಿಹಾಸ, ಯೋಜನೆಗಳ ಮಾಹಿತಿ ಮತ್ತು IPM ಮಾರ್ಗದರ್ಶಿ ಲಭ್ಯವಿದೆ.',
    onlineRestoredMessage: 'ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕ ಮರುಸ್ಥಾಪಿಸಲಾಗಿದೆ. ಆನ್‌ಲೈನ್ ಸೇವೆಗಳು ಸಕ್ರಿಯವಾಗಿವೆ.',
    closeBtn: 'ಮುಚ್ಚಿ',
  },
};
