var moogoose=require('mongoose');

const uri='mongodb+srv://thuynguyen:thuy13705@thuynguyen.vpkmh.mongodb.net/test?authSource=admin&replicaSet=atlas-zozsyl-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'

const con=moogoose.connect(uri,(error)=>{
    if (error){
        console.log("Error"+error);
    }else{
        console.log("Connected successfully to server");
    }
});

module.exports=con;