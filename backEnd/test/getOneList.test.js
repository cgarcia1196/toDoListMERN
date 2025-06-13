import {getOneList} from '../controllers/listController.js'

describe("get one list from db", ()=>{

    it("should fail if id not in db", async() =>{

        await expect(getOneList('-1'))
        .rejects
        .throw("Internal server error on getOneLists")
    })

})