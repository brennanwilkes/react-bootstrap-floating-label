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
			id: this.props.id ?? `LoadingCog-${parseInt(Math.random() * 1000)}`,
			rotateInterval: undefined,
			rot: 0,
		};

		if (this.props.rotating) {
			this.triggerRotate();
		}
	}

	componentWillUnmount() {
		this.endRotate(false);
	}

	endRotate(stateChange = true) {
		if (this.state.rotateInterval) {
			window.clearInterval(this.state.rotateInterval);
			if (stateChange) {
				this.setState({ rotateInterval: undefined });
			}
		}
	}

	triggerRotate() {
		if (this.state.rotateInterval) {
			this.endRotate(false);
		}
		const id = window.setInterval(() => {
			this.setState({
				rot: this.state.rot + 1,
			});
		}, 10);

		this.setState({
			rotateInterval: id,
		});
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.rotating && this.props.rotating) {
			this.triggerRotate();
		} else if (prevProps.rotating && !this.props.rotating) {
			this.endRotate();
		}
	}

	render() {
		let appliedStyle = this.props.style ? { ...this.props.style } : {};
		appliedStyle.transform = `rotate(${this.state.rot}deg)`;

		return (
			<>
				<div style={appliedStyle} className="loadingCog" id={this.state.id}>
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
	id: PropTypes.string,
};

export default LoadingCog;
