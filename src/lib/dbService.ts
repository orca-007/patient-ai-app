import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where,
  serverTimestamp,
  deleteDoc
} from 'firebase/firestore';
import { Patient } from '../schemas/Patient';
import { Monograph } from '../schemas/Monograph';

// TODO: Define a proper schema for MedicalRecord
type MedicalRecord = any;

// Patient data operations
export const savePatient = async (patientData: Partial<Patient>, userId: string): Promise<string> => {
  try {
    const patientRef = await addDoc(collection(db, 'patients'), {
      ...patientData,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return patientRef.id;
  } catch (error) {
    console.error("Error saving patient data:", error);
    throw error;
  }
};

export const updatePatient = async (patientId: string, patientData: Partial<Patient>): Promise<string> => {
  try {
    const patientRef = doc(db, 'patients', patientId);
    await updateDoc(patientRef, {
      ...patientData,
      updatedAt: serverTimestamp()
    });
    return patientId;
  } catch (error) {
    console.error("Error updating patient data:", error);
    throw error;
  }
};

export const getPatient = async (patientId: string): Promise<(Patient & { id: string }) | null> => {
  try {
    const patientRef = doc(db, 'patients', patientId);
    const patientSnap = await getDoc(patientRef);
    
    if (patientSnap.exists()) {
      return { id: patientSnap.id, ...patientSnap.data() } as Patient & { id: string };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting patient data:", error);
    throw error;
  }
};

export const getUserPatients = async (userId: string): Promise<(Patient & { id: string })[]> => {
  try {
    const patientsQuery = query(
      collection(db, 'patients'),
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(patientsQuery);
    const patients: (Patient & { id: string })[] = [];
    
    querySnapshot.forEach((doc) => {
      patients.push({ id: doc.id, ...doc.data() } as Patient & { id: string });
    });
    
    return patients;
  } catch (error) {
    console.error("Error getting user patients:", error);
    throw error;
  }
};

export const deletePatient = async (patientId: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, 'patients', patientId));
    return true;
  } catch (error) {
    console.error("Error deleting patient:", error);
    throw error;
  }
};

// Medical record operations
export const saveMedicalRecord = async (patientId: string, recordData: MedicalRecord, userId: string): Promise<string> => {
  try {
    const recordRef = await addDoc(collection(db, 'medicalRecords'), {
      patientId,
      userId,
      ...recordData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return recordRef.id;
  } catch (error) {
    console.error("Error saving medical record:", error);
    throw error;
  }
};

export const updateMedicalRecord = async (recordId: string, recordData: MedicalRecord): Promise<string> => {
  try {
    const recordRef = doc(db, 'medicalRecords', recordId);
    await updateDoc(recordRef, {
      ...recordData,
      updatedAt: serverTimestamp()
    });
    return recordId;
  } catch (error) {
    console.error("Error updating medical record:", error);
    throw error;
  }
};

export const getPatientMedicalRecords = async (patientId: string): Promise<MedicalRecord[]> => {
  try {
    const recordsQuery = query(
      collection(db, 'medicalRecords'),
      where('patientId', '==', patientId)
    );
    
    const querySnapshot = await getDocs(recordsQuery);
    const records: MedicalRecord[] = [];
    
    querySnapshot.forEach((doc) => {
      records.push({ id: doc.id, ...doc.data() });
    });
    
    return records;
  } catch (error) {
    console.error("Error getting patient medical records:", error);
    throw error;
  }
};

// Medication operations
export const saveMedication = async (patientId: string, medicationData: Partial<Monograph>, userId: string): Promise<string> => {
  try {
    const medicationRef = await addDoc(collection(db, 'medications'), {
      patientId,
      userId,
      ...medicationData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return medicationRef.id;
  } catch (error) {
    console.error("Error saving medication:", error);
    throw error;
  }
};

export const getPatientMedications = async (patientId: string): Promise<(Monograph & { id: string })[]> => {
  try {
    const medicationsQuery = query(
      collection(db, 'medications'),
      where('patientId', '==', patientId)
    );
    
    const querySnapshot = await getDocs(medicationsQuery);
    const medications: (Monograph & { id: string })[] = [];
    
    querySnapshot.forEach((doc) => {
      medications.push({ id: doc.id, ...doc.data() } as Monograph & { id: string });
    });
    
    return medications;
  } catch (error) {
    console.error("Error getting patient medications:", error);
    throw error;
  }
};

export const deleteMedication = async (medicationId: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, 'medications', medicationId));
    return true;
  } catch (error) {
    console.error("Error deleting medication:", error);
    throw error;
  }
};
