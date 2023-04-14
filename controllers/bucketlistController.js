import { User, Item } from '../models/user.js';
//const { Item } = require('../models/user').default;
//const {userRoutes} = require('../routes/userRoutes.js').default;


//Params:req, res
//Return: adds an item to user's bucket list
//Notes: triggered by route /:id/add-item
//TODO: 
// 1. Testing 
// 2. Error Handling
const addItem = async (req, res) => {
    try {
        const userIdentifier = req.params.user_identifier;
        let filter = {"user_identifier": userIdentifier};
        let newItemInfo = req.body;
        newItemInfo['completed'] = "false";
        let newItem = Item(newItemInfo);
        const update = {
            $push: {"bucket_list": [newItem]}
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


//Params:req, res
//Return: updates an item's status on the database
//Notes: 
// responds to route: '/:userId/:itemId/item-status' 
// TODO: respond to errors
const updateItemStatus = async (req, res) => {
    // let userIdentifier = req.params.user_identifier;
    // try {
    //     let filter = {"user_identifier": userIdentifier};
    //     let update = req.body;
    //     const options = {new: true}; 
    //     const result = await User.findOneAndUpdate(
    //         filter, update, options);
    //     res.send(result)
      
    // }
    // catch (error) {
    //     res.status(400).json({ message: error.message })
    // }


    try {
        const userIdentifier = req.params.user_identifier;
        const itemId = req.params.item_id;
    
        let user = await User.findOne({"user_identifier": userIdentifier});
        let item = user.bucket_list.id(itemId);
        item.completed = req.body['completed'];
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


//Params:req, res
//Return: remove item from user's bucket list
//Notes: 
// responds to route: '/:userId/:itemId/remove-item' 
// TODO: respond to errors
const removeItem = async (req, res) => {
    try {
        const userIdentifier = req.params.user_identifier;
        const itemId = req.params.item_id;
        let user = await User.findOne({"user_identifier": userIdentifier});
        user.bucket_list.id(itemId).remove();
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


export {
    addItem,
    updateItemStatus,
    removeItem
}

