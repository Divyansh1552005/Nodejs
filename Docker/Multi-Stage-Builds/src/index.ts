import http from 'http';
import app from "./app/server";


function init(){
    try{
        const PORT = process.env.PORT || 3000;
        const server = http.createServer(app);
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        }); 
    } catch(error){
        console.log("Error starting server" , error);
    }
}

init();


