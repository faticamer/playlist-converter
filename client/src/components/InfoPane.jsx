import PropTypes from 'prop-types'
import { removeMarker } from '../modules/server_calls';

// Generate crypto.uuid for key

function InfoPane ({list}) {    
    let marker = list[0].marker

    if(marker === 'tracks') {
        const newArr = removeMarker(list)
        return (                
            <div>
              <ul>
                {newArr.map((item, index) => (
                  <li key={index}>              
                    <h1>{item.name} {item.duration_ms}</h1>                
                  </li>
                ))}
              </ul>
            </div>
        );
    } else if(marker === 'library') {
        const newArr = removeMarker(list)
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