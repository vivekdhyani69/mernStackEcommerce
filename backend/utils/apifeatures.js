class ApiFeatures {
    constructor(query,queryStr){
        this.query = query;//function passed like find ,creates
        this.queryStr = queryStr;//Passed the query Params
    }
//Makes function of Controller in which we handled logics and passed all them in cclass object
 
search() { 
const keyword = this.queryStr.keyword ? {
    name :{
        $regex : this.queryStr.keyword,
        $options : "i",
    } 
} : {}


this.query = this.query.find({...keyword});
return this;
}

filter(){

    const queryCopy = {...this.queryStr};//makes clone of the object
    ///Removing field for category
    const removeFields = ['keyword','page','limit'];
    removeFields.forEach((key)=> delete queryCopy[key]);//clone vale object mei se ye ye cheej delete kr k filter kr k do

//filter for prices and rating
console.log(queryCopy)
 let queryStr = JSON.stringify(queryCopy);//convert object into stirng
 queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=> `$${key}`)

 this.query = this.query.find(JSON.parse(queryStr))

 console.log(queryStr)
    return this;


}


pagination(resultPerPage){

    const currentPage = Number(this.queryStr.page)||1; //current page kon sa show hoga
    
    const skip = resultPerPage  * (currentPage - 1)///skip utne jitne perpage mei item hai and multiply with current Page
    this.query = this.query.limit(resultPerPage).skip(skip)
    
    return this;
    }


}

module.exports =ApiFeatures;