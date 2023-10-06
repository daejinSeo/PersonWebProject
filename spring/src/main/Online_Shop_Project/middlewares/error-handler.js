function handleErrors(error, req, res, next){
    console.log(error);
    // 서버 응답 없음
    res.status(500).render('shared/500');
}

module.exports = handleErrors;