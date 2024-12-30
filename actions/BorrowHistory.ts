'use server'

import borrowModel from "../models/BorrowModel"

export const BorrowHistory = async () => {
    console.log("Getting the history");

    try {
        // Setting a specific timeout for the query
        const res = await borrowModel.find()
             .populate({ path: 'book', select: '_id title author isbn' })
             .populate({ path: 'borrower', select: '_id name email' })
            .lean();
            

        console.log(JSON.stringify(res));
        return JSON.stringify(res);
    } catch (error) {
        console.error('Error occurred:', error);
        console.error('Stack trace:', error);

        // Checking if the error is a timeout
        if (error.name === 'MongoError' && error.message.includes('timed out')) {
            console.error('Error: The query timed out. Please check your MongoDB connection and server status.');
        }

        throw error; // Rethrow the error after logging it
    }
}
