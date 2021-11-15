var moogoose=require('mongoose');

const uri=''
const con=moogoose.connect(uri,(error)=>{
    if (error){
        console.log("Error"+error);
    }else{
        console.log("Connected successfully to server");
    }
});

module.exports=con;
