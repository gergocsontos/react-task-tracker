import PropTypes from 'prop-types'

const Button = ({ color, text }) => {
    return (
        <button style={{backgroundColor: color}} className='btn'>{text}</button>
    )
}

Button.defaultProps = {
    color: 'steelblue',
    text: 'Blank'
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string
}
export default Button