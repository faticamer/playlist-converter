import PropTypes from 'prop-types'
import { removeMarker } from '../modules/server_calls';

function InfoPane ({list}) {    
    let marker = list[0].marker
    
    if(marker === 'tracks') {
        const newArr = removeMarker(list)
        console.log('Tracks: ', newArr);
        return (                
            <div>
              <ul>
                {newArr.map((item, index) => (
                  <li key={index}>
                    <h1>
                        {item.artist}
                        {item.name}
                        <b>{Math.floor(item.duration_ms / (1000 * 60))}:{Math.floor((item.duration_ms % (1000 * 60)) / 1000)}</b>
                    </h1>
                  </li>
                ))}
              </ul>
            </div>
        );
    } else if(marker === 'library') {
        const newArr = removeMarker(list)
        console.log('Library: ', newArr);
        return (
            <div>
                <ul>
                    {newArr.map((item, index) => (
                        <li key={index}>
                            <h1>{item.name}</h1>
                        </li>
                    ))}
                </ul>
            </div>
        )
    } else return <div>Error Parsing the list</div>
}


InfoPane.propTypes = {
    list : PropTypes.array
}

export default InfoPane