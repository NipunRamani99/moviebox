import  Carousel  from 'react-material-ui-carousel';
import {Paper} from '@mui/material';
import './Hero.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import {Link, useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Reviews from '../reviews/Reviews';
const Hero = ({movies}) => {
    const navigate = useNavigate();
    function review(movieId) {
        navigate(`/Reviews/${movieId}`)
    }
    if(movies == undefined) {
        return (<div>Loading...</div>);
    } else 
  return (
    <div>
        <Carousel>
            {
                movies.map((movie) => {
                    return(
                        <Paper key={movie.imdbId}>
                            <div className='movie-card-container'>
                                <div className='movie-card' style={{"--img": `url(${movie.backdrops[0]})`}}>
                                    <div className='movie-detail'>
                                      <div className='movie-poster'>
                                            <img src={movie.poster} alt=""/>
                                        </div>
                                        <div className='movie-title'>
                                            <h4>{movie.title}</h4>
                                        </div>
                                        <div className='movie-buttons-container'>
                                            <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                                                <div className='play-button-icon-container'>
                                                    <FontAwesomeIcon className='play-button-icon' icon ={faCirclePlay}></FontAwesomeIcon>
                                                </div>
                                            </Link>
                                            <div className = 'review-button-container' >
                                                <Button varient="info" onClick={() => review(movie.imdbId)}>Reviews</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Paper>
                    );
                })
            }
        </Carousel>
    </div>
  )
}

export default Hero;