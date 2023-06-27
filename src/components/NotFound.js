import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const NotFound = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate(props.destination);    
    }, 2500);
  }, [navigate, props]);

  return (
    <div className="notFoundContainer">
      <div className="ops">
        Oops,
      </div>
      <div>
        <div>Sorry, cannot found this </div><div className="notFoundName">{props.name} {id}</div>
      </div>
    </div>
  )
}

export { NotFound };
