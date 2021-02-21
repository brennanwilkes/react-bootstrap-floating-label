// Brennan Wilkes

// Imports
import * as React from "react";
import { ImCog } from "react-icons/im";
import "./LoadingCog.css";

/**
 * A small cog loading icon
 * @class
 * @extends React.Component
 */
class LoadingCog extends React.Component {

	constructor(props){
		super(props);
		this.triggerRotate = this.triggerRotate.bind(this);

		this.state = {
			rotateInterval: undefined
		}

		if(props.rotating){
			this.triggerRotate();
		}
	}

	triggerRotate(){
		let rot = 0;
		if (this.state.rotateInterval) {
			window.clearInterval(this.state.rotateInterval);
		}
		const id = window.setInterval(() => {
			$(".loadingCog").css({ transform: `rotate(${rot}deg)` });
			rot += 1;
		}, 10);

		this.setState({
			rotateInterval: id
		})
	}

	componentDidUpdate(prevProps){
		if(!prevProps.rotating && this.props.rotating){
			this.triggerRotate();
		}
		else if(prevProps.rotating && !this.props.rotating){
			window.clearInterval(this.state.rotateInterval);
			this.setState({rotateInterval: undefined});
		}
	}

	render () {
		return <>
			<div style={this.props.style ?? {}} className="loadingCog">
				<ImCog size={this.props.size ?? 30} />
			</div>
		</>;
	}
}

LoadingCog.propTypes = {
	style: PropTypes.object,
	size: PropTypes.number,
	rotating: PropTypes.boolean
};

export default LoadingCog;
