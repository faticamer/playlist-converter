import PropTypes from 'prop-types'
import { removeMarker } from '../service/server_calls';

function InfoPane ({list}) {    
    let marker = list[0].marker
    
    if(marker === 'tracks') {
        const newArr = removeMarker(list)
        // Perhaps extract the artists here and render them later on
        console.log(newArr)
        return (
            <div>
              <ul className = 'pt-3'>
                {newArr.map((item, index) => (
                  <li className = 'text-lg' key={index}>
                    { /** RE-DESIGN */}

                    <div className='flex flex-row justify-between hover:bg-stone-600 p-1'>
                        <div className='flex flex-row'>
                            <div className='pr-5 pl-2 flex items-center justify-center'>
                                <p className='text-stone-400 w-4'>{index + 1}</p>
                            </div>
                            <div className='w-16 h-16'>
                                <img src={item.album.images[2].url} alt="Cover Image" className='w-full h-full border border-transparent rounded-lg'/>
                            </div>
                            <div>
                                <p className='pl-2'>{item.name}</p>
                                <p className='pl-2 text-stone-400'>
                                {item.artists && item.artists.length > 0 && ( // Check for array existence and length
                                    item.artists.map(artist => artist.name).join(', ') // Join names with comma
                                )}
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-col items-center justify-center pr-4 text-stone-400'>
                            {Math.floor(item.duration_ms / (1000 * 60)) + ":" + 
                            (Math.floor((item.duration_ms % (1000 * 60)) / 1000) < 10 ? "0" + 
                            Math.floor((item.duration_ms % (1000 * 60)) / 1000) : 
                            Math.floor((item.duration_ms % (1000 * 60)) / 1000))}
                        </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
        );
    } else if(marker === 'library') {
        const newArr = removeMarker(list)
        return (
            <div>
                <ul className = 'pt-3'>
                    {newArr.map((item, index) => (
                        <li className = 'text-lg' key={index}>
                            <div className='flex flex-row p-1 hover:bg-stone-600'>
                                <div className='w-16 h-16'>
                                    <img src={item.images[0].url} alt="Cover Image" className='w-full h-full border border-transparent rounded-lg'/>
                                </div>
                                <div className='flex flex-col w-full pl-3'>
                                    <p>{item.name}</p>
                                    <p className='text-stone-400'>{item.type.charAt(0).toUpperCase() + item.type.slice(1)} ‧ {item.owner.display_name}</p>
                                </div>
                            </div>
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