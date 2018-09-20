var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get('/', function (req, res) {
    res.send("<h1>Welcome Realtime Server</h1>");
});

io.on("connection", function (socket) {
    console.log("a user connected");
    io.sockets.emit("message", "您好啊！");

    //监听用户发送过来的内容
    socket.on("send", function (data) {
        console.log(data);
        if (data === "拜拜") {
            //向所有客户端广播发布的消息
            io.emit("message", "see you");
            io.emit("disconnect",function(){
                console.log("关闭");
            });
        } else {
            io.sockets.emit("news", data);
        }
    })
});

http.listen(3000, function () {
    console.log("listening on *:3000");
});