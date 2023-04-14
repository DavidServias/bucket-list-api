import { User, AccountSummary } from '../models/user.js';

// gets all users
// triggered by route: GET /users/
//TODO: 
// 1. Testing 
// 2. Error Handling
const get_all_users = (req, res) => {
    User.find().sort({ createdAt: -1 })
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(400).send(`There is an error in the server while retrieving users.`);
        });
}


//Params:req, res
//Return: gets user by id
//Notes: triggered by route /:id/add-item
//TODO: 
// triggered by route: GET /users/:id
//TODO: 
// 1. Testing 
// 2. Error Handling
const get_user_by_id = (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then(result => {
            // no matching user
            if(result === null){
                let response = {"message":"no matching user found"};
                res.status(404).send(response);
            }
            else {
                res.status(200).send(result);
            };
        })
        .catch(err => {
            res.status(400).send(err);
        });
}


// router.patch('/:user_dentifier/follow', userController.follow);
const follow = async (req, res) => {
    try {
        const userIdentifier = req.params.user_identifier;
        let filter = {"user_identifier": userIdentifier};
        //let newFriendData = req.body;
        let newFriend = AccountSummary(req.body);
        console.log("accountSummary: "+ newFriend);
        const update = {
            $push: {"friends_list": [newFriend]}
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


// router.delete('/:user_identifier/unfollow', userController.unfollow);
// reqBody: {"accountToUnfollow":"userIdentifier"}
const unfollow = async (req,res) => {
    console.log("unfollow()");
    try {
        const userIdentifier = req.params.user_identifier;
        const accountToUnfollow = req.body['accountToUnfollow'];
        let filter = {"user_identifier": userIdentifier};
        let update = { $pull: { "friends_list": {"account_identifier": accountToUnfollow } } };
        const options = {new: true}; 
        const result = await User.findOneAndUpdate(
            filter, update, options);
        res.send(result)
          
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
};


//router.get('/:user_identifier/get-friends', userController.getFriends);
const getFriends = (req, res) => {
    const userIdentifier = req.params.user_identifier;
    User.findOne({user_identifier: userIdentifier},
        function(err, result){
            if (err) {
                console.log(err);
            } else {
                if (result === null) {
                    res.send({"message":"no profile matching that user_identifier"});
                } else {
                    const followed = result.friends_list;
                    res.send(followed );
                };     
            }
        }
    );
};


const findFriends = async (req, res) => {
    console.log("findFriends()");
    const userIdentifier = req.params.user_identifier;
    let user = await User.findOne({"user_identifier": userIdentifier});
    //generate friends list
    let friends = [userIdentifier];// starts with self, so self is not included in friend
    // suggestions.
    // console.log(user);
    let length = user.friends_list.length;
    for (let i = 0; i < length; i += 1) {
        let nextFriend = user.friends_list[i].account_identifier;
        // console.log("next friend: "+ nextFriend);
        friends.push(nextFriend);
    };
    // find users that are not on the friend list already:
    let suggestions = await User.find({ "user_identifier": { $nin: friends} });
    // console.log('suggestion results from findFriends controller');
    // console.log(suggestions);
    res.send(suggestions);

};



// creates new user
// triggered by route: POST /users/
//TODO: 
// 1. Testing 
// 2. Error Handling
const create_user = (req, res) => {
    const user = new User(req.body);
    user.save()
        .then(result => {
            res.status(201).send(result);
        })
        .catch(err => {
            res.status(400).send(err);
        });
};

//update status
//TODO: 
// 1. Testing 
// 2. Error Handling
const updateStatus = async (req, res) => {
    let userIdentifier = req.params.user_identifier;
    try {
        let filter = {"user_identifier": userIdentifier};
        let update = req.body;
        const options = {new: true}; 
        const result = await User.findOneAndUpdate(
            filter, update, options);
        res.send(result)
      
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
};

//add Item
//TODO: 
// 1. Testing 
// 2. Error Handling
const addLikedItem = async (req, res) => {
    try {
        const userId = req.params.id;
        let newLikedItem = req.body["new_liked_item"];
        newLikedItem['completed'] = 'false';
        const updatedData = {
            $push: { "liked_items": newLikedItem }
        };
        const options = {new: true};
        const result = await User.findByIdAndUpdate(
        userId, updatedData, options);
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
};

// deletes user by ID
// triggered by route: DELETE /users/:id
//TODO: 
// 1. Testing 
// 2. Error Handling
const delete_user = (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id)
        .then(result => {
            // no matching user
            if(result === null){
                let response = {"message":"no matching user found"};
                res.status(404).send(response);
            }
            else {
                res.status(200).send(result);
            }
            
        })
        .catch(err => {
            res.status(400).send(err);
        });
}


const get_user_by_identifier = (req, res) => {
    const userIdentifier = req.body.user_identifier;
    User.findOne({user_identifier: userIdentifier},
        function(err, result){
            if (err) {
                console.log(err);
            } else {
                if (result === null) {
                    res.send({"message":"no profile matching that user_identifier"});
                } else {
                    res.send(result);
                };
                              
            }
        }
    );
            
};


export default {
    get_all_users,
    get_user_by_id,
    getFriends,
    create_user,
    delete_user,
    addLikedItem,
    updateStatus,
    get_user_by_identifier,
    follow,
    unfollow,
    findFriends
}

