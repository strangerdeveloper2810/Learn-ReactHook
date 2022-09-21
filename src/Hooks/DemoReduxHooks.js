import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCommentAction } from "../redux/actions/AppActions";

export default function DemoReduxHooks(props) {

    // useSelector thay thế cho mapStateToProps
    let comments = useSelector(state => state.AppReducer.comments);

    // useDispatch thay thế cho this.props.dispatch hoặc là mapdispatchToProps
    let dispatch = useDispatch();
    let [userComment, setUserComment] = useState({
        name: "",
        content: "",
        avatar: ""
    });

    const handleChangeInput = event => {
        let {name, value} = event.target;

        setUserComment({
            ...userComment,
            [name]: value
        });
    }

    const handleSubmit = event => {
      event.preventDefault();
      let userCMT = {...userComment, avatar: `https://i.pravatar.cc/150?u=${userComment.name}`}

      dispatch(addCommentAction(userCMT));
    }
 
  return (
    <div>
      <h3 className="text-center text-info">Fake Book App!</h3>
      <div className="card text-start">
        <div className="card-header">
          {comments.map((content, index) => (
            <div className="row" key={index}>
              <div className="col-1">
                <img
                  className="card-img-top"
                  src={content.avatar}
                  style={{ width: "70px", height: "75px" }}
                  alt={content.name}
                />
              </div>
              <div className="col-11">
                <h3 className="text-danger">{content.name}</h3>
                <p className="text-primary">{content.content}</p>
              </div>
            </div>
          ))}
        </div>
        <form
          className="card-body"
          onSubmit={(event)=>{
            handleSubmit(event);
          }}
          
        >
          <div className="form-group mt-2">
            <h6 className="text-success ms-1">Name</h6>
            <input
              type="text"
              className="form-control w-50"
              name="name"
              onChange={(event)=>{
                handleChangeInput(event)
              }}
             
            />
          </div>

          <div className="form-group mt-2">
            <h6 className="text-success ms-1">Content</h6>
            <input
              type="text"
              className="form-control w-50"
              name="content"
              onChange={(event)=>{
                handleChangeInput(event)
              }}
             
            />
          </div>

          <div className="form-group mt-2">
            <button className="btn btn-info">Gửi</button>
          </div>
        </form>
      </div>
    </div>
  );
}
