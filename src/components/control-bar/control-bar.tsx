import { Component, h, Prop, Watch, Element } from '@stencil/core';

@Component({
    tag: 'control-bar',
    styleUrl: 'control-bar.scss'
})
export class ControlBar {
    @Prop() visible = true;
    @Element() element: HTMLElement;

    componentDidLoad() {
        this.element.style.opacity = '1';
    }

    @Watch('visible')
    visibilityHandler(isVisible) {
        this.element.style.opacity = isVisible ? '1' : '0';
    }

    render() {
        return '';
    }
}