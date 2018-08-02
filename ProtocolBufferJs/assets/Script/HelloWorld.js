cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!'
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this.text;


        protobuf.load("Proto/test1",(err, root) => {
            if (err)
                throw err;
        	// cc.log("root = " + root.toString());

			cc.log("加载protobuf完毕，开始测试protobuf...")

            var cmd = root.lookupEnum("PbLobby.Cmd");
            cc.log(`cmd = ${JSON.stringify(cmd)}`);
            cc.log("CMD_KEEPALIVED_C2S = " + cmd.values.CMD_KEEPALIVED_C2S);


			//lookup 等价于 lookupTypeOrEnum 
            //不同的是 lookup找不到返回null,lookupTypeOrEnum找不到则是抛出异常
            var type1 = root.lookup("PbLobby.Cmd1");
            cc.log("type1 = " + type1);
            var type2 = root.lookup("PbLobby.Test1");
            cc.log("type2 = " + type2);

			// Obtain a message type
            var Test1Message = root.lookupType("PbLobby.Test1");
            cc.log("Test1Message = " + Test1Message);

            // Exemplary payload
            var payload = { id: 1,name:"hello protobuf" };
            //var payload = { ids: 1,name:"hello protobuf" };
            cc.log(`payload = ${JSON.stringify(payload)}`);

            //过滤掉一些message中的不存在的字段
            // Create a new message
            var message = Test1Message.create(payload); // or use .fromObject if conversion is necessary
            cc.log(`message = ${JSON.stringify(message)}`);

			// Encode a message to an Uint8Array (browser) or Buffer (node)
            var buffer = Test1Message.encode(message).finish();
            cc.log("buffer1 = "+buffer);
            cc.log(`buffer2 = ${Array.prototype.toString.call(buffer)}`);
            // ... do something with buffer

            // Decode an Uint8Array (browser) or Buffer (node) to a message
            var decoded = Test1Message.decode(buffer);
            cc.log("decoded1 = "+decoded);
            cc.log(`decoded2 = ${JSON.stringify(decoded)}`);
            // ... do something with message

            // If the application uses length-delimited buffers, there is also encodeDelimited and decodeDelimited.

            //一般情况下，也不需要下面的转换
            // Maybe convert the message back to a plain object
            var object = Test1Message.toObject(decoded, {
                longs: String,
                enums: String,
                bytes: String,
                // see ConversionOptions
            });
            cc.log("object = "+JSON.stringify(object));


        });
    },

    // called every frame
    update: function (dt) {

    },
});
