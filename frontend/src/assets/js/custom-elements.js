class RoomItems extends HTMLElement {
    constructor() {
        super();
        this.loading = false;
        this.perPage = 8;
        this.currentPage = 1;
        this.className = "room-items row";
        this.rooms = [{ id: "A1B2C3", title: "Bản lĩnh thì bơi vào", bets: 5000, players: [{ avatar: "http://localhost:3000/assets/imgs/user-1.jpg" }] }, { id: "A2B3C4", title: "Bản lĩnh thì bơi vào", bets: 5000, players: [{ avatar: "http://localhost:3000/assets/imgs/user-1.jpg" }] }, { id: "A3B4C5", title: "Bản lĩnh thì bơi vào", bets: 5000, players: [{ avatar: "http://localhost:3000/assets/imgs/user-1.jpg" }] }, { id: "A4B5C6", title: "Bản lĩnh thì bơi vào", bets: 5000, players: [{ avatar: "http://localhost:3000/assets/imgs/user-1.jpg" }] }];

        this.init(this.rooms);
    }

    /**
     * Method: Init rooms
     */
    init(data) {
        // Step 1. Validate data
        if (data.length == 0) {
            return;
        }

        // Step 2. Loop through data and create room
        for (let i = 0; i < data.length; i++) {
            this.createRoom(data[i]);
        }
    }
    /**
     * Method: Create room
     */
    createRoom(data) {
        const roomItem = document.createElement("room-item", { is: "room-item" });
        roomItem.id = data.id;
        roomItem.bets = data.bets;
        this.append(roomItem);
    }
}

customElements.define("room-items", RoomItems);

class RoomItem extends HTMLElement {
    constructor() {
        super();
        this.className = "room-item col-lg-3 col-md-4 col-6 mb-4";
        this.init();
    }

    init() {
        const divWrapper = this.createDivWrapper();
        const buttonPlay = this.createButtonPlay();
        const textBets = this.createTextBets();
        const textIdRoom = this.createTextIdRoom();

        divWrapper.append(textIdRoom, textBets, buttonPlay);
        this.append(divWrapper);
    }
    createDivWrapper() {
        const divWrapper = document.createElement("div");
        divWrapper.classList.add("room-item__wrapper", "bg-primary", "color-second", "p-4", "rounded-3", "shadow");
        return divWrapper;
    }

    createTextIdRoom() {
        const textIdRoom = document.createElement("p");
        textIdRoom.className = "room-item__id";
        const textIdRoomContent = document.createTextNode("Mã phòng #" + this.id);

        textIdRoom.appendChild(textIdRoomContent);
        return textIdRoom;
    }

    createTextBets() {
        const textBets = document.createElement("p");
        textBets.className = "room-item__bets";
        const textBetsContent = document.createTextNode("Tiền cược: " + money(this.bets));

        textBets.appendChild(textBetsContent);
        return textBets;
    }

    createButtonPlay() {
        const buttonPlay = document.createElement("a");
        buttonPlay.href = `/frontend/src/pages/room.html?id=${this.id}`;
        buttonPlay.className = "room-item__btn-play btn btn-primary mt-3 w-100";
        const buttonPlayContent = document.createTextNode("Chơi ngay");

        buttonPlay.appendChild(buttonPlayContent);
        buttonPlay.addEventListener("click", this._eventOnPlay)
        return buttonPlay;
    }

    _eventOnPlay() {
        console.log("Chơi ngay");
    }
}

customElements.define("room-item", RoomItem);

class RoomDetail extends HTMLElement {
    constructor() {
        super();
        this.className = "room-detail";
        var urlParams = new URLSearchParams(window.location.search);
        this.id = urlParams.get("id");
        this.title = "Room title";
        this.bets = 5000;
        this.init();
    }

    init() {
        const roomHeader = this.createRoomHeader();
        this.prepend(roomHeader);
    }

    createRoomHeader() {
        const roomHeader = document.createElement("div");
        roomHeader.className = "room-detail__header d-flex gap-5 mb-3 color-second";

        const textId = document.createElement("p");
        const textIdContent = document.createTextNode("Mã phòng: " + this.id);
        textId.appendChild(textIdContent);

        const textTitle = document.createElement("p");
        const textTitleContent = document.createTextNode(this.title);
        textTitle.appendChild(textTitleContent);

        const textBets = document.createElement("p");
        const textBetsContent = document.createTextNode("Tiền cược: " + money(this.bets));
        textBets.appendChild(textBetsContent);

        roomHeader.append(textId, textTitle, textBets);

        return roomHeader;
    }
}
customElements.define("room-detail", RoomDetail);

class CasinoTable extends HTMLElement {
    constructor() {
        super();
        this.className = "casino-table";
        // this.init();
    }
}
customElements.define("casino-table", CasinoTable);