import Navbar from './navbar/Navbar'

function Body(props) {
    return (
        <div className="rightContent">
            <Navbar />
            <div className="test">
            {props.children}
            </div>
        </div>
    )
}

export default Body