import { firestore } from './firebaseconfig';
import { MediaItem } from '@/src/types'; // Assuming types are accessible here
import { collection, doc, setDoc, deleteDoc, getDocs } from 'firebase/firestore';

// --- Helper 1: Load Bookmarks from Firestore ---
export const loadBookmarks = async (uid: string): Promise<string[]> => {
    try {
        // Path: users/{uid}/bookmarks
        const bookmarksRef = collection(firestore, 'users', uid, 'bookmarks');
        const snapshot = await getDocs(bookmarksRef);

        console.log("Firestore Load: Documents found:", snapshot.docs.length);

        // The document ID is the MediaItem ID
        return snapshot.docs.map(doc => doc.id); 
    } catch (error) {
        console.error('Error loading bookmarks from Firestore:', error);
        return [];
    }
};

// --- Helper 2: Add Bookmark to Firestore ---
export const addBookmarkToFirestore = async (uid: string, item: MediaItem) => {
    // Path: users/{uid}/bookmarks/{itemId}
    const docRef = doc(firestore, 'users', uid, 'bookmarks', item.id);
    
    // 🟢 Save the ESSENTIAL data for rendering the MediaCard
    const dataToSave = {
        id: item.id, // Save the ID inside the document for cleaner querying, though redundant
        title: item.title,
        category: item.category,
        year: item.year,
        rating: item.rating, // 💡 CRITICAL: Required for the MediaCard UI
        thumbnail: item.thumbnail, // 💡 CRITICAL: Required for image display
        
        // Optional metadata
        persistedAt: new Date().toISOString(),
    };
    
    // Use setDoc to overwrite or create the document using the item.id as the key
    await setDoc(docRef, dataToSave);
};

// --- Helper 3: Remove Bookmark from Firestore ---
export const removeBookmarkFromFirestore = async (uid: string, itemId: string) => {
    const docRef = doc(firestore, 'users', uid, 'bookmarks', itemId);
    await deleteDoc(docRef);
};