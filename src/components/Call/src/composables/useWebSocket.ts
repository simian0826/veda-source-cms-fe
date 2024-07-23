type MessageData = {
  type: string;
  [key: string]: any;
};

// TODO: remove console.log
const useWebSocket = () => {
  let socket: WebSocket;
  let connectionRetries = 1;
  let url: string;
  let handler: (data: MessageData) => void;

  function connect(
    URL: string,
    didReceiveMessage: (data: MessageData) => void,
  ) {
    console.log(`connecting... ${URL}`);
    url = URL;
    handler = didReceiveMessage;
    socket = new WebSocket(url);
    socket.onopen = function () {
      console.log("connected");
      socket.send("type=opening");
    };

    socket.onmessage = function (e) {
      console.log("onmessage", decodeParameters(e.data));
      const data: any = decodeParameters(e.data);
      const isConnectResponse = data.type === "connectResponse";
      if (isConnectResponse) {
        if (data.code == 0) {
          connectionRetries = 1;
          heatbeat();
        } else {
          connectionRetries = 0;
          console.log("received error code: ", data.code);
        }
      }

      const isCommand = data.type === "cmd";
      if (isCommand) {
        handler(data);
      }
    };

    socket.onclose = function () {
      console.log("disconnected");
      if (connectionRetries > 0) {
        if (connectionRetries > 64) {
          connectionRetries = 0;
        } else {
          connectionRetries *= 2;
          setTimeout(() => {
            connect(url, handler);
          }, connectionRetries * 1000);
        }
      }
    };
  }

  function disconnect() {
    connectionRetries = 0;
    socket?.close();
  }

  function isConnected() {
    return socket?.readyState === WebSocket.OPEN;
  }

  function heatbeat() {
    setTimeout(() => {
      if (isConnected()) {
        socket?.send("type=h");
        heatbeat();
      }
    }, 50 * 1000);
  }

  // 消息解码
  function decodeParameters(content: string) {
    const obj = {};
    if (content) {
      const arr = content.split("&");
      for (let i = 0, len = arr.length; i < len; i++) {
        const arr1 = arr[i].split("=");
        if (arr1.length > 1) {
          obj[arr1[0]] = decodeURIComponent(arr1[1]);
        }
      }
    }
    return obj;
  }

  return {
    connect,
    disconnect,
  };
};

export default useWebSocket;
