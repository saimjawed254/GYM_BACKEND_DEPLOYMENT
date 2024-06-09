import app from "./App.js";

app.listen(process.env.PORT,()=>{
    console.log ('Server listening at port '+process.env.PORT);
});