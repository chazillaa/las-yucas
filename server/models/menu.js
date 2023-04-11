const { Schema, model } = require('mongoose');
const fs = require('fs');

const menuSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        imagePath: {
            type: String,
        },
        image: {
            type: Buffer,
        },
        price:{
            type: Number,
        },
        ingredients:[{
            type: Schema.Types.ObjectId,
            ref:'ingredients'
        }],
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
)
//DO NOT UPDATE menu, ALWAYS .save
/* How to store and read the image buffer type
    let data = await fs.readFile('./burger.png');

    // Convert to Base64 and print out a bit to show it's a string
    let base64 = data.toString('base64');
    console.log(base64.substr(0,200));

    // Feed out string to a buffer and then put it in the database
    let burger = new Buffer(base64, 'base64');
    await Album.create({ "title": "burger", "image": burger });

    // Get from the database
    // - for demo, we could have just used the return from the create() instead
    let album =  Album.findOne();

    // Show the data record and write out to a new file.
    console.log(album);
    await fs.writeFile('./output.png', album.image)

    <img src={`data:image/png;base64,${props.postImgBase64}`} alt="a"/>
*/

menuSchema.pre("save", function (next) {
    if (this.imagePath) {
        const imageContents = fs.readFile(this.imagePath);
        const stringImage = imageContents.toString('base64');
        this.image = new Buffer.from(stringImage, 'base64');
    }
    next();
});

const MenuModel = model('menu', menuSchema);

module.exports = MenuModel;
