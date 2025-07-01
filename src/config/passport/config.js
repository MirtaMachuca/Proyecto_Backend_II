import passport from "passport";
import {registerLocal, loginLocal}  from "./local.strategy.js"

const initializedPassport=()=>{
    passport.use("login",loginLocal)
    passport.use("regiser",registerLocal)
}
export default initializedPassport