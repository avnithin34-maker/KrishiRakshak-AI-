import { CropInfo } from '../types';

export const SUPPORTED_CROPS: CropInfo[] = [
  {
    id: 'tomato',
    nameEn: 'Tomato',
    nameKn: 'ಟೊಮೇಟೊ',
    scientificName: 'Solanum lycopersicum',
    seasonKarnataka: 'Kharif (June-Nov), Rabi (Oct-Feb), Summer (Jan-May in irrigated belts)',
    majorGrowingDistricts: ['Kolar', 'Chikkaballapura', 'Belagavi', 'Bengaluru Rural', 'Hassan', 'Haveri'],
    isSupported: true,
  },
  {
    id: 'potato',
    nameEn: 'Potato',
    nameKn: 'ಆಲೂಗಡ್ಡೆ',
    scientificName: 'Solanum tuberosum',
    seasonKarnataka: 'Kharif (June-Sept in Hassan/Chikkamagaluru), Rabi (Oct-Jan in Belagavi/Kolar)',
    majorGrowingDistricts: ['Hassan', 'Belagavi', 'Chikkamagaluru', 'Kolar', 'Chikkaballapura'],
    isSupported: true,
  },
  {
    id: 'maize',
    nameEn: 'Maize / Corn',
    nameKn: 'ಮೆಕ್ಕೆಜೋಳ',
    scientificName: 'Zea mays',
    seasonKarnataka: 'Kharif (June-Oct), Rabi (Oct-Feb in irrigated tracts)',
    majorGrowingDistricts: ['Davanagere', 'Haveri', 'Belagavi', 'Shivamogga', 'Ballari', 'Chitradurga'],
    isSupported: true,
  },
];

export const OTHER_CROPS_LIST = [
  { nameEn: 'Paddy / Rice', nameKn: 'ಭತ್ತ', status: 'In Validation Pipeline' },
  { nameEn: 'Ragi / Finger Millet', nameKn: 'ರಾಗಿ', status: 'In Validation Pipeline' },
  { nameEn: 'Cotton', nameKn: 'ಹತ್ತಿ', status: 'In Validation Pipeline' },
  { nameEn: 'Sugarcane', nameKn: 'ಕಬ್ಬು', status: 'In Validation Pipeline' },
  { nameEn: 'Groundnut', nameKn: 'ಕಡಲೆಕಾಯಿ', status: 'In Validation Pipeline' },
  { nameEn: 'Chilli', nameKn: 'ಮೆಣಸಿನಕಾಯಿ', status: 'In Validation Pipeline' },
  { nameEn: 'Arecanut', nameKn: 'ಅಡಿಕೆ', status: 'In Validation Pipeline' },
];

export interface IPMRecipe {
  titleEn: string;
  titleKn: string;
  targetPestEn: string;
  targetPestKn: string;
  preparationEn: string;
  preparationKn: string;
  safetyNoteEn: string;
  safetyNoteKn: string;
}

