// Brennan Wilkes

// Imports
import React from "react";
import PropTypes from "prop-types";
import { ImCog } from "react-icons/im";
import "./LoadingCog.css";

/**
 * A small cog loading icon
 * @class
 * @extends React.Component
 */
class LoadingCog extends React.Component {
	constructor(props) {
		super(props);
		this.triggerRotate = this.triggerRotate.bind(this);

		this.state = {
			id: `LoadingCog-${parseInt(Math.random() * 1000)}`,
			rotateInterval: undefined,
		};

		if (props.rotating) {
			this.triggerRotate();
		}
	}

	triggerRotate() {
		let rot = 0;
		if (this.state.rotateInterval) {
			window.clearInterval(this.state.rotateInterval);
		}
		const elem = document.getElementById(this.state.id);
		if (elem) {
			const id = window.setInterval(() => {
				elem.style.transform = `rotate(${rot}deg)`;
				rot += 1;
			}, 10);

			this.setState({
				rotateInterval: id,
			});
		} else {
			window.clearInterval(this.state.rotateInterval);
			this.setState({ rotateInterval: undefined });
		}
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.rotating && this.props.rotating) {
			this.triggerRotate();
		} else if (prevProps.rotating && !this.props.rotating) {
			window.clearInterval(this.state.rotateInterval);
			this.setState({ rotateInterval: undefined });
		}
	}

	render() {
		return (
			<>
				<div
					style={this.props.style ?? {}}
					className="loadingCog"
					id={this.state.id}
				>
					<ImCog size={this.props.size ?? 30} />
				</div>
			</>
		);
	}
}

LoadingCog.propTypes = {
	style: PropTypes.object,
	size: PropTypes.number,
	rotating: PropTypes.bool,
};

export default LoadingCog;
