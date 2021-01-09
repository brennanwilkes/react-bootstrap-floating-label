// Brennan Wilkes

// Imports
import React from "react";
import PropTypes from "prop-types";

import "./FloatingLabel.css";

/**
	A floating label input component.
	Cleanly transitions an input placeholder to a upper left floated label
	@class
	@extends React.Component
*/
class FloatingLabel extends React.Component {
	/**
		Initializes state and binds methods
		@param {any[]} props
		@constructor
	*/
	constructor(props) {
		super(props);
		this.handleTextChange = this.handleTextChange.bind(this);

		this.state = {
			isActive: false,
			text: "",
			id: this.props.id
				? this.props.id
				: `floating-label${parseInt(Math.random() * 1000)}`,
		};
		this.state.labelId = this.props.labelId
			? this.props.labelId
			: `${this.state.id}-label`;
		this.state.inputId = this.props.inputId
			? this.props.inputId
			: `${this.state.id}-input`;
	}

	/**
		Event callback for input changes.
		Updates state to comply with React standard
		controlled input elements
		@param {object} event
	*/
	handleTextChange(event) {
		this.setState({
			isActive: event.target.value !== "",
			text: event.target.value,
		});

		if (this.props.onChange) {
			this.props.onChange(event);
		}
	}

	/**
		Renders a form input with all the required callback and id information
		nested within a div, and sibling to a label
	*/
	render() {
		const propDefault = {
			className: this.props.className ? this.props.className : "",
			labelClassName: this.props.labelClassName
				? this.props.labelClassName
				: "",
			inputClassName: this.props.inputClassName
				? this.props.inputClassName
				: "",
			type: this.props.type ? this.props.type : "text",
			label: this.props.label ? this.props.label : "Floating Label",
			style: this.props.style ? this.props.style : {},
			labelStyle: this.props.labelStyle ? this.props.labelStyle : {},
			inputStyle: this.props.inputStyle ? this.props.inputStyle : {},
		};

		return (
			<>
				<div
					className={`floating-label ${propDefault.className}`}
					id={this.state.id}
					style={propDefault.style}
				>
					<input
						className={propDefault.inputClassName}
						type={propDefault.type}
						value={this.state.text}
						onChange={this.handleTextChange}
						style={propDefault.inputStyle}
					/>

					<label
						className={`${propDefault.labelClassName}${
							this.state.isActive ? " floating-label-active" : ""
						}`}
						style={propDefault.labelStyle}
					>
						{propDefault.label}
					</label>
				</div>
			</>
		);
	}
}

/**
 * Props may contain a classname, id, and style for the wrapper, input, and label.
 * They may also contain a callback method, label text, and input type.
 */
FloatingLabel.propTypes = {
	id: PropTypes.string,
	labelId: PropTypes.string,
	inputId: PropTypes.string,
	className: PropTypes.string,
	labelClassName: PropTypes.string,
	inputClassName: PropTypes.string,
	type: PropTypes.string,
	onChange: PropTypes.func,
	label: PropTypes.string,
	style: PropTypes.object,
	labelStyle: PropTypes.object,
	inputStyle: PropTypes.object,
};

export default FloatingLabel;
