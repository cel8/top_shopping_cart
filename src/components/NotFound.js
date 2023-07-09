import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '@styles/Custom.css'

const NotFound = (props) => {
  const name = props.name !== undefined && props.name !== "" ? props.name : "page";
  const destination = props.destination !== undefined && props.destination !== "" ? props.destination : "/";
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate(destination);    
    }, 2500);
  }, [navigate, destination]);

  return (
    <div className="App-container">
      <div className="ops">
        Oops,
        <div>Sorry, cannot be found this <div>{id ? `${name} ${id}` : `${name}`}</div>.</div>
      </div>
    </div>
  )
}

export { NotFound };
