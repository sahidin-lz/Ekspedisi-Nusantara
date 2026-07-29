import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { db } from './firebase';
import { StudentEvaluation, SociologyModule, ExpeditionPost } from '../types';

// Collection references
const STUDENTS_COLLECTION = 'students';
const MODULES_COLLECTION = 'modules';
const POSTS_COLLECTION = 'posts';

// Sync Students with Firestore
export const subscribeStudents = (
  callback: (students: StudentEvaluation[]) => void,
  fallback: StudentEvaluation[]
) => {
  try {
    const q = query(collection(db, STUDENTS_COLLECTION));
    return onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: StudentEvaluation[] = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...(docSnap.data() as Omit<StudentEvaluation, 'id'>),
          }));
          callback(list);
        } else {
          // If empty in Firestore, seed initial defaults
          fallback.forEach((st) => saveStudentToFirestore(st));
          callback(fallback);
        }
      },
      (error) => {
        console.warn('Firestore snapshot error, using local fallback:', error);
        callback(fallback);
      }
    );
  } catch (err) {
    console.warn('Firestore error:', err);
    callback(fallback);
    return () => {};
  }
};

export const saveStudentToFirestore = async (student: StudentEvaluation) => {
  try {
    const ref = doc(db, STUDENTS_COLLECTION, student.id);
    await setDoc(ref, student, { merge: true });
  } catch (err) {
    console.error('Failed to save student to Firestore:', err);
  }
};

export const deleteStudentFromFirestore = async (id: string) => {
  try {
    const ref = doc(db, STUDENTS_COLLECTION, id);
    await deleteDoc(ref);
  } catch (err) {
    console.error('Failed to delete student from Firestore:', err);
  }
};

// Sync Modules with Firestore
export const saveModuleToFirestore = async (moduleItem: SociologyModule) => {
  try {
    const ref = doc(db, MODULES_COLLECTION, moduleItem.id);
    await setDoc(ref, moduleItem, { merge: true });
  } catch (err) {
    console.error('Failed to save module to Firestore:', err);
  }
};

// Sync Expedition Posts with Firestore
export const savePostToFirestore = async (postItem: ExpeditionPost) => {
  try {
    const ref = doc(db, POSTS_COLLECTION, String(postItem.id));
    await setDoc(ref, postItem, { merge: true });
  } catch (err) {
    console.error('Failed to save post to Firestore:', err);
  }
};
