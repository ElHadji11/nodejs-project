import mongoose from 'mongoose';

const smartphoneSchema = new mongoose.Schema
    ({
        nom: {
            type: String,
            required: true,
        },
        marque: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        prix: {
            type: Number,
            required: true,
        },
        photo: {
            type: String,
            required: true,
        },
        ram: {
            type: Number,
            required: true
        },
        rom: {
            type: Number,
            required: true,
        },
        ecran: {
            type: String,
            required: true,
        },
        couleurs: {
            type: String,
            required: true,
        }

    })
export smartphone = mongoose.model('Smartphone', smartphoneSchema);
export default smartphone;