/* eslint react/prop-types: 0 */
const AnimatedLibrary = ({list}) => {

    return (
        <div>
            <ul className='pt-3'>
                {list.map((item, index) => (
                    <li className='text-lg animate-fadeIn' key={index}>
                        <div className='flex flex-row p-1 hover:bg-stone-600'>
                            <div className='w-16 h-16 min-w-16 min-h-16'>
                                <img src={item.images[0].url} alt="Cover Image" className='w-full h-full border border-transparent rounded-lg'/>
                            </div>
                            <div className='flex flex-col w-full pl-3 nunito-sans-regular'>
                                <p>{item.name}</p>
                                <p className='text-stone-400'>{item.type.charAt(0).toUpperCase() + item.type.slice(1)} ‧ {item.owner.display_name}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AnimatedLibrary