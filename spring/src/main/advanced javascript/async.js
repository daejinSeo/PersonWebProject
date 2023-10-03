const fs = require('fs/promises');

async function readFile(){
    let fileData;

    //readFileSync 면 동기 작업
    // fileData = fs.readFile('data.txt', function(){
    //     console.log('File parsing done!');
    //     console.log(fileData.toString());
    // });

    fs.readFile('data.txt')
    .then(function(fileData){
        console.log('File parsing done!');
        console.log(fileData.toString());
        console.log('Hi there!');
        //return anotherAsyncOperation;
    })
    .then(function () {})
    .catch(function(error)) {
        console.log(error);
    }
    ;
    //프로미스를 지원하는 패키지가 있고, 콜백만 지원하는 패키지가 있음
    //프로미스: 콜백 함수를 좀 더 보기 편하게 구조화하기 위한 수단
    //프로미스 조건에 해당되는 게 실패할 경우 catch 처리 가능
    
    // async를 붙이고 await로 동기화 작업이 필요한 부분에 부여하여 동기화 처리로 변경 가능
    try{
        fileData = await fs.readFile('data.txt');
    }
    catch(error){
        console.log(error);
    }
    console.log('File parsing done!');
    console.log(fileData.toString());
    console.log('Hi there!');
}

readFile();