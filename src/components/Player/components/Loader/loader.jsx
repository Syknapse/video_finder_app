import './loader.css'

const Loader = ({ className }) => (
  <div className={className}>
    <div className="loader_text">loading ....</div>
    <div className="loader_element"></div>
  </div>
)

export default Loader
