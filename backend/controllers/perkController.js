const Perk = require('../models/Perk');

exports.createPerk = async (req, res) => {
    try {
        const newPerk = new Perk(req.body);
        await newPerk.save();
        res.status(201).json({ success: true, message: 'Perk created', data: newPerk });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating perk', error: error.message });
    }
};

exports.getAllPerks = async (req, res) => {
    try {
        const perks = await Perk.find().sort({ order: 1, createdAt: 1 });
        res.status(200).json({
            success: true,
            data: perks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching perks',
            error: error.message
        });
    }
};

exports.deletePerk = async (req, res) => {
    try {
        await Perk.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Perk deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting perk', error: error.message });
    }
};

// Seed default perks
exports.seedPerks = async () => {
    try {
        const count = await Perk.countDocuments();
        if (count === 0) {
            const defaultPerks = [
                {
                    title: "Official Offer Letter",
                    description: "Kickstart your professional journey with a formal offer letter welcoming you to the team.",
                    icon: "FileText",
                    order: 1
                },
                {
                    title: "Letter of Recommendation",
                    description: "Stand out with a Letter of Recommendation awarded to top performers, endorsing your skills.",
                    icon: "Award",
                    order: 2
                },
                {
                    title: "Completion Certificate",
                    description: "Earn a verified certificate upon successful completion to validate your internship experience.",
                    icon: "Medal",
                    order: 3
                },
                {
                    title: "Exclusive Merchandise",
                    description: "Get your hands on cool Code2Cash swag and merchandise to show off your community spirit.",
                    icon: "Shirt",
                    order: 4
                },
                {
                    title: "Expert Trainings",
                    description: "Learn directly from industry experts through dedicated training sessions and mentorship.",
                    icon: "Presentation",
                    order: 5
                },
                {
                    title: "Real-World Projects",
                    description: "Gain invaluable hands-on experience by working on live, impactful projects from day one.",
                    icon: "Briefcase",
                    order: 6
                }
            ];

            await Perk.insertMany(defaultPerks);
            console.log('✨ Default Perks Seeded Successfully');
        }
    } catch (error) {
        console.error('Error seeding perks:', error);
    }
};
