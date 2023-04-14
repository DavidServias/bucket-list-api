
import { User, Thought } from '../models/user.js';

// ROUTES:
// router.patch('/:user_identifier/add-thought', addThought);
// router.delete('/:user_identifier/:thought_id/remove-thought', removeThought);

// const thoughtSchema = new Schema({
//     text: {type: String, required: true},
//   }, {
//     timestamps: true,
//   });
  
  
//   const UserSchema = new Schema({
//       profile_name: { type: String, required: true },
//       bucket_list: { type: [ItemSchema], required: false },
//       friends_list: { type: [AccountSummarySchema], default: [], required: true},
//       liked_items: { type: [String], required: false },
//       status: { type: String, default: "", required: false},
//       deep_thoughts: { type: [thoughtSchema], default: [], required: true},
//       user_identifier: { type: String, required: false},
//       google_verified: {type: Boolean, default: false, required: true},
//       logged_in: {type: Boolean, default: false, required: false},
//       password: {type: String, required: false}
//     }, {
//       timestamps: true,
//     });
  
// sample request:
//{"text": "Do unto others as you would have them do unto you."}
const addThought = async (req, res) => {
    console.log("addThought (controller)");
    try {
        const userIdentifier = req.params.user_identifier;
        let filter = {"user_identifier": userIdentifier};
        
        let newThought = Thought(req.body);
        const update = {
            $push: {"deep_thoughts": [newThought]}
        };

        const options = {new: true}; 
        const result = await User.findOneAndUpdate(
            filter, update, options);
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
};

// router.delete('/:user_identifier/:thought_id/remove-thought', removeThought);
const removeThought = async (req, res) => {
    try {
        const userIdentifier = req.params.user_identifier;
        const thoughtId = req.params.thought_id;
        let user = await User.findOne({"user_identifier": userIdentifier});
        user.deep_thoughts.id(thoughtId).remove();
        user.save(function (err) {
            if (err) return handleError(err)
            console.log('Success!');
          });
        
        res.send(user);
          
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
};



export default {
    addThought,
    removeThought
}
