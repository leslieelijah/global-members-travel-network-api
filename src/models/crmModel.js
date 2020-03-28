import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter a first name'
    },
    lastName: {
        type: String,
        required: 'Enter a last name'
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    typeOfCommunication: {
        type: Number
    },
    city: {
        type: String
    },
    zipCode: {
        type: String
    },
    address: {
        type: String
    },
    address1: {
        type: String
    },
    interest: {
        type: String
    }
});
