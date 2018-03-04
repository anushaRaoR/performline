import React,{Component} from 'react';



class AppBar extends Component {

	render(){
		return (
				<div className="appbar">
					<h1 className="appbar-h1">{this.props.title}</h1>			
				</div>
			)
	}
}

export default AppBar;