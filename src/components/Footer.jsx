
import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';


function Footer() {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent:"end"}}>
            <MDBFooter bgColor='light' className='text-center text-lg-left'>
                <div className='text-center p-3' style={{ backgroundColor: '#6e779c' }}>
                    {new Date().getFullYear()} Copyright:{' '}
                    <a className='text-dark' href='https://github.com/Rebalot/IMDB_WebPage.git'>
                        Alberto Alcocer & Francisco Aguilar
                    </a>
                </div>
            </MDBFooter>
        </div>
    );
}

export default Footer;