export const IPM_BIO_RECIPES: IPMRecipe[] = [
  {
    titleEn: 'Neem Seed Kernel Extract (NSKE 5%)',
    titleKn: 'ಬೇವಿನ ಬೀಜದ ಕಷಾಯ (NSKE ೫%)',
    targetPestEn: 'Early instar caterpillars, whiteflies, aphids, thrips in tomato and maize whorls',
    targetPestKn: 'ಎಲೆ ತಿನ್ನುವ ಮರಿ ಹುಳುಗಳು, ಬಿಳಿ ನೊಣ, ಜಿಗಿಹುಳು ಮತ್ತು ಎಲೆ ಸುರುಳಿ ಹುಳು',
    preparationEn: 'Crush 50g of dried good-quality neem seeds per 1 litre of water (or 5kg for 100L). Soak overnight in water with 10g washing soap/khadi soap. Filter through muslin cloth and spray during cool evening hours.',
    preparationKn: '೫೦ ಗ್ರಾಂ ಉತ್ತಮ ಬೇವಿನ ಬೀಜವನ್ನು ಕುಟ್ಟಿ ಪುಡಿಮಾಡಿ ೧ ಲೀಟರ್ ನೀರಿನಲ್ಲಿ (ಅಥವಾ ೫ ಕೆ.ಜಿ ಬೇವಿನ ಬೀಜವನ್ನು ೧೦೦ ಲೀಟರ್ ನೀರಿನಲ್ಲಿ) ರಾತ್ರಿ ನೆನೆಸಿಡಿ. ೧೦ ಗ್ರಾಂ ಖಾದಿ ಸಾಬೂನು ಬೆರೆಸಿ, ಬಟ್ಟೆಯಲ್ಲಿ ಶೋಧಿಸಿ ಮುಸ್ಸಂಜೆಯ ವೇಳೆಯಲ್ಲಿ ಸಿಂಪಡಿಸಿ.',
    safetyNoteEn: 'Safe for beneficial pollinators and earthworms. Reapply after heavy rainfall.',
    safetyNoteKn: 'ಜೇನುನೊಣ ಹಾಗೂ ಉಪಕಾರಿ ಮಿತ್ರ ಕೀಟಗಳಿಗೆ ಯಾವುದೇ ಹಾನಿಯಿಲ್ಲ. ಜೋರು ಮಳೆಯಾದಲ್ಲಿ ಮತ್ತೆ ಸಿಂಪಡಿಸಿ.',
  },
  {
    titleEn: 'Trichoderma viride Bio-Fungicide Application',
    titleKn: 'ಟ್ರೈಕೋಡರ್ಮಾ ವಿರಿಡೆ ಜೈವಿಕ ಶಿಲೀಂಧ್ರನಾಶಕ',
    targetPestEn: 'Root rot, damping-off, collar rot, and soil-borne fungal pathogens in Solanaceous crops',
    targetPestKn: 'ಗಿಡ ಒಣಗು ರೋಗ, ಕುತ್ತಿಗೆ ಕೊಳೆ ರೋಗ ಮತ್ತು ಬೇರು ಕೊಳೆ ರೋಗ ನಿಯಂತ್ರಣ',
    preparationEn: 'Mix 1kg Trichoderma viride powder in 100kg well-decomposed Farm Yard Manure (FYM). Keep under moist shade for 7-10 days covered with gunny bags for spore multiplication before incorporating into the soil.',
    preparationKn: '೧ ಕೆ.ಜಿ ಟ್ರೈಕೋಡರ್ಮಾ ಪುಡಿಯನ್ನು ೧೦೦ ಕೆ.ಜಿ ಚೆನ್ನಾಗಿ ಕಳಿತ ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರದೊಂದಿಗೆ ಬೆರೆಸಿ. ತೇವಾಂಶವಿರುವ ನೆರಳಿನಲ್ಲಿ ಗೋಣಿಚೀಲ ಮುಚ್ಚಿ ೭-೧೦ ದಿನಗಳ ಕಾಲ ಇರಿಸಿ ಜೈವಿಕ ಕಣಗಳು ವೃದ್ಧಿಯಾದ ನಂತರ ಮಣ್ಣಿಗೆ ಸೇರಿಸಿ.',
    safetyNoteEn: 'Do not mix with chemical copper or systemic fungicides during application.',
    safetyNoteKn: 'ಇದನ್ನು ಯಾವುದೇ ರಾಸಾಯನಿಕ ಶಿಲೀಂಧ್ರನಾಶಕಗಳ ಜೊತೆ ನೇರವಾಗಿ ಬೆರೆಸಬಾರದು.',
  },
  {
    titleEn: 'Yellow & Blue Sticky Sticky Traps & Pheromone Traps',
    titleKn: 'ಹಳದಿ ಮತ್ತು ನೀಲಿ ಅಂಟು ಬಲೆಗಳು ಹಾಗೂ ಮೋಹಕ ಬಲೆಗಳು',
    targetPestEn: 'Whiteflies, aphids (Yellow traps), Thrips (Blue traps), Spodoptera Fall Armyworm (Spodo-lure traps)',
    targetPestKn: 'ಬಿಳಿ ನೊಣಗಳು (ಹಳದಿ ಬಲೆ), ಥ್ರಿಪ್ಸ್ ನುಸಿ (ನೀಲಿ ಬಲೆ), ಸೈನಿಕ ಹುಳು (ಲಿಂಗಾಕರ್ಷಕ ಬಲೆಗಳು)',
    preparationEn: 'Install 6 to 8 sticky traps per acre at canopy height to monitor and mass-trap sucking pests. Install 5 pheromone traps per acre in maize fields 15 days after germination.',
    preparationKn: 'ಎಕರೆಗೆ ೬ ರಿಂದ ೮ ಹಳದಿ ಹಾಗೂ ನೀಲಿ ಅಂಟು ಬಲೆಗಳನ್ನು ಗಿಡದ ಎತ್ತರಕ್ಕೆ ಕಟ್ಟಿ. ಮೆಕ್ಕೆಜೋಳ ಬಿತ್ತಿದ ೧೫ ದಿನಗಳಲ್ಲಿ ಎಕರೆಗೆ ೫ ಲಿಂಗಾಕರ್ಷಕ (Pheromone) ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ.',
    safetyNoteEn: 'Clean traps periodically or replace sticky poly sheet when covered with dust/insects.',
    safetyNoteKn: 'ಬಲೆಗಳಲ್ಲಿ ಕೀಟಗಳು ತುಂಬಿದಾಗ ಅಥವಾ ಧೂಳು ಆವರಿಸಿದಾಗ ಸ್ವಚ್ಛಗೊಳಿಸಿ ಹರಳೆಣ್ಣೆ ಅಥವಾ ಅಂಟು ಸವರಿ.',
  },
];

