import React, { memo} from 'react'

function ChilduseCallbackHook(props) {
    let title = "Front-End ReactJS";
    const obj = {id: 1, name: "Stranger"}
    console.log("title", title);
    console.log("Object", obj);
    console.log("re-render");  
    return (
    <div className='container mt-5'>
        <small>{props.renderNotifycation()}</small>
        <br />
        <textarea cols="30" rows="10"></textarea>
        <br />
        <br />

        {/* number : {number} */}
        <br />
        <button className="btn btn-success">Send</button>
    </div>
  )
}
export default memo(ChilduseCallbackHook);
