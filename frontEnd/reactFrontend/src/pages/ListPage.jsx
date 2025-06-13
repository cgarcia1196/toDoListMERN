import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"

import '../css/ListPage.css' 

const ListPage = () => {
  const backendURL = import.meta.env.mode === "development" ? "http://localhost:5001/api/lists" : "/api/lists"
  const [list, setList] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const listId = location.pathname.split("/").pop()

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`${backendURL}/${listId}`)
        setList(res.data)
      } catch (error) {
        console.log("Error: could not get list")
      } finally {
        setLoading(false);
      }
    };
    fetchList()
  }, [listId])

  const handleDelete = async (id) => {
    const updatedList = {
      ...list, items:[...list.items.filter(item => item._id !== id)]
    }

    try {
      await axios.put(`${backendURL}/${listId}`, updatedList)
      .then(res => {
         setList(res.data)
      })
    } catch (error) {
      console.log("Could not delete item to database")
    }
  }
  const saveList = async() =>{
    try {
      await axios.put(`${backendURL}/${listId}`, list)
    } catch (error) {
      console.log("Could not save list to database")
    }

  }
  const handleAddItem = async () =>{
    const newItem = {
      content: "",
      checked: false,
    }
    const updatedList = {
      ...list, items:[...list.items, newItem]
    }
    try {
      await axios.put(`${backendURL}/${listId}`, updatedList)
      .then(res => {
         setList(res.data)
      })
    } catch (error) {
      console.log("Could not add item to database")
    }

  }

  const handleHome = async () => {
    navigate("/")
  }

  return (
    <div className="list">
      <h2>List Page</h2>
       <button onClick={handleHome}>Home</button>
      {loading && <div>Loading list...</div>}
      {list && Array.isArray(list.items) &&(
        <>
            <input className="titleInputBox"
                  value={list.title}
                  onChange={e => {
                    setList(prevList => ({
                      ...prevList, title:e.target.value
                    }));
                  }}
                  onBlur={saveList}
            />
          <ul>
            {list.items.map(item => (
              <li key={item._id}>
                <input type="checkbox" checked={item.checked}
                  onChange={e => {
                    setList(prevList => ({
                      ...prevList,
                      items: prevList.items.map(it => it._id === item._id ? { ...it, checked: e.target.checked } : it)
                    }));
                  }}
                />
                <input className={`inputBox ${item.checked ? 'checked' : ''}`}
                  value={item.content}
                  onChange={e => {
                    setList(prevList => ({
                      ...prevList,
                      items: prevList.items.map(it => it._id === item._id ? { ...it, content: e.target.value } : it)
                    }));
                  }}
                  onBlur={()=>{
                    setTimeout(()=>{
                      saveList()
                    }, 0)
                  }}
                />
                
                
                <button onClick={() => handleDelete(item._id)}>🗑️</button>
              </li>
            ))}
          </ul>
            <button onClick={() => handleAddItem()}>Add item</button>
           
        </>
      )}
    </div>
  );
};

export default ListPage;
