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
	constructor (props) {
		super(props);
		this.handleTextChange = this.handleTextChange.bind(this);

		this.state = {
			isActive: false,
			text: "",
			id: this.props.id ? this.props.id : `floating-label${parseInt(Math.random() * 1000)}`,
			mainClass: this.props.className ? this.props.className : "",
			labelClassName: this.props.labelClassName ? this.props.labelClassName : "",
			inputClassName: this.props.inputClassName ? this.props.inputClassName : "",
			type: this.props.type ? this.props.type : "text",
			label: this.props.label ? this.props.label : "Floating Label"
		};
	}

	/**
		Event callback for input changes.
		Updates state to comply with React standard
		controlled input elements
		@param {object} event
	*/
	handleTextChange (event) {
		this.setState({
			isActive: event.target.value !== "",
			text: event.target.value
		});

		if (this.props.onChange) {
			this.props.onChange(event);
		}
	}

	/**
		Renders a form input with all the required callback and id information
		nested within a div, and sibling to a label
	*/
	render () {
		return <>
			<div className={`floating-label ${this.state.clasName}`}>
				<input
					className={this.state.inputClassName}
					type={this.state.type}
					id={this.state.id}
					value={this.state.text}
					onChange={this.handleTextChange} />

				<label className={`${this.state.labelClassName}${this.state.isActive ? " floating-label-active" : ""}`}>
					{this.state.label}
				</label>
			</div>
		</>;
	}
}

/**
 * Props may contain a classname, a type, an id, an onChange
 * callback method, and a label
 */
FloatingLabel.propTypes = {
	className: PropTypes.string,
	type: PropTypes.string,
	id: PropTypes.string,
	onChange: PropTypes.func,
	label: PropTypes.string
};

export default FloatingLabel;
