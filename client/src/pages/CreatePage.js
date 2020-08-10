import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/auth.context";
import {useHistory} from 'react-router-dom'

export const CreatePage = () =>{
    const [link, setLink] = useState('')
    const {request} = useHttp()
    const history = useHistory()

    const auth = useContext(AuthContext)

    useEffect(()=>{
        window.M.updateTextFields()
    },[])

    const pressHandler = async event =>{
        if(event.key === 'Enter'){
            try{
               const data = await request('/api/link/generate', 'POST', {from:link}, {
                   Authorization :`Bearer ${auth.token}`
               })
                history.push(`/detail/${data.link._id}`)
            }catch (e) {}
        }
    }

    return(
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2pem'}}>
                <div className="input-field">
                    <input
                        placeholder="Вставте ссылку"
                        id="link"
                        type="text"
                        onChange={e=>setLink(e.target.value)}
                        value={link}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Введите ссылку</label>
                </div>
            </div>
        </div>
    )
}