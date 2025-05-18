import Recordlist from "../Recordlist/Recordlist";
import { Link } from "react-router-dom";
import classes from "./window.module.css";

/**
 * description: Window component displaying orders
 * @returns JSX of component
 */
export default function Window(props) {
  const list = props.record;

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1 className={classes.title}>{props.header}</h1>
        <Link to="/Order" className={classes.button}>
          + הוסף הזמנה
        </Link>
      </div>
      <Recordlist record_list={list} />
    </div>
  );
}
