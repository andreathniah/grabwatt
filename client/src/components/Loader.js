import React from "react";
import LoaderMessage from "./LoaderMessage";
import FicMain from "./FicMain";
import base from "../base";

class Loader extends React.Component {
	state = { loading: true, storybox: [] };

	componentDidMount() {
		this.ref = base.syncState(`story/${this.props.match.params.storyId}`, {
			context: this,
			state: "storybox"
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	componentDidUpdate() {
		const { loading, storybox } = this.state;

		if (loading === true && Object.keys(storybox).length !== 0) {
			this.setState(prevState => ({ loading: false }));
		}
	}

	render() {
		const { loading } = this.state;
		const { match, history } = this.props;

		return (
			<div>
				{loading ? (
					<LoaderMessage storyId={match.params.storyId} />
				) : (
					<FicMain storyId={match.params.storyId} history={history} />
				)}
			</div>
		);
	}
}

export default Loader;
