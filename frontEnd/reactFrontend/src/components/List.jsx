import React from 'react'
import { Link } from "react-router"
import '../css/ListPage.css'

const List = ({list}) => {
    return <Link to={`/list/${list._id}`} className='link'>
        <div className='list'>
            <h3>{list.title}</h3>
            {list.items.map(item => (
                <li key={item._id}>
                    <input type="checkbox" checked={item.checked}/>
                    {item.content}
                </li>
            ))}
        </div>
    
    </Link>
}

export default List
