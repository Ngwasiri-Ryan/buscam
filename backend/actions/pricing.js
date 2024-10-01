import { query, where, collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';

export const getTicketPrice = async (origin, destination, busCategory, travelTime, busAgency) => {
  try {
    // Log the query parameters to ensure they are correct
    console.log('Fetching ticket price with:', { origin, destination, busCategory, travelTime, busAgency });

    // Define a reference to the 'ticket_pricing' collection
    const ticketPricingCollection = collection(db, 'ticket_pricing');

    // Build a query to match the required fields
    const q = query(
      ticketPricingCollection,
      where('origin', '==', origin),
      where('destination', '==', destination),
      where('busCategory', '==', busCategory),
      where('travelTime', '==', travelTime),
      where('busAgency', '==', busAgency)
    );

    // Execute the query and retrieve the documents
    const querySnapshot = await getDocs(q);

    // Check if any documents are found
    if (!querySnapshot.empty) {
      // Log the documents that are found
      console.log('Matching documents found:', querySnapshot.docs.map(doc => doc.data()));

      // Assuming you expect only one result, take the first document
      const docData = querySnapshot.docs[0].data();

      // Return the found ticket price plus 500
      return docData.price;
    } else {
      // Log if no document is found
      console.warn('No matching ticket price found for:', { origin, destination, busCategory, travelTime, busAgency });
      throw Alert('Sorry, the bus is not travelling today.');
    }
  } catch (error) {
    // Log any errors during the fetching process
    console.error('Error fetching ticket price:', error);
    throw error;
  }
};
