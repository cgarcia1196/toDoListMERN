import List from "../models/List.js"

export const getAllLists =  async (req, res) => {
    try{
        const lists = await List.find()
        if(!lists) return res.status(404).json({message:"Lists not found"})
        res.status(200).json(lists)

    }catch(error){
        console.error("Internal server error on getAllLists")
    }
}

export const getOneList =  async (req, res) => {
    try{
        const list = await List.findById(req.params.id)
        if(!list) return res.status(404).json({message:"List not found"})
        res.status(200).json(list)
    }catch(error){
        console.error("Internal server error on getOneLists")
    }
}

export const addList =  async (req, res) => {
    try{
        const {title, items} = req.body;
        const list = new List({title, items})
        const savedList = await list.save();
        res.status(201).json(savedList)
    }catch(error){
        console.error("Internal server error on addListItem")
        res.status(500).json({message:"Internal server error"})
    }
}

export const editList =  async (req, res) => {
    try{
        const {title, items} = req.body;
        const updatedList = await List.findByIdAndUpdate(req.params.id, {title, items}, {new: true})
        if(!updatedList) return res.status(404).json({message:"Lists not found"})
        res.status(200).json(updatedList)
    }catch(error){
        const {title, items} = req.body;
        console.error(`Internal server error on editListItem id: ${req.params.id} title: ${title} items: ${items}`)
        res.status(500).json({message:"Internal server error"})
    }
}

export const deleteList =  async (req, res) => {
    try{
        const deletedList = await List.findByIdAndDelete(req.params.id)
        if(!deletedList) return res.status(404).json({message:"Lists not found"})
        res.status(200).json({message:"Note deleted sucessfully"})
    }catch(error){
        console.error("Internal server error on deleteListItem")
        res.status(500).json({message:"Internal server error"})
    }
}