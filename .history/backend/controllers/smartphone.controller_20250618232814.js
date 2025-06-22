export const createSmartphone = async (req, res) => {
    try {
        // Les données du smartphone sont envoyées dans le corps de la requête
        const nouveauSmartphone = new Smartphone({
            nom: req.body.nom,
            marque: req.body.marque,
            description: req.body.description,
            prix: req.body.prix,
            photo: req.body.photo,
            ram: req.body.ram,
            rom: req.body.rom,
            ecran: req.body.ecran,
            couleurs: req.body.couleurs
        });

        const smartphoneCree = await nouveauSmartphone.save();
        res.status(201).json(smartphoneCree); // 201 Created

    } catch (error) {
        // Si Mongoose renvoie une erreur de validation
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message }); // 400 Bad Request
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
        const smartphone = await Smartphone.findById(req.params.id);

        if (smartphone) {
            // Mettre à jour chaque champ s'il est fourni dans la requête
            smartphone.nom = req.body.nom || smartphone.nom;
            smartphone.marque = req.body.marque || smartphone.marque;
            smartphone.description = req.body.description || smartphone.description;
            smartphone.prix = req.body.prix || smartphone.prix;
            smartphone.photo = req.body.photo || smartphone.photo;
            smartphone.ram = req.body.ram || smartphone.ram;
            smartphone.rom = req.body.rom || smartphone.rom;
            smartphone.ecran = req.body.ecran || smartphone.ecran;
            smartphone.couleurs = req.body.couleurs || smartphone.couleurs;

            const smartphoneModifie = await smartphone.save();
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
        const smartphone = await Smartphone.findById(req.params.id);

        if (smartphone) {
            await smartphone.deleteOne();
            res.status(200).json({ message: "Smartphone supprimé avec succès." });
        } else {
            res.status(404).json({ message: "Smartphone non trouvé." });
        }

    } catch (error) {
        res.status(500).json({ message: "Erreur du serveur lors de la suppression du smartphone." });
    }
};