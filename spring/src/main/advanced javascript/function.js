function sumUp(...numbers){
    for (const number of numbers){
        result += number;
       
    }
    return result;
}

console.log(sumUp(1,5,10,15));