import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/alertContext";
import Alert from "../layout/Alert";

const Search = () => {
  //initialise githubcontext
  const githubContext = useContext(GithubContext);
  //iniliase alertContext

  const alertContext = useContext(AlertContext);
  //This allows you to edit the state with the text you type
  const [text, setText] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    //if search state is equal to an empty string
    if (text === "") {
      //then set an alert
      alertContext.setAlert("Please enter something", "light");
    } else {
      githubContext.searchUsers(text);
      setText("");
    }
  };

  const onChange = e => {
    setText(e.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          placeholder="search users..." // This input is attached to the state above. But you also require onChange
          value={text}
          onChange={onChange}
        />
        <input
          type="submit"
          value="search"
          className="btn btn-dark btn-block"
        />
      </form>
      {githubContext.users.length > 0 && (
        <button
          className="btn btn-light btn-block"
          onClick={githubContext.clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
