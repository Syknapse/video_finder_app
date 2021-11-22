const ErrorModule = ({ className, message }) => (
  <div className={className}>{message || 'Sorry, there are no results for this search term. Try another search'}</div>
)

export default ErrorModule
