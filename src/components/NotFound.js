import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '@styles/Custom.css'

const NotFound = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate(props.destination);    
    }, 2500);
  }, [navigate, props]);

  return (
    <div className="App-container">
      <div className="ops">
        Oops,
        <div>Sorry, cannot found this <div>{props.name} {id}</div>.</div>
      </div>
    </div>
  )
}

export { NotFound };
