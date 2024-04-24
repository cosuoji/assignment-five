import * as authService from "../services/auth.services.js"

export let tokenToUse;

export const login = async(req, res, next) =>{
    try{
        const {email, password} = req.body;
        const token = await authService.login(email, password);
    
        tokenToUse = token.data.accessToken
        if(tokenToUse){
            req.header.authorization = "Bearer" + tokenToUse
        }

      res.json({
            message: "Login successful",
            data:{
                acessToken: token,

            }
    });

    }
    catch(error){
        res.status(error.status || 500);
        res.json({message: error.message})
    }
}

export const register = async (req, res)=>{
    try {
    const {name,email, password, confirmPassword} = req.body
    const result = await authService.register(name,email, password, confirmPassword)
    //console.log(result)
    res.json(result)
    }
    catch(err){
        res.status(err.status || 500);
        res.json({messsage: err.message}) 
    }
}
