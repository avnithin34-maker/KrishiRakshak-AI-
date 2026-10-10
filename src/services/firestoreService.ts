import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  deleteDoc, 
  updateDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { DiagnosisResult, Scheme, CropTrackerRecord } from '../types';

export interface SavedSchemeItem {
  schemeId: string;
  userId: string;
  officialNameEn: string;
  officialNameKn: string;
  savedAt: string;
}

// Save or sync a crop diagnosis record to Firestore
export async function saveCropHistoryToFirestore(userId: string, record: DiagnosisResult): Promise<void> {
  const collectionPath = `users/${userId}/cropHistory`;
  const docRef = doc(db, collectionPath, record.id);

  try {
    // Sanitize record to not exceed Firestore 1MB document limit (do not store massive images in Firestore)
    const sanitizedRecord = {
      id: record.id,
      userId,
      crop: record.crop,
      possibleCondition: record.possibleCondition,
      conditionKannada: record.conditionKannada || record.possibleCondition,
      isConclusive: record.isConclusive,
      imageQualityAssessment: record.imageQualityAssessment || '',
      observedSymptoms: record.observedSymptoms || [],
      safeManagementSteps: record.safeManagementSteps || [],
      organicOptions: record.organicOptions || [],
      expertGuidance: record.expertGuidance || '',
      limitations: record.limitations || '',
      farmerNotes: record.farmerNotes || '',
      timestamp: record.timestamp,
      isDemoFallback: record.isDemoFallback || false,
      source: record.source || 'ai_service',
    };

    await setDoc(docRef, sanitizedRecord, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, collectionPath);
  }
}

// Fetch user's crop history from Firestore
export async function fetchCropHistoryFromFirestore(userId: string): Promise<DiagnosisResult[]> {
  const collectionPath = `users/${userId}/cropHistory`;

  try {
    const q = query(collection(db, collectionPath), orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);

    const records: DiagnosisResult[] = [];
    snapshot.forEach((d) => {
      records.push(d.data() as DiagnosisResult);
    });

    return records;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, collectionPath);
    return [];
  }
}

// Delete a single record from Firestore
export async function deleteCropHistoryFromFirestore(userId: string, recordId: string): Promise<void> {
  const docPath = `users/${userId}/cropHistory/${recordId}`;

  try {
    await deleteDoc(doc(db, 'users', userId, 'cropHistory', recordId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, docPath);
  }
}

// Update farmer field notes on a Firestore record
export async function updateFarmerNotesInFirestore(userId: string, recordId: string, notes: string): Promise<void> {
  const docPath = `users/${userId}/cropHistory/${recordId}`;

  try {
    await updateDoc(doc(db, 'users', userId, 'cropHistory', recordId), {
      farmerNotes: notes,
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, docPath);
  }
}

// Bookmark a government scheme in Firestore
export async function saveSchemeBookmarkInFirestore(userId: string, scheme: Scheme): Promise<void> {
  const collectionPath = `users/${userId}/savedSchemes`;
  const docRef = doc(db, collectionPath, scheme.id);

  try {
    await setDoc(docRef, {
      schemeId: scheme.id,
      userId,
      officialNameEn: scheme.officialNameEn,
      officialNameKn: scheme.officialNameKn,
      savedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, collectionPath);
  }
}

// Fetch saved scheme bookmarks
export async function fetchSavedSchemesFromFirestore(userId: string): Promise<string[]> {
  const collectionPath = `users/${userId}/savedSchemes`;

  try {
    const snapshot = await getDocs(collection(db, collectionPath));
    const schemeIds: string[] = [];
    snapshot.forEach((d) => {
      schemeIds.push(d.id);
    });
    return schemeIds;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, collectionPath);
    return [];
  }
}

// Remove saved scheme bookmark
export async function removeSavedSchemeFromFirestore(userId: string, schemeId: string): Promise<void> {
  const docPath = `users/${userId}/savedSchemes/${schemeId}`;

  try {
    await deleteDoc(doc(db, 'users', userId, 'savedSchemes', schemeId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, docPath);
  }
}

// Save or sync a crop growth tracker to Firestore
export async function saveGrowthTrackerToFirestore(userId: string, record: CropTrackerRecord): Promise<void> {
  const collectionPath = `users/${userId}/growthTrackers`;
  const docRef = doc(db, collectionPath, record.id);

  try {
    const sanitized: CropTrackerRecord = {
      id: record.id,
      userId,
      cropId: record.cropId,
      cropNameEn: record.cropNameEn,
      cropNameKn: record.cropNameKn,
      emoji: record.emoji || '🌱',
      plotName: record.plotName || 'Plot 1',
      plantingDate: record.plantingDate,
      varietyOrType: record.varietyOrType || '',
      areaAcreage: record.areaAcreage || '',
      method: record.method || 'direct_seed',
      notes: record.notes || '',
      createdAt: record.createdAt || new Date().toISOString(),
      reminders: record.reminders || [],
    };

    await setDoc(docRef, sanitized, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, collectionPath);
  }
}

// Fetch all growth trackers for a user from Firestore
export async function fetchGrowthTrackersFromFirestore(userId: string): Promise<CropTrackerRecord[]> {
  const collectionPath = `users/${userId}/growthTrackers`;

  try {
    const q = query(collection(db, collectionPath), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    const trackers: CropTrackerRecord[] = [];
    snapshot.forEach((d) => {
      trackers.push(d.data() as CropTrackerRecord);
    });

    return trackers;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, collectionPath);
    return [];
  }
}

// Delete a growth tracker from Firestore
export async function deleteGrowthTrackerFromFirestore(userId: string, trackerId: string): Promise<void> {
  const docPath = `users/${userId}/growthTrackers/${trackerId}`;

  try {
    await deleteDoc(doc(db, 'users', userId, 'growthTrackers', trackerId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, docPath);
  }
}

// Update a growth tracker in Firestore (e.g. toggle reminder or change plot details)
export async function updateGrowthTrackerInFirestore(
  userId: string, 
  trackerId: string, 
  updates: Partial<CropTrackerRecord>
): Promise<void> {
  const docPath = `users/${userId}/growthTrackers/${trackerId}`;

  try {
    await updateDoc(doc(db, 'users', userId, 'growthTrackers', trackerId), updates);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, docPath);
  }
}
