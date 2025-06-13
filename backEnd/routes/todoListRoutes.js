import express from "express"
import { getAllLists, addList, editList, deleteList, getOneList } from "../controllers/listController.js";

const router = express.Router();

router.get("/", getAllLists)
router.get("/:id", getOneList)
router.post("/", addList)
router.put("/:id", editList)
router.delete("/:id", deleteList)

export default router;