import React from 'react';
import './Track.css';

export class Track extends React.Component {
    
    renderAction(isRemoval) {
        if(isRemoval) {
            return '-';
        } else {
            return '+';
        }
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                <button className="Track-action">{this.renderAction(this.props.isRemoval)}</button>
            </div>
        )
    }
}