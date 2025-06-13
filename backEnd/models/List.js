import mongoose from "mongoose"

const listItemSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    checked:{
        type:Boolean,
        default:false
    }

},{timestamps:true}
)

const listSchema =  new mongoose.Schema({
    title:{
        type:String,
        requrired:true
    },
    items:[listItemSchema],
},{timestamps:true}
)

const List = mongoose.model("List", listSchema)
export default List