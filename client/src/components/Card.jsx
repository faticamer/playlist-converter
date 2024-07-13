import { Link } from 'react-router-dom';
import PropTypes from 'prop-types' 

const Card = (props) => {
    return (
        <div className='flex flex-col flex-wrap justify-center items-center m-10'>
            <div className='size-5/12'>
                <Link to={props.path}>
                    <img src={props.link} alt={props.alt} href={props.path} className='object-contain h-full w-full cursor-pointer'/>
                </Link>
            </div>
            <div className='flex flex-col w-1/2 h-1/3 pt-10 my-10 justify-between items-center'>
                <h1 className={`${props.gradient} text-transparent text-3xl font-bold animate-gradient`}>{props.source} {props.destination}</h1>
                <Link to={props.path} className={`mt-10 py-4 pr-32 pl-32 text-zinc-100 text-transparent text-xl ${props.border} font-bold text-center rounded-full ${props.hover}`}>Go!</Link>
            </div>
        </div>
    );
}

Card.propTypes = {
    link : PropTypes.string,
    alt : PropTypes.string,
    source : PropTypes.string,
    destination : PropTypes.string,
    border: PropTypes.string,
    hover : PropTypes.string,
    path : PropTypes.string,
    gradient : PropTypes.string,
    animate : PropTypes.string
}

export default Card;