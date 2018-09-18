import database, { storage } from '../../firebase/firebase';

export const uploadPhotoOnFirebase = (uid, photoUrl) => async () => {
	console.log('tuka');
	await storage.ref(`/images/${uid}/pp.jpg`).put(photoUrl);
	const imageDownloadUrl = await storage.ref(`/images/${uid}/pp.jpg`).getDownloadURL();
	return database.ref(`users/${uid}/profilePictureUrl`).set(imageDownloadUrl);
};
