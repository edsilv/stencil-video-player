import { Component, Prop, Listen, Element, State } from '@stencil/core';

@Component({
    tag: 'video-player',
    styleUrl: 'video-player.scss'
})
export class VideoPlayer {
    @Prop() url: string;
    @State() isFullscreen: boolean = false;
    @State() isPlaying: boolean = false;
    @State() isMuted: boolean = false;
    @State() progress: number = 0;
    @State() duration: number = 0;
    @State() volume: number = 1;

    @Element() element: HTMLElement;

    private videoElement: any;

    componentWillLoad() {
        this.videoElement = this.element.querySelector('video-element');
    }

    @Listen('play')
    playHandler() {
        this.isPlaying = true;
        this.videoElement.playVideo();
    }

    @Listen('pause')
    pauseHandler() {
        this.isPlaying = false;
        this.videoElement.pauseVideo();
    }

    @Listen('mute')
    muteHandler() {
        this.isMuted = true;
        this.videoElement.muteVideo();
    }

    @Listen('unmute')
    unmuteHandler() {
        this.isMuted = false;
        this.videoElement.unmuteVideo();
    }

    @Listen('timeupdate')
    timeupdateHandler(event) {
        this.progress = event.detail;
    }

    @Listen('duration')
    durationHandler(event) {
        this.duration = event.detail;
    }

    @Listen('seek')
    seekHandler(event) {
        this.videoElement.seekTo(event.detail);
    }

    @Listen('volume')
    volumeHandler(event) {
        this.volume = event.detail;
        if (event.detail === 0) this.isMuted = true;
        else this.isMuted = false;
        this.videoElement.setVolume(event.detail);
    }

    @Listen('body:keyup')
    keyboardHandler(keyboardEvent) {
        switch(keyboardEvent.code) {
            case 'Space': {
                keyboardEvent.preventDefault();
                if (!this.isPlaying) this.playHandler();
                else this.pauseHandler();
                break;
            }
            case 'KeyM': {
                keyboardEvent.preventDefault();
                if (!this.isMuted) this.muteHandler();
                else this.unmuteHandler();
                break;
            }
            case 'KeyF': {
                keyboardEvent.preventDefault();
                if (!this.isFullscreen) this.enterFullscreen();
                else this.exitFullscreen();
            }
        }
    }

    @Listen('enterFullscreen')
    enterFullscreen() {
        this.element.webkitRequestFullscreen();
    }

    @Listen('exitFullscreen')
    exitFullscreen() {
        document.webkitExitFullscreen();
    }

    @Listen('webkitfullscreenchange')
    fullscreenchangeHandler() {
        this.isFullscreen = document.webkitIsFullScreen;
    }

    render() {
        return ([
            <video-element src={this.url}></video-element>,
            <div><play-button playing={this.isPlaying}></play-button></div>,
            <div><mute-button muted={this.isMuted}></mute-button></div>,
            <div><fullscreen-button fullscreen={this.isFullscreen}></fullscreen-button></div>,
            <div>
                <label>Scrub</label>
                <scrub-bar progress={this.progress} duration={this.duration}></scrub-bar>
            </div>,
            <div>
                <label>Volume</label>
                <volume-bar level={this.volume}></volume-bar>
            </div>,
            <div><time-label time={this.progress}></time-label></div>,
            <div><time-label time={this.duration}></time-label></div>
        ]);
    }

}