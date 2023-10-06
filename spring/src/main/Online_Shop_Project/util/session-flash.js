function getSessionData(req, res, action){
    const sessionData = req.session.flashedData;

    req.session.flashedData = null;

    return sessionData;
}

function flashDataToSession(req, data, action){
    req.session.flashedData = data;
    req.session.save(action);
}

module.exports = {
    getSessionData: getSessionData,
    flashDataToSession: flashDataToSession
}