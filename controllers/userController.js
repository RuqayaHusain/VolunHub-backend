
const User = require('../models/user');

exports.getUserProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        const { name, email, phone, location, interests, availability, bio } = req.body;
        if(!user){
            return res.status(404).json({message: 'User not found.' });
        }
        res.json({user});
    } catch(err){
        console.error('Get User Profile Error:', err);
        res.status(500).json({message: 'Server Error. Please try again later.' });
    }
    if(user.userType !== 'volunteer'){
        return res.status(403).json({message: 'Only volunteers can update this profile.' });
    
    }
    if(email !== user.email){
        const emailExists = await User.findOne({email, _id: { $ne: user._id } });
        if(emailExists){
            return res.status(400).json({message: 'Email is already in use by another account.' });
        }
    }


    const updateUser = await User.findByIdAndUpdate(
        userId,
        {
            name,
            email,
            phone,
            location,
            interests: Array.isArray(interests)? interests : [],
            availability,
            bio
        },
        {new: true, runValidators: true}
    ).select('-password');

    res.json({message: 'Profile updated successfully.', user: updateUser });

}catch(err){
    console.error('Update Volunteer Profile Error:', err);
    res.status(500).json({message: 'Server Error. Please try again later.' });
    }
};
