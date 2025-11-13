const { default: mongoose } = require('mongoose');
const Feedback = require('../models/review');
const User = require('../models/user');
exports.createFeedback = async (req, res) => {
    try{
        const eventId= req.body.eventId;
        const eventName= req.body.eventName;
        const rating= req.body.rating;
        const comment= req.body.comment;
        const volunteerId = req.user.id;
    

        const volunteers = await User.findById(volunteerId);
        if(req.user.role !== 'volunteer' ) {
            return res.status(403).json({message: 'Only volunteers can submit feedback.' });
        }
        
        if(rating < 1 || rating > 5){
            return res.status(400).json({message: 'Rating must be between 1 and 5.' });
        }

        const feedback = new Feedback({
            volunteerId,
            // organizationId,
            // eventId,
            // eventName,
            rating,
            comment
        });
        await feedback.save();
        await feedback.populate('volunteer', 'name email');
        
        res.status(201).json({message: 'Feedback submitted successfully.', feedback});

    } catch(err){
        console.error('Creat Feedback Error:', err);
        res.status(500).json({message: 'Server Error. Please try again later.' });

    }
};

exports.getFeedbackByOrganization = async (req, res) => {
    try{
        const organizationId = req.params.organizationId;

        if(req.user.role !== 'organization' ) {
            return res.status(404).json({
                message: 'organization not found.'
            });
        }
        const feedback= await Feedback.find({organizationId})
        .populate('vlolunteer', 'name email')
        .sort({createdAt: -1})
        .limit(100);

        res.json({count: feedback.length, feedback});

    } catch(err){
        console.error('Get Feedback Error:', err);
        res.status(500).json({message: 'Server fetching feedback. Please try again later.' });
    }
};
