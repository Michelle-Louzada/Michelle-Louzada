import React from 'react';
import axios from 'axios'
import { axiosConfig } from "../constants/axiosConstants"
import SearchPlaylist from './SearchPlaylist'

export default class Playlist extends React.Component {
    state = {
        playlist: [],
    }
    infoPlaylist = (id) => {
        axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${id}/tracks`,
        axiosConfig )

        .then((response) => {
            this.setState({
                playlist: response.data.result.tracks
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
    componentDidMount = () => {
        this.infoPlaylist(this.props.idPlaylist)
    }
    render() {
        return(
            <div>
                {this.state.playlist.map((music) => {
                    return(
                         <div>
                            <p key={music.id}>{music.name}</p>
                            <audio  controls="controls">
                            <source src={music.url} type="audio/mp3" />
                            </audio>
                        </div>
                    )          
                    })}
            </div>
        )
    }
}