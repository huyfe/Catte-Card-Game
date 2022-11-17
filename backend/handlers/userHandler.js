module.exports = (io, socket) => {
    const userJoining = (userInfor, callback) => {
        // ...
    }

    const userLeaving = (userInfor, callback) => {
        // ...
    }

    socket.on("user:join", userJoining);
    socket.on("user:leave", userLeaving);
}