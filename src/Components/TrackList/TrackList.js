import React from 'react';
import './TrackList.css';
import { Track } from '../Track/Track.js';

export class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {this.props.tracks.map(track => {
                    return <Track onRemove={this.props.onRemove} onAdd={this.props.onAdd} isRemoval={this.props.isRemoval} key={track.id} track={track} />
                })}
            </div>
        )
    }
}