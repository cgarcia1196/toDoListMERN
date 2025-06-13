import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import List from "../components/List"
import { useNavigate } from "react-router"


const HomePage = () => {

    const [lists,setLists] = useState([])
    const [loading, setLoading] = useState(false)
    const backendULR = "http://localhost:5001/api/lists"
    const navigate = useNavigate()

    useEffect(()=>{
        const fetchLists = async () => {
            setLoading(true)
            try{
                const res = await axios.get(backendULR)
                console.log(res.data)
                setLists(res.data)
            }catch(error){
                console.log("error could not get lists")
            }finally{
                setLoading(false)
            }
        }
        fetchLists()
    },[])

    const handleNewList = async() =>{
        setLoading(true)
        //make new list in database and return id
        try{
            const emptyList ={
                "title":"",
                "items":[]
            }
            const res = await axios.post(backendULR, emptyList)
            navigate(`/list/${res.data._id}`)
        }catch(error){
            console.log("Could not make new list")
        }finally{
            setLoading(false)
        }
    }

    return( 
        <div>
            Home Page
            <div> 
                {loading && <div>loading lists...</div>}

                {lists.length > 0 && (
                    <div> 
                        {lists.map(list =>(
                            <List key={list._id} list={list}/>
                        ))}
                    </div>
                )}
                
            </div>
            <button onClick={handleNewList}>New List</button>

            
        </div>
    )
}

export default HomePage