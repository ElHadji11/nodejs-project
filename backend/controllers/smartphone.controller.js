import Smartphone from '../models/smartphone.model.js';



export const createSmartphone = async (req, res) => {
    try {
        // Les données du smartphone sont envoyées dans le corps de la requête
        const {
            nom,
            marque,
            description,
            prix,
            photo,
            ram,
            rom,
            ecran,
            couleurs
        } = req.body;

        const newSmartphone = new Smartphone({
            nom,
            marque,
            description,
            prix,
            photo,
            ram,
            rom,
            ecran,
            couleurs
        });

        await newSmartphone.save();

        console.log("Nouveau smartphone créé :", newSmartphone);

        res.status(201).json(newSmartphone); // 201 Created

    } catch (error) {
        console.error("Erreur lors de la création du smartphone :", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: "Erreur du serveur lors de la création du smartphone." });
    }
};

export const getAllSmartphones = async (req, res) => {
    try {
        const smartphones = await Smartphone.find({});
        res.status(200).json(smartphones); // 200 OK

    } catch (error) {
        res.status(500).json({ message: "Erreur du serveur lors de la récupération des smartphones." });
    }
};

export const getSmartphoneInfo = async (req, res) => {
    try {
        const smartphone = await Smartphone.findById(req.params.id);

        if (smartphone) {
            res.status(200).json(smartphone);
        } else {
            res.status(404).json({ message: "Smartphone non trouvé." }); // 404 Not Found
        }

    } catch (error) {
        res.status(500).json({ message: "Erreur du serveur lors de la récupération du smartphone." });
    }
};


export const updateSmartphone = async (req, res) => {
    try {
        // On utilise findByIdAndUpdate pour plus d'efficacité
        const smartphoneModifie = await Smartphone.findByIdAndUpdate(
            req.params.id, // L'ID du smartphone à mettre à jour
            req.body,      // Les nouvelles données envoyées par le client
            {
                new: true,           // Option pour retourner le document mis à jour
                runValidators: true  // Option pour s'assurer que les nouvelles données respectent le schéma
            }
        );

        if (smartphoneModifie) {
            res.status(200).json(smartphoneModifie);
        } else {
            res.status(404).json({ message: "Smartphone non trouvé." });
        }

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: "Erreur du serveur lors de la mise à jour du smartphone." });
    }
};


export const deleteSmartphone = async (req, res) => {
    try {
        // findByIdAndDelete est aussi légèrement plus direct
        const smartphoneSupprime = await Smartphone.findByIdAndDelete(req.params.id);

        if (smartphoneSupprime) {
            res.status(200).json({ message: "Smartphone supprimé avec succès." });
        } else {
            res.status(404).json({ message: "Smartphone non trouvé." });
        }

    } catch (error) {
        res.status(500).json({ message: "Erreur du serveur lors de la suppression du smartphone." });
    }
};