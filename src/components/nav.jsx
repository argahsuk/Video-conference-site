import logo from "D:/study/own/PROJECTS/WEB DEV PROJECTS/video_call/vdo/src/assets/logo.jpg"
function Nav() {
  const main_style = {
    backgroundColor: '#264653',
    padding: '3vh',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const style = {
    display: 'inline-block',
    padding: '0px 10px',
    textDecoration: 'none',
    color: '#f4a261',
    fontWeight: 'bold',
    fontSize: '22px',
  };

  return (
    <>
      <div style={main_style}>
        <div>
          <a href="/" style={style}>Home</a>
          <a href="/a" style={style}>aboutPage</a>
          <a href="https://agraPortfolio.netlify.app" style={style} target="_blank" rel="noreferrer">aboutDeveloper</a>
          <a href="/c" style={style}>Contacts</a>
        </div>
        <div  className="logo">
          {/* Face 2 <br />Face */}
          <a href="/"><img src={logo} alt="" style={{borderRadius:"5vh",width:"6vw"}} className="logoimg"/></a>
        </div>
      </div>
    </>
  );
}

export default Nav;
