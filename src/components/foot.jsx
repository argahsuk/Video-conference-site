import { useState } from 'react'
function Foot() {

    const [hover1, setHover1] = useState(false);
    const [hover2, setHover2] = useState(false);
    const [hover3, setHover3] = useState(false);


    const style1 = {
        textDecoration: hover1 ? 'underline' : 'none',
        color: '#f4a261',
        fontWeight: '500',
    }


    const style2 = {
        textDecoration: hover2 ? 'underline' : 'none',
        color: '#f4a261',
        fontWeight: '500',
    }


    const style3 = {
        textDecoration: hover3 ? 'underline' : 'none',
        color: '#f4a261',
        fontWeight: '500',
    }

    return (
        <footer style={{ padding: '20px', backgroundColor: '#264653', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '10px' }}>
                <a href="/a" style={style1} onMouseEnter={() => setHover1(true)} onMouseLeave={() => setHover1(false)}>
                    About Page
                </a>
                <a href="#developer" style={style2} onMouseEnter={() => setHover2(true)} onMouseLeave={() => setHover2(false)}>
                    About Developer
                </a>
                <a href="/c" style={style3} onMouseEnter={() => setHover3(true)} onMouseLeave={() => setHover3(false)}>
                    Contacts
                </a>
            </div>
            <p style={{ maxWidth: '600px', margin: '10px auto', color: '#f4a261' }}>
                &copy; {new Date().getFullYear()} Face2Face. All rights reserved. Built with purpose using React and WebRTC.
Designed for real-time human connection, Face2Face enables seamless video conversations. Whether it's catching up with friends, collaborating on projects, or meeting new people — this platform reflects my journey in building interactive, impactful web applications.
            </p>
            <div style={{ marginTop: '10px' }}>
                <a href="https://agraPortfolio.netlify.app" target="_blank" rel="noopener noreferrer" style={{ color: '#f4a261' }}>
                    My Portfolio
                </a>
            </div>
        </footer>


    )
}
export default Foot;