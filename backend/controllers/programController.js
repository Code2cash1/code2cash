const Program = require('../models/Program');
const { cloudinary, deleteFromCloudinary } = require('../config/cloudinary');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Multer for Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'internship_programs',
        resource_type: 'auto',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        public_id: (req, file) => {
            const name = file.originalname.split('.').slice(0, -1).join('.');
            return `program_${Date.now()}_${name}`;
        }
    }
});

const upload = multer({ storage });

exports.createProgram = async (req, res) => {
    try {
        // Parse JSON strings for arrays
        const programData = {
            ...req.body,
            highlights: req.body.highlights ? JSON.parse(req.body.highlights) : [],
            projects: req.body.projects ? JSON.parse(req.body.projects) : [],
            imageUrl: req.file ? req.file.path : req.body.imageUrl
        };

        const newProgram = new Program(programData);
        await newProgram.save();
        res.status(201).json({ success: true, message: 'Program created', data: newProgram });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating program', error: error.message });
    }
};

exports.getAllPrograms = async (req, res) => {
    try {
        const programs = await Program.find().sort({ createdAt: -1 });
        res.status(200).json(programs);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching programs', error: error.message });
    }
};

exports.getProgramById = async (req, res) => {
    try {
        const program = await Program.findById(req.params.id);
        if (!program) return res.status(404).json({ message: 'Program not found' });
        res.status(200).json(program);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching program', error: error.message });
    }
};


exports.updateProgram = async (req, res) => {
    try {
        const program = await Program.findById(req.params.id);
        if (!program) return res.status(404).json({ message: 'Program not found' });

        // Update fields and parse JSON strings for arrays
        const updates = { ...req.body };
        if (req.body.highlights) updates.highlights = JSON.parse(req.body.highlights);
        if (req.body.projects) updates.projects = JSON.parse(req.body.projects);

        // Handle image update
        if (req.file) {
            // Delete old image if it exists and is a Cloudinary URL
            if (program.imageUrl && program.imageUrl.includes('cloudinary')) {
                await deleteFromCloudinary(program.imageUrl);
            }
            updates.imageUrl = req.file.path;
        }

        const updatedProgram = await Program.findByIdAndUpdate(req.params.id, updates, { new: true });
        res.status(200).json({ success: true, message: 'Program updated', data: updatedProgram });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating program', error: error.message });
    }
};

exports.deleteProgram = async (req, res) => {
    try {
        const program = await Program.findById(req.params.id);
        if (!program) return res.status(404).json({ message: 'Program not found' });

        // Delete image from Cloudinary if exists
        if (program.imageUrl && program.imageUrl.includes('cloudinary')) {
            await deleteFromCloudinary(program.imageUrl);
        }

        await Program.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Program deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting program', error: error.message });
    }
};


// Seed default programs
exports.seedPrograms = async () => {
    try {
        const count = await Program.countDocuments();
        if (count === 0) {
            const defaultPrograms = [
                {
                    title: "Frontend Development Internship",
                    department: "Engineering",
                    duration: "3 Months",
                    price: "₹2,999",
                    description: "Master React, Next.js, and modern UI libraries to build stunning web applications.",
                    highlights: [
                        "React.js Fundamentals",
                        "Next.js & Server-Side Rendering",
                        "State Management (Redux/Zustand)",
                        "Modern Styling (Tailwind CSS)",
                        "API Integration",
                        "Performance Optimization"
                    ],
                    projects: [
                        "E-commerce Dashboard",
                        "Social Media Platform",
                        "Portfolio Website Builder"
                    ],
                    imageUrl: "/images/programs/frontend.png",
                    active: true
                },
                {
                    title: "Backend Engineering Internship",
                    department: "Engineering",
                    duration: "3 Months",
                    price: "₹2,999",
                    description: "Build scalable APIs and server-side architectures using Node.js, Python, and MongoDB.",
                    highlights: [
                        "Node.js & Express.js",
                        "RESTful API Design",
                        "Database Management (MongoDB/SQL)",
                        "Authentication & Security",
                        "Microservices Architecture",
                        "Cloud Deployment"
                    ],
                    projects: [
                        "REST API for E-commerce",
                        "Real-time Chat Application",
                        "Authentication System"
                    ],
                    imageUrl: "/images/programs/backend.png",
                    active: true
                },
                {
                    title: "Full Stack Web Development Internship",
                    department: "Engineering",
                    duration: "6 Months",
                    price: "₹4,999",
                    description: "Become a complete developer by mastering the MERN stack: MongoDB, Express, React, and Node.js.",
                    highlights: [
                        "Complete MERN Stack",
                        "Frontend & Backend Integration",
                        "Database Design & Management",
                        "Authentication & Authorization",
                        "Deployment & DevOps",
                        "Real-world Project Experience"
                    ],
                    projects: [
                        "Full Stack E-commerce Platform",
                        "Social Networking Site",
                        "Project Management Tool"
                    ],
                    imageUrl: "/images/programs/fullstack.png",
                    active: true
                },
                {
                    title: "HTML & CSS Mastery Internship",
                    department: "Design",
                    duration: "2 Months",
                    price: "₹1,999",
                    description: "Craft responsive, pixel-perfect layouts and animations with modern HTML5 and Tailwind CSS.",
                    highlights: [
                        "Semantic HTML5",
                        "Advanced CSS3 & Animations",
                        "Flexbox & Grid Layouts",
                        "Responsive Web Design",
                        "CSS Frameworks (Tailwind)",
                        "Cross-browser Compatibility"
                    ],
                    projects: [
                        "Responsive Landing Pages",
                        "Animated Portfolio Website",
                        "CSS Art & Illustrations"
                    ],
                    imageUrl: "/images/programs/htmlcss.png",
                    active: true
                },
                {
                    title: "Python & Automation Internship",
                    department: "Engineering",
                    duration: "3 Months",
                    price: "₹2,999",
                    description: "Leverage Python for backend scripting, automation, and building powerful web services.",
                    highlights: [
                        "Python Core Concepts",
                        "Object-Oriented Programming",
                        "Web Scraping & Automation",
                        "Django/FastAPI Framework",
                        "Data Processing",
                        "Task Automation Scripts"
                    ],
                    projects: [
                        "Web Scraping Bot",
                        "Automation Scripts",
                        "REST API with Django"
                    ],
                    imageUrl: "/images/programs/python.png",
                    active: true
                }
            ];

            await Program.insertMany(defaultPrograms);
            console.log('🎓 Default Internship Programs Seeded Successfully');
        }
    } catch (error) {
        console.error('Error seeding programs:', error);
    }
};

// Export upload middleware
exports.upload = upload;
