import "../../styles/Loader.css"
function Loader({ text = "loading..." }) {

    const loaderStyle = {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItem: "center",
        backgroundColor: "#111a2b"
    }

    return (
        <div style={loaderStyle}>
            <div className="loader-wrapper">
                <div className="spinner" aria-label="Loading login"></div>
                <p className="loader-text">{text}</p>
            </div>
        </div>
    )
}

export default Loader