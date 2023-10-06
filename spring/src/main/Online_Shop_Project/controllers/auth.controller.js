const User = require('../models/user.model');
const authUtil = require('../util/authentication');
const validationLogic = require('../util/validationLogic');
const sessionFlash = require('../util/session-flash');

// GET 회원가입 VIEW
function getSignup(req, res){
    let sessionData = sessionFlash.getSessionData(req);
    if (!sessionData){
        sessionData = {
            email: '',
            confirmEmail: '',
            password: '',
            fullname: '',
            address: '',
            detailAddress: '',
            postal: ''
        }
    }

    res.render('customer/auth/signup', { inputData: sessionData });
}


// 회원가입 처리
async function signup(req, res, next){
    const { email, confirmEmail, password, fullname, address, detailAddress, postal } = req.body;
    const enteredData = {
        email: email,
        confirmEmail: confirmEmail,
        password: password,
        fullname: fullname,
        address: address,
        detailAddress: detailAddress,
        postal: postal
    }

    console.log(enteredData);

    const user = new User(email, password, fullname, address, detailAddress, postal);

    // 데이터 유효성 검사
    if (!validationLogic.userDetailsAreValid(email, password, fullname, address, detailAddress, postal) 
    || !validationLogic.emailIsConfirmed(email, confirmEmail))
    {
        sessionFlash.flashDataToSession(req, {
            errorMessage: '입력 양식이 잘못되었습니다',
            ...enteredData
        }, function(){
            res.redirect('/signup');
        });
        
        return;
    }

    // 이메일 중복 검사: 중복시 True 값 리턴
    const existsAlready = await user.existAlready();
    if(existsAlready){
        sessionFlash.flashDataToSession(req, {
            errorMessage: "이미 가입된 이메일입니다",
            ...enteredData,
        }, function(){
            res.redirect('/signup');
        });
        
        return;
    }

    // insert문 처리(동기)
    try{
        await user.signup();
    }
    catch(error){
        return next(error);
    }
    

    res.redirect('/login');
}



//GET 로그인
function getLogin(req, res){
    let sessionData = sessionFlash.getSessionData(req);

    if (!sessionData){
        sessionData = {
            email: '',
            password: '',
        }
    }
    res.render('customer/auth/login', {inputData: sessionData});
}

//POST 로그인
async function login(req, res){
    // ID, PW 체크 로직
    const getUserEmail = req.body.email;
    const getUserPassword = req.body.password;

    const user = new User(getUserEmail, getUserPassword);
    let exisitingUser;
    try{
        exisitingUser = await user.getUserWithSameEmail();
    }
    catch(error){
        next(error);
        return;
    }
    // console.log("--------------- exisitingUser log --------------");
    // console.log(exisitingUser);
    // console.log("------------------------------------------------");

    const sessionErrorData = {
        errorMessage: "계정 정보를 정확하게 입력했는지 확인 바랍니다",
        email: getUserEmail,
        password: getUserPassword
    }

    if(!exisitingUser){
        sessionFlash.flashDataToSession(req, sessionErrorData, function(){
            res.redirect('/login');
        });
        
        return;
    }
    const passwordIsCorrect = await user.hasMatchingPassword(exisitingUser.password);
    if(!passwordIsCorrect){
        sessionFlash.flashDataToSession(req, sessionErrorData, function(){
            res.redirect('/login');
        });
        return;
    }



    //세션 생성/소멸 관리 (authentication.js)
    authUtil.createUserSession(req, exisitingUser, function(){
        res.redirect("/");
    });
}


//로그아웃 처리: session uid null
function logout(req, res){
    authUtil.destroyUserAuthSession(req);
    res.redirect('/login');
}


module.exports = {
    getSignup: getSignup,
    getLogin: getLogin,
    signup: signup,
    login: login,
    logout: logout
};