export const SAFETY_RULES = {
  en: [
    'Always prioritize cultural practices, crop rotation, and bio-agents before resorting to chemical applications.',
    'Never purchase unlabelled or expired chemical formulations. Verify CIBRC approved registration.',
    'Wear basic protective gear (mask, goggles, rubber gloves, and long boots) when handling any agricultural spray.',
    'Never spray against the wind direction or in high afternoon temperatures (above 32°C).',
    'Do not allow children or cattle near sprayed fields during the mandatory waiting (re-entry) period.',
    'Dispose of empty pesticide bottles safely by puncturing and burying away from water sources; never wash equipment in community ponds.',
    'When in doubt, always seek prescription from your Raitha Samparka Kendra or Krishi Vigyan Kendra agronomist.',
  ],
  kn: [
    'ರಾಸಾಯನಿಕ ಔಷಧಿಗಳ ಬಳಕೆಗಿಂತ ಮುಂಚೆ ಬೆಳೆ ಸರದಿ, ಹೊಲದ ನೈರ್ಮಲ್ಯ ಹಾಗೂ ಜೈವಿಕ ಕೀಟನಾಶಕಗಳಿಗೆ ಮೊದಲ ಆದ್ಯತೆ ನೀಡಿ.',
    'ಲೇಬಲ್ ಇಲ್ಲದ ಅಥವಾ ದಿನಾಂಕ ಮೀರಿದ ಕೀಟನಾಶಕಗಳನ್ನು ಎಂದಿಗೂ ಖರೀದಿಸಬೇಡಿ (CIBRC ಅನುಮೋದನೆ ಪರಿಶೀಲಿಸಿ).',
    'ಔಷಧ ಸಿಂಪಡಿಸುವಾಗ ಮುಖಗವಸು (ಮಾಸ್ಕ್), ಕೈಗವಸು, ಕಣ್ಣಿನ ಕನ್ನಡಕ ಹಾಗೂ ರಕ್ಷಣಾತ್ಮಕ ಬಟ್ಟೆಗಳನ್ನು ಕಡ್ಡಾಯವಾಗಿ ಧರಿಸಿ.',
    'ಗಾಳಿಯ ದಿಕ್ಕಿಗೆ ಎದುರಾಗಿ ಅಥವಾ ಮಧ್ಯಾಹ್ನದ ಬಿರುಬಿಸಿಲಿನಲ್ಲಿ ಔಷಧ ಸಿಂಪಡಿಸಬೇಡಿ.',
    'ಔಷಧ ಸಿಂಪಡಿಸಿದ ಹೊಲಕ್ಕೆ ಕಾಯುವ ಅವಧಿ (Waiting period) ಮುಗಿಯುವವರೆಗೆ ಮಕ್ಕಳು ಮತ್ತು ಜಾನುವಾರುಗಳನ್ನು ಬಿಡಬೇಡಿ.',
    'ಖಾಲಿ ಔಷಧ ಡಬ್ಬಿಗಳನ್ನು ಹೊಳೆ, ಕೆರೆ ಅಥವಾ ಕುಡಿಯುವ ನೀರಿನ ಮೂಲಗಳಲ್ಲಿ ತೊಳೆಯಬೇಡಿ; ರಂಧ್ರ ಕೊರೆದು ಸುರಕ್ಷಿತವಾಗಿ ಹೂತುಹಾಕಿ.',
    'ಯಾವುದೇ ಸಂಶಯವಿದ್ದಲ್ಲಿ ಸ್ಥಳೀಯ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರ ಅಥವಾ ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ರದ ತಜ್ಞರ ಶಿಫಾರಸು ಪಡೆಯಿರಿ.',
  ],
};
