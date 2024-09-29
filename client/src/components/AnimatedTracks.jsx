// import { useState, useEffect } from 'react'

/* eslint react/prop-types: 0 */
const AnimatedTracks = ({list}) => {

    return (
        <ul className='pt-3'>
            {list.map((item, index) => (
                <li className='text-md animate-fadeIn lg:text-lg' key={index}>
                    <div className='flex flex-row justify-between hover:bg-stone-600 transition-all duration-200 ease-in-out p-1'>
                        <div className='flex flex-row'>
                            <div className='pr-5 pl-2 flex items-center justify-center'>
                                <p className='text-stone-400 w-4'>{index + 1}</p>
                            </div>
                            <div className='w-16 h-16 min-h-16 min-w-16'>
                                <img src={item.album.images[2].url} alt="Cover Image" className='w-full h-full border border-transparent rounded-lg'/>
                            </div>
                            <div>
                                <p className='pl-2 nunito-sans-regular'>{item.name}</p>
                                <p className='pl-2 text-stone-400 nunito-sans-regular'>
                                    {item.artists && item.artists.length > 0 && (
                                        item.artists.map(artist => artist.name).join(', ')
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-col items-center justify-center pr-4 text-stone-400 nunito-sans-regular'>
                            {Math.floor(item.duration_ms / (1000 * 60)) + ":" + 
                            (Math.floor((item.duration_ms % (1000 * 60)) / 1000) < 10 ? "0" + 
                            Math.floor((item.duration_ms % (1000 * 60)) / 1000) : 
                            Math.floor((item.duration_ms % (1000 * 60)) / 1000))}
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default AnimatedTracks