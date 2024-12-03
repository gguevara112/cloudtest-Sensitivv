import React from 'react';
import './MostSearch.css';
import Products from '../GlobalComponents/Products';

const MostSearch = () => {
    return (
        <div>
            <div className='MSContainer'>
                <div className='rowMS'>
                
                    <div className='svgMS'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#949494" >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                        </svg> 
                    </div>
                    <div className='titleMS'>Most Search Products</div>
                </div>
                <Products />
                


            </div>
        </div>
    );
};

export default MostSearch;