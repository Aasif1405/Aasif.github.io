let LOCAL = false

let HostName, URI;

if(LOCAL){
    URI = "mongodb://localhost/contacts";
    HostName = "localhost"
}else{
    URI = "mongodb+srv://harrison:harri029@cluster0.yoqtobg.mongodb.net/contacts?retryWrites=true&w=majority&appName=Cluster0";
    HostName = "MongoDB Atlas"
}

export { HostName, URI }
export const SessionSecret = "INFT2202SessionSecret";