import jsonwebtoken from 'jsonwebtoken';
import { User } from '../models/user.js';
const {jwt} = jsonwebtoken;



const handle_login = async (request, response) => {
    try {
       console.log("got it");
       const credential = jwt.decode(request.body.credential);
       console.log(credential);
       console.log("hi");
       response.send(payload);
       
    }
    catch {
        response.send("login error");
    }
}

const loginWithPassword = async (req, res) => {
    console.log("loginWithPassordController");
    try {
        
        let query = req.body;
        const options = {new: true}; 
        const result = await User.findOne(query, null, options);
        console.log(result);
        res.send(result);

      
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}


const whoAreYou = async (request, response) => {
    try {
       console.log("whoareyou?");
       const payload = request.body;
       console.log(payload);
       response.send(payload);
       
    }
    catch {
        console.log("error");
    }
};




export {
    handle_login,
    whoAreYou,
    loginWithPassword
}
